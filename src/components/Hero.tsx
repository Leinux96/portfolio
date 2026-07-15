import CountUp from './CountUp'
import PhoneDemo from './PhoneDemo'
import TerminalDemo from './TerminalDemo'
import { getContent } from '#/lib/i18n'
import type { Locale } from '#/content/schema'

export default function Hero({ locale }: { locale: Locale }) {
  const t = getContent(locale)

  return (
    <section className="rise-in pt-16 pb-16 sm:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="kicker mb-4">{t.hero.kicker}</p>
          <h1 className="m-0 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-[var(--ink)] sm:text-6xl">
            {t.hero.name}
          </h1>
          <p className="mt-4 max-w-3xl text-xl font-semibold text-[var(--accent)] sm:text-2xl">
            {t.hero.headline}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
            {t.hero.subline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="btn btn-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#contact" className="btn btn-ghost">
              {t.hero.ctaSecondary}
            </a>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {t.hero.stats.map((stat) => (
              <div key={stat.label} className="card glow-card px-5 py-4">
                <dt className="order-2 m-0 text-xs leading-snug text-[var(--ink-soft)]">
                  {stat.label}
                </dt>
                <dd className="mono m-0 mb-1 text-3xl font-semibold text-[var(--ink)]">
                  <CountUp value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hidden flex-col items-center gap-4 lg:flex">
          <div className="relative">
            <PhoneDemo />
            <div className="absolute -bottom-6 -left-28 w-56">
              <TerminalDemo />
            </div>
          </div>
          <p className="mono mt-8 max-w-60 text-center text-[0.62rem] leading-relaxed text-[var(--ink-faint)]">
            {t.hero.demoCaption}
          </p>
        </div>
      </div>
    </section>
  )
}
