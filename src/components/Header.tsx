import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { getContent, localeHome, otherLocale } from '#/lib/i18n'
import { site } from '#/content/site'
import type { Locale } from '#/content/schema'

export default function Header({ locale }: { locale: Locale }) {
  const t = getContent(locale)
  const other = otherLocale(locale)

  const anchors = [
    { href: '#work', label: t.nav.work },
    { href: '#projects', label: t.nav.projects },
    { href: '#skills', label: t.nav.skills },
    { href: '#services', label: t.nav.services },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_86%,transparent)] backdrop-blur-lg">
      <nav className="page-wrap flex items-center gap-4 py-3">
        <Link
          to={localeHome(locale)}
          className="mono text-sm font-semibold tracking-tight text-[var(--ink)]"
        >
          <span className="text-[var(--accent)]">~/</span>leonardo
        </Link>

        <div className="ml-2 hidden items-center gap-5 md:flex">
          {anchors.map((a) => (
            <a key={a.href} href={a.href} className="nav-link">
              {a.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={site.cvPath}
            download
            className="chip hidden transition hover:border-[var(--accent-line)] hover:text-[var(--ink)] sm:inline-flex"
          >
            {t.nav.downloadCv}
          </a>
          <Link
            to={localeHome(other)}
            aria-label={
              other === 'it' ? 'Versione italiana' : 'English version'
            }
            className="mono flex h-9 items-center rounded-[10px] border border-[var(--line)] px-3 text-xs font-semibold uppercase text-[var(--ink-soft)] transition hover:border-[var(--accent-line)] hover:text-[var(--ink)]"
          >
            {other}
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
