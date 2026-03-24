import { Users, Maximize2 } from "lucide-react"
import Reveal from "@/components/shared/Reveal"
import type { Room } from "@/types"

interface RoomInfoProps {
    room: Room
}

export default function RoomInfo({ room }: RoomInfoProps) {
    return (
        <Reveal className="space-y-8">
            <div>
                <div className="mb-3 inline-block bg-primary px-3 py-1 font-sans text-xs font-semibold uppercase tracking-widest text-white">
                    {room.type}
                </div>
                <h1 className="font-heading text-4xl font-semibold leading-tight text-primary md:text-5xl">
                    {room.name}
                </h1>
            </div>

            {/* Meta Bar */}
            <div className="flex flex-wrap items-center gap-6 border-y border-border py-4 text-primary">
                <div className="flex items-center gap-2 font-sans text-sm font-medium">
                    <Users size={18} className="text-accent" />
                    <span>Up to {room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}</span>
                </div>
                <div className="flex items-center gap-2 font-sans text-sm font-medium">
                    <Maximize2 size={18} className="text-accent" />
                    <span>{room.size}</span>
                </div>
            </div>

            {/* Description */}
            <div className="prose prose-p:font-sans prose-p:text-base prose-p:leading-relaxed prose-p:text-muted max-w-none">
                <p>{room.description}</p>
            </div>
        </Reveal>
    )
}
