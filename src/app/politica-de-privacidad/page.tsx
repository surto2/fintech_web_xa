import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  alternates: { canonical: `${siteConfig.url}/politica-de-privacidad` },
};

export default function PrivacidadPage() {
  return (
    <LegalLayout title="Política de privacidad">
      <p>
        Los datos facilitados a través del formulario de contacto se utilizan
        exclusivamente para responder a tu solicitud de información sobre el
        máster y la gestión académica asociada.
      </p>
      <p>
        Responsable de las consultas del programa: {siteConfig.email}. No
        cedemos tus datos a terceros con fines comerciales. Puedes ejercer tus
        derechos de acceso, rectificación, oposición y otros derechos reconocidos
        por la normativa vigente escribiendo a la misma dirección.
      </p>
      <p>
        Esta web puede utilizar cookies técnicas necesarias para su
        funcionamiento. Consulta la{" "}
        <a href="/politica-de-cookies">política de cookies</a>.
      </p>
    </LegalLayout>
  );
}
