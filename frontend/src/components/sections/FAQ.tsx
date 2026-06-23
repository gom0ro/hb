import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { RevealOnScroll } from '../ui/RevealOnScroll'
import { SectionHeader } from '../ui/SectionHeader'

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5'] as const

export function FAQ() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-3xl px-6">
        <RevealOnScroll>
          <SectionHeader
            label={t('faq.label')}
            title={t('faq.title')}
            description={t('faq.description')}
          />
        </RevealOnScroll>

        <div className="space-y-3">
          {faqKeys.map((key, i) => {
            const isOpen = openIndex === i
            return (
              <RevealOnScroll key={key} delay={i * 0.05}>
                <div className="rounded-2xl border border-white/[0.06] bg-surface overflow-hidden transition-colors duration-300 hover:border-white/15">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="text-base font-medium text-white pr-4">
                      {t(`faq.${key}`)}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-muted" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-0">
                          <p className="text-sm text-muted leading-relaxed">
                            {t(`faq.a${i + 1}`)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
