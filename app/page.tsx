import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import CTABanner from "@/components/shared/CTABanner"
import HeroSection from "@/components/home/HeroSection"
import HighlightsGrid from "@/components/home/HighlightsGrid"
import AboutSnippet from "@/components/home/AboutSnippet"
import FeaturedRooms from "@/components/home/FeaturedRooms"
import Testimonials from "@/components/home/Testimonials"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HighlightsGrid />
        <AboutSnippet />
        <FeaturedRooms />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
