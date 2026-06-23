import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimatedGrid } from '../ui/AnimatedGrid'
import { Button } from '../ui/Button'

export function Hero() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(true)
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reduced) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <AnimatedGrid />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 mb-8 backdrop-blur-sm animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs text-muted">{t('hero.available')}</span>
          </div>
        </motion.div>

        <motion.h1
          className="mx-auto max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="gradient-text">
            {t('hero.headline')}
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto max-w-xl text-lg text-muted leading-relaxed mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {t('hero.fullstack')}{' '}
          <span className="text-[var(--color-foreground)]/80 hover:text-[var(--color-foreground)] transition-colors cursor-pointer">React</span>,{' '}
          <span className="text-[var(--color-foreground)]/80 hover:text-[var(--color-foreground)] transition-colors cursor-pointer">TypeScript</span>,{' '}
          <span className="text-[var(--color-foreground)]/80 hover:text-[var(--color-foreground)] transition-colors cursor-pointer">FastAPI</span> &{' '}
          <span className="text-[var(--color-foreground)]/80 hover:text-[var(--color-foreground)] transition-colors cursor-pointer">PostgreSQL</span>
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <Button href="#contact" variant="primary" className="!px-6 !py-3 group">
            {t('hero.startProject')}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button href="#work" variant="secondary" className="!px-6 !py-3">
            {t('hero.viewWork')}
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {!reduced && (
        <>
          <motion.div
            className="absolute top-1/4 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
            animate={inView ? { y: [0, -20, 0], x: [0, 20, 0] } : { y: -10, x: 10 }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"
            animate={inView ? { y: [0, 30, 0], x: [0, -20, 0] } : { y: 15, x: -10 }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      )}
    </section>
  )
}
