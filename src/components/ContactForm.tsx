"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || "");
    const message = String(data.get("message") || "");
    const agree = data.get("agree");

    if (!agree || !name || !email || !subject || !message) {
      setStatus("error");
      return;
    }

    const body = [`Nombre: ${name}`, `Email: ${email}`, "", message].join("\n");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setStatus("ok");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 border border-ub-line bg-white p-6 md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-ub-muted">Nombre *</span>
          <input
            name="name"
            required
            className="w-full border border-ub-line bg-ub-paper px-3 py-2.5 outline-none focus:border-ub-blue"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ub-muted">Email *</span>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-ub-line bg-ub-paper px-3 py-2.5 outline-none focus:border-ub-blue"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block text-ub-muted">Asunto *</span>
        <input
          name="subject"
          required
          defaultValue={`Información Máster Fintech ${siteConfig.edition}`}
          className="w-full border border-ub-line bg-ub-paper px-3 py-2.5 outline-none focus:border-ub-blue"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-ub-muted">Mensaje *</span>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full border border-ub-line bg-ub-paper px-3 py-2.5 outline-none focus:border-ub-blue"
        />
      </label>
      <label className="flex items-start gap-2 text-sm text-ub-muted">
        <input name="agree" type="checkbox" required className="mt-1" />
        <span>
          He leído y acepto la{" "}
          <a href="/politica-de-privacidad" className="text-ub-blue underline">
            política de privacidad
          </a>
          .
        </span>
      </label>
      <button
        type="submit"
        className="rounded-sm bg-ub-blue px-5 py-3 text-sm font-medium text-white transition hover:bg-ub-blue-deep"
      >
        Enviar mensaje
      </button>
      {status === "ok" ? (
        <p className="text-sm text-emerald-700">
          Se abrirá tu cliente de correo para enviar el mensaje a {siteConfig.email}.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-700">Revisa los campos obligatorios.</p>
      ) : null}
    </form>
  );
}
