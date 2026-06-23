interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl mb-16 ${alignClass}`}>
      {label && (
        <p className="text-xs font-medium uppercase tracking-widest text-muted mb-4">
          {label}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-base text-muted leading-relaxed">{description}</p>
      )}
    </div>
  )
}
