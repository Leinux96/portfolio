import { useEffect, useRef } from 'react'

const SPACING = 44
const RADIUS = 300
const MAX_PULL = 20
const SWIRL = 7
const SAMPLE = 10
const IDLE_MS = 1600

/**
 * Blueprint grid on canvas, deformed like a gravity well around the cursor:
 * line vertices get pulled toward the pointer (with a slight tangential
 * swirl), and a radial highlight warms the bent region. The rAF loop parks
 * itself once the field relaxes, so an idle page costs nothing.
 */
export default function GravityGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let width = 0
    let height = 0

    // Raw pointer, smoothed pointer, and eased field strength.
    let mx = -9999
    let my = -9999
    let sx = -9999
    let sy = -9999
    let strength = 0
    let targetStrength = 0
    let lastMove = 0
    let raf = 0
    let running = false

    const colors = () =>
      document.documentElement.classList.contains('dark')
        ? { base: 'rgba(230, 240, 245, 0.05)', hot: '94, 234, 212' }
        : { base: 'rgba(10, 20, 24, 0.07)', hot: '15, 118, 110' }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const warp = (x: number, y: number): [number, number] => {
      const dx = x - sx
      const dy = y - sy
      const d = Math.hypot(dx, dy)
      if (d >= RADIUS || d < 0.5) return [x, y]
      const t = 1 - d / RADIUS
      const ease = t * t * (3 - 2 * t)
      const pull = Math.min(MAX_PULL * ease * strength, d * 0.8)
      const swirl = SWIRL * ease * strength
      const nx = dx / d
      const ny = dy / d
      return [x - nx * pull - ny * swirl, y - ny * pull + nx * swirl]
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const { base, hot } = colors()
      const reach = RADIUS + MAX_PULL
      const active = strength > 0.004 && sx > -reach

      const far = new Path2D()
      const near = new Path2D()

      for (let x = 0; x <= width + SPACING; x += SPACING) {
        if (!active || Math.abs(x - sx) > reach) {
          far.moveTo(x, 0)
          far.lineTo(x, height)
          continue
        }
        near.moveTo(...warp(x, 0))
        for (let y = SAMPLE; y <= height + SAMPLE; y += SAMPLE) {
          near.lineTo(...warp(x, Math.min(y, height)))
        }
      }
      for (let y = 0; y <= height + SPACING; y += SPACING) {
        if (!active || Math.abs(y - sy) > reach) {
          far.moveTo(0, y)
          far.lineTo(width, y)
          continue
        }
        near.moveTo(...warp(0, y))
        for (let x = SAMPLE; x <= width + SAMPLE; x += SAMPLE) {
          near.lineTo(...warp(Math.min(x, width), y))
        }
      }

      ctx.lineWidth = 1
      ctx.strokeStyle = base
      ctx.stroke(far)
      ctx.stroke(near)

      if (active) {
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, RADIUS)
        glow.addColorStop(0, `rgba(${hot}, ${0.22 * strength})`)
        glow.addColorStop(0.55, `rgba(${hot}, ${0.08 * strength})`)
        glow.addColorStop(1, `rgba(${hot}, 0)`)
        ctx.strokeStyle = glow
        ctx.stroke(near)
      }
    }

    const loop = () => {
      sx += (mx - sx) * 0.14
      sy += (my - sy) * 0.14
      strength += (targetStrength - strength) * 0.07

      draw()

      const settled =
        Math.abs(mx - sx) < 0.3 &&
        Math.abs(my - sy) < 0.3 &&
        Math.abs(targetStrength - strength) < 0.004 &&
        (targetStrength === 0 || performance.now() - lastMove > IDLE_MS)
      if (settled && targetStrength === 0) {
        strength = 0
        draw()
        running = false
        return
      }
      if (settled) {
        running = false
        return
      }
      raf = requestAnimationFrame(loop)
    }

    const wake = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (sx < -1000) {
        sx = mx
        sy = my
      }
      targetStrength = 1
      lastMove = performance.now()
      if (!reduceMotion) wake()
    }

    const onPointerLeave = () => {
      targetStrength = 0
      if (!reduceMotion) wake()
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        running = false
      } else if (!reduceMotion && strength > 0) {
        wake()
      }
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduceMotion) {
      document.addEventListener('pointermove', onPointerMove, {
        passive: true,
      })
      document.documentElement.addEventListener('pointerleave', onPointerLeave)
      document.addEventListener('visibilitychange', onVisibility)
    }

    // Redraw on theme switch so line colors follow.
    const observer = new MutationObserver(() => draw())
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener(
        'pointerleave',
        onPointerLeave,
      )
      document.removeEventListener('visibilitychange', onVisibility)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}
