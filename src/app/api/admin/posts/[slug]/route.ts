import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  plainTextFromHtml,
  readPostsFile,
  writePostsFile,
} from "@/lib/admin-store";
import type { Post } from "@/lib/posts";

type Ctx = { params: Promise<{ slug: string }> };

export async function PUT(request: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await ctx.params;
  const body = (await request.json()) as Partial<Post>;
  const posts = await readPostsFile();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx < 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const current = posts[idx];
  const html = body.html ?? current.html;
  const text = plainTextFromHtml(html);
  const updated: Post = {
    ...current,
    title: body.title?.trim() || current.title,
    date: body.date || current.date,
    excerpt: (body.excerpt || text).slice(0, 220),
    categories: body.categories?.length ? body.categories : current.categories,
    featuredImage:
      body.featuredImage === undefined
        ? current.featuredImage
        : body.featuredImage,
    seoTitle: body.seoTitle ?? current.seoTitle,
    seoDescription: body.seoDescription ?? current.seoDescription,
    html,
    text,
  };

  posts[idx] = updated;
  const result = await writePostsFile(posts, `Admin: actualizar ${slug}`);
  return NextResponse.json({ post: updated, ...result });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await ctx.params;
  const posts = await readPostsFile();
  const next = posts.filter((p) => p.slug !== slug);
  if (next.length === posts.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const result = await writePostsFile(next, `Admin: eliminar ${slug}`);
  return NextResponse.json({ ok: true, ...result });
}
