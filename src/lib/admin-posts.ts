import {
  isAllowedUploadMime,
  MAX_UPLOAD_BYTES,
  normalizeArticleHtml,
  plainTextFromHtml,
  prepareUploadFile,
  postsFilePath,
  readPostsFile,
  slugify,
  writeRepoFiles,
  type WriteResult,
} from "@/lib/admin-store";
import type { Post } from "@/lib/posts";

export type PostPayload = {
  title: string;
  slug?: string;
  date?: string;
  excerpt?: string;
  featuredImage?: string | null;
  seoTitle?: string;
  seoDescription?: string;
  html: string;
  categories?: Post["categories"];
};

async function materializePendingImages(
  html: string,
  featuredImage: string | null | undefined,
  form: FormData
) {
  const files: { absolutePath: string; content: Buffer }[] = [];
  let nextHtml = html;
  let nextFeatured = featuredImage || null;

  for (const [key, value] of form.entries()) {
    if (!key.startsWith("pending:") || !(value instanceof File)) continue;
    if (!isAllowedUploadMime(value.type)) {
      throw new Error(`Tipo no permitido: ${value.name}`);
    }
    if (value.size > MAX_UPLOAD_BYTES) {
      throw new Error(`Imagen demasiado grande: ${value.name}`);
    }
    const buffer = Buffer.from(await value.arrayBuffer());
    const planned = await prepareUploadFile({
      buffer,
      mime: value.type,
      originalName: value.name || "imagen",
    });
    files.push({
      absolutePath: planned.absolutePath,
      content: planned.buffer,
    });
    nextHtml = nextHtml.split(key).join(planned.publicUrl);
    if (nextFeatured === key) nextFeatured = planned.publicUrl;
  }

  return { html: nextHtml, featuredImage: nextFeatured, files };
}

export async function parsePostRequest(request: Request): Promise<{
  payload: PostPayload;
  form: FormData | null;
}> {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const raw = form.get("payload");
    if (typeof raw !== "string") {
      throw new Error("Falta el campo payload");
    }
    return { payload: JSON.parse(raw) as PostPayload, form };
  }
  const payload = (await request.json()) as PostPayload;
  return { payload, form: null };
}

export async function createPostFromRequest(
  request: Request
): Promise<{ post: Post; result: WriteResult }> {
  const { payload, form } = await parsePostRequest(request);
  if (!payload.title?.trim() || !payload.html?.trim()) {
    throw new Error("Título y contenido son obligatorios");
  }

  let html = normalizeArticleHtml(payload.html);
  let featuredImage = payload.featuredImage || null;
  const extraFiles: { absolutePath: string; content: Buffer }[] = [];

  if (form) {
    const materialized = await materializePendingImages(
      html,
      featuredImage,
      form
    );
    html = normalizeArticleHtml(materialized.html);
    featuredImage = materialized.featuredImage;
    extraFiles.push(...materialized.files);
  }

  const posts = await readPostsFile();
  const baseSlug = slugify(payload.slug || payload.title);
  let slug = baseSlug || `noticia-${Date.now()}`;
  let i = 2;
  while (posts.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${i++}`;
  }

  const text = plainTextFromHtml(html);
  const post: Post = {
    title: payload.title.trim(),
    slug,
    date: payload.date || new Date().toISOString().slice(0, 10),
    excerpt: (payload.excerpt || text).slice(0, 220),
    categories: payload.categories?.length
      ? payload.categories
      : [{ slug: "noticias", name: "Noticias" }],
    featuredImage,
    seoTitle: payload.seoTitle || "",
    seoDescription: payload.seoDescription || "",
    html,
    text,
  };

  posts.unshift(post);
  const postsContent = `${JSON.stringify(posts, null, 2)}\n`;
  const result = await writeRepoFiles(
    [
      ...extraFiles,
      { absolutePath: postsFilePath(), content: postsContent },
    ],
    `Admin: nueva noticia ${slug}`
  );
  return { post, result };
}

export async function updatePostFromRequest(
  slug: string,
  request: Request
): Promise<{ post: Post; result: WriteResult }> {
  const { payload, form } = await parsePostRequest(request);
  const posts = await readPostsFile();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx < 0) throw new Error("Not found");

  const current = posts[idx];
  let html = normalizeArticleHtml(payload.html ?? current.html);
  let featuredImage =
    payload.featuredImage === undefined
      ? current.featuredImage
      : payload.featuredImage;
  const extraFiles: { absolutePath: string; content: Buffer }[] = [];

  if (form) {
    const materialized = await materializePendingImages(
      html,
      featuredImage,
      form
    );
    html = normalizeArticleHtml(materialized.html);
    featuredImage = materialized.featuredImage;
    extraFiles.push(...materialized.files);
  }

  const text = plainTextFromHtml(html);
  const updated: Post = {
    ...current,
    title: payload.title?.trim() || current.title,
    date: payload.date || current.date,
    excerpt: (payload.excerpt || text).slice(0, 220),
    categories: payload.categories?.length
      ? payload.categories
      : current.categories,
    featuredImage,
    seoTitle: payload.seoTitle ?? current.seoTitle,
    seoDescription: payload.seoDescription ?? current.seoDescription,
    html,
    text,
  };

  posts[idx] = updated;
  const postsContent = `${JSON.stringify(posts, null, 2)}\n`;
  const result = await writeRepoFiles(
    [
      ...extraFiles,
      { absolutePath: postsFilePath(), content: postsContent },
    ],
    `Admin: actualizar ${slug}`
  );
  return { post: updated, result };
}
