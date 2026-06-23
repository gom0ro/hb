import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant
  href?: string
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-white text-black hover:bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300',
  secondary:
    'bg-transparent text-white border border-white/15 hover:border-white/30 hover:bg-white/5 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300',
  ghost: 'bg-transparent text-muted hover:text-white hover:bg-white/5 hover:scale-105 transition-all duration-300',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', children, href, ...props }, ref) => {
    const classes = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium ${variants[variant]} ${className}`

    if (href) {
      return (
        <motion.a
          href={href}
          className={classes}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    )
  },
)

Button.displayName = 'Button'
