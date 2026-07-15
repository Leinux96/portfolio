import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { getContent } from '#/lib/i18n'
import type { Locale } from '#/content/schema'

export default function Skills({ locale }: { locale: Locale }) {
  const t = getContent(locale)
  const s = t.sections.skills

  return (
    <section id="skills" className="scroll-mt-24 pt-16">
      <Reveal>
        <SectionHeading kicker={s.kicker} title={s.title} intro={s.intro} />
      </Reveal>

      <div>
        {t.skillAxes.map((axis, i) => (
          <Reveal key={axis.id} delay={i * 80}>
            <div className="spec-row">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="mono text-xs text-[var(--accent)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="m-0 text-base font-bold tracking-tight text-[var(--ink)]">
                    {axis.name}
                  </h3>
                </div>
                <p className="m-0 mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {axis.blurb}
                </p>
              </div>
              <ul className="spec-items m-0 list-none p-0">
                {axis.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
