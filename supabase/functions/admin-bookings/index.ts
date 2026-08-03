import { adminClient, bearerToken, corsHeaders, getSession, json } from "../_shared/admin.ts";

const STATUSES = ["pending_payment", "confirmed", "cancelled", "completed"] as const;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = adminClient();
    const session = await getSession(supabase, bearerToken(req));
    if (!session) return json({ error: "unauthorised" }, 401);

    const body = await req.json().catch(() => ({}));
    const action = String(body.action ?? "list");

    if (action === "list") {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          "id, reference, full_name, phone, services, total_amount, deposit_amount, booking_date, notes, status, created_at",
        )
        .order("booking_date", { ascending: true });
      if (error) throw error;
      return json({ bookings: data ?? [] });
    }

    if (action === "update-status") {
      const id = String(body.id ?? "");
      const status = String(body.status ?? "");
      if (!id || !(STATUSES as readonly string[]).includes(status)) {
        return json({ error: "Invalid request." }, 400);
      }
      const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
      if (error) throw error;
      return json({ ok: true });
    }

    return json({ error: "Unsupported action." }, 400);
  } catch (err) {
    console.error("admin-bookings failed", err);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
});
