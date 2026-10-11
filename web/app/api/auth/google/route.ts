import { NextResponse, type NextRequest } from "next/server";
import { OAUTH_COOKIE, googleConfigured, redirectUri, safeNext } from "@/lib/session";

function b64url(bytes: Uint8Array) {
  return Buffer.from(bytes).toString("base64url");
}

/** Starts Google sign-in: authorization code flow with PKCE and a state check. */
export async function GET(req: NextRequest) {
  if (!googleConfigured()) return NextResponse.redirect(new URL("/welcome?error=unavailable", req.url));

  const next = safeNext(req.nextUrl.searchParams.get("next"));
  const state = b64url(crypto.getRandomValues(new Uint8Array(24)));
  const verifier = b64url(crypto.getRandomValues(new Uint8Array(32)));
  const challenge = b64url(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier))));

  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: redirectUri(req),
    response_type: "code",
    scope: "openid email profile",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
    prompt: "select_account",
  }).toString();

  const res = NextResponse.redirect(url);
  res.cookies.set(OAUTH_COOKIE, JSON.stringify({ state, verifier, next }), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 600,
  });
  return res;
}
