import Image from "next/image"

import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import PageHero from "@/components/shared/PageHero"
import SectionHeading from "@/components/shared/SectionHeading"
import Reveal from "@/components/shared/Reveal"

export const metadata = {
  title: "About | Ducor Residences",
  description:
    "Learn the story behind Ducor Residences and how its quiet, elevated approach to hospitality is rooted in Monrovia's history.",
}

const values = [
  {
    title: "Rooted in place",
    description:
      "Our perspective begins with Monrovia itself: its history, its rhythm, and the importance of hospitality that feels personal rather than performative.",
  },
  {
    title: "Quiet service",
    description:
      "We believe the best luxury is attentive but unobtrusive, anticipating needs without ever making the guest feel managed.",
  },
  {
    title: "Refined comfort",
    description:
      "Every room and shared space is designed to feel measured, comfortable, and enduring rather than trend-driven or overstated.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <PageHero
          title="Our Story"
          subtitle="A new chapter in hospitality shaped by Ducor Hill, Monrovia, and the idea that luxury should feel calm."
          imageSrc="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80"
          imageAlt="Ducor Residences overlooking Monrovia"
          compact
        />

        <section className="py-24">
          <Reveal className="mx-auto grid max-w-screen-2xl gap-12 px-5 md:px-10 lg:px-20 lg:grid-cols-2">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="Ducor Hill"
                title="A home built on Monrovia's memory"
                subtitle="Ducor Residences takes its name from one of Monrovia's most storied locations, long associated with elevation and the city's sense of possibility."
              />

              <div className="space-y-6 font-sans text-[15px] leading-relaxed text-primary/70 max-w-xl">
                <p>
                  Perched above the Atlantic coast, Ducor Residences was conceived as
                  an answers to a simple question: what does truly refined hospitality
                  look like in modern Liberia? The answer is unhurried, personal, and
                  deeply rooted in place.
                </p>
                <p>
                  We have drawn inspiration from the legacy of Ducor Hill without
                  trying to imitate the past. Instead, we have built a more intimate
                  expression of hospitality: one defined by thoughtful rooms,
                  attentive service, and a quieter sense of luxury.
                </p>
              </div>

              <div className="rounded-2xl border border-primary/5 bg-[#F9F9F9] p-8">
                <p className="font-heading text-[10px] font-medium uppercase tracking-[0.28em] text-primary/40">
                  Perspective
                </p>
                <p className="mt-4 font-heading text-[1.1rem] font-medium leading-[1.04] tracking-[0.01em] text-primary md:text-[1.6rem]">
                  Designed for guests who value atmosphere as much as service.
                </p>
              </div>
            </div>

            <div className="relative min-h-[400px] lg:min-h-[600px] overflow-hidden rounded-2xl border border-primary/5">
              <Image
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1000&q=85"
                alt="Warmly lit Ducor Residences interior"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </section>

        <section className="border-t border-primary/5 bg-[#F9F9F9] py-24">
          <Reveal className="mx-auto max-w-screen-2xl px-5 lg:px-20">
            <SectionHeading
              eyebrow="Our Approach"
              title="What guides the stay"
              subtitle="The guest experience at Ducor Residences is shaped by a few core principles that influence how we design, host, and serve."
              className="mb-16"
            />

            <div className="grid gap-4 lg:gap-6 md:grid-cols-3">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="rounded-2xl border border-primary/5 bg-white p-8 transition-all hover:bg-[#F9F9F9] duration-300"
                >
                  <h3 className="font-heading text-[1rem] font-medium leading-[1.04] tracking-[0.01em] text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-5 font-sans text-[15px] leading-relaxed text-primary/60">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

      </main>
      <Footer />
    </>
  )
}
