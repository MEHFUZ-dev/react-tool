import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { TechComparison } from '@/components/tech-comparison'
import { FeaturesSection } from '@/components/features-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { FloatingBackground } from '@/components/floating-background'
import { CursorBubbles } from '@/components/cursor-bubbles'

export default function Home() {
  return (
    <main className="relative">
      <FloatingBackground />
      <CursorBubbles />
      <Navigation />
      <HeroSection />
      <TechComparison />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
