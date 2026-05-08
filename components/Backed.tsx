'use client'
// components/Backed.tsx — "Powered by" stagger reveal (client component for IO stagger)

import { useEffect, useRef } from 'react'
import { backedLogos } from '@/lib/data'

export default function Backed() {
  const logosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = logosRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="backed" aria-label="Technology partners">
      <p>Powered by</p>
      <div className="backed-logos" ref={logosRef}>
        {backedLogos.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>
    </section>
  )
}
