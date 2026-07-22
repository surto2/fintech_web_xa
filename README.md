# Máster Fintech UB — Web

Sitio web moderno del **Máster de Fintech, Blockchain y Mercados Financieros** de la Universitat de Barcelona.

## Stack

- Next.js 15 (App Router)
- TypeScript + Tailwind CSS 4
- Framer Motion
- SEO: metadata, JSON-LD `Course` / `NewsArticle`, sitemap, robots
- Assets migrados desde backup WordPress (`.wpress`)

## Desarrollo

```bash
cd web
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build / deploy

```bash
cd web
npm run build
npm start
```

Compatible con **Vercel** y **Netlify**. La URL canónica prevista es `https://www.ub.edu/fintech`.

## Alumni

`/alumni` y rutas de membresía antiguas redirigen a:

https://app-master-ia-fintech.ub.edu/

## Contenido

- Páginas principales en `src/app`
- Datos del programa en `src/lib/content.ts` y `src/lib/site.ts`
- Noticias en `content/posts.json` (86 artículos migrados)
- Medios clave en `public/uploads` (hero + PDFs)
- Imágenes de noticias servidas desde `ub.edu/fintech/wp-content/uploads` (híbrido temporal para deploy ligero en Vercel/Netlify). Al migrar a hosting UB, se pueden servir todas en local desde el backup `_extract/uploads`.
