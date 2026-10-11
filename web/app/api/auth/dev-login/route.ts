import { NextResponse, type NextRequest } from "next/server";
import { completeLogin } from "@/lib/login";
import { safeNext } from "@/lib/session";

/** Local development only: sign in as any email without Google. */
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") return new NextResponse("Not found", { status: 404 });
  const p = req.nextUrl.searchParams;
  const email = p.get("email") ?? "dev@example.test";
  return completeLogin(req, { email, name: p.get("name") ?? email.split("@")[0] }, safeNext(p.get("next")));
}
