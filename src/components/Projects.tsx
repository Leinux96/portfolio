import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { getContent } from '#/lib/i18n'
import type { Locale } from '#/content/schema'

const THEME: Record<string, string> = {
  ouroboros: 'proj-ouroboros',
  addiction: 'proj-addiction',
  babayaga: 'proj-babayaga',
}

function EcgLine() {
  return (
    <svg
      className="ecg"
      viewBox="0 0 220 26"
      width="100%"
      height="24"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 14 H58 L66 14 L72 4 L78 22 L84 10 L88 14 H132 L138 14 L144 7 L150 19 L156 14 H220"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Projects({ locale }: { locale: Locale }) {
  const t = getContent(locale)
  const s = t.sections.projects

  return (
    <section id="projects" className="scroll-mt-24 pt-16">
      <Reveal>
        <SectionHeading kicker={s.kicker} title={s.title} intro={s.intro} />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3">
        {t.projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 120} className="h-full">
            <article
              className={`proj-card glow-card h-full ${THEME[project.id] ?? ''}`}
            >
              {project.id === 'ouroboros' && (
                <div className="ouro-ring" aria-hidden>
                  <span>∞</span>
                </div>
              )}
              {project.id === 'babayaga' && (
                <span className="baba-sigil" aria-hidden>
                  ✦ ☾ ✦
                </span>
              )}
              {project.id === 'addiction' && (
                <div className="mb-3 pr-8">
                  <EcgLine />
                </div>
              )}

              <h3 className="m-0 text-lg font-bold tracking-tight text-[var(--ink)]">
                {project.name}
              </h3>

              {project.id === 'babayaga' ? (
                <p className="baba-tagline m-0 mt-1 text-[var(--pj-gold)]">
                  {project.tagline}
                </p>
              ) : (
                <p className="proj-tag mono m-0 mt-1 flex items-center gap-2 text-xs">
                  {project.id === 'addiction' && (
                    <span className="breath" aria-hidden />
                  )}
                  {project.tagline}
                </p>
              )}

              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                {project.description}
              </p>

              <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-2 text-sm leading-relaxed text-[var(--ink-soft)]"
                  >
                    <span aria-hidden className="proj-tag mono">
                      *
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              {project.id === 'ouroboros' && (
                <div className="mt-5" aria-hidden>
                  <div className="mono mb-1.5 flex justify-between text-[0.62rem] font-medium uppercase tracking-widest text-[var(--ink-faint)]">
                    <span>soul lv. 12</span>
                    <span className="text-[var(--pj-gold)]">rebirth ∞</span>
                  </div>
                  <div className="xp-track">
                    <div className="xp-fill" />
                  </div>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-5">
                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="proj-tag mono inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                  >
                    {s.repoLabel}
                    <ArrowUpRight size={13} />
                  </a>
                ) : (
                  <span className="mono text-xs text-[var(--ink-faint)]">
                    {s.privateRepoLabel}
                  </span>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
