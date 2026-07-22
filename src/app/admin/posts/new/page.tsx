import { redirect } from "next/navigation";
import { PostEditor } from "@/components/admin/PostEditor";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function NewPostPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin");
  return (
    <div className="space-y-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-ub-navy">
        Nueva noticia
      </h1>
      <PostEditor mode="create" />
    </div>
  );
}
