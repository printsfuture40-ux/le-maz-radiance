import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const DAILY_LIMIT = 5;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

/**
 * Payment orchestration for booking deposits.
 *
 * Provider-agnostic by design: today the M-Pesa leg is simulated, but the
 * contract (payments row -> provider_ref -> status transition) is exactly what
 * a Daraja STK Push + C2B callback needs. To go live, implement
 * `initiateMpesaStkPush` below and let the Daraja callback flip the payment
 * row to `succeeded` and the booking to `confirmed`.
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const {
      booking_id: bookingId,
      access_token: accessToken,
      action = "initiate",
    } = await req.json();
    if (!bookingId || typeof accessToken !== "string" || accessToken.length < 16) {
      return json({ error: "Missing or invalid booking credentials." }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("id, reference, phone, booking_date, deposit_amount, total_amount, status, access_token")
      .eq("id", bookingId)
      .maybeSingle();
    if (bookingError) throw bookingError;
    // Ownership proof: the caller must present the token issued at creation.
    if (!booking || booking.access_token !== accessToken) {
      return json({ error: "Booking not found." }, 404);
    }

    if (action === "cancel") {
      await supabase.from("bookings").update({ status: "cancelled" }).eq("id", booking.id);
      return json({ status: "cancelled" });
    }


    if (booking.status === "confirmed") {
      return json({ status: "confirmed", reference: booking.reference, already: true });
    }
    if (booking.status === "cancelled") {
      return json({ error: "This booking was cancelled. Please start a new booking." }, 409);
    }

    // Capacity is re-checked at payment time so a date cannot overflow.
    const { count } = await supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("booking_date", booking.booking_date)
      .in("status", ["confirmed", "completed"]);
    if ((count ?? 0) >= DAILY_LIMIT) {
      await supabase.from("bookings").update({ status: "cancelled" }).eq("id", booking.id);
      return json({ error: "That date just filled up. Please choose another day." }, 409);
    }

    // Owner-controlled mode: manual (PayBill/Till), automatic (Daraja), or hybrid.
    const { data: settings } = await supabase
      .from("payment_settings")
      .select(
        "business_name, paybill, till, account_reference, automation_mode, daraja_consumer_key, daraja_consumer_secret",
      )
      .eq("id", true)
      .maybeSingle();

    const mode = settings?.automation_mode ?? "manual";
    const darajaConfigured = Boolean(
      (settings?.daraja_consumer_key && settings?.daraja_consumer_secret) ||
        (Deno.env.get("MPESA_CONSUMER_KEY") && Deno.env.get("MPESA_CONSUMER_SECRET")),
    );
    const useDaraja = mode !== "manual" && darajaConfigured;

    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        booking_id: booking.id,
        provider: "mpesa",
        amount: booking.deposit_amount,
        status: "pending",
        raw_payload: { mode: useDaraja ? "daraja" : "manual" },
      })
      .select("id")
      .single();
    if (paymentError) throw paymentError;

    if (useDaraja) {
      // Placeholder for the live Daraja STK Push. Once implemented, return
      // `status: "pending"` here and let the callback confirm the booking.
      return json({ status: "pending", payment_id: payment.id });
    }

    // Manual settlement: the client pays via PayBill/Till and the salon confirms.
    return json({
      status: "manual",
      payment_id: payment.id,
      reference: booking.reference,
      deposit_amount: booking.deposit_amount,
      total_amount: booking.total_amount,
      booking_date: booking.booking_date,
      payment_instructions: {
        business_name: settings?.business_name ?? "Le'maz Beauty Studio",
        paybill: settings?.paybill ?? "880100",
        till: settings?.till ?? "",
        account_reference: settings?.account_reference || booking.reference,
      },
    });
  } catch (err) {
    console.error("process-payment failed", err);
    return json({ error: "Payment could not be processed. Please try again." }, 500);
  }
});
