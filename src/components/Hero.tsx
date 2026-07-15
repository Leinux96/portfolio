import CountUp from './CountUp'
import K9sDemo from './K9sDemo'
import PhoneDemo from './PhoneDemo'
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

          <dl className="mt-12 flex max-w-2xl flex-col gap-x-8 gap-y-3 sm:flex-row sm:items-center">
            {t.hero.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={
                  i > 0
                    ? 'flex items-baseline gap-2.5 sm:border-l sm:border-[var(--line)] sm:pl-8'
                    : 'flex items-baseline gap-2.5'
                }
              >
                <dd className="mono m-0 text-2xl font-semibold text-[var(--accent)]">
                  <CountUp value={stat.value} />
                </dd>
                <dt className="m-0 max-w-36 text-xs leading-snug text-[var(--ink-soft)]">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="hidden flex-col items-center gap-6 lg:flex">
          <PhoneDemo />
          <div className="w-full max-w-90">
            <K9sDemo />
          </div>
        </div>
      </div>
    </section>
  )
}
