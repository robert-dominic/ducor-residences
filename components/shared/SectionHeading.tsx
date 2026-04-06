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
                "space-y-3",
                align === "center" && "text-center",
                className
            )}
        >
            {eyebrow && (
                <p
                    className={cn(
                        "font-sans text-[11px] font-medium uppercase tracking-[0.22em]",
                        inverted ? "text-accent" : "text-secondary"
                    )}
                >
                    {eyebrow}
                </p>
            )}

            <h2
                className={cn(
                    "font-heading text-[2rem] md:text-[2.5rem] font-medium leading-[1.08] tracking-[0.01em]",
                    inverted ? "text-white" : "text-primary"
                )}
            >
                {title}
            </h2>

            {/* Accent rule */}
            <div
                className={cn(
                    "h-px w-10 bg-accent",
                    align === "center" && "mx-auto"
                )}
            />

            {subtitle && (
                <p
                    className={cn(
                        "max-w-xl font-sans text-[15px] leading-7",
                        inverted ? "text-white/65" : "text-muted",
                        align === "center" && "mx-auto"
                    )}
                >
                    {subtitle}
                </p>
            )}
        </div>
    )
}
