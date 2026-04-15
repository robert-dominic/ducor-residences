import Link from "next/link"
import Reveal from "@/components/shared/Reveal"

export default function CTABanner() {
    return (
        <section className="bg-[#F9F9F9] px-6 py-28 md:py-36">
            <Reveal className="mx-auto max-w-4xl text-center space-y-8">
                <p className="font-heading text-[10px] font-medium uppercase tracking-[0.28em] text-primary/60">
                    Monrovia&apos;s Finest Sanctuary
                </p>
                <h2 className="font-heading text-[2rem] font-medium leading-[1.04] tracking-[0.01em] text-primary md:text-[3rem] lg:text-[4rem]">
                    Ready for an elevated <br className="hidden md:block" /> stay in Monrovia?
                </h2>
                <p className="mx-auto max-w-xl font-sans text-[16px] leading-relaxed text-primary/70">
                    Reserve your room at Ducor Residences and experience Liberia&apos;s hospitality
                    at its most refined. Every detail curated for your comfort.
                </p>
                <div className="pt-4">
                    <Link
                        href="/booking"
                        className="inline-block rounded-xl bg-primary px-10 py-4 font-heading text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Book Your Stay
                    </Link>
                </div>
            </Reveal>
        </section>
    )
}
