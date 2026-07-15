import { FileDown, Github, Linkedin, Mail } from 'lucide-react'
import Reveal from './Reveal'
import { getContent } from '#/lib/i18n'
import { site } from '#/content/site'
import type { Locale } from '#/content/schema'

export default function Contact({ locale }: { locale: Locale }) {
  const t = getContent(locale)
  const s = t.sections.contact

  return (
    <section id="contact" className="scroll-mt-24 pt-16">
      <Reveal className="card glow-card p-8 text-center sm:p-12">
        <p className="kicker mb-3">{s.kicker}</p>
        <h2 className="m-0 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
          {s.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[var(--ink-soft)]">
          {s.blurb}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${site.email}`} className="btn btn-primary">
            <Mail size={15} />
            {s.emailLabel}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            <Github size={15} />
            {s.githubLabel}
          </a>
          {site.linkedin ? (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
          ) : null}
          <a href={site.cvPath} download className="btn btn-ghost">
            <FileDown size={15} />
            {s.cvLabel}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
