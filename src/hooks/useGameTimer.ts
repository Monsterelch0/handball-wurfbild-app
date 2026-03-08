import { useState, useEffect, useRef, useCallback } from 'react'

export type TimerStatus = 'idle' | 'running' | 'paused' | 'halftime' | 'finished'

export interface GameTimerState {
  minute: number
  half: 1 | 2
  status: TimerStatus
  start: () => void
  pause: () => void
  resume: () => void
  nextHalf: () => void
  reset: () => void
}

/** Spielzeit-Timer.
 *  In DEV: 1 Sekunde = 1 Spielminute
 *  In PROD: 60 Sekunden = 1 Spielminute
 */
const TICK_MS = import.meta.env.DEV ? 1000 : 60_000

export function useGameTimer(): GameTimerState {
  const [minute, setMinute]   = useState(0)
  const [half, setHalf]       = useState<1 | 2>(1)
  const [status, setStatus]   = useState<TimerStatus>('idle')
  const intervalRef           = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTicking = useCallback(() => {
    clearTimer()
    intervalRef.current = setInterval(() => {
      setMinute((m) => {
        const max = half === 1 ? 30 : 60
        if (m >= max) {
          clearTimer()
          setStatus(half === 1 ? 'halftime' : 'finished')
          return m
        }
        return m + 1
      })
    }, TICK_MS)
  }, [clearTimer, half])

  // Aufräumen beim Unmount
  useEffect(() => () => clearTimer(), [clearTimer])

  const start = useCallback(() => {
    setMinute(half === 1 ? 0 : 30)
    setStatus('running')
    startTicking()
  }, [half, startTicking])

  const pause = useCallback(() => {
    clearTimer()
    setStatus('paused')
  }, [clearTimer])

  const resume = useCallback(() => {
    setStatus('running')
    startTicking()
  }, [startTicking])

  const nextHalf = useCallback(() => {
    clearTimer()
    setHalf(2)
    setMinute(30)
    setStatus('idle')
  }, [clearTimer])

  const reset = useCallback(() => {
    clearTimer()
    setMinute(0)
    setHalf(1)
    setStatus('idle')
  }, [clearTimer])

  return { minute, half, status, start, pause, resume, nextHalf, reset }
}
