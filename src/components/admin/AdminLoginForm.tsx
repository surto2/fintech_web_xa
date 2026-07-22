"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Contraseña incorrecta");
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm">
        <span className="mb-1 block text-ub-muted">Contraseña</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-ub-line bg-white px-3 py-2 outline-none focus:border-ub-blue"
          autoComplete="current-password"
          required
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="bg-ub-navy px-4 py-2.5 text-sm font-medium text-white hover:bg-ub-blue-deep disabled:opacity-60"
      >
        {loading ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
