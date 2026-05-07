// app/layout.tsx — Root layout with Next.js Metadata API + JSON-LD
import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Open_Sans } from 'next/font/google'
import Script from 'next/script'
import { buildJsonLd } from '@/lib/schema'
import './globals.css'

// ─── FONTS ─────────────────────────────────────────────────────────────────
// Variable-weight Bricolage Grotesque for display headings.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-display',
  display: 'swap',
})

// Open Sans for body copy (300–700, including italic 400).
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
})

// ─── METADATA ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // Core
  title: {
    default: 'CloneOS — Licensed AI Clone Platform for Public Figures & Productions',
    template: '%s | CloneOS',
  },
  description:
    'CloneOS lets public figures create licensed AI digital clones — earn passive income from brand campaigns & regional dubs across 60+ languages. Productions: access A-list talent with zero shoot days.',
  keywords: [
    'AI clone',
    'digital twin',
    'licensed AI',
    'public figure monetization',
    'AI dubbing',
    'regional adaptation',
    'voice cloning',
    'CloneOS',
    'DCVerse',
    'consent-first AI',
  ],
  authors: [{ name: 'Abhigyan Suman', url: 'https://dcverse.in' }],
  creator: 'Abhigyan Suman',
  publisher: 'DCVerse',
  // Canonical
  metadataBase: new URL('https://cloneos.io'),
  alternates: {
    canonical: '/',
  },

  // Open Graph
  openGraph: {
    type: 'website',
    url: 'https://cloneos.io',
    siteName: 'CloneOS by DCVerse',
    locale: 'en_IN',
    title: 'CloneOS — Licensed AI Clone Platform for Public Figures',
    description:
      'Your likeness. 60+ languages. Passive revenue. Zero shoot days. The consent-first AI clone marketplace.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CloneOS — Licensed AI Clone Platform',
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: 'summary_large_image',
    site: '@dcverse_in',
    title: 'CloneOS — Licensed AI Clone Platform for Public Figures',
    description:
      'Create a licensed AI clone. Earn from every ad, dub, and campaign — without a single shoot day.',
    images: [
      {
        url: '/og-image.jpg',
        alt: 'CloneOS platform preview',
      },
    ],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

// ─── VIEWPORT ──────────────────────────────────────────────────────────────
// Separated from metadata per Next.js 14 recommendation
export const viewport: Viewport = {
  themeColor: '#F7F6F1',
  width: 'device-width',
  initialScale: 1,
}

// ─── ROOT LAYOUT ───────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${openSans.variable}`}>
      <body>
        {children}

        {/* JSON-LD structured data — @graph with WebSite, Organization, SoftwareApp, FAQPage */}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: buildJsonLd() }}
        />
      </body>
    </html>
  )
}
