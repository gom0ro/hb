import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { projects } from '../../data/content'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { SectionHeader } from '../ui/SectionHeader'

export function Projects() {
  const { t } = useTranslation()

  return (
    <section id="work" className="py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <SectionHeader
            label={t('projects.label')}
            title={t('projects.title')}
            description={t('projects.description')}
          />
        </RevealOnScroll>

        <div className="grid gap-8 lg:grid-cols-3">
          {projects.map((project, i) => {
            const projectKey = project.title === 'Analytics Dashboard' ? 'analytics' :
              project.title === 'SaaS Booking Platform' ? 'booking' : 'ecommerce'
            return (
            <RevealOnScroll key={project.title} delay={i * 0.1}>
              <motion.div
                className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-surface overflow-hidden h-full w-full text-left transition-all duration-500 hover:border-white/15 hover:shadow-[0_25px_80px_rgba(0,0,0,0.4)] hover:-translate-y-3"
                whileHover={{ y: -12 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div
                  className={`relative h-48 bg-gradient-to-br ${project.gradient} border-b border-white/[0.06] transition-transform duration-700 group-hover:scale-110`}
                >
                  <div className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: `linear-gradient(45deg, currentColor 1px, transparent 1px), linear-gradient(-45deg, currentColor 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                    >
                      <ArrowUpRight className="h-12 w-12 text-white/90" />
                    </motion.div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-60">
                    <div className="w-3/4 rounded-lg border border-white/[0.08] bg-black/40 backdrop-blur-sm p-4 shadow-2xl">
                      <div className="flex gap-1.5 mb-3">
                        <div className="h-2 w-2 rounded-full bg-white/20" />
                        <div className="h-2 w-2 rounded-full bg-white/20" />
                        <div className="h-2 w-2 rounded-full bg-white/20" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-full rounded bg-white/10" />
                        <div className="h-2 w-2/3 rounded bg-white/10" />
                        <div className="h-2 w-1/2 rounded bg-white/10" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 flex gap-1.5">
                    <div className={`h-6 w-6 rounded-md border border-white/[0.12] bg-white/5 flex items-center justify-center text-[10px] text-white/40`}>
                      {project.stack[0].charAt(0)}
                    </div>
                    <div className={`h-6 w-6 rounded-md border border-white/[0.12] bg-white/5 flex items-center justify-center text-[10px] text-white/40`}>
                      {project.stack[1].charAt(0)}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="flex flex-col flex-1 p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">{t(`projects.${projectKey}`)}</h3>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ArrowUpRight className="h-5 w-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </motion.div>
                  </div>

                  <div className="space-y-3 flex-1 text-sm">
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wider text-muted/70">
                        {t('projects.problem')}
                      </span>
                      <p className="text-muted mt-1 leading-relaxed">{t(`projects.${projectKey}Problem`)}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wider text-muted/70">
                        {t('projects.solution')}
                      </span>
                      <p className="text-muted mt-1 leading-relaxed">{t(`projects.${projectKey}Solution`)}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wider text-emerald-400/70">
                        {t('projects.result')}
                      </span>
                      <p className="text-white/80 mt-1 leading-relaxed">{t(`projects.${projectKey}Result`)}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/[0.06]">
                    {project.stack.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-xs text-muted hover:text-white hover:border-white/20 transition-colors cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          )})}
        </div>
      </div>
    </section>
  )
}
