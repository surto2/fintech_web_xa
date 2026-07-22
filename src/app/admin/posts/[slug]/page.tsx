import { notFound, redirect } from "next/navigation";
import { PostEditor } from "@/components/admin/PostEditor";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readPostsFile } from "@/lib/admin-store";

type Props = { params: Promise<{ slug: string }> };

export default async function EditPostPage({ params }: Props) {
  if (!(await isAdminAuthenticated())) redirect("/admin");
  const { slug } = await params;
  const posts = await readPostsFile();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-ub-navy">
        Editar noticia
      </h1>
      <PostEditor mode="edit" post={post} />
    </div>
  );
}
