import { GitBranch, Zap, FolderGit2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useRef, useEffect, useState } from 'react'
import { metrics } from '../../data/content'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { motion } from 'framer-motion'

export function TrustStrip() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const logos = [
    { icon: FolderGit2, label: t('trust.openSource') },
    { icon: GitBranch, label: t('trust.cicd') },
    { icon: Zap, label: t('trust.performance') },
  ]
  return (
    <section ref={sectionRef} className="border-y border-white/[0.06] bg-surface relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={inView ? { opacity: [0.3, 0.5, 0.3] } : { opacity: 0.4 }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={inView ? { opacity: [0.2, 0.4, 0.2] } : { opacity: 0.3 }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 relative z-10">
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-12 flex-wrap">
              {logos.map(({ icon: Icon, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex items-center gap-2.5 text-muted transition-colors hover:text-white cursor-default"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="h-5 w-5 transition-colors hover:text-white" strokeWidth={1.5} />
                  </motion.div>
                  <span className="text-sm font-medium">{label}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 sm:gap-10 lg:gap-16 flex-wrap">
              {metrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-center lg:text-right cursor-default group"
                >
                  <motion.p 
                    className="text-2xl font-semibold tracking-tight text-white"
                    whileHover={{ color: '#0070f3', scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {metric.value}
                  </motion.p>
                  <motion.p 
                    className="text-xs text-muted mt-1 transition-colors group-hover:text-white/70"
                  >
                    {metric.label === 'Projects delivered' ? t('trust.projectsDelivered') :
                     metric.label === 'Response time' ? t('trust.responseTime') :
                     t('trust.uptime')}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
