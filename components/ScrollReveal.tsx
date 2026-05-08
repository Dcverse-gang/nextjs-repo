'use client'
// components/ScrollReveal.tsx — Client wrapper that boots the global
// IntersectionObserver for all .reveal / .reveal-left / .reveal-right /
// .reveal-fade elements on the page.
//
// Rendered once in page.tsx; all scroll-reveal CSS classes work automatically
// without each component needing its own observer.

import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const selector = '.reveal, .reveal-left, .reveal-right, .reveal-fade'

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    )

    // Observe all existing elements
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Renders nothing — purely a side-effect component
  return null
}
