import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Zap, ShieldCheck, TrendingUp, Eye, Lightbulb, Handshake } from 'lucide-react'
import { philosophy } from '../../data/content'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { SectionHeader } from '../ui/SectionHeader'

const icons = [Zap, ShieldCheck, TrendingUp, Eye, Lightbulb, Handshake]
const gradients = [
  'from-blue-500/20 to-cyan-500/20',
  'from-purple-500/20 to-pink-500/20',
  'from-emerald-500/20 to-teal-500/20',
  'from-orange-500/20 to-rose-500/20',
  'from-violet-500/20 to-indigo-500/20',
  'from-yellow-500/20 to-amber-500/20',
]
const accentGradients = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-rose-500',
  'from-violet-500 to-indigo-500',
  'from-yellow-500 to-amber-500',
]

export function About() {
  const { t } = useTranslation()
  return (
    <section id="about" className="py-32 border-t border-white/[0.06] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <RevealOnScroll>
          <SectionHeader
            label={t('about.label')}
            title={t('about.title')}
            description={t('about.description')}
          />
        </RevealOnScroll>

        <div className="grid gap-6 sm:grid-cols-2 mt-2">
          {philosophy.map((item, i) => {
            const key = item.title === 'Speed' ? 'speed' :
              item.title === 'Quality' ? 'quality' :
              item.title === 'Scalability' ? 'scalability' :
              item.title === 'UX Focus' ? 'ux' :
              item.title === 'Innovation' ? 'innovation' : 'collaboration'
            const Icon = icons[i]
            return (
            <RevealOnScroll key={item.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
                className={`group relative rounded-2xl border border-white/[0.06] bg-surface p-7 transition-all duration-500 hover:border-white/15 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] overflow-hidden`}
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[i]} border border-white/10`}>
                      <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                    </div>
                    <span className={`text-4xl font-bold bg-gradient-to-r ${accentGradients[i]} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500 select-none`}>
                      {`0${i + 1}`}
                    </span>
                  </div>
                  <div className={`mb-4 h-1 w-10 rounded-full bg-gradient-to-r ${accentGradients[i]} opacity-60`} />
                  <h3 className="text-lg font-semibold text-white mb-2.5 group-hover:text-blue-400 transition-colors">
                    {t(`about.${key}`)}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed group-hover:text-muted/80 transition-colors">
                    {t(`about.${key}Text`)}
                  </p>
                </div>
              </motion.div>
            </RevealOnScroll>
            )})}
        </div>
      </div>
    </section>
  )
}
