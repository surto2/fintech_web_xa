import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readSettingsFile, writeSettingsFile } from "@/lib/admin-store";
import type { SiteSettings } from "@/lib/site";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await readSettingsFile());
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as SiteSettings;
  const seatsLeft = Number(body.seatsLeft);
  const seats = Number(body.seats);
  if (Number.isNaN(seatsLeft) || Number.isNaN(seats)) {
    return NextResponse.json({ error: "Plazas inválidas" }, { status: 400 });
  }

  const settings: SiteSettings = {
    ...body,
    seatsLeft,
    seats,
  };

  const result = await writeSettingsFile(
    settings,
    "Admin: actualizar datos del sitio"
  );
  if (!result.committed && !result.local) {
    return NextResponse.json(
      { error: result.error || "No se pudo guardar" },
      { status: 500 }
    );
  }
  return NextResponse.json({ settings, ...result });
}
