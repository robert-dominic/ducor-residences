import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import CTABanner from "@/components/shared/CTABanner"
import HeroSection from "@/components/home/HeroSection"
import Collaborators from "@/components/home/Collaborators"
import FeaturedRooms from "@/components/home/FeaturedRooms"
import Testimonials from "@/components/home/Testimonials"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Collaborators />
        <FeaturedRooms />
        <hr className="border-primary/10 mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-12" />
        <Testimonials />
        <hr className="border-primary/10 mx-auto max-w-screen-2xl px-6 md:px-10 lg:px-12" />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
