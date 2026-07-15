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

      <div>
        {t.services.map((service, i) => (
          <Reveal key={service.id} delay={i * 80}>
            <div className="svc-row">
              <span className="svc-num" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="m-0 text-base font-bold tracking-tight text-[var(--ink)]">
                  {service.title}
                </h3>
                <p className="m-0 mt-2 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
                  {service.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
