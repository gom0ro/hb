import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const themeRef = useRef<string>('dark')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Theme detection
    const updateTheme = () => {
      themeRef.current = document.documentElement.getAttribute('data-theme') || 'dark'
    }
    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributeFilter: ['data-theme'] })

    let animationFrameId: number
    const particles: Particle[] = []
    let width = canvas.width
    let height = canvas.height

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    // Create particles
    const particleCount = Math.min(window.innerWidth / 10, 100)
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? '#0070f3' : '#00a8ff',
        alpha: Math.random() * 0.3 + 0.1,
      })
    }
    particlesRef.current = particles

    const getThemeColor = () => {
      if (themeRef.current === 'light') {
        return { main: '#0070f3', secondary: '#00a8ff', grid: 'rgba(0,0,0,0.05)' }
      }
      return { main: '#0070f3', secondary: '#00a8ff', grid: 'rgba(255,255,255,0.03)' }
    }

    const drawGrid = () => {
      const themeColor = getThemeColor()
      const gridSize = 64
      const offsetX = (Date.now() / 50) % gridSize
      const offsetY = (Date.now() / 50) % gridSize

      ctx.strokeStyle = themeColor.grid
      ctx.lineWidth = 0.5
      ctx.globalAlpha = 0.3

      for (let x = -offsetX; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = -offsetY; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    const drawParticles = () => {
      const mouse = mouseRef.current
      const themeColor = getThemeColor()

      particles.forEach((particle, i) => {
        // Move
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const pushForce = force * 2
          particle.x -= Math.cos(angle) * pushForce
          particle.y -= Math.sin(angle) * pushForce
        }

        // Boundary check
        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1

        // Draw connection lines
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const alpha = 1 - distance / 100
            ctx.strokeStyle = themeColor.main
            ctx.globalAlpha = alpha * 0.15
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })

        // Draw particle
        ctx.fillStyle = themeColor.main
        ctx.globalAlpha = particle.alpha
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Glow effect
        const glowRadius = particle.size * 3
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glowRadius
        )
        gradient.addColorStop(0, themeColor.main)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.globalAlpha = particle.alpha * 0.5
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw animated gradient background
      const themeColor = getThemeColor()
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      )
      gradient.addColorStop(0, themeColor.main)
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.globalAlpha = 0.05
      ctx.fillRect(0, 0, width, height)

      drawGrid()
      drawParticles()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
