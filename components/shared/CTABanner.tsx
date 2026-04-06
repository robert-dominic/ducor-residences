import Link from "next/link"
import Reveal from "@/components/shared/Reveal"

export default function CTABanner() {
    return (
        <section className="border-b border-white/10 bg-primary px-6 py-20">
            <Reveal className="mx-auto max-w-3xl text-center space-y-6">
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
                    Monrovia&apos;s Finest
                </p>
                <h2 className="font-heading text-[2.2rem] font-medium leading-[1.08] tracking-[0.01em] text-white md:text-[2.8rem] lg:text-[3.3rem]">
                    Ready for an elevated stay in Monrovia?
                </h2>
                <p className="mx-auto max-w-lg font-sans text-[15px] leading-7 text-white/62">
                    Reserve your room at Ducor Residences and experience Liberia&apos;s hospitality
                    at its most refined.
                </p>
                <div className="pt-2">
                    <Link
                        href="/booking"
                        className="inline-block rounded-lg bg-button px-7 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-accent"
                    >
                        Book Now
                    </Link>
                </div>
            </Reveal>
        </section>
    )
}
