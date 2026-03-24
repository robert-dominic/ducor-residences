import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import PageHero from "@/components/shared/PageHero"
import CTABanner from "@/components/shared/CTABanner"
import RoomGrid from "@/components/rooms/RoomGrid"

export const metadata = {
    title: "Rooms & Suites | Ducor Residences",
    description: "Explore our collection of finely appointed rooms, suites, and penthouses in the heart of Monrovia.",
}

export default function RoomsPage() {
    return (
        <>
            <Navbar />
            <main>
                <PageHero
                    title="Rooms & Suites"
                    subtitle="Sanctuaries of quiet luxury designed for rest and reflection."
                    imageSrc="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80"
                    imageAlt="A beautifully made bed in a Ducor Residences room"
                    compact
                />
                <RoomGrid />
                <CTABanner />
            </main>
            <Footer />
        </>
    )
}
