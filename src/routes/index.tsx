import { createFileRoute } from '@tanstack/react-router'
import Page from '#/components/Page'
import { getContent } from '#/lib/i18n'
import { jsonLd } from '#/lib/seo'
import { site } from '#/content/site'

const t = getContent('en')

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: t.meta.title },
      { name: 'description', content: t.meta.description },
      { property: 'og:title', content: t.meta.title },
      { property: 'og:description', content: t.meta.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: site.url },
      { property: 'og:image', content: `${site.url}/og.png` },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    scripts: [{ type: 'application/ld+json', children: jsonLd() }],
    links: [
      { rel: 'canonical', href: site.url },
      { rel: 'alternate', hrefLang: 'en', href: site.url },
      { rel: 'alternate', hrefLang: 'it', href: `${site.url}/it` },
      { rel: 'alternate', hrefLang: 'x-default', href: site.url },
    ],
  }),
  component: Home,
})

function Home() {
  return <Page locale="en" />
}
