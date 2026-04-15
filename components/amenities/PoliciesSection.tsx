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
        <section className="bg-[#F9F9F9] py-24 border-t border-primary/5">
            <Reveal className="mx-auto max-w-screen-2xl px-5 md:px-8 lg:px-12">
                <SectionHeading
                    eyebrow="Guidelines"
                    title="House Policies"
                    subtitle="To ensure a restful and pleasant stay for all our guests, please note the following guidelines."
                    className="mb-16"
                />

                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">

                    {/* Left: Timings */}
                    <div className="lg:col-span-4 transition-all hover:translate-y-[-2px] duration-300">
                        <div className="space-y-6 rounded-2xl border border-primary/5 bg-white p-8">
                            <h3 className="mb-8 font-heading text-[1.4rem] font-medium leading-[1.04] tracking-[0.01em] text-primary">
                                Arrival & Departure
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-primary/5 pb-4">
                                    <span className="font-sans text-[13px] uppercase tracking-wider text-primary/50">Check-in</span>
                                    <span className="font-heading text-sm font-medium text-primary">{policies.checkIn}</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-primary/5 pb-4">
                                    <span className="font-sans text-[13px] uppercase tracking-wider text-primary/50">Check-out</span>
                                    <span className="font-heading text-sm font-medium text-primary">{policies.checkOut}</span>
                                </div>
                            </div>

                            <div className="pt-4 space-y-5">
                                <div className="space-y-1">
                                    <p className="font-heading text-[11px] uppercase tracking-widest text-primary/40">Early Check-in</p>
                                    <p className="font-sans text-sm leading-relaxed text-primary/70">{policies.earlyCheckIn}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-heading text-[11px] uppercase tracking-widest text-primary/40">Late Check-out</p>
                                    <p className="font-sans text-sm leading-relaxed text-primary/70">{policies.lateCheckOut}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Rules List */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {policies.rules.map((rule) => {
                                const IconComponent = iconMap[rule.icon] || MoonStar
                                return (
                                    <article
                                        key={rule.id}
                                        className="rounded-2xl border border-primary/5 bg-white p-7 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F9F9F9] text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                <IconComponent size={18} strokeWidth={1.5} />
                                            </div>
                                            <h4 className="font-heading text-[1.2rem] font-medium leading-[1.04] tracking-[0.01em] text-primary">
                                                {rule.title}
                                            </h4>
                                        </div>
                                        <p className="mt-5 font-sans text-[15px] leading-relaxed text-primary/60">
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
