"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import SectionHeading from "@/components/shared/SectionHeading"
import type { Testimonial } from "@/types"
import testimonialsData from "@/data/testimonials.json"

const ease = [0.22, 1, 0.36, 1] as const

const testimonials = (testimonialsData as Testimonial[]).slice(0, 4)

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
    hidden: { opacity: 0, x: -24 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.42, ease },
    },
}

export default function Testimonials() {
    return (
        <section className="overflow-hidden bg-background py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-14">
                <SectionHeading
                    eyebrow="Guest Reviews"
                    title="What our guests say"
                    align="center"
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
                >
                    {testimonials.map((t) => (
                        <motion.div
                            key={t.id}
                            variants={cardVariants}
                            className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-8 shadow-[0_16px_36px_rgba(26,26,26,0.05)]"
                        >
                            {/* Stars */}
                            <div className="flex gap-1">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Star key={i} size={14} className="fill-accent text-accent" />
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="font-heading text-[1.35rem] font-medium leading-[1.35] text-primary">
                                &ldquo;{t.quote}&rdquo;
                            </blockquote>

                            {/* Attribution */}
                            <div className="mt-auto border-t border-border pt-5">
                                <p className="font-sans text-sm font-medium text-primary">{t.name}</p>
                                <p className="font-sans text-xs text-muted mt-0.5">{t.country}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
