import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { philosophy } from '../../data/content'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { SectionHeader } from '../ui/SectionHeader'

export function About() {
  const { t } = useTranslation()
  return (
    <section id="about" className="py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <SectionHeader
            label={t('about.label')}
            title={t('about.title')}
            description={t('about.description')}
          />
        </RevealOnScroll>

        <div className="grid gap-6 sm:grid-cols-2">
          {philosophy.map((item, i) => {
            const key = item.title === 'Speed' ? 'speed' :
              item.title === 'Quality' ? 'quality' :
              item.title === 'Scalability' ? 'scalability' : 'ux'
            return (
            <RevealOnScroll key={item.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group rounded-2xl border border-white/[0.06] bg-surface p-8 transition-all duration-500 hover:border-white/15 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">{t(`about.${key}`)}</h3>
                <p className="text-sm text-muted leading-relaxed group-hover:text-muted/80 transition-colors">{t(`about.${key}Text`)}</p>
              </motion.div>
            </RevealOnScroll>
            )})}
        </div>
      </div>
    </section>
  )
}
