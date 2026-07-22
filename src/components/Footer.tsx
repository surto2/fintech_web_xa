import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-ub-line bg-ub-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <p className="text-xs tracking-[0.2em] text-white/55 uppercase">
            {siteConfig.university}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-tight">
            Máster Fintech
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            El Máster de Fintech, Blockchain y Mercados Financieros te forma para
            liderar la transformación tecnológica de la industria financiera.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white/90">
            Contacto
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <a className="hover:text-white" href={`tel:${siteConfig.phone}`}>
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.address}</li>
            <li>
              <Link className="hover:text-white" href="/contacto">
                Formulario de contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white/90">
            Enlaces
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <Link className="hover:text-white" href="/inscripciones-y-becas">
                Inscripciones y Becas
              </Link>
            </li>
            <li>
              <a
                className="hover:text-white"
                href={siteConfig.alumniUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Club Alumni
              </a>
            </li>
            <li>
              <a
                className="hover:text-white"
                href={siteConfig.masterIaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Máster IA (ub.edu/ai)
              </a>
            </li>
            <li>
              <Link className="hover:text-white" href="/plan-de-estudio">
                Plan de estudio
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/aviso-legal">
                Aviso legal
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/politica-de-privacidad">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/politica-de-cookies">
                Política de cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/45 md:px-6">
          © {new Date().getFullYear()} {siteConfig.university} ·{" "}
          {siteConfig.shortName}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
