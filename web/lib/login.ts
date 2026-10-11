import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import { SESSION_COOKIE, sessionCookieOptions, signSession } from "@/lib/session";

type Profile = { sub?: string; email: string; name?: string; picture?: string; locale?: string };

function geo(req: NextRequest) {
  const city = req.headers.get("x-vercel-ip-city");
  return {
    country: req.headers.get("x-vercel-ip-country"),
    city: city ? decodeURIComponent(city) : null,
  };
}

/** Upserts the user, records the login and returns a response carrying the session cookie. */
export async function completeLogin(req: NextRequest, p: Profile, next: string) {
  const { country, city } = geo(req);
  const email = p.email.toLowerCase();
  const rows = (await db()`
    insert into users (google_sub, email, name, picture, locale, country, city, login_count, last_seen_at)
    values (${p.sub ?? null}, ${email}, ${p.name ?? null}, ${p.picture ?? null}, ${p.locale ?? null}, ${country}, ${city}, 1, now())
    on conflict (email) do update set
      google_sub = coalesce(excluded.google_sub, users.google_sub),
      name = coalesce(excluded.name, users.name),
      picture = coalesce(excluded.picture, users.picture),
      locale = coalesce(excluded.locale, users.locale),
      country = coalesce(excluded.country, users.country),
      city = coalesce(excluded.city, users.city),
      login_count = users.login_count + 1,
      last_seen_at = now()
    returning id, blocked, name, picture
  `) as { id: string; blocked: boolean; name: string | null; picture: string | null }[];
  const user = rows[0];

  await db()`insert into events (user_id, type, path, country, ua)
    values (${user.id}, 'login', ${next}, ${country}, ${req.headers.get("user-agent")?.slice(0, 300) ?? null})`;

  if (user.blocked) return NextResponse.redirect(new URL("/blocked", req.url));

  const token = await signSession({ sub: user.id, email, name: user.name ?? "", picture: user.picture ?? "" });
  const res = NextResponse.redirect(new URL(next, req.url));
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return res;
}
