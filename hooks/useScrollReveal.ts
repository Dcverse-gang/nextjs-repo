'use client'
// ─── hooks/useScrollReveal.ts ───────────────────────────────────────────────
// Returns a ref. Attach it to any element — once it enters the viewport,
// the `visible` class is added and the ref is unobserved (fires once).

import { useEffect, useRef } from 'react'

interface Options {
  threshold?: number
  rootMargin?: string
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
) {
  const ref = useRef<T>(null)
  const { threshold = 0.1, rootMargin = '0px 0px -32px 0px' } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}
