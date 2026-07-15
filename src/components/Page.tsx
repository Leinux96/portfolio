import { useEffect } from 'react'
import GravityGrid from './GravityGrid'
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
  // Cursor-follow glow on .glow-card elements, single delegated listener.
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!(e.target instanceof Element)) return
      const card = e.target.closest('.glow-card')
      if (!(card instanceof HTMLElement)) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      card.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }
    document.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => document.removeEventListener('pointermove', onPointerMove)
  }, [])

  return (
    <>
      <GravityGrid />
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
