import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import Link from "next/link";

export default async function AdminHomePage() {
  const ok = await isAdminAuthenticated();

  if (!ok) {
    return (
      <div className="mx-auto max-w-md rounded border border-ub-line bg-white p-8 shadow-sm">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-ub-navy">
          Acceso admin
        </h1>
        <p className="mt-2 text-sm text-ub-muted">
          Escribe artículos, edita noticias y actualiza plazas o precio sin tocar
          código.
        </p>
        <div className="mt-6">
          <AdminLoginForm />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-ub-navy">
          Panel de gestión
        </h1>
        <p className="mt-2 text-ub-muted">
          Escribe noticias con formato (párrafos, negrita, imágenes) y actualiza
          plazas o precio. Al publicar se hace un solo deploy.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/posts"
          className="rounded border border-ub-line bg-white p-6 transition hover:border-ub-blue"
        >
          <h2 className="font-[family-name:var(--font-display)] text-xl text-ub-navy">
            Noticias
          </h2>
          <p className="mt-2 text-sm text-ub-muted">
            Crear, editar o eliminar artículos del blog.
          </p>
        </Link>
        <Link
          href="/admin/settings"
          className="rounded border border-ub-line bg-white p-6 transition hover:border-ub-blue"
        >
          <h2 className="font-[family-name:var(--font-display)] text-xl text-ub-navy">
            Datos de la web
          </h2>
          <p className="mt-2 text-sm text-ub-muted">
            Plazas libres, precio, fechas, email y teléfono.
          </p>
        </Link>
      </div>
    </div>
  );
}
