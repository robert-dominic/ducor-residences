"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import SectionHeading from "@/components/shared/SectionHeading"

export default function AboutSnippet() {
    return (
        <section className="bg-background py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20 items-center">

                    {/* Image — left */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="relative aspect-[4/5] overflow-hidden rounded-2xl"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&q=80"
                            alt="The exterior of Ducor Residences overlooking Monrovia"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Small accent block */}
                        <div className="absolute bottom-0 left-0 bg-accent px-6 py-4">
                            <p className="font-heading text-[1.05rem] font-medium leading-tight text-primary">
                                Est. on<br />Ducor Hill
                            </p>
                        </div>
                    </motion.div>

                    {/* Text — right */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <SectionHeading
                            eyebrow="Our Story"
                            title="A home built on Monrovia's history"
                            subtitle="Ducor Residences takes its name from the historic Ducor hill — the highest point in Monrovia, once the site of the legendary Ducor Palace Hotel. We have built a new chapter on that legacy."
                        />

                        <div className="space-y-4 font-sans text-[15px] leading-7 text-muted">
                            <p>
                                Perched above the Atlantic coast, Ducor Residences was conceived as
                                an answer to a simple question: what does truly refined hospitality
                                look like in modern Liberia? The answer is unhurried, personal, and
                                deeply rooted in place.
                            </p>
                            <p>
                                Every room, every detail, every interaction is shaped by the belief
                                that a great stay is not defined by size or excess — but by comfort,
                                quality, and the quiet certainty that you are exactly where you
                                should be.
                            </p>
                        </div>

                        <div className="pt-2">
                            <Link
                                href="/amenities"
                                className="inline-block rounded-lg border border-button bg-button px-6 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent"
                            >
                                Explore Amenities
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
