"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Post } from "@/lib/posts";
import { normalizeArticleHtml } from "@/lib/article-html";

type Props =
  | { mode: "create"; post?: undefined }
  | { mode: "edit"; post: Post };

const fieldClass =
  "w-full border border-ub-line bg-white px-3 py-2 outline-none focus:border-ub-blue";

const toolbarBtn =
  "border border-ub-line bg-ub-paper px-2.5 py-1.5 text-sm text-ub-navy hover:border-ub-blue disabled:opacity-50";

export function PostEditor({ mode, post }: Props) {
  const router = useRouter();
  const bodyRef = useRef<HTMLDivElement>(null);
  const pendingFiles = useRef(new Map<string, File>());
  const [title, setTitle] = useState(post?.title || "");
  const [date, setDate] = useState(
    post?.date || new Date().toISOString().slice(0, 10)
  );
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || "");
  const [featuredPreview, setFeaturedPreview] = useState(
    post?.featuredImage || ""
  );
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(
    post?.seoDescription || ""
  );
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.innerHTML = normalizeArticleHtml(
      post?.html || "<p>Escribe aquí el contenido de la noticia…</p>"
    );
    try {
      document.execCommand("defaultParagraphSeparator", false, "p");
    } catch {
      /* ignore */
    }
  }, [post?.html]);

  function newPendingId() {
    return `pending:${crypto.randomUUID()}`;
  }

  function exec(cmd: string, value?: string) {
    bodyRef.current?.focus();
    document.execCommand(cmd, false, value);
  }

  function onBodyPaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    const html = normalizeArticleHtml(text);
    document.execCommand("insertHTML", false, html);
  }

  async function onFeaturedFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (featuredImage.startsWith("pending:")) {
      pendingFiles.current.delete(featuredImage);
    }
    const id = newPendingId();
    pendingFiles.current.set(id, file);
    setFeaturedImage(id);
    setFeaturedPreview(URL.createObjectURL(file));
    setStatus("Imagen destacada lista. Se publicará al guardar.");
  }

  async function onContentFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const id = newPendingId();
    pendingFiles.current.set(id, file);
    const preview = URL.createObjectURL(file);
    bodyRef.current?.focus();
    document.execCommand(
      "insertHTML",
      false,
      `<figure><img src="${preview}" data-pending="${id}" alt="" /></figure><p></p>`
    );
    setStatus("Imagen insertada. Se publicará al guardar.");
  }

  function readBodyHtml() {
    const el = bodyRef.current;
    if (!el) return "";
    const clone = el.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("img[data-pending]").forEach((img) => {
      const id = img.getAttribute("data-pending");
      if (id) img.setAttribute("src", id);
      img.removeAttribute("data-pending");
    });
    return normalizeArticleHtml(clone.innerHTML);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    const html = readBodyHtml();
    const payload = {
      title,
      date,
      excerpt,
      featuredImage: featuredImage || null,
      seoTitle,
      seoDescription,
      html,
    };

    try {
      const form = new FormData();
      form.append("payload", JSON.stringify(payload));
      for (const [id, file] of pendingFiles.current.entries()) {
        if (html.includes(id) || featuredImage === id) {
          form.append(id, file, file.name);
        }
      }

      const res = await fetch(
        mode === "create" ? "/api/admin/posts" : `/api/admin/posts/${post.slug}`,
        { method: mode === "create" ? "POST" : "PUT", body: form }
      );
      const data = (await res.json().catch(() => null)) as {
        error?: string;
        committed?: boolean;
        post?: { slug?: string };
      } | null;
      if (!res.ok) {
        setStatus(data?.error || `Error al guardar (${res.status})`);
        return;
      }
      pendingFiles.current.clear();
      setStatus(
        data?.committed
          ? "Publicado (un solo deploy en Vercel)."
          : "Guardado en local."
      );
      if (mode === "create" && data?.post?.slug) {
        router.push(`/admin/posts/${data.post.slug}`);
        router.refresh();
      } else {
        router.refresh();
      }
    } catch (err) {
      setStatus(
        err instanceof Error ? err.message : "Error de red al guardar"
      );
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!post || !confirm("¿Eliminar esta noticia?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/posts/${post.slug}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setStatus("No se pudo eliminar");
        return;
      }
      router.push("/admin/posts");
      router.refresh();
    } finally {
      setLoading(false);
    }
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
        <Field label="Fecha">
          <input
            className={fieldClass}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Field>
        <Field label="Extracto (opcional, para el listado)">
          <input
            className={fieldClass}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Si lo dejas vacío, se genera del texto"
          />
        </Field>
      </div>

      <div className="space-y-2">
        <span className="mb-1 block text-sm text-ub-muted">
          Imagen destacada
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <label className={`cursor-pointer ${toolbarBtn}`}>
            Elegir imagen
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              disabled={loading}
              onChange={onFeaturedFile}
            />
          </label>
          {featuredPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={featuredPreview}
              alt=""
              className="h-16 w-24 border border-ub-line object-cover"
            />
          ) : (
            <span className="text-sm text-ub-muted">Sin imagen</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <span className="block text-sm text-ub-muted">Contenido</span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={toolbarBtn}
            onClick={() => exec("formatBlock", "p")}
          >
            Párrafo
          </button>
          <button
            type="button"
            className={toolbarBtn}
            onClick={() => exec("formatBlock", "h2")}
          >
            Subtítulo
          </button>
          <button
            type="button"
            className={toolbarBtn}
            onClick={() => exec("bold")}
          >
            Negrita
          </button>
          <button
            type="button"
            className={toolbarBtn}
            onClick={() => {
              const url = window.prompt("URL del enlace");
              if (url) exec("createLink", url);
            }}
          >
            Enlace
          </button>
          <button
            type="button"
            className={toolbarBtn}
            onClick={() => exec("insertUnorderedList")}
          >
            Lista
          </button>
          <label className={`cursor-pointer ${toolbarBtn}`}>
            Imagen
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              disabled={loading}
              onChange={onContentFile}
            />
          </label>
        </div>
        <div
          ref={bodyRef}
          contentEditable
          suppressContentEditableWarning
          onPaste={onBodyPaste}
          className={`${fieldClass} prose-news min-h-72 overflow-auto`}
        />
        <p className="text-xs text-ub-muted">
          Pulsa Enter para nuevo párrafo. Al pegar texto se respetan los
          espacios. Las imágenes se publican junto al artículo (un solo deploy).
        </p>
      </div>

      <details className="rounded border border-ub-line p-3">
        <summary className="cursor-pointer text-sm text-ub-muted">
          SEO (opcional)
        </summary>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <Field label="SEO title">
            <input
              className={fieldClass}
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
            />
          </Field>
          <Field label="SEO description">
            <input
              className={fieldClass}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
            />
          </Field>
        </div>
      </details>

      {status ? <p className="text-sm text-ub-blue">{status}</p> : null}
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-ub-navy px-4 py-2.5 text-sm font-medium text-white hover:bg-ub-blue-deep disabled:opacity-60"
        >
          {loading ? "Publicando…" : "Publicar"}
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
