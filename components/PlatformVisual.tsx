// components/PlatformVisual.tsx — "See the clone in action" image grid (server component)
import Link from 'next/link'
import Image from 'next/image'

export default function PlatformVisual() {
  return (
    <section className="platform-visual" aria-labelledby="visual-heading">
      <div className="section-tag reveal">Platform</div>
      <h2 id="visual-heading" className="reveal reveal-delay-1">See the clone in action.</h2>
      <p className="sub reveal reveal-delay-2">
        From marketplace browsing to live deployment — every step happens inside CloneOS.
      </p>

      <div className="image-grid">
        <Link
          href="/marketplace"
          className="img-holder img-wide tint-purple reveal"
          aria-label="Open CloneOS Marketplace"
          style={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          <Image
            src="/platform/marketplace.png"
            alt="CloneOS marketplace — browse verified talent clones"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: 'top left' }}
            priority
          />
          <div className="img-label">Clone marketplace →</div>
        </Link>

        <Link
          href="/dashboard"
          className="img-holder img-wide tint-blue reveal reveal-delay-1"
          aria-label="Open CloneOS Dashboard"
          style={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          <Image
            src="/platform/dashboard.png"
            alt="CloneOS dashboard — earnings, licenses and revenue at a glance"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: 'top left' }}
          />
          <div className="img-label">Revenue dashboard →</div>
        </Link>
      </div>
    </section>
  )
}
