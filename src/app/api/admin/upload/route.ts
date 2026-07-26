import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  isAllowedUploadMime,
  MAX_UPLOAD_BYTES,
  saveUploadedImage,
} from "@/lib/admin-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "No se pudo leer el archivo" },
      { status: 400 }
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Falta el archivo (campo file)" },
      { status: 400 }
    );
  }

  if (!isAllowedUploadMime(file.type)) {
    return NextResponse.json(
      { error: "Solo se permiten JPG, PNG, WebP o GIF" },
      { status: 400 }
    );
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: "La imagen supera el límite de 5 MB" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  try {
    const result = await saveUploadedImage({
      buffer,
      mime: file.type,
      originalName: file.name || "imagen",
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al subir" },
      { status: 500 }
    );
  }
}
