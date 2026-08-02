import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

const DAILY_LIMIT = 5;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const max = new Date(today);
    max.setUTCMonth(max.getUTCMonth() + 6);

    // Only dates and counts leave this function — never customer data.
    const { data, error } = await supabase
      .from("bookings")
      .select("booking_date")
      .in("status", ["confirmed", "completed"])
      .gte("booking_date", today.toISOString().slice(0, 10))
      .lte("booking_date", max.toISOString().slice(0, 10));
    if (error) throw error;

    const counts = new Map<string, number>();
    for (const row of data ?? []) {
      const d = row.booking_date as string;
      counts.set(d, (counts.get(d) ?? 0) + 1);
    }
    const dates = [...counts.entries()].filter(([, n]) => n >= DAILY_LIMIT).map(([d]) => d);

    return new Response(JSON.stringify({ dates }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("booking-availability failed", err);
    return new Response(JSON.stringify({ dates: [] }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
