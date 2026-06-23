import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Project {
  title: string
  problem: string
  solution: string
  result: string
  stack: string[]
  gradient: string
}

interface ProjectModalProps {
  project: Project
  projectKey: string
  onClose: () => void
}

export function ProjectModal({ project, projectKey, onClose }: ProjectModalProps) {
  const { t } = useTranslation()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-surface shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className={`relative h-56 bg-gradient-to-br ${project.gradient}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 rounded-lg border border-white/[0.08] bg-black/40 backdrop-blur-sm p-5 shadow-2xl">
              <div className="flex gap-1.5 mb-3">
                <div className="h-2 w-2 rounded-full bg-white/20" />
                <div className="h-2 w-2 rounded-full bg-white/20" />
                <div className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <div className="space-y-2">
                <div className="h-2.5 w-full rounded bg-white/10" />
                <div className="h-2.5 w-2/3 rounded bg-white/10" />
                <div className="h-2.5 w-1/2 rounded bg-white/10" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">
              {t(`projects.${projectKey}`)}
            </h3>
            <ArrowUpRight className="h-5 w-5 text-muted" />
          </div>

          <div className="space-y-5">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-muted/70">
                {t('projects.problem')}
              </span>
              <p className="text-muted mt-1.5 leading-relaxed text-sm">
                {t(`projects.${projectKey}Problem`)}
              </p>
            </div>
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-muted/70">
                {t('projects.solution')}
              </span>
              <p className="text-muted mt-1.5 leading-relaxed text-sm">
                {t(`projects.${projectKey}Solution`)}
              </p>
            </div>
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-emerald-400/70">
                {t('projects.result')}
              </span>
              <p className="text-white/80 mt-1.5 leading-relaxed text-sm">
                {t(`projects.${projectKey}Result`)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-white/[0.06]">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
