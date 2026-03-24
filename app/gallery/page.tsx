import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import PageHero from "@/components/shared/PageHero"
import CTABanner from "@/components/shared/CTABanner"
import GalleryGrid from "@/components/gallery/GalleryGrid"

export const metadata = {
    title: "Gallery | Ducor Residences",
    description: "A visual journey through Ducor Residences. Explore our rooms, dining spaces, and breath-taking views over Monrovia.",
}

export default function GalleryPage() {
    return (
        <>
            <Navbar />
            <main>
                <PageHero
                    title="Gallery"
                    subtitle="Moments captured at Ducor Residences."
                    imageSrc="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"
                    imageAlt="A sophisticated modern hotel exterior at dusk"
                    compact
                />
                <GalleryGrid />
                <CTABanner />
            </main>
            <Footer />
        </>
    )
}
