import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Section, SectionHeading } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Investigación y Emprendimiento",
  description:
    "TFM, investigación aplicada y creación de empresas en el Máster Fintech de la Universitat de Barcelona.",
  alternates: {
    canonical: `${siteConfig.url}/investigacion-y-emprendimiento`,
  },
};

export default function InvestigacionPage() {
  return (
    <>
      <section className="grain px-4 py-20 text-white md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[0.24em] text-white/60 uppercase">
            Innovación
          </p>
          <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-display)] text-4xl md:text-6xl">
            Investigación y Emprendimiento
          </h1>
          <p className="mt-5 max-w-3xl text-white/75 md:text-lg">
            Del Trabajo de Fin de Máster a la creación de start-ups: investiga,
            valida y lanza ideas con el respaldo del ecosistema UB y Barcelona.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="TFM"
          title="Investigación aplicada a retos reales"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Orientación académica",
              d: "Metodología rigurosa y conexión con profesores del claustro.",
            },
            {
              t: "Orientación profesional",
              d: "Casos ligados a empresas, regulación y productos digitales.",
            },
            {
              t: "Orientación emprendedora",
              d: "Validación de producto, estructura financiera y go-to-market.",
            },
          ].map((x) => (
            <article key={x.t} className="border border-ub-line bg-white p-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl text-ub-navy">
                {x.t}
              </h2>
              <p className="mt-3 text-sm text-ub-muted">{x.d}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-ub-navy text-white">
        <SectionHeading
          light
          eyebrow="Creación de empresas"
          title="Del aula a la start-up"
          description="Módulos de emprendimiento digital y estructura financiera, acuerdos con Founder Institute y acceso a la comunidad Alumni."
        />
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={siteConfig.alumniUrl} variant="light" external>
            Comunidad Alumni
          </ButtonLink>
          <ButtonLink href="/plan-de-estudio" variant="ghost">
            Ver módulos de emprendimiento
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
