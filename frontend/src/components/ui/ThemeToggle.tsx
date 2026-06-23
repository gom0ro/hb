import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<string>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  if (!mounted) return null

  return (
    <motion.button
      onClick={toggleTheme}
      className="group relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'dark' ? (
          <Moon className="h-4 w-4 text-white" />
        ) : (
          <Sun className="h-4 w-4 text-black" />
        )}
      </motion.div>
      
      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white/90 opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-sm">
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </span>
    </motion.button>
  )
}
