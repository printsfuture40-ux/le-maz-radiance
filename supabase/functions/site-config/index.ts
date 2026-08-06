const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

/**
 * Public, read-only payment display config for the booking flow.
 * Only non-sensitive fields are exposed — Daraja credentials never leave the server.
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const fallback = {
    business_name: "Le'maz Beauty Studio",
    paybill: "880100",
    till: "",
    account_reference: "LEMAZ",
    deposit_percent: 35,
    automation_mode: "manual",
  };

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data } = await supabase
      .from("payment_settings")
      .select("business_name, paybill, till, account_reference, deposit_percent, automation_mode")
      .eq("id", true)
      .maybeSingle();

    return new Response(JSON.stringify({ payment: data ?? fallback }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("site-config failed", err);
    return new Response(JSON.stringify({ payment: fallback }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
