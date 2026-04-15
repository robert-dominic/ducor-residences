import { cn } from "@/lib/utils"

interface SectionHeadingProps {
    eyebrow?: string
    title: string
    subtitle?: string
    /** "left" (default) | "center" */
    align?: "left" | "center"
    /** Invert for dark section backgrounds */
    inverted?: boolean
    className?: string
}

export default function SectionHeading({
    eyebrow,
    title,
    subtitle,
    align = "left",
    inverted = false,
    className,
}: SectionHeadingProps) {
    return (
        <div
            className={cn(
                "space-y-5",
                align === "center" && "text-center",
                className
            )}
        >
            {eyebrow && (
                <p
                    className={cn(
                        "font-sans text-[10px] tracking-[0.28em] uppercase",
                        inverted ? "text-white/60" : "text-primary/60"
                    )}
                >
                    {eyebrow}
                </p>
            )}

            <h2
                className={cn(
                    "font-heading text-2xl leading-[0.96] tracking-[0.01em] md:text-5xl lg:text-[4.2rem]",
                    inverted ? "text-white" : "text-primary"
                )}
            >
                {title}
            </h2>

            {/* Subtle accent rule */}
            <div
                className={cn(
                    "h-[1.5px] w-12 bg-primary/10",
                    align === "center" && "mx-auto"
                )}
            />

            {subtitle && (
                <p
                    className={cn(
                        "max-w-lg font-sans text-[15px] leading-7",
                        inverted ? "text-white/65" : "text-primary/70",
                        align === "center" && "mx-auto"
                    )}
                >
                    {subtitle}
                </p>
            )}
        </div>
    )
}
