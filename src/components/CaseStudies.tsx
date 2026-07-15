import SectionHeading from './SectionHeading'
import { getContent } from '#/lib/i18n'
import type { Locale } from '#/content/schema'

export default function CaseStudies({ locale }: { locale: Locale }) {
  const t = getContent(locale)
  const s = t.sections.work

  return (
    <section id="work" className="scroll-mt-24 pt-16">
      <SectionHeading kicker={s.kicker} title={s.title} intro={s.intro} />

      <div className="flex flex-col gap-6">
        {t.caseStudies.map((cs, i) => (
          <article key={cs.id} className="card p-6 sm:p-8">
            <div className="mb-4 flex items-baseline gap-3">
              <span className="mono text-xs text-[var(--ink-faint)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="kicker m-0">{cs.kicker}</p>
            </div>
            <h3 className="m-0 text-xl font-bold tracking-tight text-[var(--ink)] sm:text-2xl">
              {cs.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
              {cs.context}
            </p>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div>
                <h4 className="mono m-0 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  {s.problemLabel}
                </h4>
                <p className="m-0 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {cs.problem}
                </p>

                <h4 className="mono m-0 mb-2 mt-6 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  {s.impactLabel}
                </h4>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {cs.impact.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-[var(--ink)]"
                    >
                      <span aria-hidden className="mono text-[var(--accent)]">
                        +
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mono m-0 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  {s.approachLabel}
                </h4>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {cs.approach.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-[var(--ink-soft)]"
                    >
                      <span
                        aria-hidden
                        className="mono text-[var(--ink-faint)]"
                      >
                        &gt;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {cs.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
