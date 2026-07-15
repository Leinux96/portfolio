import { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from '#/lib/useInView'

export default function CountUp({ value }: { value: string }) {
  const match = /^(\d+)(.*)$/.exec(value)
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : ''
  const { ref, inView } = useInView<HTMLSpanElement>(0.4)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion()) {
      setCurrent(target)
      return
    }
    const duration = 1100
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])

  if (!match) return <span>{value}</span>

  return (
    <span ref={ref}>
      {current}
      {suffix}
    </span>
  )
}
