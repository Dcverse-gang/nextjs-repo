// components/Audiences.tsx — Talent vs Productions two-up cards (server component)
import Link from 'next/link'

export default function Audiences() {
  return (
    <section className="audiences" id="talent" aria-labelledby="audiences-heading">
      <div className="section-tag reveal" style={{ justifyContent: 'center' }}>
        Two sides, one platform
      </div>
      <h2 id="audiences-heading" className="reveal reveal-delay-1">
        Built for talent. Built for productions.
      </h2>

      <div className="audience-grid">
        {/* Talent card */}
        <div className="audience-card talent reveal">
          <h3>For Public Figures &amp; Talent</h3>
          <div className="subtitle">Create your AI clone →</div>
          <ul>
            <li>Earn from campaigns you never shoot for</li>
            <li>Appear in 60+ language regional adaptations</li>
            <li>Full control — approve every use, set your rates</li>
            <li>Your IP, your rules, your revenue</li>
          </ul>
          <Link href="/for-talent" className="card-cta">Register as Talent</Link>
        </div>

        {/* Productions card */}
        <div className="audience-card production reveal reveal-delay-1" id="productions">
          <h3>For Productions &amp; Brands</h3>
          <div className="subtitle">License a clone →</div>
          <ul>
            <li>A-list talent — zero scheduling conflicts</li>
            <li>AI doubles, crowd scenes, regional dubs</li>
            <li>Slash budgets — zero shoot required</li>
            <li>Fully licensed, legally clear, brand-safe</li>
          </ul>
          <Link href="/for-productions" className="card-cta">Browse Clones</Link>
        </div>
      </div>
    </section>
  )
}
