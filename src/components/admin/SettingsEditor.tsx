"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SiteSettings } from "@/lib/site";

export function SettingsEditor({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [form, setForm] = useState(settings);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
        committed?: boolean;
      } | null;
      if (!res.ok) {
        setStatus(data?.error || `Error al guardar (${res.status})`);
        return;
      }
      setStatus(
        data?.committed
          ? "Guardado y enviado a GitHub."
          : "Guardado en local. Reinicia el servidor o haz push para verlo en la web."
      );
      router.refresh();
    } catch (err) {
      setStatus(
        err instanceof Error ? err.message : "Error de red al guardar"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={save}
      className="grid gap-4 rounded border border-ub-line bg-white p-6 md:grid-cols-2"
    >
      {(
        [
          ["edition", "Edición"],
          ["price", "Precio"],
          ["priceValue", "Precio (número, sin símbolo)"],
          ["deposit", "Reserva / preinscripción"],
          ["seats", "Plazas totales"],
          ["seatsLeft", "Plazas libres"],
          ["schedule", "Horario"],
          ["preinscription", "Periodo de preinscripción"],
          ["academicPeriod", "Periodo lectivo"],
          ["academicPeriodShort", "Periodo lectivo (corto)"],
          ["email", "Email"],
          ["phone", "Teléfono"],
          ["whatsapp", "WhatsApp (solo dígitos)"],
        ] as const
      ).map(([key, label]) => (
        <label key={key} className="block text-sm md:col-span-1">
          <span className="mb-1 block text-ub-muted">{label}</span>
          <input
            className="w-full border border-ub-line px-3 py-2 outline-none focus:border-ub-blue"
            value={String(form[key])}
            onChange={(e) => {
              const v = e.target.value;
              if (key === "seats" || key === "seatsLeft") {
                set(key, Number(v) as SiteSettings[typeof key]);
              } else {
                set(key, v as SiteSettings[typeof key]);
              }
            }}
          />
        </label>
      ))}
      {status ? (
        <p className="text-sm text-ub-blue md:col-span-2">{status}</p>
      ) : null}
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-ub-navy px-4 py-2.5 text-sm font-medium text-white hover:bg-ub-blue-deep disabled:opacity-60"
        >
          {loading ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}
