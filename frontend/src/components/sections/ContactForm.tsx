import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { useState, useRef, useEffect, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { submitLead } from '../../lib/api'
import { RevealOnScroll } from '../ui/RevealOnScroll'

export function ContactForm() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [description, setDescription] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      await submitLead({ name, contact, description, honeypot })
      setStatus('success')
      setName('')
      setContact('')
      setDescription('')
    } catch (err) {
      setStatus('error')
      const msg = err instanceof Error ? err.message : ''
      const errorMap: Record<string, string> = {
        'Invalid submission': t('contact.invalidSubmission'),
        'Invalid Telegram username': t('contact.invalidTelegram'),
        'Description too short': t('contact.descTooShort'),
      }
      setErrorMsg(errorMap[msg] || msg || t('contact.errorMsg'))
    }
  }

  return (
    <section id="contact" className="py-32">
      <div ref={sectionRef} className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,112,243,0.08),transparent_60%)]" />
            
            {/* Decorative elements */}
            <motion.div
              animate={inView ? { rotate: [0, 10, 0] } : { rotate: 5 }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"
            />
            <motion.div
              animate={inView ? { rotate: [360, 0] } : { rotate: 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"
            />

            <div className="relative grid lg:grid-cols-2 gap-12 p-8 sm:p-12 lg:p-16">
              <div>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-xs font-medium uppercase tracking-widest text-muted mb-4"
                >
                  {t('contact.getInTouch')}
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4"
                >
                  {t('contact.title')}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-muted leading-relaxed mb-8"
                >
                  {t('contact.description')}
                </motion.p>
                <motion.ul 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  {[t('contact.freeConsultation'), t('contact.fixedPrice'), t('contact.nda')].map(
                    (item, i) => (
                      <motion.li 
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-2.5 text-sm text-muted hover:text-white transition-colors"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        {item}
                      </motion.li>
                    ),
                  )}
                </motion.ul>
              </div>

              {status === 'success' ? (
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <motion.div
                    animate={inView ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : { scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle2 className="h-12 w-12 text-emerald-400 mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('contact.successTitle')}</h3>
                  <p className="text-muted text-sm">{t('contact.successText')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-muted mb-2 transition-colors group-focus-within:text-white">
                      {t('contact.name')}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3 text-sm text-white placeholder:text-muted/50 outline-none transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 hover:border-white/15"
                      placeholder={t('contact.namePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact" className="block text-xs font-medium text-muted mb-2 transition-colors group-focus-within:text-white">
                      {t('contact.telegram')}
                    </label>
                    <input
                      id="contact"
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3 text-sm text-white placeholder:text-muted/50 outline-none transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 hover:border-white/15"
                      placeholder={t('contact.telegramPlaceholder')}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-xs font-medium text-muted mb-2 transition-colors group-focus-within:text-white"
                    >
                      {t('contact.projectDescription')}
                    </label>
                    <textarea
                      id="description"
                      required
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3 text-sm text-white placeholder:text-muted/50 outline-none transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 hover:border-white/15 resize-none"
                      placeholder={t('contact.projectPlaceholder')}
                    />
                  </div>

                  {/* Honeypot — hidden from users, catches bots */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-400"
                    >
                      {errorMsg}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3.5 text-sm font-medium text-white transition-all hover:shadow-[0_10px_40px_rgba(0,112,243,0.4)] hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.getQuote')}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
