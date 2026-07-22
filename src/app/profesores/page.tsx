import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/Section";
import { professors } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Profesores",
  description:
    "Claustro del Máster Fintech UB: directivos, emprendedores y profesionales de CNMV, Bizum, TECH Barcelona, GVC Gaesco y el ecosistema Fintech.",
  alternates: { canonical: `${siteConfig.url}/profesores` },
};

export default function ProfesoresPage() {
  return (
    <>
      <section className="grain px-4 py-20 text-white md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[0.24em] text-white/60 uppercase">Claustro</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl md:text-6xl">
            Profesores
          </h1>
          <p className="mt-5 max-w-3xl text-white/75 md:text-lg">
            Aprende de CEOs, CFOs, reguladores y emprendedores que trabajan cada día
            en la transformación financiera.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Dirección"
          title="Un equipo conectado con el mercado"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {professors.map((p, i) => (
            <FadeIn key={p.name} delay={(i % 6) * 0.03}>
              <article className="h-full border border-ub-line bg-white p-5">
                <h2 className="font-[family-name:var(--font-display)] text-xl text-ub-navy">
                  {p.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-ub-blue">{p.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ub-muted">{p.bio}</p>
              </article>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/contacto" variant="secondary">
            Contactar con la dirección
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
