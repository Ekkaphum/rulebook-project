import { SignJWT, jwtVerify } from "jose";

/**
 * Session handling shared by the proxy, route handlers and server components.
 * The session is a signed JWT in an httpOnly cookie. `chk` records when the
 * user row was last checked for a block, so the proxy only hits the database
 * every RECHECK_SECONDS per reader rather than on every request.
 */
export const SESSION_COOKIE = "rb_session";
export const OAUTH_COOKIE = "rb_oauth";
export const SESSION_DAYS = 30;
export const RECHECK_SECONDS = 5 * 60;

/** `role` is empty until the reader answers the one-time role question. */
export type Session = { sub: string; email: string; name: string; picture: string; role: string; chk: number };

function key() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function signSession(s: Omit<Session, "chk">, chk = Math.floor(Date.now() / 1000)) {
  return new SignJWT({ ...s, chk })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(s.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(key());
}

export async function readSession(token: string | undefined): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key());
    return {
      sub: String(payload.sub),
      email: String(payload.email ?? ""),
      name: String(payload.name ?? ""),
      picture: String(payload.picture ?? ""),
      role: String(payload.role ?? ""),
      chk: Number(payload.chk ?? 0),
    };
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_DAYS * 24 * 60 * 60,
};

export function isAdminEmail(email: string | undefined | null) {
  if (!email) return false;
  const admins = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  return admins.includes(email.toLowerCase());
}

export function googleConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

/**
 * The reading gate is on once Google sign-in is configured. In local
 * development it is always on so the flow can be exercised with dev-login.
 */
export function gateEnabled() {
  return googleConfigured() || process.env.NODE_ENV === "development";
}

/**
 * Only allow same-site relative paths as post-login destinations.
 * Rejects protocol-relative (`//`) and backslash forms (`/\`, `\`) that
 * `new URL(next, origin)` would otherwise resolve to an external host.
 */
export function safeNext(next: string | null | undefined) {
  if (!next || !next.startsWith("/")) return "/";
  if (next.startsWith("//") || next.includes("\\")) return "/";
  if (next.startsWith("/api/")) return "/";
  return next;
}

export function redirectUri(req: Request) {
  const origin = process.env.AUTH_URL ?? new URL(req.url).origin;
  return `${origin}/api/auth/callback/google`;
}

export const ONBOARDING = new Set(["/onboarding", "/th/onboarding"]);
