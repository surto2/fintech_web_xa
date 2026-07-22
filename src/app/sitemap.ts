import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/plan-de-estudio",
    "/profesores",
    "/practicas-y-empresas",
    "/noticias-master",
    "/inscripciones-y-becas",
    "/investigacion-y-emprendimiento",
    "/contacto",
    "/aviso-legal",
    "/politica-de-privacidad",
    "/politica-de-cookies",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const posts = getAllPosts().map((p) => ({
    url: `${base}/noticias-master/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...posts];
}
