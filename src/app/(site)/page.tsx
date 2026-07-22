import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, GraduationCap, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { ProgramComparison } from "@/components/ProgramComparison";
import { Section, SectionHeading } from "@/components/Section";
import {
  audience,
  benefits,
  certifications,
  methodology,
  partnerLogos,
  whyUb,
} from "@/lib/content";
import { getLatestPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const posts = getLatestPosts(6);

  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden text-white">
        <Image
          src="/uploads/2026/06/Foto-definitiva-chico-mirando-maquina-de-hacer-dinero.jpg"
          alt="Máster Fintech Universitat de Barcelona"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ub-navy/95 via-ub-navy/78 to-ub-navy/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ub-navy via-transparent to-ub-navy/40" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-20">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.28em] text-[#9cc7ef] uppercase">
              Universitat de Barcelona · Edición {siteConfig.edition}
            </p>
            <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
              Máster de Fintech, Blockchain y Mercados Financieros
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              Te convertirá en experto en la industria financiera que aplica nuevas
              tecnologías a actividades financieras y de inversión. Formación
              aplicada en Barcelona, con profesores del sector.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/inscripciones-y-becas">
                Preinscripción {siteConfig.edition}
              </ButtonLink>
              <ButtonLink href={siteConfig.planDocente} variant="ghost" external>
                Plan docente PDF
              </ButtonLink>
              <ButtonLink href="/contacto" variant="light">
                Solicitud de admisión
              </ButtonLink>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/10 px-3 py-2 text-sm backdrop-blur">
              <span className="size-2 rounded-full bg-emerald-400" />
              Abiertas plazas {siteConfig.edition}. Quedan{" "}
              {siteConfig.seatsLeft} plazas libres.
            </p>
          </FadeIn>
        </div>
      </section>

      <Section className="mesh !py-10 md:!py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              label: `${siteConfig.ects} ECTS · ${siteConfig.price}`,
            },
            { icon: CalendarDays, label: siteConfig.schedule },
            { icon: MapPin, label: "Campus Economía y Empresa · UB" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 border border-ub-line bg-white/70 px-4 py-4"
            >
              <item.icon className="size-5 text-ub-blue" />
              <p className="text-sm font-medium text-ub-navy">{item.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Para quién"
          title="Titulación dirigida a"
          description="Una formación pensada tanto para quien llega al sector como para quien ya trabaja y necesita actualizarse."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {audience.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05}>
              <article className="h-full border-l-2 border-ub-blue bg-white px-6 py-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl text-ub-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-ub-muted">{item.text}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-ub-navy text-white">
        <SectionHeading
          light
          eyebrow="Metodología"
          title="Global Mobility 360º"
          description="Aprende en el aula, en plataformas digitales y en el ecosistema real de Barcelona."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {methodology.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <article className="h-full border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-xs tracking-[0.2em] text-[#7eb6ea] uppercase">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {item.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/plan-de-estudio" variant="light">
            Ver plan de estudio <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </Section>

      <Section className="mesh">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Barcelona · UB"
              title="¿Por qué en la Universitat de Barcelona?"
              description="Ciudad de acogida, con un ecosistema vivo, multicultural y con gran calidad de vida. La UB lidera los rankings españoles y te conecta con el hub Fintech del sur de Europa."
            />
            <ButtonLink
              href="/noticias-master/de-barcelona-al-mundo"
              variant="secondary"
            >
              Palabras de Alejandro Scasserra
            </ButtonLink>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {whyUb.map((item) => (
              <div
                key={item.label}
                className="border border-ub-line bg-white p-5"
              >
                <p className="font-[family-name:var(--font-display)] text-3xl text-ub-blue md:text-4xl">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-ub-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto mt-10 aspect-[3/2] w-full max-w-2xl overflow-hidden border border-ub-line">
          <Image
            src="/uploads/2026/07/barcelona-sagrada-mar.png"
            alt="Barcelona con la Sagrada Família, el mar Mediterráneo y la ciudad al atardecer"
            fill
            className="object-cover object-center"
            sizes="(max-width: 672px) 100vw, 672px"
          />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Certificaciones"
          title="Obtén titulaciones extra al realizar el Máster"
          description="Además del título UB, el programa incluye los cursos de preparación para certificaciones con reconocimiento europeo e internacional. El coste de los exámenes certificativos no está incluido en la matrícula."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {certifications.map((item) => (
            <article
              key={item.title}
              className="border border-ub-line bg-white p-6"
            >
              <h3 className="font-[family-name:var(--font-display)] text-xl text-ub-navy">
                {item.title}
              </h3>
              <p className="mt-2 text-xs font-semibold tracking-wide text-ub-blue uppercase">
                {item.issuer}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ub-muted">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Ecosistema"
          title="Colaboran más de 20 empresas y start-ups"
          description="Tus profesores serán CEOs y CFOs del sector. Conoce cómo trabaja una start-up por dentro y acelera tu carrera."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {partnerLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-24 items-center justify-center border border-ub-line bg-ub-paper px-4 py-3"
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
        <div className="mt-8">
          <ButtonLink href="/practicas-y-empresas" variant="secondary">
            Prácticas y empresas
          </ButtonLink>
        </div>
      </Section>

      <Section className="bg-ub-navy text-white">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              light
              eyebrow="Sinergias"
              title="Fintech + Máster de IA aplicada a los Mercados Financieros"
              description="Dos programas hermanos de la UB. Puedes cursarlos de forma consecutiva y convalidar 4 módulos comunes: ahorras tiempo, matrícula y ganas un perfil híbrido muy demandado."
            />
            <ul className="mb-8 space-y-2 text-sm text-white/75">
              <li>· Grupos interdisciplinares con alumnos de ambos másteres</li>
              <li>· Misma comunidad Alumni y red de empresas</li>
              <li>· Opción de ampliar con el Postgrado de Data Scientist</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={siteConfig.masterIaUrl} variant="light" external>
                Visitar ub.edu/ai
              </ButtonLink>
              <ButtonLink href="/plan-de-estudio" variant="ghost">
                Ver módulos comunes
              </ButtonLink>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 border border-white/15 bg-white/5 p-8">
            <div className="relative h-16 w-48">
              <Image
                src="/uploads/2025/07/logo-master-IA-1.png"
                alt="Logo Máster IA UB"
                fill
                className="object-contain"
                sizes="192px"
              />
            </div>
            <p className="text-center text-sm text-white/70">
              Máster de Inteligencia Artificial aplicada a los Mercados
              Financieros ·{" "}
              <a
                href={siteConfig.masterIaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9cc7ef] underline underline-offset-2"
              >
                https://ub.edu/ai/
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12">
          <ProgramComparison />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Ventajas alumno"
          title="Por ser alumno del Máster, tendrás descuentos exclusivos"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((b) => (
            <article key={b.title} className="bg-ub-navy p-6 text-white">
              <h3 className="font-[family-name:var(--font-display)] text-xl">
                {b.title}
              </h3>
              <p className="mt-3 text-sm text-white/70">{b.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mb-10 flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Actualidad"
            title="Conoce nuestras novedades"
            description="Noticias del máster, del ecosistema Fintech y de Barcelona."
          />
          <Link
            href="/noticias-master"
            className="hidden text-sm font-medium text-ub-blue hover:text-ub-blue-deep md:inline-flex"
          >
            Ver todas
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/noticias-master/${post.slug}`}
              className="group overflow-hidden border border-ub-line bg-ub-paper transition hover:border-ub-blue/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ub-navy/10">
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
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg leading-snug text-ub-navy group-hover:text-ub-blue">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="grain text-white">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.24em] text-white/60 uppercase">
            Admisión {siteConfig.edition}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl">
            Desbloquea tu potencial en Fintech
          </h2>
          <p className="mt-5 text-white/75 md:text-lg">
            Herramientas para idear, reflexionar y debatir desde una vertiente
            internacional. Network exclusivo, soft skills y consultores que te
            ayudan a encarar tu carrera profesional. Matrícula:{" "}
            {siteConfig.price}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/inscripciones-y-becas">
              Inscripciones y becas
            </ButtonLink>
            <ButtonLink href="/contacto" variant="ghost">
              Contactar dirección
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
