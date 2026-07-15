import { useEffect, useRef, useState } from 'react'
import { cn } from '#/lib/utils'

type PodName = 'auth' | 'payments' | 'copilot' | 'iot-compliance'
type PodStatus = 'Running' | 'CrashLoopBackOff' | 'ContainerCreating'

type Pod = {
  name: PodName
  id: string
  ready: string
  status: PodStatus
  restarts: number
}

type View = 'pods' | 'deploy' | 'logs' | 'edit'
/**
 * crash    — copilot is OOMKilled, initial state
 * recrash  — pod was deleted, replacement crashed again (same limits)
 * rollout  — deployment edited, new ReplicaSet rolling out
 * green    — fixed
 */
type Stage = 'crash' | 'recrash' | 'rollout' | 'green'

const INITIAL_PODS: Pod[] = [
  { name: 'auth', id: 'auth-7f9cd4', ready: '1/1', status: 'Running', restarts: 0 },
  { name: 'payments', id: 'payments-5d21af', ready: '1/1', status: 'Running', restarts: 0 },
  { name: 'copilot', id: 'copilot-b7a394', ready: '0/1', status: 'CrashLoopBackOff', restarts: 4 },
  { name: 'iot-compliance', id: 'iot-compliance-91ef', ready: '1/1', status: 'Running', restarts: 0 },
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
    'WARN  Back-off restarting failed container',
  ],
  'iot-compliance': [
    'INFO  probe sync ok — 132 sensors',
    'INFO  cold-chain report generated',
  ],
}

const ROLLOUT_POD_ID = 'copilot-6d9f4b'

const ROLLOUT_LOGS = [
  'INFO  Starting CopilotApplication v2.4.1 — max heap 1536m',
  'INFO  Spring AI initialized (provider: anthropic)',
  'INFO  VectorCache warmed — 48k embeddings loaded',
  'INFO  readiness probe ok',
  'INFO  ✓ started in 6.2s — 0 restarts',
]

const DEPLOY_STATIC = [
  { name: 'auth', age: '12d' },
  { name: 'payments', age: '12d' },
  { name: 'copilot', age: '3h' },
  { name: 'iot-compliance', age: '12d' },
] as const

export default function K9sDemo() {
  const [pods, setPods] = useState(INITIAL_PODS)
  const [view, setView] = useState<View>('pods')
  const [cursor, setCursor] = useState(2)
  const [stage, setStage] = useState<Stage>('crash')
  const [cmdMode, setCmdMode] = useState(false)
  const [cmdBuffer, setCmdBuffer] = useState('')
  const [cmdError, setCmdError] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [streamed, setStreamed] = useState(0)

  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([])
  useEffect(() => {
    const t = timers.current
    return () => t.forEach(clearTimeout)
  }, [])
  const after = (ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms))
  }

  const selected = pods[cursor]
  const copilotIndex = pods.findIndex((p) => p.name === 'copilot')
  const streaming = stage === 'rollout' && streamed < ROLLOUT_LOGS.length

  const patchCopilot = (patch: Partial<Pod>) => {
    setPods((prev) =>
      prev.map((p) => (p.name === 'copilot' ? { ...p, ...patch } : p)),
    )
  }

  /* ctrl-d on the crashing pod: kubectl delete pod. The Deployment spawns a
     replacement with the same limits — which OOMs again. */
  function deletePod() {
    setConfirmDelete(false)
    setStage('recrash')
    patchCopilot({ id: 'copilot-f2a9c1', status: 'ContainerCreating', ready: '0/1', restarts: 0 })
    after(900, () => patchCopilot({ status: 'Running', ready: '1/1' }))
    after(2300, () =>
      patchCopilot({ status: 'CrashLoopBackOff', ready: '0/1', restarts: 1 }),
    )
  }

  /* e on deploy/copilot: edit resources (memory 1Gi -> 2Gi), apply triggers
     a rollout: new ReplicaSet, new pod, streaming startup logs. */
  function applyEdit() {
    setStage('rollout')
    patchCopilot({ id: ROLLOUT_POD_ID, status: 'ContainerCreating', ready: '0/1', restarts: 0 })
    setCursor(copilotIndex)
    setView('logs')
    const tick = (n: number) => {
      after(650 * n, () => {
        setStreamed(n)
        if (n === 4) patchCopilot({ status: 'Running', ready: '1/1' })
        if (n === ROLLOUT_LOGS.length) setStage('green')
      })
    }
    for (let n = 1; n <= ROLLOUT_LOGS.length; n++) tick(n)
  }

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase()
    setCmdMode(false)
    setCmdBuffer('')
    if (['deploy', 'deployments', 'dp'].includes(cmd)) {
      setView('deploy')
      setCursor(copilotIndex)
    } else if (['pods', 'po', 'pod'].includes(cmd)) {
      setView('pods')
    } else if (cmd !== '') {
      setCmdError(`🚫 unknown resource: ${cmd}`)
      after(1600, () => setCmdError(''))
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (cmdMode) {
      if (e.key === 'Enter') runCommand(cmdBuffer)
      else if (e.key === 'Escape') {
        setCmdMode(false)
        setCmdBuffer('')
      } else if (e.key === 'Backspace') setCmdBuffer((b) => b.slice(0, -1))
      else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey)
        setCmdBuffer((b) => (b + e.key).slice(0, 16))
      e.preventDefault()
      return
    }
    if (confirmDelete) {
      if (e.key === 'y') deletePod()
      else if (e.key === 'n' || e.key === 'Escape') setConfirmDelete(false)
      e.preventDefault()
      return
    }
    switch (e.key) {
      case ':':
        setCmdMode(true)
        break
      case 'ArrowDown':
      case 'j':
        if (view === 'pods' || view === 'deploy')
          setCursor((c) => (c + 1) % pods.length)
        break
      case 'ArrowUp':
      case 'k':
        if (view === 'pods' || view === 'deploy')
          setCursor((c) => (c - 1 + pods.length) % pods.length)
        break
      case 'l':
      case 'Enter':
        if (view === 'pods') setView('logs')
        else if (view === 'edit') applyEdit()
        break
      case 'd':
        if (e.ctrlKey && view === 'pods' && selected.name === 'copilot')
          setConfirmDelete(true)
        break
      case 'e':
        if (view === 'deploy' && selected.name === 'copilot') setView('edit')
        break
      case 'Escape':
        if (view === 'logs') setView('pods')
        else if (view === 'edit') setView('deploy')
        break
      default:
        return
    }
    e.preventDefault()
  }

  const title =
    view === 'pods'
      ? ` Pods(prod)[${pods.length}] `
      : view === 'deploy'
        ? ` Deployments(prod)[${pods.length}] `
        : view === 'logs'
          ? ` logs(${selected.id}) `
          : ' edit(deploy/copilot) '

  const logLines =
    selected.name === 'copilot' && stage !== 'crash' && stage !== 'recrash'
      ? ROLLOUT_LOGS.slice(0, streamed)
      : LOGS[selected.name]

  return (
    <div
      role="application"
      aria-label="k9s demo — arrows navigate, l logs, ctrl-d delete pod, : command mode"
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

      {cmdMode ? (
        <p className="m-0 mt-1 text-[var(--accent)]">
          &gt; :{cmdBuffer}
          <span className="animate-pulse">▊</span>
          <span className="ml-2 text-[var(--ink-faint)]">
            try :deploy or :pods — enter to run
          </span>
        </p>
      ) : null}
      {cmdError ? (
        <p className="m-0 mt-1 text-red-400">{cmdError}</p>
      ) : null}
      {confirmDelete ? (
        <p className="m-0 mt-1 text-amber-400">
          Delete pod {selected.id}? (y/n)
        </p>
      ) : null}

      <div className="k9s-frame mt-1.5">
        <p className="k9s-title m-0">{title}</p>

        {view === 'pods' ? (
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
        ) : view === 'deploy' ? (
          <div className="pt-1">
            <p className="m-0 whitespace-pre px-2 text-[var(--ink-faint)]">
              {'NAME'.padEnd(17) + 'READY'.padEnd(7) + 'UP-TO-DATE'.padEnd(12) + 'AVAILABLE'.padEnd(11)}AGE
            </p>
            {DEPLOY_STATIC.map((dep, i) => {
              const pod = pods[i]
              const up = pod.status === 'Running'
              return (
                <button
                  key={dep.name}
                  type="button"
                  onClick={() => {
                    setCursor(i)
                    if (dep.name === 'copilot' && stage !== 'green')
                      setView('edit')
                  }}
                  className={cn(
                    'block w-full cursor-pointer whitespace-pre px-2 text-left',
                    i === cursor && 'bg-[var(--accent-soft)]',
                  )}
                >
                  <span className="text-[var(--ink)]">
                    {dep.name.padEnd(17)}
                  </span>
                  <span
                    className={up ? 'text-[var(--accent)]' : 'text-red-400'}
                  >
                    {(up ? '1/1' : '0/1').padEnd(7)}
                  </span>
                  <span className="text-[var(--ink-soft)]">
                    {'1'.padEnd(12)}
                    {(up ? '1' : '0').padEnd(11)}
                  </span>
                  <span className="text-[var(--ink-faint)]">{dep.age}</span>
                </button>
              )
            })}
          </div>
        ) : view === 'edit' ? (
          <div className="px-2 pt-1 text-[var(--ink-soft)]">
            <p className="m-0 text-[var(--ink-faint)]">
              # deploy/copilot — spec.template.spec.containers[0]
            </p>
            <p className="m-0">env:</p>
            <p className="m-0">- name: JAVA_TOOL_OPTIONS</p>
            <p className="m-0">
              {'  value: '}
              <span className="text-red-400 line-through">"-Xmx768m"</span>{' '}
              <span className="text-[var(--accent)]">"-Xmx1536m"</span>
            </p>
            <p className="m-0">resources:</p>
            <p className="m-0">{'  limits:'}</p>
            <p className="m-0">
              {'    memory: '}
              <span className="text-red-400 line-through">1Gi</span>{' '}
              <span className="text-[var(--accent)]">2Gi</span>
            </p>
          </div>
        ) : (
          <div className="px-2 pt-1">
            {logLines.map((line) => (
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
        <button
          type="button"
          className="k9s-key"
          onClick={() => setCmdMode(true)}
        >
          <span>:</span> cmd
        </button>
        {view === 'pods' || view === 'deploy' ? (
          <button
            type="button"
            className="k9s-key"
            onClick={() => setCursor((c) => (c + 1) % pods.length)}
          >
            <span>↑↓</span> navigate
          </button>
        ) : null}
        {view === 'pods' ? (
          <button
            type="button"
            className="k9s-key"
            onClick={() => setView('logs')}
          >
            <span>l</span> logs
          </button>
        ) : null}
        {view === 'pods' &&
        selected.name === 'copilot' &&
        (stage === 'crash' || stage === 'recrash') ? (
          <button
            type="button"
            className="k9s-key k9s-key-alert"
            onClick={() => setConfirmDelete(true)}
          >
            <span>ctrl-d</span> delete
          </button>
        ) : null}
        {view === 'deploy' && selected.name === 'copilot' && stage !== 'green' ? (
          <button
            type="button"
            className="k9s-key k9s-key-alert"
            onClick={() => setView('edit')}
          >
            <span>e</span> edit resources
          </button>
        ) : null}
        {view === 'edit' ? (
          <button type="button" className="k9s-key" onClick={applyEdit}>
            <span>enter</span> apply — rollout
          </button>
        ) : null}
        {view === 'logs' || view === 'edit' ? (
          <button
            type="button"
            className="k9s-key"
            onClick={() => setView(view === 'edit' ? 'deploy' : 'pods')}
          >
            <span>esc</span> back
          </button>
        ) : null}
        {stage === 'recrash' && pods[copilotIndex].status === 'CrashLoopBackOff' ? (
          <span className="text-amber-400">
            same limits, same OOM — fix the deployment: :deploy
          </span>
        ) : null}
        {stage === 'green' ? (
          <span className="text-[var(--accent)]">
            ✓ rollout complete — prod is green
          </span>
        ) : null}
      </div>
    </div>
  )
}
