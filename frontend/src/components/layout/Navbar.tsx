import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

export function Navbar() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setMenuOpen(false)
    window.addEventListener('scroll', onScroll, { once: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [menuOpen])

  const close = useCallback(() => setMenuOpen(false), [])

  const navLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.work'), href: '#work' },
    { label: t('nav.stack'), href: '#stack' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.faq'), href: '#faq' },
    { label: t('nav.aboutRequest'), href: '#contact' },
  ]

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.06, duration: 0.3, ease: 'easeOut' as const } }),
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-b border-[var(--color-border)] bg-[var(--color-background)]/60 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--color-background)]/60">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors duration-300 group-hover:border-[var(--color-border-hover)]">
              <div className="h-2.5 w-2.5 rotate-45 bg-[var(--color-foreground)] transition-transform duration-500 group-hover:rotate-180" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-[var(--color-foreground)]">ItHub</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:transition-all ${
                  activeSection === link.href
                    ? 'text-[var(--color-foreground)] after:w-full after:bg-[var(--color-foreground)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)] after:w-0 after:bg-[var(--color-foreground)] hover:after:w-full'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            <Button href="#contact" variant="primary" className="!px-3 !py-1.5 sm:!px-4 sm:!py-2 text-xs hidden sm:inline-flex">
              {t('nav.startProject')}
            </Button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] transition-all hover:bg-[var(--color-accent-glow)] hover:border-[var(--color-border-hover)] md:hidden focus-visible:outline-2 focus-visible:outline-accent"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.span
                className="flex flex-col items-center justify-center gap-[5px]"
                animate={menuOpen ? 'open' : 'closed'}
              >
                <motion.span
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } }}
                  className="block h-[1.5px] w-[18px] bg-[var(--color-foreground)] rounded-full origin-center"
                />
                <motion.span
                  variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                  className="block h-[1.5px] w-[18px] bg-[var(--color-foreground)] rounded-full"
                />
                <motion.span
                  variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } }}
                  className="block h-[1.5px] w-[18px] bg-[var(--color-foreground)] rounded-full origin-center"
                />
              </motion.span>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 bottom-0 w-[280px] md:hidden border-l border-[var(--color-border)] bg-[var(--color-surface-elevated)]/95 backdrop-blur-2xl shadow-2xl"
            >
              <div className="flex flex-col px-5 pt-20 pb-6 gap-1 h-full overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className={`rounded-xl px-4 py-3.5 text-sm font-medium transition-all active:scale-[0.98] ${
                      activeSection === link.href
                        ? 'text-[var(--color-foreground)] bg-[var(--color-accent-glow)]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-accent-glow)]'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.div
                  custom={navLinks.length}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-auto px-4 pt-6 border-t border-[var(--color-border)]"
                >
                  <a
                    href="#contact"
                    onClick={close}
                    className="block w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3.5 text-center text-sm font-medium text-white transition-all hover:shadow-[0_10px_40px_rgba(0,112,243,0.4)] active:scale-[0.98]"
                  >
                    {t('nav.startProject')}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
