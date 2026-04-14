"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import HeroHighlights from "@/components/home/HeroHighlights"

const ease = [0.22, 1, 0.36, 1] as const

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease },
    },
}

export default function HeroSection() {
    return (
        <section className="relative isolate overflow-hidden bg-primary text-white">
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85"
                    alt="Ducor Residences exterior at dusk"
                    fill
                    priority
                    className="animate-ken-burns object-cover object-center"
                    sizes="100vw"
                />
            </div>
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

            <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-center px-5 pt-25 pb-20 md:px-8 lg:px-12">
                <div className="grid w-full items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8 lg:pt-10"
                    >
                        <div className="space-y-4">
                            <motion.p
                                variants={itemVariants}
                                className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/70 py-3"
                            >
                                Monrovia, Liberia
                            </motion.p>

                            <motion.h1
                                variants={itemVariants}
                                className="max-w-4xl font-heading text-4xl leading-[0.96] tracking-[0.01em] text-white sm:text-5xl md:text-6xl lg:text-[4.8rem]"
                            >
                                Quiet luxury with a clearer point of view.
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className="max-w-lg font-sans text-[15px] leading-7 text-white/80 py-5"
                            >
                                Ducor Residences offers a more composed stay in Monrovia,
                                balancing elevated views, thoughtful interiors, and service
                                that feels attentive without excess.
                            </motion.p>
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-4"
                        >
                            <Link
                                href="/booking"
                                className="inline-flex min-w-44 cursor-pointer items-center justify-center rounded-xl bg-white px-6 py-3.5 font-sans text-[11px] tracking-[0.22em] uppercase text-primary transition-colors duration-300 hover:bg-white/90"
                            >
                                Book a Stay
                            </Link>
                            <Link
                                href="#featured-rooms"
                                className="inline-flex min-w-44 cursor-pointer items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-sans text-[11px] tracking-[0.22em] uppercase text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                            >
                                View Our Rooms
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease }}
                        className="lg:pt-30 lg:justify-self-end"
                    >
                        <HeroHighlights />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
