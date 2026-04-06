import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import PageHero from "@/components/shared/PageHero"
import FeatureGrid from "@/components/amenities/FeatureGrid"
import PoliciesSection from "@/components/amenities/PoliciesSection"

import amenitiesData from "@/data/amenities.json"
import policiesData from "@/data/policies.json"

export const metadata = {
    title: "Amenities & Policies | Ducor Residences",
    description: "Discover the amenities and house policies that make your stay at Ducor Residences effortless and enjoyable.",
}

export default function AmenitiesPage() {
    return (
        <>
            <Navbar />
            <main>
                <PageHero
                    title="Amenities & Policies"
                    subtitle="Everything you need for an effortless stay in Monrovia."
                    imageSrc="https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1600&q=80"
                    imageAlt="Rooftop bar at sunset"
                    compact
                />

                <FeatureGrid amenities={amenitiesData} />
                <PoliciesSection policies={policiesData} />
            </main>
            <Footer />
        </>
    )
}
