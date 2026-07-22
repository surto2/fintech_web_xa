import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.university}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "máster fintech",
    "máster blockchain",
    "Universidad de Barcelona",
    "mercados financieros",
    "open banking",
    "fintech Barcelona",
    "máster UB",
  ],
  authors: [{ name: siteConfig.university }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/uploads/2026/06/Foto-definitiva-chico-mirando-maquina-de-hacer-dinero.jpg",
        width: 1200,
        height: 800,
        alt: "Máster Fintech Universitat de Barcelona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: siteConfig.name,
  description: siteConfig.description,
  provider: {
    "@type": "CollegeOrUniversity",
    name: siteConfig.university,
    url: "https://www.ub.edu/",
  },
  url: siteConfig.url,
  educationalCredentialAwarded:
    "Máster de Fintech, Blockchain y Mercados Financieros",
  timeToComplete: "P11M",
  numberOfCredits: siteConfig.ects,
  offers: {
    "@type": "Offer",
    price: siteConfig.priceValue,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: `${siteConfig.url}/inscripciones-y-becas`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${sans.variable} ${display.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
