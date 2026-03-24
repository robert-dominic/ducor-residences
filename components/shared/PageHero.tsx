import Image from "next/image"
import { cn } from "@/lib/utils"

interface PageHeroProps {
    title: string
    subtitle?: string
    imageSrc?: string
    imageAlt?: string
    /** Compact variant uses less vertical padding (default: false) */
    compact?: boolean
}

export default function PageHero({
    title,
    subtitle,
    imageSrc = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80",
    imageAlt = "Ducor Residences",
    compact = false,
}: PageHeroProps) {
    return (
        <section
            className={cn(
                "relative flex items-end overflow-hidden bg-primary",
                compact ? "min-h-[320px]" : "min-h-[420px]"
            )}
        >
            <div className="absolute inset-0 animate-ken-burns">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
            </div>

            {/* Dark overlay — deeper at bottom so text is always readable */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(26,26,26,0.45) 0%, rgba(26,26,26,0.80) 100%)",
                }}
            />

            {/* Text content */}
            <div className="relative z-20 mx-auto w-full max-w-7xl px-6 lg:px-10 pb-12 pt-24">
                <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white leading-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-3 font-sans text-base text-white/70 max-w-xl">
                        {subtitle}
                    </p>
                )}
                {/* Accent underline */}
                <div className="mt-4 h-px w-12 bg-accent" />
            </div>
        </section>
    )
}
