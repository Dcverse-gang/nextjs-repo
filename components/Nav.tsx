'use client'
// components/Nav.tsx — Fixed navigation bar with compact-on-scroll + active link tracking

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  { href: '#agents', label: 'How It Works' },
  { href: '#talent', label: 'For Public Figures' },
  { href: '#productions', label: 'For Productions' },
  { href: '#faq', label: 'FAQ' },
]

export default function Nav() {
  const [compact, setCompact] = useState(false)
  const [activeId, setActiveId] = useState('')
  const progressRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Grab hero glow for parallax (it lives in Hero.tsx but we reference via DOM)
    glowRef.current = document.querySelector<HTMLDivElement>('.hero-glow')

    function onScroll() {
      const y = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight

      // Scroll progress bar
      if (progressRef.current && docH > 0) {
        progressRef.current.style.transform = `scaleX(${y / docH})`
      }

      // Nav compact mode
      setCompact(y > 60)

      // Hero glow parallax
      if (glowRef.current) {
        glowRef.current.style.transform = `translateX(-50%) translateY(${y * 0.25}px)`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Highlight nav link matching currently-visible section
    const trackedElements = NAV_ITEMS
      .map(({ href }) => href.replace('#', ''))
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id)
        })
      },
      { threshold: 0.4 }
    )
    trackedElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      <nav aria-label="Main navigation" className={compact ? 'compact' : ''}>
        <Link href="/" className="nav-logo" aria-label="CloneOS home">
          Clone<span>OS</span>
        </Link>

        <div className="nav-links" role="menubar">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              role="menuitem"
              style={activeId && href === `#${activeId}` ? { color: 'var(--accent)' } : {}}
            >
              {label}
            </Link>
          ))}

          <Link href="https://app.cloneos.io" className="nav-cta" role="menuitem">
            Get Started
          </Link>
        </div>
      </nav>
    </>
  )
}
