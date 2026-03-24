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
        <section className="bg-surface py-24">
            <Reveal className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {amenities.map((item) => {
                        const IconComponent = iconMap[item.icon] || Wifi // Fallback

                        return (
                            <div
                                key={item.id}
                                className="flex flex-col gap-4 border border-border bg-background p-8 transition-colors hover:border-accent"
                            >
                                <div className="inline-flex h-12 w-12 items-center justify-center bg-surface text-accent">
                                    <IconComponent size={24} strokeWidth={1.5} />
                                </div>

                                <h3 className="font-heading text-2xl font-semibold text-primary">
                                    {item.title}
                                </h3>

                                <p className="font-sans text-sm leading-relaxed text-muted">
                                    {item.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </Reveal>
        </section>
    )
}
