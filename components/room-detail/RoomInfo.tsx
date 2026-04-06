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
                <div className="mb-3 inline-block rounded-md bg-primary px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white">
                    {room.type}
                </div>
                <h1 className="font-heading text-[2.2rem] font-medium leading-[1.05] text-primary md:text-[3.5rem]">
                    {room.name}
                </h1>
            </div>

            {/* Meta Bar */}
            <div className="flex flex-wrap items-center gap-6 border-y border-border py-4 text-primary">
                <div className="flex items-center gap-2 font-sans text-sm font-normal">
                    <Users size={18} className="text-accent" />
                    <span>Up to {room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}</span>
                </div>
                <div className="flex items-center gap-2 font-sans text-sm font-normal">
                    <Maximize2 size={18} className="text-accent" />
                    <span>{room.size}</span>
                </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none prose-p:font-sans prose-p:text-[15px] prose-p:leading-7 prose-p:text-muted">
                <p>{room.description}</p>
            </div>
        </Reveal>
    )
}
