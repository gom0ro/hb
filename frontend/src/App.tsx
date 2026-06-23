import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { TrustStrip } from './components/sections/TrustStrip'
import { Logos3 } from './components/sections/Logos3'
import { Services } from './components/sections/Services'
import { Projects } from './components/sections/Projects'
import { TechStack } from './components/sections/TechStack'
import { About } from './components/sections/About'
import { FAQ } from './components/sections/FAQ'
import { ContactForm } from './components/sections/ContactForm'
import { ShadowOverlay } from './components/ui/ShadowOverlay'

function App() {
  return (
    <>
      <ShadowOverlay
        animation={{ scale: 30, speed: 50 }}
        noise={{ opacity: 0.15, scale: 1 }}
        color="rgba(0, 112, 243, 0.3)"
        sizing="fill"
      />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Logos3 />
        <Services />
        <Projects />
        <TechStack />
        <About />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}

export default App
