import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { Section, SectionHeading } from "@/components/Section";
import { scholarships } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Inscripciones y Becas",
  description:
    "Admisión, matrícula, precio, preinscripción y becas del Máster Fintech UB 2026-27. Plazas limitadas.",
  alternates: { canonical: `${siteConfig.url}/inscripciones-y-becas` },
};

export default function InscripcionesPage() {
  return (
    <>
      <section className="grain px-4 py-20 text-white md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[0.24em] text-white/60 uppercase">
            Edición {siteConfig.edition}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl md:text-6xl">
            Inscripciones y Becas
          </h1>
          <p className="mt-5 max-w-3xl text-white/75 md:text-lg">
            Plazas limitadas ({siteConfig.seats}). Quedan {siteConfig.seatsLeft} plazas
            libres. Coste del programa: {siteConfig.price}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contacto">Solicitud de admisión</ButtonLink>
            <ButtonLink href={siteConfig.planDocente} variant="ghost" external>
              Plan docente PDF
            </ButtonLink>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Datos clave" title="Admisión y matrícula" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Precio", siteConfig.price],
            ["Créditos", `${siteConfig.ects} ECTS`],
            ["Preinscripción", siteConfig.deposit],
            ["Horario", siteConfig.schedule],
            ["Periodo de preinscripción", siteConfig.preinscription],
            ["Periodo lectivo", siteConfig.academicPeriod],
          ].map(([k, v]) => (
            <div key={k} className="border border-ub-line bg-white p-5">
              <p className="text-xs tracking-wide text-ub-muted uppercase">{k}</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-xl text-ub-navy">
                {v}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Proceso"
          title="Cómo presentar tu candidatura"
        />
        <ol className="space-y-4">
          {[
            `Envía tu CV (+ cover letter o vídeo) a ${siteConfig.email} con asunto “Candidatura Máster Fintech ${siteConfig.edition} (Nombre)”.`,
            "Adjunta la solicitud de admisión y, si lo deseas, pide entrevista por email o WhatsApp.",
            `Tras la aceptación, formaliza la preinscripción (${siteConfig.deposit}) con el enlace que te facilitaremos y reserva tu plaza.`,
          ].map((step, i) => (
            <li key={step} className="flex gap-4 border border-ub-line bg-ub-paper p-5">
              <span className="font-[family-name:var(--font-display)] text-2xl text-ub-blue">
                {i + 1}
              </span>
              <p className="text-ub-ink">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="mesh">
        <SectionHeading
          eyebrow="Becas"
          title="Ayudas al estudio"
          description="Dos becas activas para la edición 2026-27. Se solicitan con el mismo formulario de admisión: no hace falta un trámite aparte."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          {scholarships.map((s) => (
            <article
              key={s.name}
              className="overflow-hidden border border-ub-line bg-white"
            >
              <div className="relative aspect-[4/3] bg-ub-navy">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {"logo" in s && s.logo ? (
                  <div className="absolute bottom-4 left-4 rounded bg-white/95 px-3 py-2">
                    <div className="relative h-8 w-28">
                      <Image
                        src={s.logo}
                        alt={s.sponsor}
                        fill
                        className="object-contain"
                        sizes="112px"
                      />
                    </div>
                  </div>
                ) : null}
                <div className="absolute top-4 right-4 bg-ub-blue px-3 py-1.5 text-xs font-semibold tracking-wide text-white uppercase">
                  {s.amount} de ayuda
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs tracking-[0.18em] text-ub-blue uppercase">
                  {s.tagline}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-ub-navy">
                  {s.name}
                </h2>
                <p className="mt-1 text-sm text-ub-muted">{s.sponsor}</p>
                <p className="mt-4 text-ub-ink">{s.summary}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href={s.pdf} variant="secondary" external>
                    Bases en PDF
                  </ButtonLink>
                  <ButtonLink href="/contacto" variant="secondary">
                    Solicitar beca
                  </ButtonLink>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/contacto">Consultar becas</ButtonLink>
        </div>
      </Section>
    </>
  );
}
