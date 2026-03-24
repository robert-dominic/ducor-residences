"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import SectionHeading from "@/components/shared/SectionHeading"
import RoomCard from "@/components/shared/RoomCard"
import type { Room } from "@/types"
import roomsData from "@/data/rooms.json"

const ease = [0.22, 1, 0.36, 1] as const

const featuredRooms = (roomsData as Room[]).filter((r) => r.featured)

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

export default function FeaturedRooms() {
    return (
        <section className="bg-surface py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-12">
                <SectionHeading
                    eyebrow="Our Finest"
                    title="Featured Rooms"
                    subtitle="Spaces that define what a stay in Monrovia can be."
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
                    {featuredRooms.map((room) => (
                        <motion.div key={room.id} variants={cardVariants}>
                            <RoomCard room={room} />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3, ease }}
                    viewport={{ once: true }}
                    className="text-center pt-2"
                >
                    <Link
                        href="/rooms"
                        className="font-sans text-sm font-medium text-secondary underline-offset-4 hover:underline hover:text-accent transition-colors"
                    >
                        View all rooms →
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
