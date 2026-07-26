import { NextResponse } from "next/server";
import {
  isValidPassword,
  sessionCookieOptions,
  signSession,
} from "@/lib/admin-auth";
import {
  checkLoginRateLimit,
  clearLoginRateLimit,
  clientIp,
  rateLimitCookieOptions,
  readRateLimitCookie,
  recordFailedLogin,
} from "@/lib/admin-rate-limit";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const cookieRaw =
    readRateLimitCookie(request.headers.get("cookie")) || undefined;

  const gate = checkLoginRateLimit(ip, cookieRaw);
  if (!gate.ok) {
    const res = NextResponse.json(
      {
        ok: false,
        error: `Demasiados intentos. Espera ${Math.ceil(gate.retryAfterSec / 60)} min.`,
        retryAfterSec: gate.retryAfterSec,
      },
      {
        status: 429,
        headers: { "Retry-After": String(gate.retryAfterSec) },
      }
    );
    res.cookies.set(rateLimitCookieOptions(gate.state));
    return res;
  }

  const body = (await request.json()) as { password?: string };
  const password = body.password || "";

  if (!isValidPassword(password)) {
    const failed = recordFailedLogin(ip, cookieRaw);
    if (!failed.ok) {
      const res = NextResponse.json(
        {
          ok: false,
          error: `Demasiados intentos. Espera ${Math.ceil(failed.retryAfterSec / 60)} min.`,
          retryAfterSec: failed.retryAfterSec,
        },
        {
          status: 429,
          headers: { "Retry-After": String(failed.retryAfterSec) },
        }
      );
      res.cookies.set(rateLimitCookieOptions(failed.state));
      return res;
    }
    const remaining = failed.remaining;
    const res = NextResponse.json(
      {
        ok: false,
        error:
          remaining <= 2
            ? `Contraseña incorrecta. Te quedan ${remaining} intento${remaining === 1 ? "" : "s"}.`
            : "Contraseña incorrecta",
        remaining,
      },
      { status: 401 }
    );
    res.cookies.set(rateLimitCookieOptions(failed.state));
    return res;
  }

  clearLoginRateLimit(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookieOptions(signSession(password)));
  res.cookies.set(rateLimitCookieOptions(null));
  return res;
}
