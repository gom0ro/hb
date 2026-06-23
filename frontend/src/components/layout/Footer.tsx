import { motion } from 'framer-motion'
import { Code2, Mail, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  const links = [
    { icon: Code2, label: 'GitHub', href: 'https://github.com' },
    { icon: Send, label: 'Telegram', href: 'https://t.me' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@ithub.dev' },
  ]
  return (
    <footer className="border-t border-[var(--color-border)] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] transition-transform hover:rotate-180 duration-500">
              <div className="h-2 w-2 rotate-45 bg-[var(--color-foreground)]" />
            </div>
            <span className="text-sm font-semibold text-[var(--color-foreground)]">ItHub</span>
          </motion.div>

          <div className="flex items-center gap-6">
            {links.map(({ icon: Icon, label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 text-sm text-[var(--color-muted)] transition-all hover:text-[var(--color-foreground)] group"
                aria-label={label}
              >
                <Icon className="h-4 w-4 transition-all group-hover:stroke-[2px]" strokeWidth={1.5} />
                <span className="hidden sm:inline transition-colors group-hover:text-white/90">{label}</span>
              </motion.a>
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs text-[var(--color-muted)]"
          >
            &copy; {new Date().getFullYear()} ItHub. {t('footer.allRights')}
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
