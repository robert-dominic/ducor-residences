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

            <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-center px-4 pb-10 pt-20 sm:px-6 sm:pb-14 sm:pt-24 md:pt-26 lg:px-10 lg:pb-16 lg:pt-24">
                <div className="grid w-full items-end gap-8 lg:min-h-[42rem] lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.55fr)] lg:gap-12">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex max-w-3xl flex-col justify-center self-center pt-2 sm:pt-4 lg:pt-0"
                    >
                        <motion.p
                            variants={itemVariants}
                            className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-accent/90 sm:text-[11px] sm:tracking-[0.24em]"
                        >
                            Monrovia, Liberia
                        </motion.p>

                        <motion.h1
                            variants={itemVariants}
                            className="mt-4 max-w-4xl font-heading text-[2.2rem] font-medium leading-[0.98] tracking-[0.01em] text-white sm:mt-5 sm:text-[3rem] md:text-[3.9rem] lg:text-[4.9rem]"
                        >
                            Quiet luxury with a clearer point of view.
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="mt-4 max-w-xl font-sans text-[14px] leading-6 text-white/82 sm:mt-5 sm:max-w-2xl sm:text-[15px] sm:leading-7 md:text-[16px]"
                        >
                            Ducor Residences offers a more composed stay in Monrovia,
                            balancing elevated views, thoughtful interiors, and service
                            that feels attentive without excess.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3"
                        >
                            <Link
                                href="/booking"
                                className="inline-flex cursor-pointer rounded-lg bg-button px-5 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-white transition-colors hover:brightness-105 sm:px-7 sm:py-3 sm:text-[12px] sm:tracking-[0.16em]"
                            >
                                Book a Stay
                            </Link>
                            <Link
                                href="#featured-rooms"
                                className="inline-flex cursor-pointer rounded-lg border border-white/28 bg-white/8 px-5 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-accent hover:bg-white/12 sm:px-7 sm:py-3 sm:text-[12px] sm:tracking-[0.16em]"
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
                        <div className="w-full max-w-xl rounded-[1.4rem] border border-white/14 bg-white/10 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-md sm:rounded-[1.75rem] sm:p-5">
                            <div className="rounded-[1.1rem] border border-white/10 bg-black/20 p-1 sm:rounded-[1.35rem] sm:p-1.5">
                                <HeroHighlights />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
