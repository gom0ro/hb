import { useSyncExternalStore } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { TrustStrip } from './components/sections/TrustStrip'
import { Services } from './components/sections/Services'
import { Projects } from './components/sections/Projects'
import { TechStack } from './components/sections/TechStack'
import { About } from './components/sections/About'
import { FAQ } from './components/sections/FAQ'
import { ContactForm } from './components/sections/ContactForm'
import { ShadowOverlay } from './components/ui/ShadowOverlay'
import { StaticBackground } from './components/ui/StaticBackground'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { SEO } from './components/ui/SEO'
import { Analytics } from './components/ui/Analytics'
import { ScrollToTop } from './components/ui/ScrollToTop'

function getIsMobile() {
  return typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0)
}

function subscribeIsMobile(cb: () => void) {
  window.addEventListener('resize', cb)
  return () => window.removeEventListener('resize', cb)
}

function App() {
  const isMobile = useSyncExternalStore(subscribeIsMobile, getIsMobile, () => false)

  return (
    <ErrorBoundary>
      <SEO />
      <Analytics />
      {isMobile ? (
        <StaticBackground />
      ) : (
        <ShadowOverlay
          animation={{ scale: 30, speed: 50 }}
          noise={{ opacity: 0.15, scale: 1 }}
          color="rgba(0, 112, 243, 0.3)"
          sizing="fill"
        />
      )}
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Projects />
        <TechStack />
        <About />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTop />
    </ErrorBoundary>
  )
}

export default App
