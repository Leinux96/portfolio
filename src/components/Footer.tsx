import { getContent } from '#/lib/i18n'
import { site } from '#/content/site'
import type { Locale } from '#/content/schema'

export default function Footer({ locale }: { locale: Locale }) {
  const t = getContent(locale)
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-[var(--line)]">
      <div className="page-wrap flex flex-col items-center justify-between gap-3 py-8 text-sm text-[var(--ink-soft)] sm:flex-row">
        <p className="m-0">
          &copy; {year} {site.name}
        </p>
        <p className="mono m-0 text-xs text-[var(--ink-faint)]">
          {t.footer.note}
        </p>
      </div>
    </footer>
  )
}
