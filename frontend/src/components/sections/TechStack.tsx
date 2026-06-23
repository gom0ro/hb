import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { techStack } from '../../data/content'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { SectionHeader } from '../ui/SectionHeader'

export function TechStack() {
  const { t } = useTranslation()
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

        <div className="grid gap-3 bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {techStack.map((tech, i) => (
            <RevealOnScroll key={tech.name} delay={i * 0.06}>
              <motion.div
                whileHover={{ 
                  scale: 1.01,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="flex items-center justify-between bg-surface px-6 py-5 transition-all duration-300 hover:bg-surface-elevated"
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03] transition-all"
                  >
                    <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">
                      {tech.name.charAt(0)}
                    </span>
                  </motion.div>
                  <span className="text-sm font-medium text-white">{tech.name}</span>
                </div>
                <span className="text-sm text-muted hidden sm:block transition-colors group-hover:text-white/70">{t(`techStack.${tech.name === 'Tailwind CSS' ? 'tailwind' : tech.name.toLowerCase()}`)}</span>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
