import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  plainTextFromHtml,
  readPostsFile,
  slugify,
  writePostsFile,
} from "@/lib/admin-store";
import type { Post } from "@/lib/posts";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = await readPostsFile();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<Post> & {
    title: string;
    html: string;
  };

  if (!body.title?.trim() || !body.html?.trim()) {
    return NextResponse.json(
      { error: "Título y contenido son obligatorios" },
      { status: 400 }
    );
  }

  const posts = await readPostsFile();
  const baseSlug = slugify(body.slug || body.title);
  let slug = baseSlug || `noticia-${Date.now()}`;
  let i = 2;
  while (posts.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${i++}`;
  }

  const text = plainTextFromHtml(body.html);
  const post: Post = {
    title: body.title.trim(),
    slug,
    date: body.date || new Date().toISOString().slice(0, 10),
    excerpt: (body.excerpt || text).slice(0, 220),
    categories: body.categories?.length
      ? body.categories
      : [{ slug: "noticias", name: "Noticias" }],
    featuredImage: body.featuredImage || null,
    seoTitle: body.seoTitle || "",
    seoDescription: body.seoDescription || "",
    html: body.html,
    text,
  };

  posts.unshift(post);
  const result = await writePostsFile(posts, `Admin: nueva noticia ${slug}`);
  if (!result.committed && !result.local) {
    return NextResponse.json(
      { error: result.error || "No se pudo guardar" },
      { status: 500 }
    );
  }
  return NextResponse.json({ post, ...result });
}
