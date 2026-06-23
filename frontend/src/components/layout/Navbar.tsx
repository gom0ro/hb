import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

export function Navbar() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onScroll = () => setMenuOpen(false)
    window.addEventListener('scroll', onScroll, { once: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  const close = useCallback(() => setMenuOpen(false), [])

  const navLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.work'), href: '#work' },
    { label: t('nav.faq'), href: '#faq' },
    { label: t('nav.stack'), href: '#stack' },
    { label: t('nav.about'), href: '#about' },
  ]

  const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.25 } }),
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-black/60 backdrop-blur-xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 transition-colors group-hover:border-white/20 duration-300">
            <div className="h-2.5 w-2.5 rotate-45 bg-white transition-transform duration-500 group-hover:rotate-180" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">devstudio</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-white relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
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
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-white/20 md:hidden focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="flex flex-col gap-1">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5, width: 16 } : { rotate: 0, y: 0, width: 14 }}
                className="block h-px bg-white origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                className="block h-px bg-white"
                style={{ width: 14 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -5, width: 16 } : { rotate: 0, y: 0, width: 10 }}
                className="block h-px bg-white origin-center"
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden border-b border-white/[0.06] bg-black/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col px-4 sm:px-6 py-3 gap-0.5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:text-white hover:bg-white/[0.06] active:bg-white/[0.04]"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                custom={navLinks.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="mt-2 px-4 pt-3 border-t border-white/[0.06]"
              >
                <a
                  href="#contact"
                  onClick={close}
                  className="block w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 text-center text-sm font-medium text-white transition-all hover:shadow-[0_10px_40px_rgba(0,112,243,0.4)]"
                >
                  {t('nav.startProject')}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
