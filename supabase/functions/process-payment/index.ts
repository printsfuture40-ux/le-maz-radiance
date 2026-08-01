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
    const { booking_id: bookingId, action = "initiate" } = await req.json();
    if (!bookingId) return json({ error: "Missing booking reference." }, 400);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("id, reference, phone, booking_date, deposit_amount, total_amount, status")
      .eq("id", bookingId)
      .maybeSingle();
    if (bookingError) throw bookingError;
    if (!booking) return json({ error: "Booking not found." }, 404);

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

    const darajaConfigured = Boolean(
      Deno.env.get("MPESA_CONSUMER_KEY") && Deno.env.get("MPESA_CONSUMER_SECRET"),
    );

    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        booking_id: booking.id,
        provider: "mpesa",
        amount: booking.deposit_amount,
        status: "pending",
        raw_payload: { mode: darajaConfigured ? "daraja" : "simulated" },
      })
      .select("id")
      .single();
    if (paymentError) throw paymentError;

    if (darajaConfigured) {
      // Placeholder for the live Daraja STK Push. Once implemented, return
      // `status: "pending"` here and let the callback confirm the booking.
      return json({ status: "pending", payment_id: payment.id });
    }

    // Simulated settlement — mirrors what the Daraja callback will do.
    const providerRef = `SIM-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    await supabase
      .from("payments")
      .update({ status: "succeeded", provider_ref: providerRef })
      .eq("id", payment.id);
    await supabase.from("bookings").update({ status: "confirmed" }).eq("id", booking.id);

    return json({
      status: "confirmed",
      reference: booking.reference,
      provider_ref: providerRef,
      deposit_amount: booking.deposit_amount,
      total_amount: booking.total_amount,
      booking_date: booking.booking_date,
    });
  } catch (err) {
    console.error("process-payment failed", err);
    return json({ error: "Payment could not be processed. Please try again." }, 500);
  }
});
