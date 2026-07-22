import { readFileSync } from "fs";
import path from "path";

export type Post = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  categories: { slug: string; name: string }[];
  featuredImage: string | null;
  seoTitle: string;
  seoDescription: string;
  html: string;
  text: string;
};

function loadPosts(): Post[] {
  const raw = readFileSync(
    path.join(process.cwd(), "content", "posts.json"),
    "utf8"
  );
  return (JSON.parse(raw) as Post[]).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPosts() {
  return loadPosts();
}

export function getPostBySlug(slug: string) {
  return loadPosts().find((p) => p.slug === slug);
}

export function getLatestPosts(n = 6) {
  return loadPosts().slice(0, n);
}
