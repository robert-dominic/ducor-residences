import {
    MoonStar,
    CigaretteOff,
    PawPrint,
    CreditCard,
    CalendarX,
    Baby,
    type LucideIcon,
} from "lucide-react"
import Reveal from "@/components/shared/Reveal"
import SectionHeading from "@/components/shared/SectionHeading"

// Map string names from JSON to Lucide icons
const iconMap: Record<string, LucideIcon> = {
    MoonStar,
    CigaretteOff,
    PawPrint,
    CreditCard,
    CalendarX,
    Baby,
}

interface PoliciesSectionProps {
    policies: {
        checkIn: string
        checkOut: string
        earlyCheckIn: string
        lateCheckOut: string
        rules: {
            id: string
            title: string
            icon: string
            description: string
        }[]
    }
}

export default function PoliciesSection({ policies }: PoliciesSectionProps) {
    return (
        <section className="bg-background py-24 border-t border-border">
            <Reveal className="mx-auto max-w-7xl px-6 lg:px-10">
                <SectionHeading
                    eyebrow="Guidelines"
                    title="House Policies"
                    subtitle="To ensure a restful and pleasant stay for all our guests, please note the following guidelines."
                    className="mb-14"
                />

                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">

                    {/* Left: Timings */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="space-y-4 rounded-2xl border border-border bg-surface p-8 shadow-[0_16px_36px_rgba(26,26,26,0.05)]">
                            <h3 className="mb-6 font-heading text-[1.7rem] font-medium leading-[1.15] text-primary">
                                Arrival & Departure
                            </h3>

                            <div className="flex items-center justify-between border-b border-border/50 pb-3">
                                <span className="font-sans text-sm text-muted">Check-in</span>
                                <span className="font-sans text-sm font-medium text-primary">{policies.checkIn}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-border/50 pb-3">
                                <span className="font-sans text-sm text-muted">Check-out</span>
                                <span className="font-sans text-sm font-medium text-primary">{policies.checkOut}</span>
                            </div>

                            <div className="pt-2 space-y-4">
                                <p className="font-sans text-sm leading-relaxed text-muted">
                                    <strong className="text-primary font-medium">Early Check-in:</strong> {policies.earlyCheckIn}
                                </p>
                                <p className="font-sans text-sm leading-relaxed text-muted">
                                    <strong className="text-primary font-medium">Late Check-out:</strong> {policies.lateCheckOut}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Rules List */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {policies.rules.map((rule) => {
                                const IconComponent = iconMap[rule.icon] || MoonStar
                                return (
                                    <article key={rule.id} className="rounded-2xl border border-border bg-surface p-6 shadow-[0_16px_36px_rgba(26,26,26,0.05)]">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-accent">
                                                <IconComponent size={18} strokeWidth={1.5} />
                                            </div>
                                            <h4 className="font-heading text-[1.35rem] font-medium text-primary">
                                                {rule.title}
                                            </h4>
                                        </div>
                                        <p className="mt-4 font-sans text-[15px] leading-7 text-muted">
                                            {rule.description}
                                        </p>
                                    </article>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </Reveal>
        </section>
    )
}
