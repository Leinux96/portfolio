import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { getContent } from '#/lib/i18n'
import type { Locale } from '#/content/schema'

export default function Services({ locale }: { locale: Locale }) {
  const t = getContent(locale)
  const s = t.sections.services

  return (
    <section id="services" className="scroll-mt-24 pt-16">
      <Reveal>
        <SectionHeading kicker={s.kicker} title={s.title} intro={s.intro} />
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2">
        {t.services.map((service, i) => (
          <Reveal
            key={service.id}
            delay={i * 100}
            className="card glow-card p-6"
          >
            <h3 className="m-0 text-base font-bold tracking-tight text-[var(--ink)]">
              {service.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
              {service.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
