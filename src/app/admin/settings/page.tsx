import { redirect } from "next/navigation";
import { SettingsEditor } from "@/components/admin/SettingsEditor";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readSettingsFile } from "@/lib/admin-store";

export default async function AdminSettingsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");
  const settings = await readSettingsFile();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-ub-navy">
          Datos de la web
        </h1>
        <p className="mt-2 text-sm text-ub-muted">
          Plazas, precio, fechas de admisión y contacto. Cambia aquí lo que suele
          actualizarse cada edición.
        </p>
      </div>
      <SettingsEditor settings={settings} />
    </div>
  );
}
