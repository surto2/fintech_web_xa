import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { updatePostFromRequest } from "@/lib/admin-posts";
import { readPostsFile, writePostsFile } from "@/lib/admin-store";

export const runtime = "nodejs";
export const maxDuration = 60;

type Ctx = { params: Promise<{ slug: string }> };

export async function PUT(request: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await ctx.params;
  try {
    const { post, result } = await updatePostFromRequest(slug, request);
    if (!result.committed && !result.local) {
      return NextResponse.json(
        { error: result.error || "No se pudo guardar" },
        { status: 500 }
      );
    }
    return NextResponse.json({ post, ...result });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error al actualizar";
    const status = message === "Not found" ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
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
  if (!result.committed && !result.local) {
    return NextResponse.json(
      { error: result.error || "No se pudo eliminar" },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, ...result });
}
