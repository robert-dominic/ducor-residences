import Reveal from "@/components/shared/Reveal"
import SectionHeading from "@/components/shared/SectionHeading"
import RoomCard from "@/components/shared/RoomCard"
import type { Room } from "@/types"
import roomsData from "@/data/rooms.json"

interface SimilarRoomsProps {
    currentRoom: Room
}

export default function SimilarRooms({ currentRoom }: SimilarRoomsProps) {
    // Grab 2-3 other rooms that aren't the current one
    const others = (roomsData as Room[])
        .filter((r) => r.id !== currentRoom.id)
        .slice(0, 3)

    if (others.length === 0) return null

    return (
        <section className="bg-surface py-20 mt-12 border-t border-border">
            <Reveal className="mx-auto max-w-7xl px-6 lg:px-10 space-y-10">
                <SectionHeading
                    title="Similar Rooms"
                    subtitle="Explore other spaces that might catch your eye."
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {others.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </Reveal>
        </section>
    )
}
