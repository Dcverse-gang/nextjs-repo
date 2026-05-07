// components/CTA.tsx — Final call-to-action section (server component)

export default function CTA() {
  return (
    <section className="final-cta" id="cta" aria-labelledby="cta-heading">
      <div className="section-tag reveal" style={{ justifyContent: 'center' }}>Ready?</div>
      <h2 id="cta-heading" className="reveal reveal-delay-1">
        Ready to clone<br />
        <span className="grad">yourself?</span>
      </h2>
      <p className="reveal reveal-delay-2">Join the next era of public figure monetization.</p>
      <div className="hero-ctas reveal reveal-delay-3">
        <a
          href="https://app.cloneos.io"
          className="btn-primary"
        >
          I&apos;m Talent — Create My Clone
        </a>
        <a
          href="https://app.cloneos.io"
          className="btn-secondary"
        >
          I&apos;m a Production
        </a>
      </div>
    </section>
  )
}
