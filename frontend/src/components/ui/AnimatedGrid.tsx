import { useEffect, useRef } from 'react'

export function AnimatedGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!grid) return
      const { clientX, clientY } = e
      const rect = grid.getBoundingClientRect()
      const x = (clientX - rect.left) / rect.width
      const y = (clientY - rect.top) / rect.height
      
      const intensity = Math.min(Math.max(x * y * 2, 0.3), 1)
      grid.style.setProperty('--mouse-x', `${x}`)
      grid.style.setProperty('--mouse-y', `${y}`)
      grid.style.setProperty('--intensity', `${intensity}`)
    }

    grid.addEventListener('mousemove', handleMouseMove)
    return () => grid.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={gridRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ 
        '--mouse-x': '0.5',
        '--mouse-y': '0.5',
        '--intensity': '0.5',
      } as React.CSSProperties}
    >
      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(color-mix(in srgb, var(--color-foreground) 10%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--color-foreground) 10%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
          transformOrigin: 'top center',
          animation: 'gridMove 20s linear infinite',
        }}
      />
      
      {/* Interactive Gradient Spotlight */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(0,112,243,0.15) 0%, transparent 40%)',
          opacity: 'var(--intensity)',
        }}
      />
      
      {/* Moving Gradient Flow */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, rgba(0,112,243,0.1) 0deg, transparent 120deg, rgba(0,112,243,0.1) 180deg, transparent 300deg)',
          animation: 'gradientFlow 30s linear infinite',
        }}
      />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 noise" />
    </div>
  )
}

