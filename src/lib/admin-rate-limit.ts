import { createHmac, timingSafeEqual } from "crypto";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hora
const COOKIE = "fintech_admin_rl";

type WindowState = { count: number; resetAt: number };

const memory = globalThis as typeof globalThis & {
  __fintechAdminLoginRl?: Map<string, WindowState>;
};

function store() {
  if (!memory.__fintechAdminLoginRl) {
    memory.__fintechAdminLoginRl = new Map();
  }
  return memory.__fintechAdminLoginRl;
}

function signingKey() {
  return process.env.ADMIN_PASSWORD || "fintech-ub-admin-dev";
}

function sign(payload: string) {
  return createHmac("sha256", signingKey()).update(payload).digest("hex");
}

function encodeState(state: WindowState) {
  const payload = `${state.count}.${state.resetAt}`;
  return `${payload}.${sign(payload)}`;
}

function decodeState(raw: string | undefined): WindowState | null {
  if (!raw) return null;
  const parts = raw.split(".");
  if (parts.length !== 3) return null;
  const [countStr, resetStr, mac] = parts;
  const payload = `${countStr}.${resetStr}`;
  const expected = sign(payload);
  if (mac.length !== expected.length) return null;
  try {
    if (!timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  const count = Number(countStr);
  const resetAt = Number(resetStr);
  if (!Number.isFinite(count) || !Number.isFinite(resetAt) || count < 0) {
    return null;
  }
  return { count, resetAt };
}

function mergeStates(
  a: WindowState | null,
  b: WindowState | null,
  now: number
): WindowState {
  const fresh = (): WindowState => ({
    count: 0,
    resetAt: now + WINDOW_MS,
  });
  const valid = (s: WindowState | null) =>
    s && s.resetAt > now ? s : null;
  const left = valid(a);
  const right = valid(b);
  if (!left && !right) return fresh();
  if (!left) return { ...right! };
  if (!right) return { ...left };
  // Misma ventana o solapadas: usar el contador más alto y el reset más lejano
  return {
    count: Math.max(left.count, right.count),
    resetAt: Math.max(left.resetAt, right.resetAt),
  };
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  );
}

export function readRateLimitCookie(cookieHeader: string | null) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export type RateLimitResult =
  | { ok: true; remaining: number; state: WindowState }
  | {
      ok: false;
      retryAfterSec: number;
      state: WindowState;
    };

/** Comprueba si queda cupo antes de intentar login. No incrementa. */
export function checkLoginRateLimit(
  ip: string,
  cookieRaw: string | undefined
): RateLimitResult {
  const now = Date.now();
  const mem = store().get(ip) || null;
  const fromCookie = decodeState(cookieRaw);
  const state = mergeStates(mem, fromCookie, now);
  store().set(ip, state);

  if (state.count >= MAX_ATTEMPTS) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((state.resetAt - now) / 1000)),
      state,
    };
  }
  return {
    ok: true,
    remaining: MAX_ATTEMPTS - state.count,
    state,
  };
}

/** Registra un intento fallido. */
export function recordFailedLogin(
  ip: string,
  cookieRaw: string | undefined
): RateLimitResult {
  const now = Date.now();
  const mem = store().get(ip) || null;
  const fromCookie = decodeState(cookieRaw);
  const state = mergeStates(mem, fromCookie, now);
  state.count += 1;
  store().set(ip, state);

  if (state.count >= MAX_ATTEMPTS) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((state.resetAt - now) / 1000)),
      state,
    };
  }
  return {
    ok: true,
    remaining: MAX_ATTEMPTS - state.count,
    state,
  };
}

export function clearLoginRateLimit(ip: string) {
  store().delete(ip);
}

export function rateLimitCookieOptions(state: WindowState | null) {
  if (!state) {
    return {
      name: COOKIE,
      value: "",
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    };
  }
  const maxAge = Math.max(1, Math.ceil((state.resetAt - Date.now()) / 1000));
  return {
    name: COOKIE,
    value: encodeState(state),
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export { MAX_ATTEMPTS, WINDOW_MS, COOKIE as RATE_LIMIT_COOKIE };
