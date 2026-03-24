"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

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
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary">
            {/* Ken Burns background — pure CSS, no JS */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="animate-ken-burns absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=85"
                        alt="Ducor Residences luxury hotel exterior"
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                </div>
            </div>

            {/* Dark overlay — richer at bottom */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(26,26,26,0.55) 0%, rgba(26,26,26,0.75) 60%, rgba(26,26,26,0.90) 100%)",
                }}
            />

            {/* Content */}
            <div className="relative z-20 mx-auto max-w-4xl px-6 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {/* Eyebrow */}
                    <motion.p
                        variants={itemVariants}
                        className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-accent"
                    >
                        Monrovia, Liberia
                    </motion.p>

                    {/* Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="font-heading text-4xl font-semibold leading-tight text-white md:text-5xl"
                    >
                        Where Monrovia&apos;s story meets modern comfort.
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        variants={itemVariants}
                        className="mx-auto max-w-lg font-sans text-base leading-relaxed text-white/65 md:text-lg"
                    >
                        Ducor Residences — a sanctuary of quiet luxury perched above
                        the heart of Liberia&apos;s capital.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-center"
                    >
                        <Link
                            href="/booking"
                            className="inline-block bg-accent px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-primary transition-all duration-300 hover:bg-[#b8935a]"
                        >
                            Book a Stay
                        </Link>
                        <Link
                            href="/rooms"
                            className="inline-block border border-white/50 px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                        >
                            Explore Rooms
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-1.5"
                >
                    <span className="font-sans text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
                    <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
                </motion.div>
            </div>
        </section>
    )
}
