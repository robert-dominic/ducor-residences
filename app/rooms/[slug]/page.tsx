import { notFound } from "next/navigation"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import ImageGallery from "@/components/room-detail/ImageGallery"
import RoomInfo from "@/components/room-detail/RoomInfo"
import AmenitiesList from "@/components/room-detail/AmenitiesList"
import BookingPanel from "@/components/room-detail/BookingPanel"
import SimilarRooms from "@/components/room-detail/SimilarRooms"
import type { Room } from "@/types"
import roomsData from "@/data/rooms.json"

// Generate static params so all room detail pages are built at compile time
export async function generateStaticParams() {
    return (roomsData as Room[]).map((room) => ({
        slug: room.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const room = (roomsData as Room[]).find((r) => r.slug === slug)

    if (!room) return { title: "Room Not Found" }

    return {
        title: `${room.name} | Ducor Residences`,
        description: room.description.substring(0, 160),
    }
}

export default async function RoomDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const room = (roomsData as Room[]).find((r) => r.slug === slug)

    if (!room) {
        notFound()
    }

    return (
        <>
            <Navbar forceSolid />

            <main className="bg-background">
                <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-28">

                    {/* Top: Gallery */}
                    <div className="mb-12 lg:mb-16">
                        <ImageGallery images={room.images} roomName={room.name} />
                    </div>

                    {/* Bottom: 2-column layout */}
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 pb-16 relative items-start">

                        {/* Left Col: Info + Amenities */}
                        <div className="lg:col-span-8">
                            <RoomInfo room={room} />
                            <AmenitiesList amenities={room.amenities} />
                        </div>

                        {/* Right Col: Booking Panel (Sticky) */}
                        <div className="lg:col-span-4">
                            <BookingPanel price={room.price} />
                        </div>

                    </div>
                </div>

                {/* Similar Rooms (Bottom) */}
                <SimilarRooms currentRoom={room} />
            </main>

            <Footer />
        </>
    )
}
