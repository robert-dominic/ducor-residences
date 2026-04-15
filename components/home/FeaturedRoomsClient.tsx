"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import SectionHeading from "@/components/shared/SectionHeading"
import RoomCard from "@/components/shared/RoomCard"
import type { Room } from "@/types"

interface FeaturedRoomsClientProps {
    featuredRooms: Room[]
}

const ease = [0.22, 1, 0.36, 1] as const

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } },
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease },
    },
}

export default function FeaturedRoomsClient({ featuredRooms }: FeaturedRoomsClientProps) {
    return (
        <section id="featured-rooms" className="bg-background py-25 border-t border-border/40">
            <div className="mx-auto max-w-screen-2xl px-5 lg:px-20 space-y-16">
                <SectionHeading
                    eyebrow="Selected Rooms"
                    title="Featured Rooms"
                    subtitle="A curated selection of stays designed with comfort, calm, and a quietly elevated finish."
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 gap-4 xl:gap-6 sm:grid-cols-2 xl:grid-cols-4"
                >
                    {featuredRooms.map((room) => (
                        <motion.div key={room.id} variants={cardVariants}>
                            <RoomCard room={room} compact={true} />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3, ease }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Link
                        href="/rooms"
                        className="inline-flex min-w-44 items-center justify-center rounded-xl border border-border bg-white px-6 py-3.5 font-sans text-[11px] tracking-[0.22em] uppercase text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
                    >
                        View All Rooms
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
