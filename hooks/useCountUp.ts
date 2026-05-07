'use client'
// ─── hooks/useCountUp.ts ────────────────────────────────────────────────────
// Animates a number from 0 to `target` using ease-out cubic via rAF.
// Triggers once the element enters view (threshold 0.6).

import { useEffect, useRef, useState } from 'react'

interface Options {
  target: number
  suffix?: string
  duration?: number
  threshold?: number
}

export function useCountUp({ target, suffix = '', duration = 1400, threshold = 0.6 }: Options) {
  const ref = useRef<HTMLElement>(null)
  const [display, setDisplay] = useState(`0${suffix}`)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()

          const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = target * eased
            const formatted = Number.isInteger(target)
              ? Math.round(current).toString()
              : current.toFixed(1)
            setDisplay(`${formatted}${suffix}`)
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, duration, threshold])

  return { ref, display }
}
