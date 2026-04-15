import Reveal from "@/components/shared/Reveal"
import {
    UtensilsCrossed,
    Wine,
    Waves,
    Presentation,
    Car,
    Wifi,
    Clock,
    BellRing,
    type LucideIcon,
} from "lucide-react"

// Map of string names from JSON to Lucide icons
const iconMap: Record<string, LucideIcon> = {
    UtensilsCrossed,
    Wine,
    Waves,
    Presentation,
    Car,
    Wifi,
    Clock,
    BellRing,
}

interface FeatureGridProps {
    amenities: {
        id: string
        title: string
        icon: string
        description: string
    }[]
}

export default function FeatureGrid({ amenities }: FeatureGridProps) {
    return (
        <section className="bg-white py-24">
            <Reveal className="mx-auto max-w-screen-2xl px-5 lg:px-20">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {amenities.map((item) => {
                        const IconComponent = iconMap[item.icon] || Wifi // Fallback

                        return (
                            <div
                                key={item.id}
                                className="flex flex-col gap-6 rounded-2xl border border-primary/5 bg-[#F9F9F9] px-5 py-8 transition-all group hover:bg-white"
                            >
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <IconComponent size={24} strokeWidth={1.5} />
                                </div>

                                <div className="space-y-3">
                                    <h3 className="font-heading text-[1rem] md:text-[1.2rem] font-medium leading-[1.04] tracking-[0.01em] text-primary">
                                        {item.title}
                                    </h3>

                                    <p className="font-sans text-[13px] md:text-[15px] leading-relaxed text-primary/60">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Reveal>
        </section>
    )
}
