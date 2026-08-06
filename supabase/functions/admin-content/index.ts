import { adminClient, bearerToken, corsHeaders, getSession, json } from "../_shared/admin.ts";

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const int = (v: unknown, fallback = 0) => (Number.isFinite(Number(v)) ? Math.trunc(Number(v)) : fallback);
const bool = (v: unknown, fallback = false) => (typeof v === "boolean" ? v : fallback);

const PUBLIC_SETTINGS =
  "id, business_name, paybill, till, account_reference, deposit_percent, automation_mode, callback_url";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = adminClient();
    const session = await getSession(supabase, bearerToken(req));
    if (!session) return json({ error: "Session expired. Please sign in again." }, 401);

    const body = await req.json().catch(() => ({}));
    const action = String(body.action ?? "");

    /* ---------------- Portfolio ---------------- */
    if (action === "portfolio-list") {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return json({ items: data ?? [] });
    }

    if (action === "portfolio-save") {
      const payload = {
        category: str(body.category, 80) || "Braiding",
        title: str(body.title, 120),
        description: str(body.description, 500),
        image_url: str(body.image_url, 800),
        display_order: int(body.display_order),
        hidden: bool(body.hidden),
      };
      if (!payload.image_url) return json({ error: "An image is required." }, 400);

      const id = str(body.id, 64);
      const query = id
        ? supabase.from("portfolio_items").update(payload).eq("id", id).select("*").single()
        : supabase.from("portfolio_items").insert(payload).select("*").single();
      const { data, error } = await query;
      if (error) throw error;
      return json({ item: data });
    }

    if (action === "portfolio-delete") {
      const id = str(body.id, 64);
      if (!id) return json({ error: "Missing item." }, 400);
      const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
      if (error) throw error;
      return json({ ok: true });
    }

    /* ---------------- Products ---------------- */
    if (action === "products-list") {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return json({ items: data ?? [] });
    }

    if (action === "product-save") {
      const payload = {
        name: str(body.name, 120),
        category: str(body.category, 80),
        description: str(body.description, 600),
        price: Math.max(0, int(body.price)),
        image_url: str(body.image_url, 800) || null,
        available: bool(body.available, true),
        featured: bool(body.featured),
        display_order: int(body.display_order),
        hidden: bool(body.hidden),
      };
      if (!payload.name) return json({ error: "A product name is required." }, 400);

      const id = str(body.id, 64);
      const query = id
        ? supabase.from("products").update(payload).eq("id", id).select("*").single()
        : supabase.from("products").insert(payload).select("*").single();
      const { data, error } = await query;
      if (error) throw error;
      return json({ item: data });
    }

    if (action === "product-delete") {
      const id = str(body.id, 64);
      if (!id) return json({ error: "Missing product." }, 400);
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      return json({ ok: true });
    }

    /* ---------------- Payment settings ---------------- */
    if (action === "payment-get") {
      const { data, error } = await supabase
        .from("payment_settings")
        .select(PUBLIC_SETTINGS)
        .eq("id", true)
        .maybeSingle();
      if (error) throw error;
      // Daraja credentials are never returned — only whether they are present.
      const { data: creds } = await supabase
        .from("payment_settings")
        .select("daraja_consumer_key, daraja_consumer_secret, daraja_passkey")
        .eq("id", true)
        .maybeSingle();
      return json({
        settings: data,
        daraja_configured: Boolean(
          creds?.daraja_consumer_key && creds?.daraja_consumer_secret && creds?.daraja_passkey,
        ),
      });
    }

    if (action === "payment-save") {
      const mode = str(body.automation_mode, 20);
      const payload: Record<string, unknown> = {
        business_name: str(body.business_name, 120) || "Le'maz Beauty Studio",
        paybill: str(body.paybill, 20),
        till: str(body.till, 20),
        account_reference: str(body.account_reference, 40),
        deposit_percent: Math.min(100, Math.max(0, int(body.deposit_percent, 35))),
        callback_url: str(body.callback_url, 400),
        automation_mode: ["manual", "automatic", "hybrid"].includes(mode) ? mode : "manual",
      };
      // Credentials are only overwritten when a new value is supplied.
      if (str(body.daraja_consumer_key, 200)) payload.daraja_consumer_key = str(body.daraja_consumer_key, 200);
      if (str(body.daraja_consumer_secret, 200)) payload.daraja_consumer_secret = str(body.daraja_consumer_secret, 200);
      if (str(body.daraja_passkey, 200)) payload.daraja_passkey = str(body.daraja_passkey, 200);

      const { error } = await supabase.from("payment_settings").update(payload).eq("id", true);
      if (error) throw error;
      return json({ ok: true });
    }

    return json({ error: "Unsupported action." }, 400);
  } catch (err) {
    console.error("admin-content failed", err);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
});
