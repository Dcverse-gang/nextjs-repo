// ─── lib/schema.ts ─────────────────────────────────────────────────────────
// JSON-LD @graph — passed to next/script in layout.tsx as dangerouslySetInnerHTML.
// Using a typed function keeps the schema easy to update without touching layout.

export function buildJsonLd(): string {
  const graph = [
    {
      '@type': 'WebSite',
      name: 'CloneOS',
      url: 'https://cloneos.io',
      description:
        'Licensed AI clone platform for public figures and productions — by DCVerse',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://cloneos.io/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      name: 'CloneOS',
      legalName: 'DCVerse',
      url: 'https://cloneos.io',
      logo: 'https://cloneos.io/logo.png',
      description:
        'Consent-first licensed AI clone marketplace for public figures and productions',
      foundingDate: '2023',
      founder: { '@type': 'Person', name: 'Abhigyan Suman' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'New Delhi',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'business@dcverse.in',
        contactType: 'customer service',
      },
      sameAs: ['https://dcverse.in', 'https://in.linkedin.com/company/dcverse'],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'CloneOS',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Licensed AI digital clone marketplace. Public figures create consented AI twins; productions license them for ads, regional dubs, and film.',
      url: 'https://cloneos.io',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        description: 'Free to list; licensing fees apply per use',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who owns the AI clone on CloneOS?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The public figure owns their clone entirely. They set usage rules, approve every license, and can revoke access at any time.',
          },
        },
        {
          '@type': 'Question',
          name: "Is it legal to clone a public figure's likeness with AI?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes — on CloneOS, every clone is created with explicit documented consent governed by talent-controlled licensing agreements.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many languages does CloneOS support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '60+ languages for voice cloning and regional adaptations.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much can a public figure earn from their AI clone?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '10× the revenue per talent vs traditional single-shoot deals, from brand campaigns, regional dubs, and production licensing simultaneously.',
          },
        },
      ],
    },
  ]

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}
