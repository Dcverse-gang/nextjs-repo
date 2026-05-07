// ─── lib/data.ts ───────────────────────────────────────────────────────────
// All static content as typed constants — keeps components clean and testable.

export interface Agent {
  icon: string
  image: string
  tag: string
  title: string
  description: string
}

export interface SafetyFeature {
  icon: string
  title: string
  description: string
}

export interface RevenueCard {
  emoji: string
  image: string
  tint: 'ri-purple' | 'ri-blue' | 'ri-orange'
  title: string
  description: string
}

export interface FAQItem {
  question: string
  answer: string
  link?: { href: string; label: string }
}

export interface StatItem {
  value: string
  label: string
  /** If set, the number will be animated from 0 to `animateTo` on scroll */
  animateTo?: number
  suffix?: string
}

// ─── HERO STATS ─────────────────────────────────────────────────────────────
export const heroStats: StatItem[] = [
  { value: '10×',  label: 'Revenue per talent',  animateTo: 10, suffix: '×' },
  { value: '60+',  label: 'Languages supported',  animateTo: 60, suffix: '+' },
  { value: '0',    label: 'Extra shoot days' },
  { value: '100%', label: 'Talent-controlled' },
]

// ─── AI AGENTS ──────────────────────────────────────────────────────────────
export const agents: Agent[] = [
  {
    icon: '✍️',
    image: '/agents/writing-agent.png',
    tag: 'Writing Agent',
    title: 'Script & Dialogue',
    description:
      'Writes campaign scripts, dub scripts, and brand copy in your voice — adapted for every market and language.',
  },
  {
    icon: '🎭',
    image: '/agents/direction-agent.png',
    tag: 'Direction Agent',
    title: 'Performance Direction',
    description:
      'Guides tone, emotion, and delivery style — ensuring every AI output matches how you actually move and speak.',
  },
  {
    icon: '🌐',
    image: '/agents/regional-agent.png',
    tag: 'Regional Agent',
    title: 'Localisation & Dub',
    description:
      'Adapts scripts and lip-sync across 60+ languages and regional cultural norms — no retakes, no studio time.',
  },
  {
    icon: '🔐',
    image: '/agents/licensing-agent.png',
    tag: 'Licensing Agent',
    title: 'Approvals & Revenue',
    description:
      'Routes usage requests, enforces your rules, and deposits royalties — automated, transparent, real-time.',
  },
]

export const agentSidebarItems = [
  'Script Draft',
  'Regional Variants',
  'Voice Preview',
  'Direction Notes',
  'License Review',
  'Revenue Log',
]

// ─── SAFETY FEATURES ─────────────────────────────────────────────────────────
export const safetyFeatures: SafetyFeature[] = [
  {
    icon: '🛡️',
    title: 'Consent-Based',
    description: 'No clone created without explicit, documented approval',
  },
  {
    icon: '🔍',
    title: 'Real-Time Detection',
    description: 'Flags misuse, hate speech, and unauthorized use instantly',
  },
  {
    icon: '⚖️',
    title: 'Talent-Controlled',
    description: 'Set rules by category, region, brand. Revoke anytime.',
  },
  {
    icon: '📊',
    title: 'Revenue Dashboard',
    description: 'Every use, every earning — tracked in real time',
  },
]

// ─── REVENUE STREAMS ─────────────────────────────────────────────────────────
export const revenueCards: RevenueCard[] = [
  {
    emoji: '📺',
    image: '/revenue/brand-campaigns.png',
    tint: 'ri-purple',
    title: 'Brand Campaigns',
    description:
      'Your clone appears in ads and endorsements across regions. Brands get presence. You get passive income.',
  },
  {
    emoji: '🌍',
    image: '/revenue/production-licensing.png',
    tint: 'ri-blue',
    title: 'Regional Adaptations',
    description:
      'Your performance dubbed into 60+ languages. Films reach new markets — you earn from each one.',
  },
  {
    emoji: '🎬',
    image: '/revenue/regional-adaptations.png',
    tint: 'ri-orange',
    title: 'Production Licensing',
    description:
      'Studios license your AI double for sequences and previs. Royalties from work you never touched.',
  },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export const faqItems: FAQItem[] = [
  {
    question: 'Who owns the AI clone on CloneOS?',
    answer:
      'You own your clone entirely. CloneOS holds no ownership over likenesses. You set usage rules, approve every license, and can revoke access at any time.',
  },
  {
    question: 'Is it legal to clone a public figure\'s likeness with AI?',
    answer:
      'Yes — on CloneOS, every clone is created with explicit documented consent. All usage is governed by talent-controlled licensing agreements, making every use legally clear under right-of-publicity law.',
    link: {
      href: '/blog/is-it-legal-to-clone-a-public-figures-likeness-with-ai',
      label: 'Read the full explainer →',
    },
  },
  {
    question: 'How do productions license a clone?',
    answer:
      'Productions browse the CloneOS marketplace, select a public figure, and submit a license request for specific campaigns, regions, and durations. Talent approves — typically within 48 hours. You receive cleared, rendered output ready to deploy.',
  },
  {
    question: 'How many languages does CloneOS support?',
    answer:
      'CloneOS supports 60+ languages for AI voice cloning and regional adaptations, covering all major South Asian, European, Middle Eastern, and global markets.',
  },
  {
    question: 'How much can a public figure earn?',
    answer:
      'Earnings come from brand campaigns, regional dubs, and production licensing simultaneously — revenue streams that would be physically impossible without a digital twin. Our platform targets 10× revenue per talent vs. traditional single-shoot deals.',
  },
  {
    question: 'What does the AI Writing Agent actually produce?',
    answer:
      'The Writing Agent generates scripts, ad copy, dub dialogue, and brand messaging in your voice — tuned to your known speech patterns, delivery style, and regional market. The Direction Agent then calibrates how those scripts are performed by the AI clone.',
  },
]

// ─── BACKED-BY LOGOS ─────────────────────────────────────────────────────────
export const backedLogos = ['NVIDIA', 'Microsoft', 'Google Cloud']
