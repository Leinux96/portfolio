import { z } from 'zod'

export const localeSchema = z.enum(['en', 'it'])
export type Locale = z.infer<typeof localeSchema>

const statSchema = z.object({
  value: z.string(),
  label: z.string(),
})

const caseStudySchema = z.object({
  id: z.string(),
  kicker: z.string(),
  title: z.string(),
  context: z.string(),
  problem: z.string(),
  approach: z.array(z.string()).min(1),
  impact: z.array(z.string()).min(1),
  stack: z.array(z.string()).min(1),
})

const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  highlights: z.array(z.string()).min(1),
  stack: z.array(z.string()).min(1),
  repo: z.url().optional(),
})

const skillAxisSchema = z.object({
  id: z.string(),
  name: z.string(),
  blurb: z.string(),
  items: z.array(z.string()).min(1),
})

const serviceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
})

export const siteContentSchema = z.object({
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  nav: z.object({
    work: z.string(),
    projects: z.string(),
    skills: z.string(),
    services: z.string(),
    contact: z.string(),
    downloadCv: z.string(),
  }),
  hero: z.object({
    kicker: z.string(),
    name: z.string(),
    headline: z.string(),
    subline: z.string(),
    stats: z.array(statSchema).length(3),
    ctaPrimary: z.string(),
    ctaSecondary: z.string(),
  }),
  sections: z.object({
    work: z.object({
      kicker: z.string(),
      title: z.string(),
      intro: z.string(),
      problemLabel: z.string(),
      approachLabel: z.string(),
      impactLabel: z.string(),
    }),
    projects: z.object({
      kicker: z.string(),
      title: z.string(),
      intro: z.string(),
      repoLabel: z.string(),
      privateRepoLabel: z.string(),
    }),
    skills: z.object({
      kicker: z.string(),
      title: z.string(),
      intro: z.string(),
    }),
    services: z.object({
      kicker: z.string(),
      title: z.string(),
      intro: z.string(),
    }),
    contact: z.object({
      kicker: z.string(),
      title: z.string(),
      blurb: z.string(),
      emailLabel: z.string(),
      githubLabel: z.string(),
      cvLabel: z.string(),
    }),
  }),
  caseStudies: z.array(caseStudySchema).min(1),
  projects: z.array(projectSchema).min(1),
  skillAxes: z.array(skillAxisSchema).length(5),
  services: z.array(serviceSchema).min(1),
  footer: z.object({
    note: z.string(),
  }),
})

export type SiteContent = z.infer<typeof siteContentSchema>
export type CaseStudy = z.infer<typeof caseStudySchema>
export type Project = z.infer<typeof projectSchema>
export type SkillAxis = z.infer<typeof skillAxisSchema>
export type Service = z.infer<typeof serviceSchema>
