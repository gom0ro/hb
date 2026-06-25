import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { SiReact, SiTypescript, SiC, SiFastapi, SiPostgresql, SiPython, SiNextdotjs, SiDocker, SiRedis, SiDjango, SiNodedotjs, SiVuedotjs } from 'react-icons/si'
import { techStack } from '../../data/content'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { SectionHeader } from '../ui/SectionHeader'

const techIcons: Record<string, React.ElementType> = {
  React: SiReact,
  TypeScript: SiTypescript,
  C: SiC,
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  Python: SiPython,
  'Next.js': SiNextdotjs,
  Docker: SiDocker,
  Redis: SiRedis,
  Django: SiDjango,
  'Node.js': SiNodedotjs,
  Vue: SiVuedotjs,
}

const techGradients: Record<string, string> = {
  React: 'from-sky-400/30 to-cyan-500/30',
  TypeScript: 'from-blue-500/30 to-indigo-500/30',
  C: 'from-blue-400/30 to-gray-400/30',
  FastAPI: 'from-emerald-400/30 to-green-500/30',
  PostgreSQL: 'from-blue-400/30 to-indigo-600/30',
  Python: 'from-yellow-400/30 to-blue-500/30',
  'Next.js': 'from-white/20 to-zinc-400/20',
  Docker: 'from-blue-400/30 to-sky-500/30',
  Redis: 'from-red-400/30 to-rose-500/30',
  Django: 'from-emerald-500/30 to-teal-600/30',
  'Node.js': 'from-lime-400/30 to-green-500/30',
  Vue: 'from-emerald-400/30 to-green-500/30',
}

const borderColors: Record<string, string> = {
  React: 'border-sky-500/30',
  TypeScript: 'border-blue-500/30',
  C: 'border-blue-400/30',
  FastAPI: 'border-emerald-400/30',
  PostgreSQL: 'border-blue-400/30',
  Python: 'border-yellow-400/30',
  'Next.js': 'border-zinc-400/30',
  Docker: 'border-blue-400/30',
  Redis: 'border-red-400/30',
  Django: 'border-emerald-500/30',
  'Node.js': 'border-lime-400/30',
  Vue: 'border-emerald-400/30',
}

function getTranslationKey(name: string): string {
  if (name === 'Next.js') return 'nextjs'
  if (name === 'Node.js') return 'nodejs'
  return name.toLowerCase()
}

const INITIAL_VISIBLE = 4

export function TechStack() {
  const { t } = useTranslation()
  const [showAll, setShowAll] = useState(() => window.matchMedia('(min-width: 640px)').matches)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const handler = (e: MediaQueryListEvent) => setShowAll(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const visible = showAll ? techStack : techStack.slice(0, INITIAL_VISIBLE)

  return (
    <section id="stack" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <SectionHeader
            label={t('techStack.label')}
            title={t('techStack.title')}
            description={t('techStack.description')}
          />
        </RevealOnScroll>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((tech, i) => {
            const Icon = techIcons[tech.name]
            const gradient = techGradients[tech.name]
            const border = borderColors[tech.name]
            return (
              <RevealOnScroll key={tech.name} delay={i * 0.04}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`group flex flex-col gap-3 rounded-xl border bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] ${border}`}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} border ${border}`}
                    >
                      {Icon && <Icon className="h-4 w-4 text-white/80" />}
                    </motion.div>
                    <span className="text-sm font-semibold text-white">{tech.name}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted transition-colors group-hover:text-white/70">
                    {t(`techStack.${getTranslationKey(tech.name)}`)}
                  </p>
                </motion.div>
              </RevealOnScroll>
            )
          })}
        </div>

        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] py-3 text-sm text-muted transition-all duration-300 hover:bg-white/[0.06] hover:text-white sm:hidden"
        >
          <span>{showAll ? t('techStack.showLess') : t('techStack.showAll')}</span>
          <motion.span
            animate={{ rotate: showAll ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </button>
      </div>
    </section>
  )
}
