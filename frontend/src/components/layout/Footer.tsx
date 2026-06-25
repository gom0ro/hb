import { SiGithub, SiTelegram, SiGmail } from 'react-icons/si'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  const social = [
    { icon: SiGithub, label: 'GitHub', href: 'https://github.com/gom0ro' },
    { icon: SiTelegram, label: 'Telegram', href: 'https://t.me/ithub' },
    { icon: SiGmail, label: 'Email', href: 'mailto:hello@ithub.dev' },
  ]

  const navLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.work'), href: '#work' },
    { label: t('nav.stack'), href: '#stack' },
    { label: t('nav.faq'), href: '#faq' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.aboutRequest'), href: '#contact' },
  ]

  return (
    <footer className="border-t border-[var(--color-border)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8 relative z-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] transition-transform hover:rotate-180 duration-500">
                <div className="h-2.5 w-2.5 rotate-45 bg-[var(--color-foreground)]" />
              </div>
              <span className="text-base font-semibold text-[var(--color-foreground)]">ItHub</span>
            </div>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-4">
              {t('footer.navigation')}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-4">
              {t('footer.contacts')}
            </h4>
            <div className="flex flex-wrap gap-3">
              {social.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-muted)] transition-all hover:text-[var(--color-foreground)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-accent-glow)] active:scale-[0.97]"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} ItHub. {t('footer.allRights')}
          </p>
          <p className="text-xs text-[var(--color-muted)]">
            Built with React, TypeScript & FastAPI
          </p>
        </div>
      </div>
    </footer>
  )
}
