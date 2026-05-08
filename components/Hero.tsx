'use client'
// components/Hero.tsx — Above-the-fold section with animated counters

import Link from 'next/link'
import { useCountUp } from '@/hooks/useCountUp'
import { heroStats } from '@/lib/data'

// Individual animated stat — renders a counter or static value
function Stat({ value, label, animateTo, suffix }: (typeof heroStats)[0]) {
  const { ref, display } = useCountUp({
    target: animateTo ?? 0,
    suffix: suffix ?? '',
    duration: 1400,
  })

  return (
    <div className="stat">
      <h3
        ref={animateTo !== undefined ? (ref as React.RefObject<HTMLHeadingElement>) : undefined}
        aria-label={`${value} — ${label}`}
      >
        {animateTo !== undefined ? display : value}
      </h3>
      <p>{label}</p>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero" aria-label="Hero section">
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-badge" role="status">
        <span className="dot" aria-hidden="true" />
        Now onboarding public figures &amp; production houses
      </div>

      <h1>
        Clone your likeness.<br />
        <span className="grad">Infinite reach.</span>
      </h1>

      <p className="hero-kicker">
        Licensed AI clone platform · consent-first · 60+ languages
      </p>

      <p className="hero-sub">
        Earn passive revenue from every campaign, dub, and appearance — without a single extra shoot day.
      </p>

      <div className="hero-ctas">
        <Link href="https://app.cloneos.io" className="btn-primary">Create Your Clone</Link>
        <Link href="https://app.cloneos.io" className="btn-secondary">License a Clone</Link>
      </div>

      <div className="hero-stats" aria-label="Platform statistics">
        {heroStats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}
