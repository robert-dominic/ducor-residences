import { BedDouble, Car, Eye, UtensilsCrossed, type LucideIcon } from "lucide-react"

export interface HeroHighlight {
  icon: LucideIcon
  label: string
  title: string
  description: string
}

export const heroHighlights: HeroHighlight[] = [
  {
    icon: BedDouble,
    label: "Rooms",
    title: "12 refined stays",
    description:
      "Thoughtfully appointed rooms and suites designed for calm, privacy, and restorative rest above the city.",
  },
  {
    icon: UtensilsCrossed,
    label: "Dining",
    title: "Rooftop dining",
    description:
      "A polished dining experience with skyline views, intimate service, and a menu shaped for long evenings.",
  },
  {
    icon: Eye,
    label: "Views",
    title: "Panoramic outlooks",
    description:
      "Elevated vantage points that frame Monrovia in a quieter, more cinematic way from sunrise to dusk.",
  },
  {
    icon: Car,
    label: "Service",
    title: "Private transfers",
    description:
      "Airport pickups and local coordination handled with the same discretion and ease as the rest of your stay.",
  },
]
