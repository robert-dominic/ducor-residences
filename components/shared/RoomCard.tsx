"use client"

import Image from "next/image"
import Link from "next/link"
import { Users, Maximize2 } from "lucide-react"
import { motion } from "framer-motion"
import type { Room } from "@/types"
import { formatPrice } from "@/lib/utils"

interface RoomCardProps {
    room: Room
}

export default function RoomCard({ room }: RoomCardProps) {
    return (
        <motion.article
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="group bg-surface border border-border overflow-hidden"
        >
            {/* Image */}
            <Link href={`/rooms/${room.slug}`} className="block relative aspect-[4/3] overflow-hidden">
                <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Room type badge */}
                <span className="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm px-3 py-1 font-sans text-xs font-medium tracking-wide text-white/90 uppercase">
                    {room.type}
                </span>
            </Link>

            {/* Content */}
            <div className="p-5 space-y-4">
                <div>
                    <Link href={`/rooms/${room.slug}`}>
                        <h3 className="font-heading text-2xl font-semibold text-primary leading-snug hover:text-secondary transition-colors duration-200">
                            {room.name}
                        </h3>
                    </Link>
                    <p className="mt-2 font-sans text-sm text-muted line-clamp-2 leading-relaxed">
                        {room.description}
                    </p>
                </div>

                {/* Meta row */}
                <div className="flex items-center gap-5 text-muted">
                    <span className="flex items-center gap-1.5 font-sans text-sm">
                        <Users size={14} strokeWidth={1.75} />
                        {room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}
                    </span>
                    <span className="flex items-center gap-1.5 font-sans text-sm">
                        <Maximize2 size={14} strokeWidth={1.75} />
                        {room.size}
                    </span>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                    <span className="font-heading text-2xl font-semibold text-primary">
                        {formatPrice(room.price)}
                    </span>
                    <Link
                        href={`/rooms/${room.slug}`}
                        className="font-sans text-sm font-medium text-button border border-button px-4 py-2 transition-all duration-200 hover:bg-accent hover:text-white"
                    >
                        View Room
                    </Link>
                </div>
            </div>
        </motion.article>
    )
}
