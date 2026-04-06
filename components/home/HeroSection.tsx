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
        <section className="relative overflow-hidden bg-[#f2eadf] pb-20 pt-28 md:pb-24 lg:pt-32">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,146,90,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(110,88,72,0.10),transparent_28%)]" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8 pt-2 lg:pt-10"
                    >
                        <motion.p
                            variants={itemVariants}
                            className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-secondary"
                        >
                            Monrovia, Liberia
                        </motion.p>

                        <motion.h1
                            variants={itemVariants}
                            className="max-w-xl font-heading text-[2.45rem] font-medium leading-[0.98] tracking-[0.01em] text-primary sm:text-[3.2rem] lg:text-[4.35rem]"
                        >
                            Quiet luxury with a clearer point of view.
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="max-w-lg font-sans text-[14px] leading-7 text-muted md:text-[16px]"
                        >
                            Ducor Residences offers a more composed stay in Monrovia,
                            balancing elevated views, thoughtful interiors, and service
                            that feels attentive without excess.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center gap-3 pt-1"
                        >
                            <Link
                                href="/booking"
                                className="inline-flex cursor-pointer rounded-lg bg-button px-6 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:brightness-105 sm:px-7"
                            >
                                Book a Stay
                            </Link>
                            <Link
                                href="#featured-rooms"
                                className="inline-flex cursor-pointer rounded-lg border border-border bg-background px-6 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-primary transition-all duration-300 hover:border-accent hover:text-accent sm:px-7"
                            >
                                View Our Rooms
                            </Link>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="max-w-lg pt-2"
                        >
                            <HeroHighlights />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease }}
                        className="lg:min-h-[48rem]"
                    >
                        <div className="relative h-full min-h-[30rem] overflow-hidden rounded-[2rem] border border-border bg-primary shadow-[0_24px_70px_rgba(26,26,26,0.12)] lg:min-h-[48rem]">
                            <Image
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85"
                                alt="Ducor Residences exterior at dusk"
                                fill
                                priority
                                className="animate-ken-burns object-cover object-center"
                                sizes="(max-width: 1024px) 100vw, 58vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/72 via-primary/8 to-transparent" />
                            <div className="absolute bottom-5 left-5 rounded-2xl border border-white/12 bg-black/20 px-4 py-4 backdrop-blur-sm sm:bottom-6 sm:left-6">
                                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-accent/90">
                                    Ducor Hill
                                </p>
                                <p className="mt-2 max-w-[14rem] font-heading text-[1.35rem] font-medium leading-tight text-white">
                                    A calmer stay above the capital.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
