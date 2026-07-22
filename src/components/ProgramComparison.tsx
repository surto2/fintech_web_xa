import { siteConfig } from "@/lib/site";

type Mark = "yes" | "no";

const rows: {
  label: string;
  fintech: Mark;
  ia: Mark;
  ds: Mark;
  shared?: boolean;
}[] = [
  { label: "Aspectos Jurídicos", fintech: "yes", ia: "no", ds: "no" },
  { label: "Open Banking", fintech: "yes", ia: "no", ds: "no" },
  { label: "Estructura Financiera", fintech: "yes", ia: "no", ds: "no" },
  { label: "Data Science & IA", fintech: "yes", ia: "no", ds: "no" },
  {
    label: "Mercados financieros",
    fintech: "yes",
    ia: "yes",
    ds: "no",
    shared: true,
  },
  { label: "Blockchain", fintech: "yes", ia: "yes", ds: "no", shared: true },
  { label: "Innova", fintech: "yes", ia: "yes", ds: "yes", shared: true },
  {
    label: "Emprendimiento Digital",
    fintech: "yes",
    ia: "yes",
    ds: "yes",
    shared: true,
  },
  { label: "Financial Analytics", fintech: "no", ia: "yes", ds: "yes" },
  {
    label: "Herramientas Computacionales",
    fintech: "no",
    ia: "yes",
    ds: "yes",
  },
  { label: "Inteligencia Artificial", fintech: "no", ia: "yes", ds: "no" },
  { label: "Creativity IA", fintech: "no", ia: "yes", ds: "no" },
];

const certifications = [
  "EFFAS Digital Assets & MiCA 2.0",
  "Chartered Market Technician Level I",
  "Asesor Financiero Nivel I por IEA",
];

const programs = [
  {
    key: "fintech" as const,
    name: "Máster Fintech",
    ects: "60 ECTS",
    price: siteConfig.price,
    tone: "bg-[#d8f3f2]",
  },
  {
    key: "ia" as const,
    name: "Máster IA",
    ects: "60 ECTS",
    price: "7.300 €",
    tone: "bg-[#b7e4e6]",
  },
  {
    key: "ds" as const,
    name: "Postgrado Data Science",
    ects: "30 ECTS",
    price: "3.650 €",
    tone: "bg-[#ddd4f0]",
  },
];

function Cell({ mark, tone }: { mark: Mark; tone: "fintech" | "ia" | "ds" }) {
  const yesColor =
    tone === "ds"
      ? "text-[#8b7bb8]"
      : tone === "ia"
        ? "text-[#2a9aaa]"
        : "text-[#3eb5b0]";
  return mark === "yes" ? (
    <span className={`text-lg font-semibold ${yesColor}`} aria-label="Incluido">
      ✓
    </span>
  ) : (
    <span className="text-ub-muted" aria-label="No incluido">
      ✕
    </span>
  );
}

export function ProgramComparison() {
  return (
    <div className="overflow-hidden rounded-sm border border-white/20 bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,0.55)]">
      <div className="border-b border-ub-line bg-ub-paper px-4 py-3 md:px-6">
        <p className="text-xs font-semibold tracking-[0.18em] text-ub-navy uppercase">
          Comparativa entre cursos
        </p>
        <p className="mt-1 text-sm text-ub-muted">
          Módulos, titulaciones y precios · Edición {siteConfig.edition}
        </p>
      </div>

      {/* Mobile: cards por programa */}
      <div className="space-y-4 p-4 md:hidden">
        {programs.map((program) => (
          <article
            key={program.key}
            className={`border border-ub-line ${program.tone} p-4`}
          >
            <h3 className="font-[family-name:var(--font-display)] text-lg text-ub-navy">
              {program.name}
            </h3>
            <p className="mt-1 text-sm text-ub-muted">
              {program.ects} · {program.price}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-ub-ink">
              {rows
                .filter((row) => row[program.key] === "yes")
                .map((row) => (
                  <li key={row.label} className="flex gap-2">
                    <span className="text-[#3eb5b0]">✓</span>
                    <span>
                      {row.label}
                      {row.shared && program.key !== "ds" ? (
                        <span className="ml-1 text-[10px] tracking-wide text-ub-blue uppercase">
                          común
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
            </ul>
            <p className="mt-3 text-xs text-ub-muted">
              Titulaciones (curso incluido, examen no):{" "}
              {program.key === "ds"
                ? "no incluidas"
                : "Asesor Financiero, MiCA, CMT I"}
            </p>
          </article>
        ))}
      </div>

      {/* Desktop: tabla */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Comparativa de módulos y precios entre el Máster Fintech, el Máster
            de IA y el Postgrado de Data Science de la Universitat de Barcelona
          </caption>
          <thead>
            <tr className="border-b border-ub-line">
              <th
                scope="col"
                className="w-[28%] px-4 py-3 font-medium text-ub-muted md:px-6"
              >
                Módulo
              </th>
              {programs.map((program) => (
                <th
                  key={program.key}
                  scope="col"
                  className={`${program.tone} px-3 py-3 text-center font-semibold text-ub-navy`}
                >
                  {program.name}
                  <span className="mt-0.5 block text-[11px] font-normal text-ub-muted">
                    {program.ects} · {program.price}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className={`border-b border-ub-line ${
                  row.shared ? "bg-[#eef8ff]" : "bg-white"
                }`}
              >
                <th
                  scope="row"
                  className="px-4 py-2.5 font-medium text-ub-ink md:px-6"
                >
                  {row.label}
                  {row.shared ? (
                    <span className="ml-2 text-[10px] tracking-wide text-ub-blue uppercase">
                      común
                    </span>
                  ) : null}
                </th>
                <td className="px-3 py-2.5 text-center">
                  <Cell mark={row.fintech} tone="fintech" />
                </td>
                <td className="px-3 py-2.5 text-center">
                  <Cell mark={row.ia} tone="ia" />
                </td>
                <td className="px-3 py-2.5 text-center">
                  <Cell mark={row.ds} tone="ds" />
                </td>
              </tr>
            ))}
            <tr className="border-t-2 border-ub-navy/20 bg-ub-paper">
              <th
                colSpan={4}
                className="px-4 py-2 text-left text-[11px] font-semibold tracking-[0.16em] text-ub-navy uppercase md:px-6"
              >
                Titulaciones (curso incluido)
              </th>
            </tr>
            {certifications.map((cert) => (
              <tr key={cert} className="border-b border-ub-line">
                <th
                  scope="row"
                  className="px-4 py-2.5 font-medium text-ub-ink md:px-6"
                >
                  {cert}
                </th>
                <td className="px-3 py-2.5 text-center">
                  <Cell mark="yes" tone="fintech" />
                </td>
                <td className="px-3 py-2.5 text-center">
                  <Cell mark="yes" tone="ia" />
                </td>
                <td className="px-3 py-2.5 text-center">
                  <Cell mark="no" tone="ds" />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-ub-navy text-white">
              <th scope="row" className="px-4 py-4 font-semibold md:px-6">
                Precio
              </th>
              <td className="px-3 py-4 text-center font-[family-name:var(--font-display)] text-xl">
                {siteConfig.price}
              </td>
              <td className="px-3 py-4 text-center font-[family-name:var(--font-display)] text-xl">
                7.300 €
              </td>
              <td className="px-3 py-4 text-center font-[family-name:var(--font-display)] text-xl">
                3.650 €
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="border-t border-ub-line px-4 py-3 text-xs text-ub-muted md:px-6">
        En azul: módulos convalidables entre Fintech e IA. Titulaciones: se
        incluye el curso de preparación (Asesor Financiero y MiCA); el coste del
        examen certificativo no está incluido en la matrícula.
      </p>
    </div>
  );
}
