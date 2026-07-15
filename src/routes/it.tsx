import { createFileRoute } from '@tanstack/react-router'
import Page from '#/components/Page'
import { getContent } from '#/lib/i18n'
import { site } from '#/content/site'

const t = getContent('it')

export const Route = createFileRoute('/it')({
  head: () => ({
    meta: [
      { title: t.meta.title },
      { name: 'description', content: t.meta.description },
      { property: 'og:title', content: t.meta.title },
      { property: 'og:description', content: t.meta.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${site.url}/it` },
    ],
    links: [
      { rel: 'canonical', href: `${site.url}/it` },
      { rel: 'alternate', hrefLang: 'en', href: site.url },
      { rel: 'alternate', hrefLang: 'it', href: `${site.url}/it` },
      { rel: 'alternate', hrefLang: 'x-default', href: site.url },
    ],
  }),
  component: HomeIt,
})

function HomeIt() {
  return <Page locale="it" />
}
