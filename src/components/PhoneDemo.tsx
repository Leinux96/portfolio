import { useEffect, useState } from 'react'
import { Check, CloudUpload, PenLine, Thermometer, Wifi } from 'lucide-react'
import { prefersReducedMotion, useInView } from '#/lib/useInView'
import { cn } from '#/lib/utils'

const STEPS = [
  { icon: Thermometer, label: 'Cold room B — 3.2 °C', meta: 'within range' },
  { icon: CloudUpload, label: 'Attachments uploaded', meta: '3 photos' },
  { icon: PenLine, label: 'Signature captured', meta: 'inspector' },
  { icon: Wifi, label: 'Synced when back online', meta: 'queue: 0' },
]

// Total steps + one tick for the OTA toast, then a pause before looping.
const LOOP_TICKS = STEPS.length + 3

export default function PhoneDemo() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const [tick, setTick] = useState(0)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (!inView || reduced) return
    const id = setInterval(() => {
      setTick((t) => (t + 1) % LOOP_TICKS)
    }, 1300)
    return () => clearInterval(id)
  }, [inView, reduced])

  const done = reduced ? STEPS.length : tick
  const showToast = reduced || tick >= STEPS.length

  return (
    <div ref={ref} className="phone select-none" aria-hidden>
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
            const checked = i < done
            const Icon = step.icon
            return (
              <div
                key={step.label}
                className={cn(
                  'flex items-center gap-2 rounded-[10px] border px-2.5 py-2 transition-all duration-500',
                  checked
                    ? 'border-[var(--accent-line)] bg-[var(--accent-soft)]'
                    : 'border-[var(--line)] opacity-60',
                )}
              >
                <Icon
                  size={13}
                  className={
                    checked ? 'text-[var(--accent)]' : 'text-[var(--ink-faint)]'
                  }
                />
                <div className="min-w-0 flex-1">
                  <p className="m-0 truncate text-[0.68rem] font-semibold leading-tight text-[var(--ink)]">
                    {step.label}
                  </p>
                  <p className="mono m-0 text-[0.55rem] text-[var(--ink-faint)]">
                    {step.meta}
                  </p>
                </div>
                <span
                  className={cn(
                    'flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-500',
                    checked
                      ? 'border-transparent bg-[var(--accent)] text-[var(--primary-foreground)]'
                      : 'border-[var(--line-strong)]',
                  )}
                >
                  {checked ? <Check size={10} strokeWidth={3} /> : null}
                </span>
              </div>
            )
          })}
        </div>

        <div
          className={cn(
            'mx-3 mt-3 flex items-center gap-2 rounded-[10px] border border-[var(--accent-line)] bg-[var(--bg-raise)] px-2.5 py-2 transition-all duration-500',
            showToast ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          )}
        >
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[var(--accent)]" />
          <p className="mono m-0 text-[0.58rem] leading-tight text-[var(--ink-soft)]">
            OTA update applied — no store review needed
          </p>
        </div>
      </div>
    </div>
  )
}
