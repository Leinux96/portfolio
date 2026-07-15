import Header from './Header'
import Footer from './Footer'
import Hero from './Hero'
import CaseStudies from './CaseStudies'
import Projects from './Projects'
import Skills from './Skills'
import Services from './Services'
import Contact from './Contact'
import type { Locale } from '#/content/schema'

export default function Page({ locale }: { locale: Locale }) {
  return (
    <>
      <Header locale={locale} />
      <main className="page-wrap">
        <Hero locale={locale} />
        <CaseStudies locale={locale} />
        <Projects locale={locale} />
        <Skills locale={locale} />
        <Services locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
