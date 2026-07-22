import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Section, SectionHeading } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con la dirección del Máster Fintech de la Universitat de Barcelona. Teléfono, email y formulario.",
  alternates: { canonical: `${siteConfig.url}/contacto` },
};

export default function ContactoPage() {
  return (
    <>
      <section className="grain px-4 py-20 text-white md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[0.24em] text-white/60 uppercase">Hablemos</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl md:text-6xl">
            Contacto
          </h1>
          <p className="mt-5 max-w-2xl text-white/75 md:text-lg">
            ¿Tienes dudas? Escríbenos y te ayudamos con admisión, becas o el programa.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Dirección"
              title="Estamos para ayudarte"
              description="Respuesta directa de la coordinación del máster."
            />
            <ul className="space-y-4 text-ub-ink">
              <li>
                <p className="text-xs tracking-wide text-ub-muted uppercase">
                  Teléfono / WhatsApp
                </p>
                <a className="text-lg text-ub-blue" href={`tel:${siteConfig.phone}`}>
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <p className="text-xs tracking-wide text-ub-muted uppercase">Email</p>
                <a className="text-lg text-ub-blue" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <p className="text-xs tracking-wide text-ub-muted uppercase">Ubicación</p>
                <p>{siteConfig.address}</p>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
