import { NextResponse } from "next/server";
import {
  isValidPassword,
  sessionCookieOptions,
  signSession,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const password = body.password || "";
  if (!isValidPassword(password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  const cookie = sessionCookieOptions(signSession(password));
  res.cookies.set(cookie);
  return res;
}
