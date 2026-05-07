'use client'
// components/FAQ.tsx — Accordion FAQ using useState (replaces native <details>).
// Using controlled state gives us smooth height animations and single-open behaviour.

import { useState } from 'react'
import Link from 'next/link'
import { faqItems } from '@/lib/data'

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="faq" id="faq" aria-labelledby="faq-heading">
      <div className="faq-inner">
        <div className="section-tag reveal" style={{ justifyContent: 'center' }}>
          Questions
        </div>
        <h2 id="faq-heading" className="reveal reveal-delay-1">
          Everything about AI cloning
        </h2>

        {faqItems.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <details
              key={item.question}
              className="faq-item"
              open={isOpen}
            >
              <summary
                className="faq-q"
                onClick={(e) => {
                  // Prevent native toggle; React state drives open/close
                  e.preventDefault()
                  toggle(i)
                }}
                aria-expanded={isOpen}
              >
                {item.question}
                <span className="faq-chevron">
                  <ChevronIcon />
                </span>
              </summary>

              {isOpen && (
                <p className="faq-a">
                  {item.answer}
                  {item.link && (
                    <>
                      {' '}
                      <Link href={item.link.href} style={{ color: 'var(--accent)' }}>
                        {item.link.label}
                      </Link>
                    </>
                  )}
                </p>
              )}
            </details>
          )
        })}
      </div>
    </section>
  )
}
