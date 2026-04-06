import Image from "next/image"

import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import PageHero from "@/components/shared/PageHero"
import SectionHeading from "@/components/shared/SectionHeading"

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
      <main className="bg-background">
        <PageHero
          title="Our Story"
          subtitle="A new chapter in hospitality shaped by Ducor Hill, Monrovia, and the idea that luxury should feel calm."
          imageSrc="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80"
          imageAlt="Ducor Residences overlooking Monrovia"
          compact
        />

        <section className="py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-10">
            <div className="space-y-6">
              <SectionHeading
                eyebrow="Ducor Hill"
                title="A home built on Monrovia's memory"
                subtitle="Ducor Residences takes its name from one of Monrovia's most storied locations, long associated with elevation, outlook, and the city's sense of possibility."
              />

              <div className="space-y-4 font-sans text-[15px] leading-7 text-muted">
                <p>
                  Perched above the Atlantic coast, Ducor Residences was conceived as
                  an answer to a simple question: what does truly refined hospitality
                  look like in modern Liberia? The answer is unhurried, personal, and
                  deeply rooted in place.
                </p>
                <p>
                  We have drawn inspiration from the legacy of Ducor Hill without
                  trying to imitate the past. Instead, we have built a more intimate
                  expression of hospitality: one defined by thoughtful rooms,
                  attentive service, and a quieter sense of luxury.
                </p>
                <p>
                  Every detail is shaped by the belief that a memorable stay is not
                  about spectacle. It is about comfort, assurance, and the feeling
                  that everything has been considered with care.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border border-border shadow-[0_20px_55px_rgba(26,26,26,0.08)] sm:row-span-2">
                <Image
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1000&q=85"
                  alt="Warmly lit Ducor Residences interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="relative min-h-[220px] overflow-hidden rounded-[2rem] border border-border shadow-[0_20px_55px_rgba(26,26,26,0.08)]">
                <Image
                  src="https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=900&q=80"
                  alt="Reception lounge with elegant lighting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
              <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-[0_18px_40px_rgba(26,26,26,0.05)]">
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-secondary">
                  Perspective
                </p>
                <p className="mt-3 font-heading text-[1.7rem] font-medium leading-[1.12] text-primary">
                  Designed for guests who value atmosphere as much as service.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <SectionHeading
              eyebrow="Our Approach"
              title="What guides the stay"
              subtitle="The guest experience at Ducor Residences is shaped by a few core principles that influence how we design, host, and serve."
              className="mb-14"
            />

            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="rounded-2xl border border-border bg-background p-8 shadow-[0_16px_36px_rgba(26,26,26,0.05)]"
                >
                  <h2 className="font-heading text-[1.55rem] font-medium text-primary">
                    {value.title}
                  </h2>
                  <p className="mt-4 font-sans text-[15px] leading-7 text-muted">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
