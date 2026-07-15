# leonardochiaramonti.is-a.dev — Portfolio

Bilingual (EN/IT) portfolio for Leonardo Chiaramonti, Senior Product Engineer.
Built with the same stack described in the case studies: **TanStack Start + React 19 + TypeScript strict + Tailwind v4**, fully prerendered to static HTML.

## Stack

- [TanStack Start](https://tanstack.com/start) with static prerendering (`prerender: { enabled: true, crawlLinks: true }`)
- React 19, TypeScript strict, Zod-validated content
- Tailwind CSS v4, custom design system (dark theme default)
- i18n without a library: typed dictionaries in `src/content/{en,it}.ts`, routes `/` (EN) and `/it` (IT)
- Deployed on Cloudflare Workers as static assets

## Structure

```
src/
  content/     # Zod schema + EN/IT dictionaries + site config (email, links)
  components/  # Page sections (Hero, CaseStudies, Projects, Skills, Services, Contact)
  routes/      # / (EN) and /it (IT), SEO head + hreflang per route
cv/            # CV source (markdown) + print stylesheet
scripts/       # build-cv.sh: cv/cv.md -> public/cv/*.pdf (pandoc + headless Chrome)
```

## Commands

```bash
pnpm dev        # dev server on :3000
pnpm build      # production build + prerender to .output/public
pnpm preview    # preview the production build
pnpm lint       # eslint
pnpm build:cv   # regenerate the CV PDF (requires pandoc + Google Chrome)
pnpm deploy     # build + wrangler deploy (requires Node >= 22 and `wrangler login`)
```

## Editing content

All copy lives in `src/content/en.ts` and `src/content/it.ts`, validated against
`src/content/schema.ts` at module load — a missing translation fails the build, not production.
Links and contact info live in `src/content/site.ts`.

## Deploy

Static output (`.output/public`) is served by Cloudflare Workers via `wrangler.jsonc` (assets-only, no server code).

```bash
pnpm exec wrangler login   # once
pnpm deploy
```

Custom domain: `leonardochiaramonti.is-a.dev` via [is-a-dev/register](https://github.com/is-a-dev/register).
