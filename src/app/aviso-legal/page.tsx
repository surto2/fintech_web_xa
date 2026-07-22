import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  alternates: { canonical: `${siteConfig.url}/aviso-legal` },
};

export default function AvisoLegalPage() {
  return (
    <LegalLayout title="Aviso legal">
      <p>
        Este sitio web informa sobre el Máster de Fintech, Blockchain y Mercados
        Financieros de la {siteConfig.university}. La información académica tiene
        carácter orientativo y puede actualizarse según la edición vigente.
      </p>
      <p>
        Titular del tratamiento de consultas recibidas a través del formulario:{" "}
        {siteConfig.email}. Para cuestiones institucionales generales, consulta
        también los avisos legales de ub.edu.
      </p>
      <p>
        Los contenidos, marcas y materiales propios están protegidos. Queda
        prohibida su reproducción sin autorización, salvo uso personal y no
        comercial con mención de la fuente.
      </p>
    </LegalLayout>
  );
}
