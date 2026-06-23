import { motion } from 'framer-motion'
import { Globe, Layers, Layout, BarChart3, Code2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { services } from '../../data/content'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { SectionHeader } from '../ui/SectionHeader'

const iconMap = {
  Globe,
  Layers,
  Layout,
  BarChart3,
  Code2,
} as const

export function Services() {
  const { t } = useTranslation()
  return (
    <section id="services" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <SectionHeader
            label={t('services.label')}
            title={t('services.title')}
            description={t('services.description')}
          />
        </RevealOnScroll>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            const serviceKey = service.icon === 'Globe' ? 'webApps' :
              service.icon === 'Layers' ? 'saas' :
              service.icon === 'Layout' ? 'landingPages' :
              service.icon === 'BarChart3' ? 'dashboards' : 'api'
            return (
              <RevealOnScroll key={service.title} delay={i * 0.08}>
                <motion.div
                  className="group relative rounded-2xl border border-white/[0.06] bg-surface-elevated p-6 h-full transition-all duration-500 hover:border-white/[0.15] hover:bg-surface hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:-translate-y-2"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] transition-all duration-500 group-hover:border-white/[0.15] group-hover:bg-white/[0.06] group-hover:scale-110 group-hover:shadow-lg">
                    <Icon className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2 transition-colors group-hover:text-white/90">{t(`services.${serviceKey}`)}</h3>
                  <p className="text-sm text-muted leading-relaxed group-hover:text-muted/80 transition-colors">{t(`services.${serviceKey}Desc`)}</p>
                  
                  <div className="absolute bottom-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <div className="h-1 w-1 rounded-full bg-white" />
                    </motion.div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
