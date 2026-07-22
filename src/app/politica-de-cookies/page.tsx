import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de cookies",
  alternates: { canonical: `${siteConfig.url}/politica-de-cookies` },
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Política de cookies">
      <p>
        Utilizamos cookies técnicas necesarias para el correcto funcionamiento
        del sitio (preferencias básicas, seguridad y rendimiento). No se usan
        para elaborar perfiles comerciales sin tu consentimiento.
      </p>
      <p>
        Puedes configurar o eliminar cookies desde tu navegador. Si continúas
        navegando, entendemos que aceptas el uso de cookies técnicas esenciales.
      </p>
      <p>
        Para más información sobre privacidad, consulta la{" "}
        <a href="/politica-de-privacidad">política de privacidad</a> o escribe a{" "}
        {siteConfig.email}.
      </p>
    </LegalLayout>
  );
}
