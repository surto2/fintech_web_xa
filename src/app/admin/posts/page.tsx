import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readPostsFile } from "@/lib/admin-store";

export default async function AdminPostsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");
  const posts = await readPostsFile();
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-ub-navy">
            Noticias
          </h1>
          <p className="mt-1 text-sm text-ub-muted">{sorted.length} artículos</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-ub-navy px-4 py-2.5 text-sm font-medium text-white hover:bg-ub-blue-deep"
        >
          Nueva noticia
        </Link>
      </div>

      <div className="overflow-hidden rounded border border-ub-line bg-white">
        <ul className="divide-y divide-ub-line">
          {sorted.map((post) => (
            <li
              key={post.slug}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
            >
              <div>
                <p className="font-medium text-ub-navy">{post.title}</p>
                <p className="text-xs text-ub-muted">
                  {post.date} · /noticias-master/{post.slug}
                </p>
              </div>
              <div className="flex gap-2 text-sm">
                <Link
                  href={`/noticias-master/${post.slug}`}
                  className="text-ub-muted hover:text-ub-blue"
                  target="_blank"
                >
                  Ver
                </Link>
                <Link
                  href={`/admin/posts/${post.slug}`}
                  className="text-ub-blue hover:text-ub-blue-deep"
                >
                  Editar
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
