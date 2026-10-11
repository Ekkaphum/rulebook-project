// Creates the account and reading-activity tables. Safe to re-run.
// Usage: node --env-file=.env.local scripts/migrate.mjs
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  google_sub text unique,
  email text unique not null,
  name text,
  picture text,
  locale text,
  country text,
  city text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  login_count int not null default 0,
  blocked boolean not null default false,
  blocked_at timestamptz,
  blocked_reason text
)`;

await sql`create table if not exists events (
  id bigserial primary key,
  user_id uuid references users(id) on delete cascade,
  session_id text,
  type text not null,
  path text,
  target text,
  value int,
  duration int,
  country text,
  ua text,
  created_at timestamptz not null default now()
)`;

await sql`create index if not exists events_user_time on events (user_id, created_at desc)`;
await sql`create index if not exists events_time on events (created_at desc)`;
await sql`create index if not exists events_type_path on events (type, path)`;

console.log("Schema ready.");
