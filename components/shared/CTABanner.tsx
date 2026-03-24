import Link from "next/link"
import Reveal from "@/components/shared/Reveal"

export default function CTABanner() {
    return (
        <section className="bg-primary py-20 px-6">
            <Reveal className="mx-auto max-w-3xl text-center space-y-6">
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-accent">
                    Monrovia&apos;s Finest
                </p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                    Ready for an elevated stay in Monrovia?
                </h2>
                <p className="font-sans text-base text-white/60 max-w-lg mx-auto">
                    Reserve your room at Ducor Residences and experience Liberia&apos;s hospitality
                    at its most refined.
                </p>
                <div className="pt-2">
                    <Link
                        href="/booking"
                        className="inline-block bg-[#B89358] px-8 py-3.5 font-sans text-sm font-semibold tracking-wide text-white transition-colors hover:bg-accent"
                    >
                        Book Now
                    </Link>
                </div>
            </Reveal>
        </section>
    )
}
