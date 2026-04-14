"use client"

import Image from "next/image"
import Link from "next/link"
import { Users, Maximize2, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import type { Room } from "@/types"
import { cn, formatPrice } from "@/lib/utils"

interface RoomCardProps {
    room: Room
    compact?: boolean
}

export default function RoomCard({ room, compact = false }: RoomCardProps) {
    return (
        <motion.article
            whileHover="hover"
            className="group relative overflow-hidden rounded-2xl bg-white border border-border/40 shadow-[0_4px_20px_rgba(26,26,46,0.06)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(26,26,46,0.12)]"
        >
            {/* Image Section (60% height) */}
            <Link href={`/rooms/${room.slug}`} className={cn("block relative w-full overflow-hidden", compact ? "h-60" : "h-80")}>
                <motion.div
                    variants={{ hover: { scale: 1.04 } }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                >
                    <Image
                        src={room.images[0]}
                        alt={room.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                </motion.div>

                {/* Overlay Gradient (Subtle) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,46,0.7)] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Room type badge */}
                <span className="absolute top-4 left-4 rounded-md bg-white/10 px-2.5 py-1 font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md border border-white/20">
                    {room.type}
                </span>

            </Link>

            {/* Content Area */}
            <div className="bg-white p-5 space-y-5">
                <div className="flex items-start justify-between gap-4">
                    <h3 className={cn("font-heading font-medium leading-tight tracking-[0.01em] text-primary", compact ? "text-lg" : "text-xl")}>
                        {room.name}
                    </h3>
                    <div className="text-right shrink-0">
                        <span className={cn("block font-heading font-medium text-primary", compact ? "text-base" : "text-lg")}>
                            {formatPrice(room.price)}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-primary/40">per night</span>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-border/50 pt-5">
                    <div className="flex items-center gap-5 text-primary/60">
                        <span className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-wider">
                            <Users size={14} strokeWidth={1.5} className="text-primary/30" />
                            {room.capacity}
                        </span>
                        <span className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-wider">
                            <Maximize2 size={14} strokeWidth={1.5} className="text-primary/30" />
                            {room.size}
                        </span>
                    </div>

                    <Link
                        href={`/rooms/${room.slug}`}
                        className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.24em] text-primary hover:text-black transition-colors"
                    >
                        Details
                        <motion.span
                            variants={{ hover: { x: 3 } }}
                            transition={{ duration: 0.3 }}
                        >
                            <ArrowRight size={14} strokeWidth={2} />
                        </motion.span>
                    </Link>
                </div>
            </div>
        </motion.article>
    )
}
