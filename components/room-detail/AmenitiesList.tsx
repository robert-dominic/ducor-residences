import { Check } from "lucide-react"
import Reveal from "@/components/shared/Reveal"

interface AmenitiesListProps {
    amenities: string[]
}

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
    if (!amenities?.length) return null

    return (
        <Reveal className="mt-12 space-y-6" delay={0.1}>
            <h3 className="font-heading text-[1.2rem] md:text-[1.7rem] text-primary">
                Room Amenities
            </h3>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 mt-6">
                {amenities.map((amenity, i) => (
                    <li key={i} className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2">
                        <Check size={14} className="text-accent shrink-0" strokeWidth={3} />
                        <span className="font-sans text-[13px] text-primary line-clamp-1">
                            {amenity}
                        </span>
                    </li>
                ))}
            </ul>
        </Reveal>
    )
}
