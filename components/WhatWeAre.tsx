// components/WhatWeAre.tsx — "What We Are" section under powered-by

export default function WhatWeAre() {
  return (
    <section className="what-we-are reveal" aria-labelledby="what-we-are-heading">
      <div className="what-we-are-tag">
        <span className="line" aria-hidden="true" />
        <span>What We Are</span>
      </div>

      <h2 id="what-we-are-heading">
        Not a tool.
        <br />
        Infrastructure.
      </h2>

      <p>
        CloneOS is the operating layer for licensed AI talent. The marketplace where public figures
        create consented digital clones, set their own licensing terms, and earn royalties from
        every use — while productions and brands access A-list presence without the logistics that
        come with it.
      </p>
    </section>
  )
}
