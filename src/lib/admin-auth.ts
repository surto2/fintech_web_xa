import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "fintech_admin_session";

function secret() {
  return process.env.ADMIN_PASSWORD || "fintech-ub-admin-dev";
}

export function signSession(password: string) {
  return createHmac("sha256", secret()).update(password).digest("hex");
}

export function isValidPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "fintech-ub-admin-dev";
  if (password.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  const expected = signSession(secret());
  if (token.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  };
}

export { COOKIE as ADMIN_COOKIE };
