import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { Section, SectionHeading } from "@/components/Section";
import { partnerLogos } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prácticas y Empresas",
  description:
    "Prácticas opcionales, partners y empresas colaboradoras del Máster Fintech de la Universitat de Barcelona.",
  alternates: { canonical: `${siteConfig.url}/practicas-y-empresas` },
};

export default function EmpresasPage() {
  return (
    <>
      <section className="grain px-4 py-20 text-white md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[0.24em] text-white/60 uppercase">
            Carrera profesional
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl md:text-6xl">
            Prácticas y Empresas
          </h1>
          <p className="mt-5 max-w-3xl text-white/75 md:text-lg">
            Conoce cómo trabaja una start-up o una gran compañía por dentro. Únete a
            equipos competentes y haz despegar tu carrera.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Prácticas"
          title="Prácticas no curriculares y TFM"
          description="Las prácticas son opcionales. La dirección facilita contactos y ofertas exclusivas. Quienes no puedan realizarlas elaboran un Trabajo de Fin de Máster."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Profesores del sector",
              d: "CEOs y CFOs comparten experiencia real y abren puertas al mercado.",
            },
            {
              t: "Ecosistema Barcelona",
              d: "Acceso a eventos, hubs y empresas del sur de Europa.",
            },
            {
              t: "App de empleo",
              d: "Ofertas laborales y networking en la comunidad Alumni Fintech e IA.",
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

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Partners"
          title="Más de 20 empresas y start-ups colaboradoras"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {partnerLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-24 items-center justify-center border border-ub-line bg-ub-paper px-4"
            >
              <div className="relative h-12 w-full">
                <Image
                  src={logo.src}
                  alt={`Logo ${logo.name}`}
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={siteConfig.alumniUrl} external>
            Acceder al Club Alumni
          </ButtonLink>
          <ButtonLink href="/contacto" variant="secondary">
            Soy empresa, quiero colaborar
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
