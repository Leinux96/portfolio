import { en } from '#/content/en'
import { it } from '#/content/it'
import type { Locale, SiteContent } from '#/content/schema'

export function getContent(locale: Locale): SiteContent {
  return locale === 'it' ? it : en
}

export function localeHome(locale: Locale): string {
  return locale === 'it' ? '/it' : '/'
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'it' ? 'en' : 'it'
}
