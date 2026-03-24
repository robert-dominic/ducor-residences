import { Check } from "lucide-react"
import Reveal from "@/components/shared/Reveal"

interface AmenitiesListProps {
    amenities: string[]
}

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
    if (!amenities?.length) return null

    return (
        <Reveal className="mt-12 space-y-6" delay={0.1}>
            <h3 className="font-heading text-2xl font-semibold text-primary">
                Room Amenities
            </h3>

            <ul className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 gap-x-8">
                {amenities.map((amenity, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 bg-surface p-1 text-accent">
                            <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="font-sans text-sm font-medium text-primary/80">
                            {amenity}
                        </span>
                    </li>
                ))}
            </ul>
        </Reveal>
    )
}
