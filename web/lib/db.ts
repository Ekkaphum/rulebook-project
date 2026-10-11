import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon> | null = null;

/** Neon over HTTP — one round trip per query, fine for serverless and the proxy. */
export function db() {
  if (!client) {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
    client = neon(process.env.DATABASE_URL);
  }
  return client;
}

export type UserRow = {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
  locale: string | null;
  country: string | null;
  city: string | null;
  created_at: string;
  last_seen_at: string;
  login_count: number;
  blocked: boolean;
  blocked_at: string | null;
  blocked_reason: string | null;
};
