import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

export const PBKDF2_ITERATIONS = 210_000;
export const SESSION_DAYS = 30;

export function adminClient(): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

const enc = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function sha256Hex(value: string): Promise<string> {
  return toHex(await crypto.subtle.digest("SHA-256", enc.encode(value)));
}

async function pbkdf2Hex(password: string, salt: string, iterations: number): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: enc.encode(salt), iterations },
    key,
    256,
  );
  return toHex(bits);
}

/** Constant-time comparison of two hex strings. */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export type PasswordRecord = {
  password_hash: string;
  password_salt: string;
  password_algo: string;
  password_iterations: number;
};

export async function verifyPassword(password: string, rec: PasswordRecord): Promise<boolean> {
  const computed = rec.password_algo === "pbkdf2-sha256"
    ? await pbkdf2Hex(password, rec.password_salt, rec.password_iterations || PBKDF2_ITERATIONS)
    : await sha256Hex(rec.password_salt + password);
  return timingSafeEqual(computed, rec.password_hash);
}

export async function hashPassword(password: string) {
  const salt = randomHex(16);
  const hash = await pbkdf2Hex(password, salt, PBKDF2_ITERATIONS);
  return {
    password_hash: hash,
    password_salt: salt,
    password_algo: "pbkdf2-sha256",
    password_iterations: PBKDF2_ITERATIONS,
  };
}

/** Creates a session and returns the plaintext token (stored only as a hash). */
export async function createSession(supabase: SupabaseClient): Promise<string> {
  const token = randomHex(32);
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const { error } = await supabase
    .from("admin_sessions")
    .insert({ token_hash: await sha256Hex(token), expires_at: expires });
  if (error) throw error;
  // Opportunistic cleanup of expired sessions.
  await supabase.from("admin_sessions").delete().lt("expires_at", new Date().toISOString());
  return token;
}

export type SessionRow = { id: string; expires_at: string };

/** Returns the active session row for a bearer token, or null. */
export async function getSession(
  supabase: SupabaseClient,
  token: unknown,
): Promise<SessionRow | null> {
  if (typeof token !== "string" || token.length !== 64) return null;
  const { data } = await supabase
    .from("admin_sessions")
    .select("id, expires_at")
    .eq("token_hash", await sha256Hex(token))
    .maybeSingle();
  if (!data) return null;
  if (new Date(data.expires_at).getTime() < Date.now()) {
    await supabase.from("admin_sessions").delete().eq("id", data.id);
    return null;
  }
  await supabase
    .from("admin_sessions")
    .update({ last_seen_at: new Date().toISOString() })
    .eq("id", data.id);
  return data as SessionRow;
}

export function bearerToken(req: Request): string | null {
  const header = req.headers.get("x-admin-token");
  return header && header.trim().length > 0 ? header.trim() : null;
}
