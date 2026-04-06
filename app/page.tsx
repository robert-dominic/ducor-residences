import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import CTABanner from "@/components/shared/CTABanner"
import HeroSection from "@/components/home/HeroSection"
import FeaturedRooms from "@/components/home/FeaturedRooms"
import Testimonials from "@/components/home/Testimonials"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedRooms />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
