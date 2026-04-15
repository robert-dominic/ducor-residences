import ContactForm from "@/components/contact/ContactForm"
import InfoCards from "@/components/contact/InfoCards"
import MapEmbed from "@/components/contact/MapEmbed"
import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"
import PageHero from "@/components/shared/PageHero"

export const metadata = {
  title: "Contact | Ducor Residences",
  description:
    "Get in touch with Ducor Residences in Monrovia for reservations, concierge requests, and guest support.",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white pb-24">
        <PageHero
          title="Contact"
          subtitle="Reach our reception team for reservations, arrivals, events, and private guest requests."
          imageSrc="https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=1600&q=80"
          imageAlt="Elegant hotel reception with warm lighting"
          compact
        />

        <section className="mx-auto mt-24 max-w-screen-2xl px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <aside className="lg:col-span-5">
              <InfoCards />
            </aside>
          </div>

          <div className="mt-24 overflow-hidden rounded-2xl border border-primary/5 shadow-sm">
            <MapEmbed />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
