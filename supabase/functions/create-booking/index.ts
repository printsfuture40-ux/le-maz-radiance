import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { PRICES } from "../_shared/prices.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const DEPOSIT_RATE = 0.35;
const DAILY_LIMIT = 5;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "");
  let p = digits.startsWith("+") ? digits.slice(1) : digits;
  if (p.startsWith("0")) p = "254" + p.slice(1);
  if (p.startsWith("7") || p.startsWith("1")) p = "254" + p;
  if (!/^254(7|1)\d{8}$/.test(p)) return null;
  return p;
}

function reference() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `LMZ-${s}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const fullName = String(body.full_name ?? "").trim();
    const phoneRaw = String(body.phone ?? "").trim();
    const serviceNames: string[] = Array.isArray(body.services) ? body.services.map(String) : [];
    const bookingDate = String(body.booking_date ?? "").trim();
    const notes = body.notes ? String(body.notes).trim().slice(0, 1000) : null;

    if (fullName.length < 2 || fullName.length > 120) {
      return json({ error: "Please enter your full name." }, 400);
    }
    const phone = normalisePhone(phoneRaw);
    if (!phone) return json({ error: "Please enter a valid Kenyan phone number." }, 400);
    if (serviceNames.length === 0) return json({ error: "Please select at least one service." }, 400);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(bookingDate)) {
      return json({ error: "Please choose a valid booking date." }, 400);
    }
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const chosen = new Date(`${bookingDate}T00:00:00Z`);
    const maxDate = new Date(today);
    maxDate.setUTCMonth(maxDate.getUTCMonth() + 6);
    if (chosen < today || chosen > maxDate) {
      return json({ error: "Bookings are only open from today up to six months ahead." }, 400);
    }

    // Server-side pricing — the client never dictates amounts.
    const services: { name: string; price: number }[] = [];
    for (const name of serviceNames) {
      const price = PRICES[name];
      if (price === undefined) return json({ error: `Unknown service: ${name}` }, 400);
      services.push({ name, price });
    }
    const total = services.reduce((sum, s) => sum + s.price, 0);
    const deposit = Math.round(total * DEPOSIT_RATE);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Capacity re-check (authoritative).
    const { count, error: countError } = await supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("booking_date", bookingDate)
      .in("status", ["confirmed", "completed"]);
    if (countError) throw countError;
    if ((count ?? 0) >= DAILY_LIMIT) {
      return json({ error: "That date is fully booked. Please choose another day." }, 409);
    }

    // Duplicate guard: same phone + same date within the last 10 minutes.
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { data: dupes } = await supabase
      .from("bookings")
      .select("id, reference, total_amount, deposit_amount, status")
      .eq("phone", phone)
      .eq("booking_date", bookingDate)
      .gte("created_at", since)
      .limit(1);
    if (dupes && dupes.length > 0) {
      const b = dupes[0];
      return json({
        booking: {
          id: b.id,
          reference: b.reference,
          total_amount: b.total_amount,
          deposit_amount: b.deposit_amount,
          status: b.status,
          booking_date: bookingDate,
        },
        duplicate: true,
      });
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        reference: reference(),
        full_name: fullName,
        phone,
        services,
        total_amount: total,
        deposit_amount: deposit,
        booking_date: bookingDate,
        notes,
        status: "pending_payment",
      })
      .select("id, reference, total_amount, deposit_amount, status, booking_date")
      .single();
    if (error) throw error;

    return json({ booking: data });
  } catch (err) {
    console.error("create-booking failed", err);
    return json({ error: "We could not save your booking. Please try again." }, 500);
  }
});
