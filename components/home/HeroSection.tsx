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
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,16,12,0.56)_0%,rgba(22,16,12,0.4)_20%,rgba(22,16,12,0.62)_58%,rgba(22,16,12,0.86)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,146,90,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.24),transparent_38%)]" />

            <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-center px-6 pb-14 pt-28 sm:pb-16 md:pt-32 lg:px-10 lg:pb-20">
                <div className="grid w-full items-end gap-10 lg:min-h-[46rem] lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.55fr)] lg:gap-12">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex max-w-3xl flex-col justify-center self-center pt-8 sm:pt-10 lg:pt-14"
                    >
                        <motion.p
                            variants={itemVariants}
                            className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-accent/90"
                        >
                            Monrovia, Liberia
                        </motion.p>

                        <motion.h1
                            variants={itemVariants}
                            className="mt-5 max-w-4xl font-heading text-[2.75rem] font-medium leading-[0.98] tracking-[0.01em] text-white sm:text-[3.35rem] md:text-[4.2rem] lg:text-[5.1rem]"
                        >
                            Quiet luxury with a clearer point of view.
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="mt-6 max-w-2xl font-sans text-[15px] leading-7 text-white/82 md:text-[16px]"
                        >
                            Ducor Residences offers a more composed stay in Monrovia,
                            balancing elevated views, thoughtful interiors, and service
                            that feels attentive without excess.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="mt-8 flex flex-wrap items-center gap-3"
                        >
                            <Link
                                href="/booking"
                                className="inline-flex cursor-pointer rounded-lg bg-button px-6 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:brightness-105 sm:px-7"
                            >
                                Book a Stay
                            </Link>
                            <Link
                                href="#featured-rooms"
                                className="inline-flex cursor-pointer rounded-lg border border-white/28 bg-white/8 px-6 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-accent hover:bg-white/12 sm:px-7"
                            >
                                View Our Rooms
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease }}
                        className="self-end lg:justify-self-end"
                    >
                        <div className="w-full max-w-xl rounded-[1.75rem] border border-white/14 bg-white/10 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-md sm:p-5">
                            <div className="rounded-[1.35rem] border border-white/10 bg-black/20 p-1.5">
                                <HeroHighlights />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
