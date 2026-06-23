import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

export function Navbar() {
  const { t } = useTranslation()

  const navLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.work'), href: '#work' },
    { label: t('nav.faq'), href: '#faq' },
    { label: t('nav.stack'), href: '#stack' },
    { label: t('nav.about'), href: '#about' },
  ]
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-black/60 backdrop-blur-xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 transition-colors group-hover:border-white/20 group-hover:scale-105 transition-transform duration-300">
            <div className="h-2.5 w-2.5 rotate-45 bg-white transition-transform duration-500 group-hover:rotate-180" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-white transition-colors">devstudio</span>
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

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <Button href="#contact" variant="primary" className="!px-4 !py-2 text-xs">
            {t('nav.startProject')}
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}
