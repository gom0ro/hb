import { motion } from 'framer-motion'
import { Languages } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const languages = ['en', 'ru', 'kk', 'uz'] as const

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const current = i18n.language

  function changeLanguage(lng: string) {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        className="group relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Switch language"
      >
        <Languages className="h-4 w-4 text-white" />
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white/90 opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-sm">
          {current.toUpperCase()}
        </span>
      </motion.button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 sm:right-0 left-0 sm:left-auto top-full mt-2 min-w-[130px] rounded-xl border border-white/[0.08] bg-black/90 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
        >
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/10 flex items-center gap-2 ${
                current === lang ? 'text-white' : 'text-muted'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${current === lang ? 'bg-blue-500' : 'bg-transparent'}`} />
              {t(`language.${lang}`)}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}
