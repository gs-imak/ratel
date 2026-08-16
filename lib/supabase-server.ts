import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client, using the service-role key.
 *
 * This key bypasses every row-level security policy, so it must never reach the
 * browser. It is only read here, in modules that run on the server, and the variable
 * is deliberately not prefixed NEXT_PUBLIC_ so Next cannot inline it into a bundle.
 *
 * Returns null rather than throwing when the environment is not configured. A missing
 * key is a deployment state, not a crash: callers degrade and tell the truth.
 */
let cached: SupabaseClient | null | undefined;

export function serverClient(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  cached =
    url && key
      ? createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
      : null;

  return cached;
}
