import { siteContentSchema } from './schema'
import type { SiteContent } from './schema'

export const en: SiteContent = siteContentSchema.parse({
  meta: {
    title: 'Leonardo Chiaramonti — Senior Product Engineer',
    description:
      'Senior Product Engineer, mobile-first fullstack. React Native / Expo, React 19, Java / Spring Boot, AWS / EKS / Terraform. From the RN component to the EKS pod.',
  },
  nav: {
    work: 'Work',
    projects: 'Projects',
    skills: 'Skills',
    services: 'Services',
    contact: 'Contact',
    downloadCv: 'Download CV',
  },
  hero: {
    kicker: 'Senior Product Engineer',
    name: 'Leonardo Chiaramonti',
    headline: 'Mobile-first fullstack. From the RN component to the EKS pod.',
    subline:
      'I build and modernize production software end-to-end: React Native apps in the field, React 19 web frontends, Java microservices, and the AWS platform underneath — without breaking what is already running.',
    stats: [
      { value: '7+', label: 'years in production software' },
      { value: '6+', label: 'mobile apps shipped to production' },
      { value: '12', label: 'Kubernetes releases owned on EKS' },
    ],
    ctaPrimary: 'See the work',
    ctaSecondary: 'Get in touch',
  },
  sections: {
    work: {
      kicker: 'Case studies',
      title: 'Work that shipped',
      intro:
        'Selected work from enterprise SaaS in food safety and retail compliance (GDO clients such as Conad Nord Ovest and Carrefour). Code is proprietary — these are the problems, the approach, and what changed.',
      problemLabel: 'Problem',
      approachLabel: 'Approach',
      impactLabel: 'Impact',
    },
    projects: {
      kicker: 'Personal projects',
      title: 'What I build off the clock',
      intro:
        'Side projects built with production discipline: typed code, tests, CI, and written specs — not weekend hacks.',
      repoLabel: 'View repository',
      privateRepoLabel: 'Repo available on request',
    },
    skills: {
      kicker: 'Skills',
      title: 'Four axes, one stack',
      intro:
        'Most fullstack engineers cover two of these. I work across all four daily.',
    },
    services: {
      kicker: 'Services',
      title: 'How I can help',
      intro:
        'Available for senior/lead roles and selected freelance engagements.',
    },
    contact: {
      kicker: 'Contact',
      title: 'Let\u2019s talk',
      blurb:
        'Remote-first, based in Italy. Open to senior fullstack, mobile lead, and platform roles — or a concrete problem you want solved.',
      emailLabel: 'Email me',
      githubLabel: 'GitHub',
      cvLabel: 'Download CV (PDF)',
    },
  },
  caseStudies: [
    {
      id: 'legacy-rewrite',
      kicker: 'Legacy modernization',
      title: 'Rewriting a live backoffice without stopping the business',
      context:
        'The web backoffice for a major Italian retail cooperative (Conad Nord Ovest) ran on Create React App, React 16, MUI v4 and untyped JavaScript — hard to change, harder to hire for.',
      problem:
        'The product needed new features weekly. A big-bang rewrite would freeze delivery for months; staying on the legacy stack made every feature slower and riskier.',
      approach: [
        'Rebuilt the application on TanStack Start, React 19, TanStack Router/Query/Table/Form, Zod, shadcn/ui and Tailwind v4 — file-based routing, Suspense loader queries, search params as the single source of truth for pagination, sorting and filters.',
        'Designed a generic server-side DataTable and a brand-consistent design system so new CRUD screens are configuration, not code.',
        'Kept the legacy app in production during the transition; the same Spring Boot backend serves both, so cutover is per-screen, not per-product.',
      ],
      impact: [
        'A typed, testable codebase the team can actually hire for.',
        'New listing screens go from days to hours thanks to the generic DataTable and route conventions.',
        'Zero production downtime during the migration.',
      ],
      stack: [
        'TanStack Start',
        'React 19',
        'TypeScript strict',
        'Zod',
        'shadcn/ui',
        'Tailwind v4',
        'Vite',
      ],
    },
    {
      id: 'mobile-at-scale',
      kicker: 'Mobile at scale',
      title: 'A field app HACCP inspectors rely on every day',
      context:
        'BS-SAFE is the field app used by food-safety inspectors on site: checklists, attachments, signatures, calendars — often on flaky connections.',
      problem:
        'One codebase had to ship reliably to iOS and Android across dev, staging and production, with fast fixes in the field and no broken releases.',
      approach: [
        'Expo SDK 53 + React 19 + React Native 0.79 with expo-router, NativeWind, MMKV, Reanimated and react-hook-form + Zod for offline-tolerant forms.',
        'Multi-environment EAS builds (dev / staging / prod) with over-the-air updates for instant hotfixes that skip the store review cycle.',
        'Quality gates in CI: 12 GitHub Actions workflows covering lint, type-check, unit tests and Maestro end-to-end flows; Sentry in production.',
        'Performance work where it hurts: GridList over FlatList, calendar refactor, BottomSheet flows, keyboard handling.',
      ],
      impact: [
        'Inspectors get fixes in hours via OTA instead of days via store review.',
        'Every release is exercised by E2E flows before it reaches a device.',
        'One team ships three environments and two stores from a single codebase.',
      ],
      stack: [
        'Expo SDK 53',
        'React Native 0.79',
        'EAS Build + Updates',
        'Maestro E2E',
        'Sentry',
        'GitHub Actions',
      ],
    },
    {
      id: 'platform-ownership',
      kicker: 'Platform ownership',
      title: 'The AWS platform every product deploys on',
      context:
        'A multi-product SaaS (mobile apps, web backoffices, Java microservices, microfrontends) needed real infrastructure: isolated environments, repeatable deploys, observability.',
      problem:
        'Deploys were manual and environment drift was constant. Nobody could answer "what exactly is running in prod, and how did it get there?"',
      approach: [
        'Terraform multi-account AWS organization: management / audit / dev / staging / prod accounts, centralized CloudTrail, IAM SSO, reusable modules for VPC, RDS, Redis, ECR and EKS.',
        'A single reusable eks-release-template Terraform module so every service (auth, payments, copilot, IoT compliance, frontends...) deploys the same way, with External Secrets and the AWS Load Balancer Controller.',
        'Typed CI/CD pipelines per artifact class (Java, SPA, microfrontend, Python, DB migration) plus ArgoCD for cluster state.',
        'Observability as a default: OpenTelemetry auto-instrumentation on every Java service, traces and dashboards in SigNoz.',
      ],
      impact: [
        'Owner of ~12 production Kubernetes releases across the cluster.',
        'A new microservice goes from repo to prod-ready deploy in a day, not a sprint.',
        'Incidents start from traces and dashboards, not from guesswork.',
      ],
      stack: [
        'Terraform',
        'AWS (EKS, RDS, S3, IAM/IRSA)',
        'ArgoCD',
        'Helm',
        'OpenTelemetry',
        'SigNoz',
      ],
    },
    {
      id: 'ai-in-production',
      kicker: 'AI in production',
      title: 'LLMs doing real work, not demos',
      context:
        'Two AI systems shipped for enterprise users: a product copilot embedded in the SaaS suite, and a document digitizer for arbitrary PDFs.',
      problem:
        'Enterprise AI fails on the boring parts: malformed PDFs, hallucinated fields, cost control, and integration with existing auth and data.',
      approach: [
        'Copilot: Spring Boot 3 / Java 17 microservice with Spring AI, plus a Next.js 15 + assistant-ui frontend, integrated with the platform\u2019s OAuth identity provider.',
        'Digitizer: NestJS + BullMQ pipeline that extracts structured JSON from PDFs with Claude, falling back to multimodal vision when the text layer is unusable; retry/backoff and a zero-cost mock mode for development.',
        'Structured outputs validated against schemas — the model proposes, the code disposes.',
      ],
      impact: [
        'Documents that previously required manual data entry become structured records automatically.',
        'The copilot answers inside the product with tenant-aware context, not in a separate chat tab.',
        'Development iterates without burning API budget thanks to mock mode.',
      ],
      stack: [
        'Spring AI',
        'Java 17',
        'Next.js 15',
        'NestJS + BullMQ',
        'Anthropic Claude (text + vision)',
        'PostgreSQL + Prisma',
      ],
    },
  ],
  projects: [
    {
      id: 'ouroboros',
      name: 'Ouroboros',
      tagline: 'Incremental rebirth RPG for mobile',
      description:
        'A mobile incremental RPG with active runs and passive soul progression across rebirths, built on a pure-function game engine with offline tick simulation and big-number math.',
      highlights: [
        'Custom deterministic game engine (simulate) with a modifier system and dual Zustand stores',
        '33 test files covering combat, rebirth, loot and zone logic',
        '24 engineering docs: architecture, formulas, MVP scope',
      ],
      stack: [
        'React Native 0.81',
        'Expo SDK 54',
        'TypeScript',
        'Zustand + MMKV',
        'Reanimated 4',
        'Jest + Maestro',
      ],
    },
    {
      id: 'addiction',
      name: 'Recovery Companion',
      tagline: 'Trauma-informed addiction recovery app',
      description:
        'A clean-days tracker with an SOS crisis flow (guided breathing, SMS to trusted contacts), built spec-first with a written product constitution: trauma-informed, evidence-led, privacy by design.',
      highlights: [
        'Offline-first SOS flow with accessibility and VoiceOver tests (WCAG AA)',
        'Encrypted MMKV vault for PII, Drizzle + SQLite for structured data',
        'Spec-driven workflow with 23+ test files and CI',
      ],
      stack: [
        'Expo SDK 53',
        'TypeScript',
        'Drizzle ORM + SQLite',
        'React Query',
        'Zod',
        'Lottie',
      ],
    },
    {
      id: 'babayaga',
      name: 'Babayaga',
      tagline: 'AI tarot reading app for mobile',
      description:
        'A tarot reading app with an animated cross-spread layout: ask a question, reveal the cards one by one, and read the seer\u2019s interpretation delivered with a typewriter effect.',
      highlights: [
        'Animated cross-spread card layout and reveal flow built with Reanimated',
        'Monetization scaffolding: RevenueCat subscriptions and AdMob interstitials',
        '79 illustrated card assets, EAS builds and GitHub Actions CI',
      ],
      stack: [
        'Expo SDK 53',
        'React Native 0.79',
        'TypeScript',
        'React Query + Zustand',
        'Reanimated',
        'NativeWind',
      ],
    },
  ],
  skillAxes: [
    {
      id: 'mobile',
      name: 'Mobile',
      blurb: 'The strongest axis: production React Native since 2018.',
      items: [
        'React Native + Expo (SDK 51\u219254)',
        'expo-router, React Navigation',
        'EAS Build / Submit / Updates (OTA)',
        'MMKV, SQLite, secure storage',
        'Reanimated, gesture-driven UI',
        'jest-expo, Testing Library, Maestro E2E',
        'Sentry, i18next, push notifications',
      ],
    },
    {
      id: 'frontend',
      name: 'Frontend Web',
      blurb:
        'Two generations: maintain React 16 legacy, build React 19 modern.',
      items: [
        'React 19, TypeScript strict',
        'TanStack Router / Query / Table / Form / Start',
        'Next.js 15, Module Federation (Nx 22)',
        'Tailwind v4, shadcn/ui, Radix, MUI',
        'Zod, react-hook-form, Zustand, SWR',
        'Vitest, Playwright, Jest + RTL',
        'Design systems, theming, accessibility',
      ],
    },
    {
      id: 'backend',
      name: 'Backend Java / Node',
      blurb: 'From a 150-service Spring monolith to Java 17 microservices.',
      items: [
        'Spring Boot 2.3 \u2192 3.5, Java 8 \u2192 17',
        'JPA/Hibernate, Flyway, ShedLock',
        'OAuth2 / JWT, Spring Security',
        'HikariCP read/write splitting, graceful shutdown',
        'PDF generation pipelines (PDFBox, Thymeleaf)',
        'NestJS, BullMQ, Prisma, Redis',
        'Testcontainers integration testing',
      ],
    },
    {
      id: 'platform',
      name: 'Platform / DevOps',
      blurb: 'The axis most fullstack engineers do not have.',
      items: [
        'Terraform multi-account AWS Organizations',
        'EKS, Helm, ArgoCD, External Secrets',
        'IAM IRSA \u2014 zero static credentials',
        'Docker multi-stage, container-aware JVM tuning',
        'OpenTelemetry, SigNoz, custom dashboards',
        'CodePipeline, Bitbucket Pipelines, GitHub Actions',
        'CloudFront, S3, RDS, ElastiCache',
      ],
    },
  ],
  services: [
    {
      id: 'legacy',
      title: 'Legacy modernization',
      description:
        'Incremental rewrites of aging React/JS frontends to typed, modern stacks — while the product keeps shipping. Strategy, architecture, and hands-on code.',
    },
    {
      id: 'mobile',
      title: 'Mobile end-to-end',
      description:
        'React Native / Expo apps from zero to both stores: architecture, offline-tolerant UX, EAS pipelines, OTA updates, E2E testing, and store submission.',
    },
    {
      id: 'platform',
      title: 'Cloud platform on AWS',
      description:
        'Terraform-first AWS setups: multi-account organizations, EKS clusters, CI/CD pipelines, and observability that tells you what broke before your users do.',
    },
    {
      id: 'ai',
      title: 'AI features that ship',
      description:
        'LLM integration with production discipline: structured outputs, schema validation, cost control, fallbacks, and evaluation — copilots, document extraction, RAG.',
    },
  ],
  footer: {
    note: 'Designed and built with TanStack Start + React 19 — the same stack I use at work.',
  },
})
