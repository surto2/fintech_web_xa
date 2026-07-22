import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Noticias Máster",
  description:
    "Noticias, novedades y actualidad del Máster Fintech, Blockchain y Mercados Financieros de la UB.",
  alternates: { canonical: `${siteConfig.url}/noticias-master` },
};

export default function NoticiasPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="grain px-4 py-20 text-white md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[0.24em] text-white/60 uppercase">Actualidad</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl md:text-6xl">
            Noticias del Máster
          </h1>
          <p className="mt-5 max-w-3xl text-white/75 md:text-lg">
            Acuerdos, eventos, incorporaciones y reflexiones del ecosistema Fintech e IA.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow={`${posts.length} artículos`}
          title="Conoce nuestras novedades"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/noticias-master/${post.slug}`}
              className="group overflow-hidden border border-ub-line bg-white transition hover:border-ub-blue/40"
            >
              <div className="relative aspect-[16/10] bg-ub-paper">
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : null}
              </div>
              <div className="p-5">
                <p className="text-xs tracking-wide text-ub-muted uppercase">
                  {post.date}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-lg leading-snug text-ub-navy group-hover:text-ub-blue">
                  {post.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
