import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import PageHero from "@/components/shared/PageHero"
import BookingClient from "@/components/booking/BookingClient"
import { getRooms } from "@/lib/rooms"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

export const metadata = {
    title: "Book Your Stay | Ducor Residences",
    description: "Reserve your suite or room at Ducor Residences in Monrovia.",
}

async function BookingContent({ preselectedSlug }: { preselectedSlug?: string }) {
    const rooms = await getRooms()
    return <BookingClient rooms={rooms} preselectedSlug={preselectedSlug} />
}

export default async function BookingPage({
    searchParams,
}: {
    searchParams: Promise<{ room?: string }>
}) {
    const { room } = await searchParams

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

                <div className="mx-auto max-w-7xl px-5 mt-12">
                    <Suspense fallback={
                        <div className="flex flex-col items-center justify-center py-32 space-y-5">
                            <Loader2 className="h-10 w-10 animate-spin text-primary/10" strokeWidth={1.5} />
                            <p className="font-heading text-[10px] uppercase tracking-[0.24em] text-primary/40">
                                Synchronizing Availability
                            </p>
                        </div>
                    }>
                        <BookingContent preselectedSlug={room} />
                    </Suspense>
                </div>
            </main>
            <Footer />
        </>
    )
}