import { useEffect, useRef } from 'react'

const SPACING = 44
const RADIUS = 240
const MAX_PULL = 12
const LERP = 0.09
const IDLE_MS = 1800

/**
 * Blueprint grid drawn on canvas: intersection dots gravitate toward the
 * cursor with a soft falloff. The rAF loop parks itself when the field
 * settles, so an idle page costs nothing.
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
    let cols = 0
    let rows = 0
    // Current offsets, flat arrays for speed.
    let ox = new Float32Array(0)
    let oy = new Float32Array(0)

    let mouseX = -9999
    let mouseY = -9999
    let lastMove = 0
    let raf = 0
    let running = false

    const dotColor = () =>
      document.documentElement.classList.contains('dark')
        ? { base: 'rgba(230, 240, 245,', hot: 'rgba(94, 234, 212,' }
        : { base: 'rgba(10, 20, 24,', hot: 'rgba(15, 118, 110,' }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(width / SPACING) + 1
      rows = Math.ceil(height / SPACING) + 1
      ox = new Float32Array(cols * rows)
      oy = new Float32Array(cols * rows)
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const { base, hot } = dotColor()
      let settled = true

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c
          const gx = c * SPACING
          const gy = r * SPACING

          let tx = 0
          let ty = 0
          let t = 0
          if (!reduceMotion) {
            const dx = mouseX - gx
            const dy = mouseY - gy
            const dist = Math.hypot(dx, dy)
            if (dist < RADIUS && dist > 0.01) {
              t = 1 - dist / RADIUS
              const pull = t * t * MAX_PULL
              tx = (dx / dist) * pull
              ty = (dy / dist) * pull
            }
          }

          ox[i] += (tx - ox[i]) * LERP
          oy[i] += (ty - oy[i]) * LERP
          if (settled && (Math.abs(tx - ox[i]) > 0.05 || t > 0)) {
            settled = false
          }

          const alpha = 0.1 + t * 0.45
          ctx.fillStyle = t > 0.02 ? `${hot}${alpha})` : `${base}${alpha})`
          const size = 1 + t * 0.8
          ctx.fillRect(gx + ox[i] - size / 2, gy + oy[i] - size / 2, size, size)
        }
      }
      return settled
    }

    const loop = () => {
      const settled = draw()
      if (settled && performance.now() - lastMove > IDLE_MS) {
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
      mouseX = e.clientX
      mouseY = e.clientY
      lastMove = performance.now()
      if (!reduceMotion) wake()
    }

    const onPointerLeave = () => {
      mouseX = -9999
      mouseY = -9999
      lastMove = performance.now()
      if (!reduceMotion) wake()
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        running = false
      }
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)

    // Redraw on theme switch so dot colors follow.
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
