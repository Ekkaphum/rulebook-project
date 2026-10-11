import { NextResponse, type NextRequest } from "next/server";
import { OAUTH_COOKIE, redirectUri, safeNext } from "@/lib/session";
import { completeLogin } from "@/lib/login";

export async function GET(req: NextRequest) {
  const fail = (code: string) => {
    const res = NextResponse.redirect(new URL(`/welcome?error=${code}`, req.url));
    res.cookies.delete(OAUTH_COOKIE);
    return res;
  };

  let saved: { state: string; verifier: string; next: string };
  try {
    saved = JSON.parse(req.cookies.get(OAUTH_COOKIE)?.value ?? "");
  } catch {
    return fail("expired");
  }
  const code = req.nextUrl.searchParams.get("code");
  if (!code || req.nextUrl.searchParams.get("state") !== saved.state) return fail("state");

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: redirectUri(req),
      grant_type: "authorization_code",
      code_verifier: saved.verifier,
    }),
  });
  if (!tokenRes.ok) return fail("token");
  const { access_token } = (await tokenRes.json()) as { access_token: string };

  const infoRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { authorization: `Bearer ${access_token}` },
  });
  if (!infoRes.ok) return fail("profile");
  const info = (await infoRes.json()) as { sub: string; email?: string; email_verified?: boolean; name?: string; picture?: string; locale?: string };
  if (!info.email || !info.email_verified) return fail("email");

  const res = await completeLogin(req, { ...info, email: info.email }, safeNext(saved.next));
  res.cookies.delete(OAUTH_COOKIE);
  return res;
}
