import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ok = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-ub-ink">
      <header className="border-b border-ub-line bg-ub-navy text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-white/55 uppercase">
              Panel de gestión
            </p>
            <p className="font-[family-name:var(--font-display)] text-lg">
              Máster Fintech UB
            </p>
          </div>
          {ok ? (
            <nav className="flex flex-wrap items-center gap-3 text-sm">
              <Link className="text-white/80 hover:text-white" href="/admin">
                Inicio
              </Link>
              <Link
                className="text-white/80 hover:text-white"
                href="/admin/posts"
              >
                Noticias
              </Link>
              <Link
                className="text-white/80 hover:text-white"
                href="/admin/settings"
              >
                Datos web
              </Link>
              <Link
                className="text-white/80 hover:text-white"
                href="/"
                target="_blank"
              >
                Ver web
              </Link>
              <form action="/api/admin/logout" method="POST">
                <button className="rounded border border-white/25 px-3 py-1.5 text-white/85 hover:bg-white/10">
                  Salir
                </button>
              </form>
            </nav>
          ) : null}
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  );
}
