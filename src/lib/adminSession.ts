import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "lemaz_admin_token";

export const getAdminToken = () =>
  typeof window === "undefined" ? null : localStorage.getItem(STORAGE_KEY);

export const setAdminToken = (token: string) => localStorage.setItem(STORAGE_KEY, token);

export const clearAdminToken = () => localStorage.removeItem(STORAGE_KEY);

type InvokeResult<T> = { data: T | null; error: string | null; status?: number };

/** Calls an admin edge function with the stored session token attached. */
export async function adminInvoke<T>(
  fn: "admin-auth" | "admin-bookings",
  body: Record<string, unknown>,
): Promise<InvokeResult<T>> {
  const token = getAdminToken();
  const { data, error } = await supabase.functions.invoke(fn, {
    body,
    headers: token ? { "x-admin-token": token } : undefined,
  });

  if (error) {
    // Edge functions return a JSON body with a friendly message on failure.
    let message = "Something went wrong. Please try again.";
    let status: number | undefined;
    const ctx = (error as { context?: Response }).context;
    if (ctx && typeof ctx.json === "function") {
      status = ctx.status;
      try {
        const parsed = await ctx.json();
        if (parsed?.error) message = parsed.error;
      } catch {
        /* keep the default message */
      }
    }
    return { data: null, error: message, status };
  }

  const payload = data as (T & { error?: string }) | null;
  if (payload && typeof payload === "object" && "error" in payload && payload.error) {
    return { data: null, error: String(payload.error) };
  }
  return { data: payload as T, error: null };
}

export async function verifyAdminSession(): Promise<boolean> {
  if (!getAdminToken()) return false;
  const { data } = await adminInvoke<{ valid: boolean }>("admin-auth", { action: "verify" });
  return Boolean(data?.valid);
}

export async function adminLogout() {
  await adminInvoke("admin-auth", { action: "logout" });
  clearAdminToken();
}
