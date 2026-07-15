import SectionHeading from './SectionHeading'
import { getContent } from '#/lib/i18n'
import type { Locale } from '#/content/schema'

export default function Skills({ locale }: { locale: Locale }) {
  const t = getContent(locale)
  const s = t.sections.skills

  return (
    <section id="skills" className="scroll-mt-24 pt-16">
      <SectionHeading kicker={s.kicker} title={s.title} intro={s.intro} />

      <div className="grid gap-6 sm:grid-cols-2">
        {t.skillAxes.map((axis, i) => (
          <div key={axis.id} className="card p-6">
            <div className="flex items-baseline gap-3">
              <span className="mono text-xs text-[var(--ink-faint)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="m-0 text-lg font-bold tracking-tight text-[var(--ink)]">
                {axis.name}
              </h3>
            </div>
            <p className="mt-2 text-sm text-[var(--accent)]">{axis.blurb}</p>
            <ul className="m-0 mt-4 flex list-none flex-col gap-1.5 p-0">
              {axis.items.map((item) => (
                <li
                  key={item}
                  className="mono text-[0.8rem] leading-relaxed text-[var(--ink-soft)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
