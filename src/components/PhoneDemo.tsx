import { useEffect, useRef, useState } from 'react'
import { Check, CloudUpload, PenLine, Thermometer, Wifi } from 'lucide-react'
import { prefersReducedMotion, useInView } from '#/lib/useInView'
import { cn } from '#/lib/utils'

const STEPS = [
  { icon: Thermometer, label: 'Cold room B — 3.2 °C', meta: 'within range' },
  { icon: CloudUpload, label: 'Attachments uploaded', meta: '3 photos' },
  { icon: PenLine, label: 'Signature captured', meta: 'inspector' },
  { icon: Wifi, label: 'Synced when back online', meta: 'queue: 0' },
]

export default function PhoneDemo() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const [checked, setChecked] = useState<boolean[]>(() =>
    STEPS.map(() => prefersReducedMotion()),
  )
  const touched = useRef(false)

  // Auto-play until the user takes over.
  useEffect(() => {
    if (!inView || prefersReducedMotion()) return
    const id = setInterval(() => {
      if (touched.current) {
        clearInterval(id)
        return
      }
      setChecked((prev) => {
        const next = [...prev]
        const idx = next.indexOf(false)
        if (idx === -1) return STEPS.map(() => false)
        next[idx] = true
        return next
      })
    }, 1300)
    return () => clearInterval(id)
  }, [inView])

  const allDone = checked.every(Boolean)

  function toggle(i: number) {
    touched.current = true
    setChecked((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  return (
    <div ref={ref} className="phone select-none">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="flex items-center justify-between px-4 pt-4">
          <span className="mono text-[0.6rem] font-semibold uppercase tracking-widest text-[var(--accent)]">
            field-app
          </span>
          <span className="mono text-[0.6rem] text-[var(--ink-faint)]">
            v4.13 · prod
          </span>
        </div>
        <p className="px-4 pt-2 text-[0.8rem] font-bold text-[var(--ink)]">
          Daily inspection
        </p>

        <div className="mt-2 flex flex-col gap-1.5 px-3">
          {STEPS.map((step, i) => {
            const isChecked = checked[i]
            const Icon = step.icon
            return (
              <button
                key={step.label}
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={isChecked}
                aria-label={step.label}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2 rounded-[10px] border px-2.5 py-2 text-left transition-all duration-300 active:scale-[0.98]',
                  isChecked
                    ? 'border-[var(--accent-line)] bg-[var(--accent-soft)]'
                    : 'border-[var(--line)] opacity-70 hover:opacity-100',
                )}
              >
                <Icon
                  size={13}
                  className={
                    isChecked
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink-faint)]'
                  }
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.68rem] font-semibold leading-tight text-[var(--ink)]">
                    {step.label}
                  </span>
                  <span className="mono block text-[0.55rem] text-[var(--ink-faint)]">
                    {step.meta}
                  </span>
                </span>
                <span
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300',
                    isChecked
                      ? 'border-transparent bg-[var(--accent)] text-[var(--primary-foreground)]'
                      : 'border-[var(--line-strong)]',
                  )}
                >
                  {isChecked ? <Check size={10} strokeWidth={3} /> : null}
                </span>
              </button>
            )
          })}
        </div>

        <div
          className={cn(
            'mx-3 mt-3 flex items-center gap-2 rounded-[10px] border border-[var(--accent-line)] bg-[var(--bg-raise)] px-2.5 py-2 transition-all duration-500',
            allDone ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          )}
          aria-hidden={!allDone}
        >
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[var(--accent)]" />
          <p className="mono m-0 text-[0.58rem] leading-tight text-[var(--ink-soft)]">
            Inspection closed — synced to backoffice
          </p>
        </div>
      </div>
    </div>
  )
}
