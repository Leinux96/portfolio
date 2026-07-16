import { site } from '#/content/site'

/** JSON-LD structured data: tells Google who this page is about. */
export function jsonLd() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${site.url}/#person`,
        name: site.name,
        url: site.url,
        email: `mailto:${site.email}`,
        jobTitle: 'Senior Product Engineer',
        sameAs: [site.github, ...(site.linkedin ? [site.linkedin] : [])],
        knowsAbout: [
          'React Native',
          'Expo',
          'React',
          'TypeScript',
          'Java',
          'Spring Boot',
          'AWS',
          'Kubernetes',
          'Terraform',
          'IoT',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        name: site.name,
        url: site.url,
        about: { '@id': `${site.url}/#person` },
      },
    ],
  })
}
