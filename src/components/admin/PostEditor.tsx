"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { Post } from "@/lib/posts";

type Props =
  | { mode: "create"; post?: undefined }
  | { mode: "edit"; post: Post };

const fieldClass =
  "w-full border border-ub-line bg-white px-3 py-2 outline-none focus:border-ub-blue";

export function PostEditor({ mode, post }: Props) {
  const router = useRouter();
  const htmlRef = useRef<HTMLTextAreaElement>(null);
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
  const [uploading, setUploading] = useState<"featured" | "content" | null>(
    null
  );

  async function uploadImage(file: File) {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Error al subir la imagen");
    }
    return data as { url: string; committed: boolean; error?: string };
  }

  async function onFeaturedFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading("featured");
    setStatus("");
    try {
      const data = await uploadImage(file);
      setFeaturedImage(data.url);
      setStatus(
        data.committed
          ? "Imagen destacada subida y enviada a GitHub."
          : data.error
            ? `Imagen guardada en local (GitHub: ${data.error}).`
            : "Imagen destacada guardada en local."
      );
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setUploading(null);
    }
  }

  async function onContentFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading("content");
    setStatus("");
    try {
      const data = await uploadImage(file);
      const tag = `\n<figure><img src="${data.url}" alt="" /></figure>\n`;
      const el = htmlRef.current;
      if (el) {
        const start = el.selectionStart ?? html.length;
        const end = el.selectionEnd ?? html.length;
        const next = html.slice(0, start) + tag + html.slice(end);
        setHtml(next);
        requestAnimationFrame(() => {
          el.focus();
          const pos = start + tag.length;
          el.setSelectionRange(pos, pos);
        });
      } else {
        setHtml((prev) => prev + tag);
      }
      setStatus(
        data.committed
          ? "Imagen insertada en el contenido y enviada a GitHub."
          : "Imagen insertada en el contenido (local)."
      );
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setUploading(null);
    }
  }

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

  const busy = loading || uploading !== null;

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
      <div className="space-y-2">
        <Field label="Imagen destacada (ruta o URL)">
          <input
            className={fieldClass}
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            placeholder="/uploads/2026/07/foto.jpg"
          />
        </Field>
        <div className="flex flex-wrap items-center gap-3">
          <label className="cursor-pointer border border-ub-line bg-ub-paper px-3 py-2 text-sm text-ub-navy hover:border-ub-blue">
            {uploading === "featured" ? "Subiendo…" : "Subir imagen destacada"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              disabled={busy}
              onChange={onFeaturedFile}
            />
          </label>
          {featuredImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={featuredImage}
              alt=""
              className="h-16 w-24 border border-ub-line object-cover"
            />
          ) : null}
        </div>
      </div>
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
      <div className="space-y-2">
        <Field label="Contenido (HTML)">
          <textarea
            ref={htmlRef}
            className={`${fieldClass} min-h-64 font-mono text-sm`}
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            required
          />
        </Field>
        <label className="inline-block cursor-pointer border border-ub-line bg-ub-paper px-3 py-2 text-sm text-ub-navy hover:border-ub-blue">
          {uploading === "content"
            ? "Subiendo…"
            : "Insertar imagen en el contenido"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            disabled={busy}
            onChange={onContentFile}
          />
        </label>
      </div>
      <p className="text-xs text-ub-muted">
        Imágenes: JPG, PNG, WebP o GIF · máx. 5 MB. Se guardan en /uploads/…
        También puedes pegar HTML básico: p, h2, a, img, listas.
      </p>
      {status ? <p className="text-sm text-ub-blue">{status}</p> : null}
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={busy}
          className="bg-ub-navy px-4 py-2.5 text-sm font-medium text-white hover:bg-ub-blue-deep disabled:opacity-60"
        >
          {loading ? "Guardando…" : "Guardar"}
        </button>
        {mode === "edit" ? (
          <button
            type="button"
            onClick={remove}
            disabled={busy}
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
