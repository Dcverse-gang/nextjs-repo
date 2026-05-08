// components/Footer.tsx — Site footer (server component)
import Link from 'next/link'

const links = [
  { href: '/for-talent',      label: 'For Public Figures' },
  { href: '/for-productions', label: 'For Productions' },
  { href: 'https://dcverse.in', label: 'DCVerse', external: true },
  { href: 'mailto:business@dcverse.in', label: 'business@dcverse.in' },
  { href: '/blog/is-it-legal-to-clone-a-public-figures-likeness-with-ai', label: 'Blog' },
]

export default function Footer() {
  return (
    <footer>
      <Link href="/" className="nav-logo" aria-label="CloneOS home">
        Clone<span>OS</span>
      </Link>

      <div className="footer-links">
        {links.map(({ href, label, external }) =>
          external ? (
            <a key={href} href={href} rel="noopener noreferrer" target="_blank">
              {label}
            </a>
          ) : (
            <Link key={href} href={href}>
              {label}
            </Link>
          )
        )}
      </div>

      <p>&copy; 2026 DCVerse. All rights reserved.</p>
    </footer>
  )
}
