import { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from '#/lib/useInView'
import { cn } from '#/lib/utils'

const COMMAND = 'kubectl get pods -n prod'

const PODS = [
  ['auth-7f9cd4', 'Running'],
  ['payments-5d21af', 'Running'],
  ['copilot-b7a394', 'Running'],
  ['iot-compliance-91ef02', 'Running'],
] as const

export default function TerminalDemo() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const reduced = prefersReducedMotion()
  const [typed, setTyped] = useState(reduced ? COMMAND.length : 0)
  const [rows, setRows] = useState(reduced ? PODS.length : 0)

  useEffect(() => {
    if (!inView || reduced) return
    if (typed < COMMAND.length) {
      const id = setTimeout(() => setTyped((n) => n + 1), 45)
      return () => clearTimeout(id)
    }
    if (rows < PODS.length) {
      const id = setTimeout(() => setRows((n) => n + 1), rows === 0 ? 500 : 220)
      return () => clearTimeout(id)
    }
  }, [inView, reduced, typed, rows])

  return (
    <div
      ref={ref}
      className="terminal mono text-[0.62rem] leading-relaxed"
      aria-hidden
    >
      <div className="mb-2 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[var(--line-strong)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--line-strong)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--line-strong)]" />
      </div>
      <p className="m-0 text-[var(--ink)]">
        <span className="text-[var(--accent)]">$ </span>
        {COMMAND.slice(0, typed)}
        <span
          className={cn(
            'terminal-caret',
            typed >= COMMAND.length && rows >= PODS.length && 'opacity-0',
          )}
        />
      </p>
      {PODS.slice(0, rows).map(([name, status]) => (
        <p key={name} className="m-0 text-[var(--ink-soft)]">
          {name.padEnd(24, ' ')}1/1{'  '}
          <span className="text-[var(--accent)]">{status}</span>
        </p>
      ))}
    </div>
  )
}
