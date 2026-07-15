import { siteContentSchema } from './schema'
import type { SiteContent } from './schema'

export const it: SiteContent = siteContentSchema.parse({
  meta: {
    title: 'Leonardo Chiaramonti — Senior Product Engineer',
    description:
      'Senior Product Engineer, fullstack mobile-first. React Native / Expo, React 19, Java / Spring Boot, AWS / EKS / Terraform. Dal componente RN al pod EKS.',
  },
  nav: {
    work: 'Lavoro',
    projects: 'Progetti',
    skills: 'Competenze',
    services: 'Servizi',
    contact: 'Contatti',
    downloadCv: 'Scarica CV',
  },
  hero: {
    kicker: 'Senior Product Engineer',
    name: 'Leonardo Chiaramonti',
    headline: 'Fullstack mobile-first. Dal componente RN al pod EKS.',
    subline:
      'Costruisco e modernizzo software in produzione end-to-end: app React Native sul campo, frontend web React 19, microservizi Java e la piattaforma AWS sotto — senza rompere quello che già funziona.',
    stats: [
      { value: '7+', label: 'anni di software in produzione' },
      { value: '6+', label: 'app mobile portate in produzione' },
      { value: '12', label: 'release Kubernetes gestite su EKS' },
    ],
    ctaPrimary: 'Guarda il lavoro',
    ctaSecondary: 'Contattami',
    demoCaption:
      'Non è uno screenshot — componenti React vivi, stesso codice di questo sito.',
  },
  sections: {
    work: {
      kicker: 'Case study',
      title: 'Lavoro andato in produzione',
      intro:
        'Una selezione dal SaaS enterprise per sicurezza alimentare e compliance retail (clienti GDO come Conad Nord Ovest e Carrefour). Il codice è proprietario — qui ci sono i problemi, l\u2019approccio e cosa è cambiato.',
      problemLabel: 'Problema',
      approachLabel: 'Approccio',
      impactLabel: 'Impatto',
    },
    projects: {
      kicker: 'Progetti personali',
      title: 'Cosa costruisco fuori orario',
      intro:
        'Side project con disciplina da produzione: codice tipizzato, test, CI e specifiche scritte — non esperimenti del weekend.',
      repoLabel: 'Vedi repository',
      privateRepoLabel: 'Repo disponibile su richiesta',
    },
    skills: {
      kicker: 'Competenze',
      title: 'Quattro assi, uno stack',
      intro:
        'La maggior parte dei fullstack copre due di questi assi. Io ci lavoro su tutti e quattro ogni giorno.',
    },
    services: {
      kicker: 'Servizi',
      title: 'Come posso aiutarti',
      intro:
        'Disponibile per ruoli senior/lead e collaborazioni freelance selezionate.',
    },
    contact: {
      kicker: 'Contatti',
      title: 'Parliamone',
      blurb:
        'Remote-first, base in Italia. Aperto a ruoli senior fullstack, mobile lead e platform — o a un problema concreto da risolvere.',
      emailLabel: 'Scrivimi',
      githubLabel: 'GitHub',
      cvLabel: 'Scarica CV (PDF)',
    },
  },
  caseStudies: [
    {
      id: 'legacy-rewrite',
      kicker: 'Modernizzazione legacy',
      title: 'Riscrivere un backoffice live senza fermare il business',
      context:
        'Il backoffice web di una grande cooperativa retail italiana (Conad Nord Ovest) girava su Create React App, React 16, MUI v4 e JavaScript non tipizzato — difficile da evolvere, ancora più difficile trovarci sviluppatori.',
      problem:
        'Il prodotto richiedeva feature nuove ogni settimana. Un rewrite big-bang avrebbe congelato la delivery per mesi; restare sullo stack legacy rendeva ogni feature più lenta e rischiosa.',
      approach: [
        'Ricostruita l\u2019applicazione su TanStack Start, React 19, TanStack Router/Query/Table/Form, Zod, shadcn/ui e Tailwind v4 — routing file-based, loader query con Suspense, search params come unica fonte di verità per paginazione, ordinamento e filtri.',
        'Progettata una DataTable generica server-side e un design system brandizzato: le nuove schermate CRUD diventano configurazione, non codice.',
        'App legacy mantenuta in produzione durante la transizione; lo stesso backend Spring Boot serve entrambe, quindi il cutover è per schermata, non per prodotto.',
      ],
      impact: [
        'Una codebase tipizzata e testabile su cui il team può davvero assumere.',
        'Le nuove schermate di listing passano da giorni a ore grazie alla DataTable generica e alle convenzioni di routing.',
        'Zero downtime in produzione durante la migrazione.',
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
      kicker: 'Mobile su larga scala',
      title: 'La field app su cui gli ispettori HACCP contano ogni giorno',
      context:
        'BS-SAFE è l\u2019app usata sul campo dagli ispettori di sicurezza alimentare: checklist, allegati, firme, calendari — spesso con connessioni instabili.',
      problem:
        'Una sola codebase doveva rilasciare in modo affidabile su iOS e Android tra dev, staging e produzione, con fix rapidi sul campo e nessuna release rotta.',
      approach: [
        'Expo SDK 53 + React 19 + React Native 0.79 con expo-router, NativeWind, MMKV, Reanimated e react-hook-form + Zod per form tolleranti all\u2019offline.',
        'Build EAS multi-ambiente (dev / staging / prod) con aggiornamenti over-the-air per hotfix immediati che saltano la review degli store.',
        'Quality gate in CI: 12 workflow GitHub Actions tra lint, type-check, unit test e flussi end-to-end Maestro; Sentry in produzione.',
        'Lavoro di performance dove serve: GridList al posto di FlatList, refactor del calendario, flussi BottomSheet, gestione tastiera.',
      ],
      impact: [
        'Gli ispettori ricevono i fix in ore via OTA invece che in giorni via store review.',
        'Ogni release passa dai flussi E2E prima di arrivare su un dispositivo.',
        'Un solo team rilascia tre ambienti e due store da una singola codebase.',
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
      kicker: 'Ownership della piattaforma',
      title: 'La piattaforma AWS su cui deploya ogni prodotto',
      context:
        'Un SaaS multi-prodotto (app mobile, backoffice web, microservizi Java, microfrontend) aveva bisogno di infrastruttura vera: ambienti isolati, deploy ripetibili, osservabilità.',
      problem:
        'I deploy erano manuali e il drift tra ambienti costante. Nessuno sapeva rispondere a "cosa gira esattamente in prod, e come ci è arrivato?"',
      approach: [
        'Organizzazione AWS multi-account con Terraform: account management / audit / dev / staging / prod, CloudTrail centralizzato, IAM SSO, moduli riusabili per VPC, RDS, Redis, ECR ed EKS.',
        'Un unico modulo Terraform riusabile eks-release-template: ogni servizio (auth, payments, copilot, IoT compliance, frontend...) deploya allo stesso modo, con External Secrets e AWS Load Balancer Controller.',
        'Pipeline CI/CD tipizzate per classe di artefatto (Java, SPA, microfrontend, Python, migrazione DB) più ArgoCD per lo stato del cluster.',
        'Osservabilità di default: auto-instrumentation OpenTelemetry su ogni servizio Java, trace e dashboard in SigNoz.',
      ],
      impact: [
        'Owner di ~12 release Kubernetes in produzione sul cluster.',
        'Un nuovo microservizio passa da repo a deploy prod-ready in un giorno, non in uno sprint.',
        'Gli incident partono da trace e dashboard, non da ipotesi.',
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
      kicker: 'AI in produzione',
      title: 'LLM che lavorano davvero, non demo',
      context:
        'Due sistemi AI rilasciati per utenti enterprise: un copilot di prodotto integrato nella suite SaaS e un digitalizzatore di documenti per PDF arbitrari.',
      problem:
        'L\u2019AI enterprise fallisce sulle parti noiose: PDF malformati, campi allucinati, controllo dei costi e integrazione con auth e dati esistenti.',
      approach: [
        'Copilot: microservizio Spring Boot 3 / Java 17 con Spring AI, più frontend Next.js 15 + assistant-ui, integrato con l\u2019identity provider OAuth della piattaforma.',
        'Digitizer: pipeline NestJS + BullMQ che estrae JSON strutturato dai PDF con Claude, con fallback vision multimodale quando il layer testuale è inutilizzabile; retry/backoff e mock mode a costo zero per lo sviluppo.',
        'Output strutturati validati contro schemi — il modello propone, il codice dispone.',
      ],
      impact: [
        'Documenti che prima richiedevano data entry manuale diventano record strutturati in automatico.',
        'Il copilot risponde dentro il prodotto con contesto tenant-aware, non in una chat separata.',
        'Lo sviluppo itera senza bruciare budget API grazie alla mock mode.',
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
      tagline: 'RPG incrementale con rinascite, per mobile',
      description:
        'Un RPG incrementale mobile con run attive e progressione passiva dell\u2019anima attraverso le rinascite, costruito su un game engine a funzioni pure con simulazione offline dei tick e matematica big-number.',
      highlights: [
        'Game engine deterministico custom (simulate) con sistema di modificatori e doppio store Zustand',
        '33 file di test su combattimento, rinascita, loot e logica delle zone',
        '24 documenti di engineering: architettura, formule, scope MVP',
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
      tagline: 'App trauma-informed per il recupero dalle dipendenze',
      description:
        'Un tracker dei giorni puliti con flusso SOS di crisi (respirazione guidata, SMS ai contatti fidati), costruito spec-first con una costituzione di prodotto scritta: trauma-informed, evidence-led, privacy by design.',
      highlights: [
        'Flusso SOS offline-first con test di accessibilità e VoiceOver (WCAG AA)',
        'Vault MMKV cifrato per i dati personali, Drizzle + SQLite per i dati strutturati',
        'Workflow spec-driven con 23+ file di test e CI',
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
      tagline: 'App mobile di lettura dei tarocchi con AI',
      description:
        'Un\u2019app di lettura dei tarocchi con stesa a croce animata: fai una domanda, scopri le carte una alla volta e leggi l\u2019interpretazione della veggente con effetto macchina da scrivere.',
      highlights: [
        'Layout a croce animato e flusso di rivelazione costruiti con Reanimated',
        'Scaffolding di monetizzazione: abbonamenti RevenueCat e interstitial AdMob',
        '79 asset illustrati delle carte, build EAS e CI GitHub Actions',
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
      blurb: 'L\u2019asse più forte: React Native in produzione dal 2018.',
      items: [
        'React Native + Expo (SDK 51\u219254)',
        'expo-router, React Navigation',
        'EAS Build / Submit / Updates (OTA)',
        'MMKV, SQLite, secure storage',
        'Reanimated, UI gesture-driven',
        'jest-expo, Testing Library, Maestro E2E',
        'Sentry, i18next, push notification',
      ],
    },
    {
      id: 'frontend',
      name: 'Frontend Web',
      blurb: 'Due generazioni: mantengo legacy React 16, costruisco React 19.',
      items: [
        'React 19, TypeScript strict',
        'TanStack Router / Query / Table / Form / Start',
        'Next.js 15, Module Federation (Nx 22)',
        'Tailwind v4, shadcn/ui, Radix, MUI',
        'Zod, react-hook-form, Zustand, SWR',
        'Vitest, Playwright, Jest + RTL',
        'Design system, theming, accessibilità',
      ],
    },
    {
      id: 'backend',
      name: 'Backend Java / Node',
      blurb: 'Da un monolite Spring con 150 servizi ai microservizi Java 17.',
      items: [
        'Spring Boot 2.3 \u2192 3.5, Java 8 \u2192 17',
        'JPA/Hibernate, Flyway, ShedLock',
        'OAuth2 / JWT, Spring Security',
        'Read/write splitting HikariCP, graceful shutdown',
        'Pipeline di generazione PDF (PDFBox, Thymeleaf)',
        'NestJS, BullMQ, Prisma, Redis',
        'Integration test con Testcontainers',
      ],
    },
    {
      id: 'platform',
      name: 'Platform / DevOps',
      blurb: 'L\u2019asse che la maggior parte dei fullstack non ha.',
      items: [
        'Terraform multi-account AWS Organizations',
        'EKS, Helm, ArgoCD, External Secrets',
        'IAM IRSA \u2014 zero credenziali statiche',
        'Docker multi-stage, JVM tuning container-aware',
        'OpenTelemetry, SigNoz, dashboard custom',
        'CodePipeline, Bitbucket Pipelines, GitHub Actions',
        'CloudFront, S3, RDS, ElastiCache',
      ],
    },
  ],
  services: [
    {
      id: 'legacy',
      title: 'Modernizzazione legacy',
      description:
        'Rewrite incrementali di frontend React/JS datati verso stack moderni e tipizzati — mentre il prodotto continua a rilasciare. Strategia, architettura e codice hands-on.',
    },
    {
      id: 'mobile',
      title: 'Mobile end-to-end',
      description:
        'App React Native / Expo da zero a entrambi gli store: architettura, UX tollerante all\u2019offline, pipeline EAS, aggiornamenti OTA, test E2E e pubblicazione.',
    },
    {
      id: 'platform',
      title: 'Piattaforma cloud su AWS',
      description:
        'Setup AWS Terraform-first: organizzazioni multi-account, cluster EKS, pipeline CI/CD e osservabilità che ti dice cosa si è rotto prima che lo scoprano gli utenti.',
    },
    {
      id: 'ai',
      title: 'Feature AI che arrivano in produzione',
      description:
        'Integrazione LLM con disciplina da produzione: output strutturati, validazione a schema, controllo costi, fallback ed evaluation — copilot, estrazione documentale, RAG.',
    },
  ],
  footer: {
    note: 'Progettato e costruito con TanStack Start + React 19 — lo stesso stack che uso al lavoro.',
  },
})
