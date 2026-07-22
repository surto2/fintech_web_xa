import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const title = post.seoTitle || post.title;
  const description =
    post.seoDescription || post.excerpt || post.text.slice(0, 155);
  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/noticias-master/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <header className="grain px-4 py-16 text-white md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/noticias-master"
            className="text-sm text-white/65 transition hover:text-white"
          >
            ← Noticias del Máster
          </Link>
          <p className="mt-6 text-xs tracking-wide text-white/60 uppercase">
            {post.date}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight md:text-5xl">
            {post.title}
          </h1>
        </div>
      </header>

      {post.featuredImage ? (
        <div className="relative mx-auto mt-[-2rem] aspect-[16/9] max-w-5xl overflow-hidden px-4 md:px-6">
          <div className="relative h-full min-h-56 w-full overflow-hidden border border-ub-line bg-ub-paper shadow-lg">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <div
          className="prose-news"
          dangerouslySetInnerHTML={{
            __html: (post.html || `<p>${post.text}</p>`)
              .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
              .replace(/on\w+="[^"]*"/gi, ""),
          }}
        />
      </div>
    </article>
  );
}
