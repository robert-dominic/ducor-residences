import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import PageHero from "@/components/shared/PageHero"
import BookingClient from "@/components/booking/BookingClient"
import { getRooms } from "@/lib/rooms"

export const metadata = {
    title: "Book Your Stay | Ducor Residences",
    description: "Reserve your suite or room at Ducor Residences in Monrovia.",
}

export default async function BookingPage({
    searchParams,
}: {
    searchParams: Promise<{ room?: string }>
}) {
    const { room } = await searchParams
    const rooms = await getRooms()

    return (
        <>
            <Navbar />
            <main className="bg-background pb-24">
                <PageHero
                    title="Reserve Your Stay"
                    subtitle="Experience the quiet luxury of Ducor Residences."
                    imageSrc="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600&q=80"
                    imageAlt="A sophisticated modern hotel interior"
                    compact
                />

                <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-16">
                    <BookingClient rooms={rooms} preselectedSlug={room} />
                </div>
            </main>
            <Footer />
        </>
    )
}