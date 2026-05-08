// components/Safety.tsx — "Your likeness. Always protected." section (server component)
import { safetyFeatures } from '@/lib/data'

export default function Safety() {
  return (
    <section className="safety" id="safety" aria-labelledby="safety-heading">
      <div className="safety-inner">
        <div className="reveal-left">
          <div className="section-tag">Safety first</div>
          <h2 id="safety-heading">
            Your likeness.<br />
            <span className="grad">Always protected.</span>
          </h2>
          <p className="safety-lead">
            Every clone operates under strict licensing agreements. Proprietary detection
            monitors all usage in real-time — and you can revoke any license instantly.
          </p>
        </div>

        <div className="safety-features" role="list">
          {safetyFeatures.map((feature, i) => (
            <div
              key={feature.title}
              className={`safety-feature reveal reveal-delay-${i + 1}`}
              role="listitem"
            >
              <div className="sf-icon" aria-hidden="true">{feature.icon}</div>
              <div className="sf-text">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
