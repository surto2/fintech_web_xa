"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Post } from "@/lib/posts";

type Props =
  | { mode: "create"; post?: undefined }
  | { mode: "edit"; post: Post };

const fieldClass =
  "w-full border border-ub-line bg-white px-3 py-2 outline-none focus:border-ub-blue";

export function PostEditor({ mode, post }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [date, setDate] = useState(
    post?.date || new Date().toISOString().slice(0, 10)
  );
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || "");
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(
    post?.seoDescription || ""
  );
  const [html, setHtml] = useState(
    post?.html || "<p>Escribe aquí el contenido de la noticia…</p>"
  );
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    const payload = {
      title,
      slug: slug || undefined,
      date,
      excerpt,
      featuredImage: featuredImage || null,
      seoTitle,
      seoDescription,
      html,
    };

    const res = await fetch(
      mode === "create" ? "/api/admin/posts" : `/api/admin/posts/${post.slug}`,
      {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setStatus(data.error || "Error al guardar");
      return;
    }
    setStatus(
      data.committed
        ? "Guardado y enviado a GitHub (Vercel redesplegará)."
        : "Guardado en local. Reinicia el servidor o haz push para publicar."
    );
    if (mode === "create" && data.post?.slug) {
      router.push(`/admin/posts/${data.post.slug}`);
      router.refresh();
    } else {
      router.refresh();
    }
  }

  async function remove() {
    if (!post || !confirm("¿Eliminar esta noticia?")) return;
    setLoading(true);
    const res = await fetch(`/api/admin/posts/${post.slug}`, {
      method: "DELETE",
    });
    setLoading(false);
    if (!res.ok) {
      setStatus("No se pudo eliminar");
      return;
    }
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <form
      onSubmit={save}
      className="space-y-5 rounded border border-ub-line bg-white p-6"
    >
      <Field label="Título">
        <input
          className={fieldClass}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Slug (URL)">
          <input
            className={fieldClass}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="se-genera-solo"
            disabled={mode === "edit"}
          />
        </Field>
        <Field label="Fecha">
          <input
            className={fieldClass}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Field>
      </div>
      <Field label="Extracto">
        <textarea
          className={`${fieldClass} min-h-20`}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </Field>
      <Field label="Imagen destacada (ruta o URL)">
        <input
          className={fieldClass}
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
          placeholder="/uploads/2026/07/foto.jpg"
        />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="SEO title (opcional)">
          <input
            className={fieldClass}
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
          />
        </Field>
        <Field label="SEO description (opcional)">
          <input
            className={fieldClass}
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
          />
        </Field>
      </div>
      <Field label="Contenido (HTML)">
        <textarea
          className={`${fieldClass} min-h-64 font-mono text-sm`}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          required
        />
      </Field>
      <p className="text-xs text-ub-muted">
        Puedes usar HTML básico: p, h2, a, img (ruta /uploads/…), listas.
      </p>
      {status ? <p className="text-sm text-ub-blue">{status}</p> : null}
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-ub-navy px-4 py-2.5 text-sm font-medium text-white hover:bg-ub-blue-deep disabled:opacity-60"
        >
          {loading ? "Guardando…" : "Guardar"}
        </button>
        {mode === "edit" ? (
          <button
            type="button"
            onClick={remove}
            disabled={loading}
            className="border border-red-300 px-4 py-2.5 text-sm text-red-700 hover:bg-red-50"
          >
            Eliminar
          </button>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-ub-muted">{label}</span>
      {children}
    </label>
  );
}
