"use client"

import Image from "next/image"
import Link from "next/link"
import { Users, Maximize2 } from "lucide-react"
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
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_16px_36px_rgba(26,26,26,0.07)]"
        >
            {/* Image */}
            <Link href={`/rooms/${room.slug}`} className={compact ? "block relative aspect-[4/3] overflow-hidden" : "block relative aspect-[4/3] overflow-hidden"}>
                <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Room type badge */}
                <span className="absolute top-3 left-3 rounded-md bg-primary/80 px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
                    {room.type}
                </span>
            </Link>

            {/* Content */}
            <div className={compact ? "space-y-3 p-4" : "space-y-4 p-5"}>
                <div>
                    <Link href={`/rooms/${room.slug}`}>
                        <h3 className={cn(
                            "font-heading font-medium leading-[1.15] text-primary transition-colors duration-200 hover:text-secondary",
                            compact ? "text-[1.35rem]" : "text-[1.75rem]"
                        )}>
                            {room.name}
                        </h3>
                    </Link>
                    <p className={cn(
                        "mt-2 font-sans text-muted line-clamp-2 leading-relaxed",
                        compact ? "text-[13px]" : "text-sm"
                    )}>
                        {room.description}
                    </p>
                </div>

                {/* Meta row */}
                <div className={cn("flex items-center text-muted", compact ? "gap-4" : "gap-5")}>
                    <span className={cn("flex items-center gap-1.5 font-sans", compact ? "text-[13px]" : "text-sm")}>
                        <Users size={14} strokeWidth={1.75} />
                        {room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}
                    </span>
                    <span className={cn("flex items-center gap-1.5 font-sans", compact ? "text-[13px]" : "text-sm")}>
                        <Maximize2 size={14} strokeWidth={1.75} />
                        {room.size}
                    </span>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                    <span className={cn("font-heading font-medium text-primary", compact ? "text-[1.35rem]" : "text-[1.7rem]")}>
                        {formatPrice(room.price)}
                    </span>
                    <Link
                        href={`/rooms/${room.slug}`}
                        className={cn(
                            "rounded-lg border border-button font-sans font-medium uppercase tracking-[0.14em] text-button transition-all duration-200 hover:bg-accent hover:text-white",
                            compact ? "px-3 py-2 text-[11px]" : "px-4 py-2 text-[12px]"
                        )}
                    >
                        View Room
                    </Link>
                </div>
            </div>
        </motion.article>
    )
}
