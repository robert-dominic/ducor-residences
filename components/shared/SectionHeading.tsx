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
                        "font-sans text-xs font-semibold uppercase tracking-widest",
                        inverted ? "text-accent" : "text-secondary"
                    )}
                >
                    {eyebrow}
                </p>
            )}

            <h2
                className={cn(
                    "font-heading text-4xl font-semibold leading-tight",
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
                        "font-sans text-base leading-relaxed max-w-xl",
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
