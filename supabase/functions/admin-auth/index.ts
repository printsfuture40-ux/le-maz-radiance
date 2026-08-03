import {
  adminClient,
  bearerToken,
  corsHeaders,
  createSession,
  getSession,
  hashPassword,
  json,
  verifyPassword,
} from "../_shared/admin.ts";

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;
const MIN_PASSWORD_LENGTH = 6;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = adminClient();
    const body = await req.json().catch(() => ({}));
    const action = String(body.action ?? "");

    if (action === "verify") {
      const session = await getSession(supabase, bearerToken(req));
      return json({ valid: Boolean(session) }, session ? 200 : 401);
    }

    if (action === "logout") {
      const session = await getSession(supabase, bearerToken(req));
      if (session) await supabase.from("admin_sessions").delete().eq("id", session.id);
      return json({ ok: true });
    }

    const { data: settings, error: settingsError } = await supabase
      .from("admin_settings")
      .select("*")
      .eq("id", true)
      .maybeSingle();
    if (settingsError) throw settingsError;
    if (!settings) return json({ error: "Admin access is not configured." }, 500);

    if (action === "login") {
      if (settings.locked_until && new Date(settings.locked_until).getTime() > Date.now()) {
        return json(
          { error: "Too many failed attempts. Please try again in a few minutes." },
          429,
        );
      }

      const password = typeof body.password === "string" ? body.password : "";
      const ok = password.length > 0 && (await verifyPassword(password, settings));

      if (!ok) {
        const attempts = (settings.failed_attempts ?? 0) + 1;
        await supabase
          .from("admin_settings")
          .update({
            failed_attempts: attempts,
            locked_until: attempts >= MAX_ATTEMPTS
              ? new Date(Date.now() + LOCK_MINUTES * 60 * 1000).toISOString()
              : null,
          })
          .eq("id", true);
        return json({ error: "Incorrect password." }, 401);
      }

      await supabase
        .from("admin_settings")
        .update({ failed_attempts: 0, locked_until: null })
        .eq("id", true);
      const token = await createSession(supabase);
      return json({ token });
    }

    if (action === "change-password") {
      const session = await getSession(supabase, bearerToken(req));
      if (!session) return json({ error: "Session expired. Please sign in again." }, 401);

      const current = typeof body.current_password === "string" ? body.current_password : "";
      const next = typeof body.new_password === "string" ? body.new_password : "";

      if (!(await verifyPassword(current, settings))) {
        return json({ error: "Current password is incorrect." }, 401);
      }
      if (next.trim().length < MIN_PASSWORD_LENGTH) {
        return json(
          { error: `New password must be at least ${MIN_PASSWORD_LENGTH} characters.` },
          400,
        );
      }
      if (next === current) {
        return json({ error: "New password must be different from the current one." }, 400);
      }

      const hashed = await hashPassword(next);
      const { error: updateError } = await supabase
        .from("admin_settings")
        .update({ ...hashed, failed_attempts: 0, locked_until: null })
        .eq("id", true);
      if (updateError) throw updateError;

      // Invalidate every other device, keep this session alive.
      await supabase.from("admin_sessions").delete().neq("id", session.id);
      return json({ ok: true });
    }

    return json({ error: "Unsupported action." }, 400);
  } catch (err) {
    console.error("admin-auth failed", err);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
});
