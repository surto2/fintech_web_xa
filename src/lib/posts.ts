import postsData from "../../content/posts.json";

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

const posts = (postsData as Post[]).sort((a, b) =>
  a.date < b.date ? 1 : -1
);

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getLatestPosts(n = 6) {
  return posts.slice(0, n);
}
