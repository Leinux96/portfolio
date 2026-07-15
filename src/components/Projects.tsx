import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { getContent } from '#/lib/i18n'
import type { Locale } from '#/content/schema'

export default function Projects({ locale }: { locale: Locale }) {
  const t = getContent(locale)
  const s = t.sections.projects

  return (
    <section id="projects" className="scroll-mt-24 pt-16">
      <SectionHeading kicker={s.kicker} title={s.title} intro={s.intro} />

      <div className="grid gap-6 lg:grid-cols-3">
        {t.projects.map((project) => (
          <article key={project.id} className="card flex flex-col p-6">
            <h3 className="m-0 text-lg font-bold tracking-tight text-[var(--ink)]">
              {project.name}
            </h3>
            <p className="mono mt-1 text-xs text-[var(--accent)]">
              {project.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
              {project.description}
            </p>
            <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-2 text-sm leading-relaxed text-[var(--ink-soft)]"
                >
                  <span aria-hidden className="mono text-[var(--accent)]">
                    *
                  </span>
                  {h}
                </li>
              ))}
            </ul>
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
                  className="mono inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
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
        ))}
      </div>
    </section>
  )
}
