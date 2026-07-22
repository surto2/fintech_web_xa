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

## Contenido

- Páginas principales en `src/app`
- Datos del programa en `src/lib/content.ts` y `src/lib/site.ts`
- Datos editables (plazas, precio…) en `content/site-settings.json`
- Noticias en `content/posts.json` (86 artículos migrados)
- Medios en `public/uploads`

## Panel admin

Abre [http://localhost:3000/admin](http://localhost:3000/admin).

- Contraseña por defecto en local: `fintech-ub-admin-dev`
- En producción, define `ADMIN_PASSWORD` (ver `.env.example`)
- Opcional: `GITHUB_TOKEN` + `GITHUB_REPO` para que al guardar se haga commit y Vercel redespliegue

Desde el admin puedes:

1. Crear / editar / eliminar noticias
2. Actualizar plazas, precio, fechas y contacto

## Alumni

`/alumni` y rutas de membresía antiguas redirigen a:

https://app-master-ia-fintech.ub.edu/
