// app/page.tsx — Homepage route (assembles all sections)
// Server component by default; client sub-components are imported normally —
// Next.js handles the boundary automatically.

import Nav             from '@/components/Nav'
import Hero            from '@/components/Hero'
import VideoSection    from '@/components/VideoSection'
import Agents          from '@/components/Agents'
import PlatformVisual  from '@/components/PlatformVisual'
import Audiences       from '@/components/Audiences'
import Safety          from '@/components/Safety'
import Revenue         from '@/components/Revenue'
import FAQ             from '@/components/FAQ'
import Backed          from '@/components/Backed'
import CTA             from '@/components/CTA'
import Footer          from '@/components/Footer'
import ScrollReveal    from '@/components/ScrollReveal'

export default function Home() {
  return (
    <>
      {/* Global scroll-reveal observer — renders nothing, just boots IO */}
      <ScrollReveal />

      {/* Fixed nav + progress bar */}
      <Nav />

      <main>
        <Hero />
        <VideoSection />
        <Agents />
        <PlatformVisual />
        <Audiences />
        <Safety />
        <Revenue />
        <FAQ />
        <Backed />
        <CTA />
      </main>

      <Footer />
    </>
  )
}
