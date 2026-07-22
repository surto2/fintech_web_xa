import settingsData from "../../content/site-settings.json";

export type SiteSettings = {
  seatsLeft: number;
  seats: number;
  price: string;
  priceValue: string;
  deposit: string;
  preinscription: string;
  academicPeriod: string;
  academicPeriodShort: string;
  edition: string;
  schedule: string;
  phone: string;
  email: string;
  whatsapp: string;
};

const settings = settingsData as SiteSettings;

export const siteConfig = {
  name: "Máster Fintech, Blockchain y Mercados Financieros",
  shortName: "Máster Fintech UB",
  university: "Universitat de Barcelona",
  faculty: "Facultat d'Economia i Empresa",
  description:
    "El Máster de Fintech, Blockchain y Mercados Financieros te convertirá en experto en la industria financiera que aplica nuevas tecnologías a actividades financieras y de inversión. Edición 2026-27 · 60 ECTS · Universitat de Barcelona.",
  url: "https://www.ub.edu/fintech",
  locale: "es_ES",
  phone: settings.phone,
  email: settings.email,
  whatsapp: settings.whatsapp,
  edition: settings.edition,
  seatsLeft: settings.seatsLeft,
  seats: settings.seats,
  price: settings.price,
  priceValue: settings.priceValue,
  ects: 60,
  deposit: settings.deposit,
  schedule: settings.schedule,
  modality: "Presencial, semipresencial u online",
  language: "Español",
  preinscription: settings.preinscription,
  academicPeriod: settings.academicPeriod,
  academicPeriodShort: settings.academicPeriodShort,
  campusVirtual: "https://campusvirtual.ub.edu/",
  planDocente: "/uploads/2026/06/Plan-Docente-Master-Fintech-2026-27.pdf",
  alumniUrl: "https://app-master-ia-fintech.ub.edu/",
  masterIaUrl: "https://ub.edu/ai/",
  address: "Facultat d'Economia i Empresa · Universitat de Barcelona",
} as const;

export const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/plan-de-estudio", label: "Plan de estudio" },
  { href: "/profesores", label: "Profesores" },
  { href: "/practicas-y-empresas", label: "Empresas" },
  { href: "/noticias-master", label: "Noticias" },
  { href: "/inscripciones-y-becas", label: "Inscripciones" },
  {
    href: "https://app-master-ia-fintech.ub.edu/",
    label: "Alumni",
    external: true,
  },
  { href: "/investigacion-y-emprendimiento", label: "Investigación" },
  { href: "/contacto", label: "Contacto" },
] as const;
