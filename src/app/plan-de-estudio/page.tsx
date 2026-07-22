import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { Section, SectionHeading } from "@/components/Section";
import { modules } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan de estudio",
  description:
    "Plan de estudios del Máster Fintech UB 2026-27: Open Banking, mercados, blockchain, IA, emprendimiento y estructura financiera.",
  alternates: { canonical: `${siteConfig.url}/plan-de-estudio` },
};

export default function PlanPage() {
  const first = modules.filter((m) => m.semester === 1);
  const second = modules.filter((m) => m.semester === 2);

  return (
    <>
      <section className="grain px-4 py-20 text-white md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[0.24em] text-white/60 uppercase">
            Programa académico
          </p>
          <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-display)] text-4xl md:text-6xl">
            Plan de estudio
          </h1>
          <p className="mt-5 max-w-3xl text-white/75 md:text-lg">
            Un planteamiento único en España que integra mercados financieros con
            tecnologías Fintech. Formato presencial con flexibilidad
            semipresencial y online (Global Mobility).
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.planDocente} external>
              Descargar plan docente {siteConfig.edition}
            </ButtonLink>
            <ButtonLink href="/inscripciones-y-becas" variant="ghost">
              Preinscripción
            </ButtonLink>
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeading eyebrow="1.er semestre" title="Módulos del primer semestre" />
        <div className="grid gap-6 lg:grid-cols-3">
          {first.map((m, i) => (
            <FadeIn key={m.code} delay={i * 0.05}>
              <ModuleCard module={m} />
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="mesh">
        <SectionHeading eyebrow="2.º semestre" title="Módulos del segundo semestre" />
        <div className="grid gap-6 lg:grid-cols-2">
          {second.map((m, i) => (
            <FadeIn key={m.code} delay={i * 0.04}>
              <ModuleCard module={m} />
            </FadeIn>
          ))}
        </div>
        <div className="mt-10 border border-ub-line bg-white p-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-ub-navy">
            Sinergia con el Máster de IA
          </h3>
          <p className="mt-3 max-w-3xl text-ub-muted">
            Los módulos marcados como «Común IA» se convalidan con el{" "}
            <a
              className="font-medium text-ub-blue underline"
              href={siteConfig.masterIaUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Máster de Inteligencia Artificial aplicada a los Mercados
              Financieros
            </a>{" "}
            (ub.edu/ai). Si cursas ambos, completas dos títulos en menos tiempo
            y con menor coste.
          </p>
          <div className="mt-5">
            <ButtonLink href={siteConfig.masterIaUrl} variant="secondary" external>
              Ir a ub.edu/ai
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

function ModuleCard({ module: m }: { module: (typeof modules)[number] }) {
  return (
    <article className="h-full border border-ub-line bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold tracking-[0.18em] text-ub-blue uppercase">
          Módulo {m.code} · {m.ects} ECTS
        </p>
        {m.shared ? (
          <span className="bg-ub-paper px-2 py-1 text-[10px] font-semibold tracking-wide text-ub-navy uppercase">
            Común IA
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-ub-navy">
        {m.title}
      </h3>
      <p className="mt-2 text-sm text-ub-muted">
        Coordinación: {m.coordinator}
        {"partner" in m && m.partner ? ` · ${m.partner}` : ""}
      </p>
      <ul className="mt-4 space-y-2 text-sm text-ub-ink">
        {m.topics.map((t) => (
          <li key={t} className="border-l border-ub-line pl-3">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}
