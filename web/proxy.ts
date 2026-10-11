import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ONBOARDING, RECHECK_SECONDS, SESSION_COOKIE, gateEnabled, isAdminEmail, readSession, sessionCookieOptions, signSession,
} from "@/lib/session";

// Pages anyone can open. Everything else needs a signed-in, unblocked reader.
const PUBLIC = new Set(["/welcome", "/th/welcome", "/privacy", "/th/privacy", "/blocked"]);

const isThai = (p: string) => p === "/th" || p.startsWith("/th/");

function signedOut(req: NextRequest, clear: boolean) {
  const { pathname, search } = req.nextUrl;
  const landing = isThai(pathname) ? "/th/welcome" : "/welcome";
  let res: NextResponse;
  if (pathname === "/" || pathname === "/th") {
    // The home URL itself shows the landing page, so shared links stay tidy.
    res = NextResponse.rewrite(new URL(landing, req.url));
  } else {
    const url = new URL(landing, req.url);
    url.searchParams.set("next", pathname + search);
    res = NextResponse.redirect(url);
  }
  if (clear) res.cookies.delete(SESSION_COOKIE);
  return res;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");
  if (!gateEnabled() && !isAdminPath) return NextResponse.next();

  const session = await readSession(req.cookies.get(SESSION_COOKIE)?.value);

  if (PUBLIC.has(pathname)) {
    if (session && (pathname === "/welcome" || pathname === "/th/welcome")) {
      return NextResponse.redirect(new URL(pathname === "/th/welcome" ? "/th" : "/", req.url));
    }
    return NextResponse.next();
  }

  if (!session) return signedOut(req, false);

  // Re-check the account every few minutes so a block takes effect quickly
  // without a database round trip on every navigation and prefetch. A session
  // without a role is checked straight away: the role may have been set elsewhere.
  const now = Math.floor(Date.now() / 1000);
  let role = session.role;
  let refreshed: string | null = null;
  if (now - session.chk > RECHECK_SECONDS || !role) {
    const rows = (await db()`select blocked, name, picture, role from users where id = ${session.sub}`) as
      { blocked: boolean; name: string | null; picture: string | null; role: string | null }[];
    if (!rows[0]) return signedOut(req, true);
    if (rows[0].blocked) {
      const res = NextResponse.redirect(new URL("/blocked", req.url));
      res.cookies.delete(SESSION_COOKIE);
      return res;
    }
    role = rows[0].role ?? "";
    refreshed = await signSession(
      { sub: session.sub, email: session.email, name: rows[0].name ?? "", picture: rows[0].picture ?? "", role }, now,
    );
  }

  let res: NextResponse;
  if (!role && !ONBOARDING.has(pathname)) {
    const url = new URL(isThai(pathname) ? "/th/onboarding" : "/onboarding", req.url);
    url.searchParams.set("next", pathname + req.nextUrl.search);
    res = NextResponse.redirect(url);
  } else if (isAdminPath && !isAdminEmail(session.email)) {
    res = NextResponse.redirect(new URL("/", req.url));
  } else {
    res = NextResponse.next();
  }
  if (refreshed) res.cookies.set(SESSION_COOKIE, refreshed, sessionCookieOptions);
  return res;
}

export const config = {
  matcher: ["/((?!api/|_next/static|_next/image|images/|favicon.ico|robots.txt|sitemap.xml).*)"],
};
