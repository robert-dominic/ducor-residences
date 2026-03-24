"use client"

import { motion } from "framer-motion"
import { BedDouble, UtensilsCrossed, Eye, Car } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const highlights = [
    { icon: BedDouble, stat: "12", label: "Luxury Rooms" },
    { icon: UtensilsCrossed, stat: "Rooftop", label: "Dining" },
    { icon: Eye, stat: "Panoramic", label: "City Views" },
    { icon: Car, stat: "Free", label: "Airport Shuttle" },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease },
    },
}

export default function HighlightsGrid() {
    return (
        <section className="bg-primary py-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4"
                >
                    {highlights.map((item) => {
                        const Icon = item.icon
                        return (
                            <motion.div
                                key={item.label}
                                variants={itemVariants}
                                className="flex flex-col items-center justify-center gap-3 bg-primary px-6 py-10 text-center"
                            >
                                <Icon size={22} strokeWidth={1.5} className="text-accent" />
                                <div>
                                    <p className="font-heading text-3xl font-semibold text-white leading-none">
                                        {item.stat}
                                    </p>
                                    <p className="mt-1 font-sans text-sm text-white/50">
                                        {item.label}
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
