# Leonardo Chiaramonti

**Senior Fullstack Engineer · Mobile-first (React Native / Expo) + Cloud-native backend**

📧 [leonardo.chiaramonti@biorsaf.it](mailto:leonardo.chiaramonti@biorsaf.it) · [github.com/Leinux96](https://github.com/Leinux96) · [leonardo.is-a.dev](https://leonardo.is-a.dev) · Italia (remoto)

---

## Profilo

Fullstack engineer con **7+ anni di esperienza** professionale, dal 2018 ad oggi. Verticalità forte su **React Native + Expo** e sull'intero ecosistema **frontend moderno** (React 19, TanStack, Next.js, Module Federation), con solida competenza **backend Java / Spring Boot** e **infrastruttura cloud-native** su **AWS / EKS / Terraform**.

Lavoro su tutto lo stack: dal componente UI mobile fino al ServiceAccount IRSA che firma le request a S3, passando per la pipeline CI/CD che lo deploya. Mi piace prendere prodotti legacy e modernizzarli end-to-end senza rompere nulla in produzione (vedi il rewrite del backoffice Conad qui sotto), mettere in piedi osservabilità seria (OpenTelemetry, SigNoz, dashboards K8s) e progettare API backend pensate per scalare (read/write splitting, graceful shutdown, scheduler distribuiti).

Pragmatico, allergico al codice "fancy" che non risolve un problema reale, abituato a lavorare in team distribuiti, code review serrate e merge protette su `main`.

---

## Esperienza

### 🟧 Biorsaf — Senior Fullstack Engineer

**Maggio 2025 — oggi** · Italia (remoto)

Biorsaf sviluppa piattaforme SaaS verticali su **HACCP, sicurezza alimentare, audit interni e compliance IoT** per grandi clienti GDO (Conad Nord Ovest, Carrefour, brand food enterprise). L'ecosistema include più app mobile (B2B field), backoffice web, microservizi Java, microfrontend in Module Federation e una piattaforma infrastrutturale multi-account su AWS.

**Ruolo trasversale fullstack** sui prodotti chiave del gruppo:

#### Conad Nord Ovest (BS-CONAD)

- **Riscritto da zero il backoffice web** da CRA + React 16 + MUI v4 + JS a stack moderno: **TanStack Start + React 19 + TanStack Router/Query/Table/Form + Zod v4 + shadcn/ui + Tailwind v4 + Vite 7**. Architettura SPA, file-based routing, Suspense + loader queries, Zustand per auth, axios con interceptors, search params come single source of truth per paginazione/sorting/filtri, generic `<DataTable>` server-side, design system Conad-brandizzato.
- **App mobile in Expo + React Native** (Expo SDK 51, RN 0.74, React Navigation, react-native-paper, react-native-pdf, react-hook-form, react-query, Zustand, expo-camera, expo-notifications, expo-secure-store) con build EAS sia local sia cloud, doppio target dev/prod, distribuzione APK + App Store / Play Store.
- **Backend Spring Boot 2.3 / Java 8** (monolite con ~150 servizi, JPA/Hibernate, Flyway). Contributi principali:
  - **Migrazione completa da storage locale a S3** con autenticazione **IRSA** (IAM Roles for Service Accounts) — zero credenziali statiche.
  - **Introdotto OpenTelemetry** (javaagent in Docker, traces verso SigNoz).
  - **Pipeline di generazione PDF** (PDFBox + OpenHTMLToPDF + JSoup + Thymeleaf) con stati di salvataggio asincroni, scheduler di recovery per job stuck, polling lato FE.
  - **Read/write splitting** del database con HikariCP, replica routing trasparente, leak detection.
  - **Graceful shutdown**, health probes (liveness/readiness), JVM tuning container-aware.
  - **Feature IoT**: device management, auto-assign al reparto responsabile, grant client-side, mock per development.
  - **Push notifications** via expo-server-sdk dal backend Java.

#### BS-SAFE App (Field App HACCP per ispettori)

- App **Expo SDK 53 + React 19 + RN 0.79** con stack moderno: **expo-router v5, NativeWind 4, react-native-mmkv, react-native-reanimated 4, react-native-keyboard-controller, react-hook-form + Zod, react-query, Sentry, i18next, FullCalendar, Maestro per E2E**.
- Refactor logica calendario mobile (selettore mese/anno, swap buttons), gestione allegati, BottomSheet flow, GridList al posto di FlatList per performance, tests con jest-expo + Testing Library.
- Build multi-environment (development / staging / production) con EAS, deploy web via Docker per backoffice complementare.

#### BS-FOOD (App enterprise food safety, legacy che evolve)

- Estensioni feature "scheda" (nuovi tipi, logica di validazione, navigazione), maintenance Expo + RN, fix UI cross-version.

#### Microfrontend Federation (BS-SAFE-MODULES-MF)

- Architettura **Nx 22 + React 19 + Module Federation + React Bridge** per esporre microfrontend (`payments`, `remoteStore`) consumati anche da host legacy in **React 16** (BS-Food). Stack: **Zustand vanilla store condiviso, SWR + Axios, MUI + Tailwind, Jest + RTL**. Deploy su S3 + CloudFront con `remoteEntry.js` versionati.

#### Audit Carrefour (PoC fullstack)

- Piattaforma di audit interno con workflow ticket (`OPEN → SUBMITTED → VALIDATED → CLOSED`), task correttivi con scadenze, allegati, notifiche automatiche, ruoli L1/L2/L3.
- Stack: **Vite + React + TS + Tailwind + TanStack Query** (FE), **Next.js API Routes + Prisma + SQLite/Postgres + Zod** (BE) in monorepo pnpm.

#### Copilot AI (BS-COPILOT)

- Microservizio **Spring Boot 3.4 + Java 17** + frontend **Next.js 15 + AI SDK + assistant-ui + OpenAI** per un assistant integrato nei prodotti.

#### BS-AUDIT (legacy)

- Maintenance backend Spring Boot 2.3 / Java 8 e frontend CRA + MUI v4.

#### Infrastruttura (DevOps / Platform)

- **Terraform multi-account AWS** (`bs-infra-core`): AWS Organizations, account `management / audit / dev / staging / prod`, CloudTrail centralizzato, IAM SSO, moduli VPC / RDS / Redis / ECR / Bastion / EKS, pipeline CodePipeline tipizzate (Java, MFE, SPA, Python, DB migration, deploy), monitoring (rds-monitoring, eks-node-monitoring, eks-eol-notifier).
- **Deploy EKS** (`bs-eks-deployment`): modulo Terraform `eks-release-template` riusabile per tutte le release Kubernetes, Helm, External Secrets Operator, AWS Load Balancer Controller, dashboard SigNoz, ConfigMap/Secret per env. Owner di tutte le release del cluster (auth, auditlog, conad-be, conad-fe, food, food-fe, haccpagent, payments, iot-compliance, copilot, MFE, app web).
- **Docker multi-stage** per tutti i servizi Java (build con Maven 3.8 + OpenJDK 8/17, runtime su `eclipse-temurin-jre`, OTEL agent integrato, user non-root, JVM tuning `UseContainerSupport` + `MaxRAMPercentage`).
- **CI/CD Bitbucket Pipelines** + EAS submit automatico per le mobile.

#### Altri side / R&D interni

- **Biodread Digitizer** (PoC personale / interno): backend **NestJS + BullMQ + Prisma + Redis** che digitalizza PDF arbitrari estraendo parametri strutturati via **Claude Opus** (Anthropic), con fallback **vision multimodale** quando il testo machine-readable è insufficiente, retry/backoff, mock mode per dev a costo zero.

---

### 🔵 Rexolcom — Software Engineer (poi Senior)

**2018 — Maggio 2025** · Italia

7 anni come engineer su prodotti enterprise, principalmente in ambito **food safety / HACCP / compliance**, sugli stessi prodotti che ho poi continuato a evolvere in Biorsaf (BS-FOOD, BS-AUDIT, BS-CONAD, BS-SAFE app). Crescita progressiva da contributi mirati FE/mobile a ownership di feature complete fullstack e mentoring tecnico.

**Stack quotidiano:** React 16 + MUI v4 + react-table v6 + react-router 5, Expo SDK ≤51 + React Native ≤0.74, Spring Boot 2.3 + Java 8 + Hibernate, PostgreSQL, AWS S3, Bitbucket.

**Highlights:**

- Sviluppo e maintenance di **app field React Native** distribuite a clienti enterprise (consulenti HACCP, esercenti food, supermercati GDO), con flussi offline-tolerant, gestione documentale (PDF, foto, firme), camera, push notifications, deep linking.
- Backoffice CRA per amministrazione esercizi commerciali, manuali HACCP personalizzati, controlli di conformità, log generators, gestione abbonamenti, integrazione PayPal.
- Generazione PDF lato server (manuali HACCP custom per cliente, log non conformità, report controlli) con template Thymeleaf + PDFBox.
- Integrazioni con dispositivi IoT per il monitoraggio frigoriferi/temperature.
- Migrazione di parti dello storage da filesystem locale a AWS S3.
- Code review, mentoring junior, definizione standard FE/BE.

---

## Competenze tecniche

### Mobile

- **React Native + Expo** (SDK 51 → 53, RN 0.74 → 0.79) — verticalità forte
- expo-router v5, React Navigation v6/v7
- NativeWind 4 / Tailwind, react-native-paper, MUI mobile patterns
- react-native-mmkv, AsyncStorage, expo-secure-store
- react-native-reanimated 4, gesture-handler, BottomSheet (gorhom), keyboard-controller
- expo-camera, expo-image-picker, expo-notifications, expo-file-system, expo-sharing
- react-native-pdf, react-native-webview
- EAS Build (local + cloud), EAS Submit, multi-variant (dev/staging/prod), build APK/IPA
- Sentry, i18next, react-i18next
- Testing: jest-expo, Testing Library RN, Maestro per E2E

### Frontend Web

- **React 19** + Hooks moderni (`use`, `useActionState`, `useOptimistic`)
- **TanStack ecosystem**: Router, Query v5, Table v8, Form, Start
- **Next.js 15** (App Router, Turbopack, AI SDK)
- **Module Federation** (Nx 22 + React Bridge)
- **TypeScript strict** (no `any`, no cast, `satisfies` over `as`)
- shadcn/ui + Radix primitives, Tailwind v4 (CSS-first), MUI v4/v5, NativeWind
- **Zod v4** per schema/validation, **react-hook-form** / TanStack Form
- **Zustand** (client/persist/vanilla), SWR, axios con interceptors
- Vite 7, Webpack (Module Federation), CRA legacy
- Testing: Vitest, Playwright, Jest + RTL
- Design system, brand theming, accessibilità (Radix + ARIA), dark mode
- Generic data-tables server-side con pagination/sort/filter via search params

### Backend

- **Spring Boot 2.3 / 3.4**, **Java 8 / 17**
- JPA/Hibernate, Spring Data REST, Flyway, ShedLock (scheduler distribuiti)
- Spring Security, OAuth2 Resource Server, JWT (jjwt)
- AWS SDK v2 (S3, STS, SSO) con **IRSA**
- PDF generation: PDFBox, OpenHTMLToPDF, JSoup, Thymeleaf
- Push: expo-server-sdk, PayPal Checkout SDK
- Springdoc OpenAPI, Spring Retry, WebFlux
- Testcontainers (Postgres) per integration test
- HikariCP read/write splitting, graceful shutdown, container-aware JVM tuning
- Maven multi-module monorepo (parent + shared libs)
- **Node.js / NestJS** + BullMQ + Prisma + Redis (worker async, job queue)
- LLM integration: Anthropic Claude (text + vision), OpenAI via AI SDK

### Cloud / DevOps

- **AWS**: EKS, S3, IAM (IRSA, SSO), VPC, RDS Postgres, ElastiCache Redis, ECR, CloudTrail, AWS Organizations multi-account, CodePipeline, CloudFront, ACM, Route 53
- **Kubernetes**: Deployment, Service, Ingress, ServiceAccount, ConfigMap, Secret, HPA, probes, External Secrets Operator, AWS Load Balancer Controller, Helm
- **Terraform** (>=1.5): moduli riusabili, state remoto S3, multi-account stacks, bootstrap del backend chicken-and-egg
- **Docker** multi-stage, distroless/jre images, OTEL agent injection
- **Observability**: OpenTelemetry (autoinstrumentation Java), SigNoz, dashboard custom
- **CI/CD**: Bitbucket Pipelines, EAS, build pipelines tipizzate per linguaggio (Java/Python/SPA/MFE)

### Database

- PostgreSQL (production, replica, transaction routing)
- SQLite (dev), Prisma, JPA query, native SQL, indici, dump/restore

### Tooling / Workflow

- Git (trunk-based + feature branches + PR review), Bitbucket
- Cursor / Claude Code, MCP (Atlassian, Context7, Stripe, Figma)
- Monorepo: pnpm workspaces, Nx 22, Maven multi-module
- Conventional commits, Husky, lint-staged, Prettier, ESLint flat config, TypeScript strict

---

## Lingue

- **Italiano** — madrelingua
- **Inglese** — Ottimo (codebase, doc, review e tooling tutti in inglese)

---

## Soft skills

- Ownership end-to-end: dal Figma al pod in produzione
- Capacità di modernizzare prodotti legacy senza interrompere il business (rewrite Conad backoffice è il case più recente)
- A mio agio sia in monolite Spring sia in microservizi + microfrontend
- Code review costruttiva, allergico al "magic code" non motivato

---

## Disponibilità

- **Lavoro:** remoto preferito, ibrido OK, full-time
- **Trasferta:** valutabile per progetti specifici
- **Ruoli di interesse:** Senior Fullstack, Mobile Lead (RN/Expo), Frontend Architect, Platform / Cloud Engineer

---

_Versione aggiornata su [leonardo.is-a.dev](https://leonardo.is-a.dev)._
