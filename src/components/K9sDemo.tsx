import { useEffect, useRef, useState } from 'react'
import { cn } from '#/lib/utils'

type PodName = 'auth' | 'payments' | 'copilot' | 'iot-compliance'

type Pod = {
  name: PodName
  id: string
  ready: string
  status: 'Running' | 'CrashLoopBackOff' | 'ContainerCreating'
  restarts: number
}

const INITIAL_PODS: Pod[] = [
  {
    name: 'auth',
    id: 'auth-7f9cd4',
    ready: '1/1',
    status: 'Running',
    restarts: 0,
  },
  {
    name: 'payments',
    id: 'payments-5d21af',
    ready: '1/1',
    status: 'Running',
    restarts: 0,
  },
  {
    name: 'copilot',
    id: 'copilot-b7a394',
    ready: '0/1',
    status: 'CrashLoopBackOff',
    restarts: 4,
  },
  {
    name: 'iot-compliance',
    id: 'iot-compliance-91ef',
    ready: '1/1',
    status: 'Running',
    restarts: 0,
  },
]

const LOGS: Record<PodName, string[]> = {
  auth: [
    'INFO  TokenService — issued 214 tokens (last 5m)',
    'INFO  health probe ok (liveness)',
  ],
  payments: [
    'INFO  StripeWebhook — evt_1Q… processed',
    'INFO  SQS queue drained (0 pending)',
  ],
  copilot: [
    'ERROR java.lang.OutOfMemoryError: Java heap space',
    '  at ai.embeddings.VectorCache.load(VectorCache.java:88)',
    'WARN  container restarted (backoff 40s)',
  ],
  'iot-compliance': [
    'INFO  probe sync ok — 132 sensors',
    'INFO  cold-chain report generated',
  ],
}

const RESTART_ID = 'copilot-e4c1d2'

const RESTART_LOGS = [
  'INFO  Starting CopilotApplication v2.4.1 — heap 1024m → 2048m',
  'INFO  Spring AI initialized (provider: anthropic)',
  'INFO  VectorCache warmed — 48k embeddings loaded',
  'INFO  readiness probe ok',
  'INFO  ✓ started in 6.2s — 0 restarts',
]

export default function K9sDemo() {
  const [pods, setPods] = useState(INITIAL_PODS)
  const [cursor, setCursor] = useState(2)
  const [view, setView] = useState<'list' | 'logs'>('list')
  const [fixed, setFixed] = useState(false)
  const [streamed, setStreamed] = useState(0)
  const streamTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (streamTimer.current) clearInterval(streamTimer.current)
    }
  }, [])

  const selected = pods[cursor]
  const crashing = selected.status === 'CrashLoopBackOff'
  const streaming = fixed && streamed < RESTART_LOGS.length

  function move(delta: number) {
    setView('list')
    setCursor((c) => (c + delta + pods.length) % pods.length)
  }

  function showLogs() {
    setView('logs')
  }

  function fix() {
    if (!crashing || fixed) return
    setFixed(true)
    // New instance: fresh id, restart counter reset, follows the logs live.
    setPods((prev) =>
      prev.map((p) =>
        p.name === 'copilot'
          ? {
              ...p,
              id: RESTART_ID,
              status: 'ContainerCreating',
              ready: '0/1',
              restarts: 0,
            }
          : p,
      ),
    )
    setCursor(pods.findIndex((p) => p.name === 'copilot'))
    setView('logs')

    streamTimer.current = setInterval(() => {
      setStreamed((n) => {
        const next = n + 1
        // Readiness probe passes -> pod flips to Running.
        if (next === 4) {
          setPods((prev) =>
            prev.map((p) =>
              p.name === 'copilot'
                ? { ...p, status: 'Running', ready: '1/1' }
                : p,
            ),
          )
        }
        if (next >= RESTART_LOGS.length && streamTimer.current) {
          clearInterval(streamTimer.current)
          streamTimer.current = null
        }
        return next
      })
    }, 650)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
      case 'j':
        move(1)
        break
      case 'ArrowUp':
      case 'k':
        move(-1)
        break
      case 'l':
      case 'Enter':
        showLogs()
        break
      case 'r':
        fix()
        break
      case 'Escape':
        setView('list')
        break
      default:
        return
    }
    e.preventDefault()
  }

  const allGreen = pods.every((p) => p.status === 'Running')

  return (
    <div
      role="application"
      aria-label="k9s demo — use arrow keys, l for logs, r to restart"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="k9s mono cursor-default text-[0.6rem] leading-[1.6] outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-line)]"
    >
      <div className="flex items-center justify-between text-[var(--ink-faint)]">
        <span>
          Context: <span className="text-[var(--accent)]">biorsaf-prod</span>
        </span>
        <span>k9s v0.32</span>
      </div>

      <div className="k9s-frame mt-1.5">
        <p className="k9s-title m-0">
          {view === 'list'
            ? ` Pods(prod)[${pods.length}] `
            : ` logs(${selected.id}) `}
        </p>

        {view === 'list' ? (
          <div className="pt-1">
            <p className="m-0 whitespace-pre px-2 text-[var(--ink-faint)]">
              {'NAME'.padEnd(22) + 'READY'.padEnd(7) + 'STATUS'.padEnd(19)}RS
            </p>
            {pods.map((pod, i) => (
              <button
                key={pod.name}
                type="button"
                onClick={() => {
                  setCursor(i)
                  setView('logs')
                }}
                className={cn(
                  'block w-full cursor-pointer whitespace-pre px-2 text-left',
                  i === cursor && 'bg-[var(--accent-soft)]',
                )}
              >
                <span className="text-[var(--ink)]">
                  {pod.id.padEnd(22)}
                  {pod.ready.padEnd(7)}
                </span>
                <span
                  className={
                    pod.status === 'Running'
                      ? 'text-[var(--accent)]'
                      : pod.status === 'ContainerCreating'
                        ? 'text-[var(--ink-soft)]'
                        : 'text-red-400'
                  }
                >
                  {pod.status.padEnd(19)}
                </span>
                <span className="text-[var(--ink-soft)]">{pod.restarts}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="px-2 pt-1">
            {(selected.name === 'copilot' && fixed
              ? RESTART_LOGS.slice(0, streamed)
              : LOGS[selected.name]
            ).map((line) => (
              <p
                key={line}
                className={cn(
                  'm-0 whitespace-pre-wrap',
                  line.startsWith('ERROR')
                    ? 'text-red-400'
                    : line.startsWith('WARN')
                      ? 'text-amber-400'
                      : line.includes('✓')
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--ink-soft)]',
                )}
              >
                {line}
              </p>
            ))}
            {selected.name === 'copilot' && streaming ? (
              <p className="m-0 animate-pulse text-[var(--accent)]">▊</p>
            ) : null}
          </div>
        )}
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[var(--ink-faint)]">
        <button type="button" className="k9s-key" onClick={() => move(1)}>
          <span>↑↓</span> navigate
        </button>
        <button type="button" className="k9s-key" onClick={showLogs}>
          <span>l</span> logs
        </button>
        {view === 'logs' ? (
          <button
            type="button"
            className="k9s-key"
            onClick={() => setView('list')}
          >
            <span>esc</span> back
          </button>
        ) : null}
        {crashing && !fixed ? (
          <button type="button" className="k9s-key k9s-key-alert" onClick={fix}>
            <span>r</span> restart w/ more heap
          </button>
        ) : null}
        {allGreen && fixed && !streaming ? (
          <span className="text-[var(--accent)]">✓ prod is green again</span>
        ) : null}
      </div>
    </div>
  )
}
