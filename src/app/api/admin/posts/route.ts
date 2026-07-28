import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createPostFromRequest } from "@/lib/admin-posts";
import { readPostsFile } from "@/lib/admin-store";

export const runtime = "nodejs";
export const maxDuration = 60;

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

  try {
    const { post, result } = await createPostFromRequest(request);
    if (!result.committed && !result.local) {
      return NextResponse.json(
        { error: result.error || "No se pudo guardar" },
        { status: 500 }
      );
    }
    return NextResponse.json({ post, ...result });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error al crear la noticia";
    const status =
      message.includes("obligatorios") || message.includes("payload")
        ? 400
        : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
