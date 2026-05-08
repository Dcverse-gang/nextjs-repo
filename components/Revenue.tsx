'use client'
// components/Revenue.tsx — Three revenue streams with 3D card tilt (client component)
// Only needs 'use client' for the mousemove tilt interaction.

import { useEffect } from 'react'
import { revenueCards } from '@/lib/data'
import Image from 'next/image'

function useTilt(selector: string) {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(selector)

    function onMove(this: HTMLElement, e: MouseEvent) {
      const rect = this.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      this.style.transform = `translateY(-4px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`
    }
    function onLeave(this: HTMLElement) {
      this.style.transform = ''
      this.style.transition = 'transform var(--dur-fast) var(--ease)'
    }
    function onEnter(this: HTMLElement) {
      this.style.transition = 'none'
    }

    cards.forEach((card) => {
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      card.addEventListener('mouseenter', onEnter)
    })

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
        card.removeEventListener('mouseenter', onEnter)
      })
    }
  }, [selector])
}

export default function Revenue() {
  useTilt('.rev-card')

  return (
    <section className="revenue" aria-labelledby="revenue-heading">
      <div className="section-tag reveal" style={{ justifyContent: 'center' }}>
        Revenue Streams
      </div>
      <h2 id="revenue-heading" className="reveal reveal-delay-1">
        One clone. Three revenue streams.
      </h2>
      <p className="reveal reveal-delay-2">
        Revenue you&apos;d never have time to earn — running simultaneously.
      </p>

      <div className="revenue-cards">
        {revenueCards.map((card, i) => (
          <article key={card.title} className={`rev-card reveal reveal-delay-${i + 1}`}>
            <div className={`rev-img ${card.tint}`} aria-hidden="true">
              <Image
                src={card.image}
                alt={card.title}
                width={640}
                height={360}
                className="rev-media"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0'
                }}
              />
            </div>
            <h4>{card.title}</h4>
            <p>{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
