"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import SectionHeading from "@/components/shared/SectionHeading"
import testimonials from "@/data/testimonials.json"

const CONFIG = {
    scale: { hovered: 1.08, adjacent: 0.95, other: 0.9, idle: 1 },
    tilt: { hovered: -12, adjacentLeft: -20, adjacentRight: 20, idle: 0 },
    lift: { hovered: -20, idle: 0 },
    opacity: { other: 0.4, idle: 1 },
    transition: { duration: 0.1, ease: "easeOut" as const }
}

export default function Testimonials() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <section className="bg-background py-25 overflow-hidden">
            <div className="mx-auto max-w-screen-2xl px-5 md:px-8 lg:px-12 mb-20">
                <SectionHeading
                    eyebrow="Guest Reviews"
                    title="What our guests say"
                    align="center"
                />
            </div>

            {/* Carousel Container */}
            <div
                className="relative w-full overflow-x-auto pb-20 no-scrollbar md:overflow-visible"
                style={{ perspective: "1500px" }}
            >
                <div
                    className="flex px-[15%] md:justify-center md:px-0 scroll-smooth snap-x snap-mandatory md:snap-none -space-x-28 md:-space-x-32"
                >
                    {testimonials.map((t, i) => {
                        const isHovered = hoveredIndex === i
                        const isAdjL = hoveredIndex !== null && i === hoveredIndex - 1
                        const isAdjR = hoveredIndex !== null && i === hoveredIndex + 1
                        const isOther = hoveredIndex !== null && !isHovered && !isAdjL && !isAdjR

                        return (
                            <motion.div
                                key={t.id}
                                className="relative shrink-0 snap-center md:snap-align-none cursor-pointer"
                                style={{
                                    transformStyle: "preserve-3d",
                                    zIndex: isHovered ? 100 : (isAdjL || isAdjR ? 80 : (20 + i))
                                }}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                animate={{
                                    scale: isHovered ? CONFIG.scale.hovered : (isAdjL || isAdjR ? CONFIG.scale.adjacent : (isOther ? CONFIG.scale.other : CONFIG.scale.idle)),
                                    y: isHovered ? CONFIG.lift.hovered : CONFIG.lift.idle,
                                    rotateY: isHovered ? CONFIG.tilt.hovered : (isAdjL ? CONFIG.tilt.adjacentLeft : (isAdjR ? CONFIG.tilt.adjacentRight : CONFIG.tilt.idle)),
                                    rotateX: isHovered ? 5 : 0,
                                    opacity: isOther ? CONFIG.opacity.other : CONFIG.opacity.idle,
                                }}
                                transition={CONFIG.transition}
                            >
                                <div className="w-[300px] rounded-2xl border border-border bg-white p-7 shadow-[0_4px_24px_rgba(26,26,46,0.04)] h-full flex flex-col will-change-transform">
                                    {/* Large Opening Quote */}
                                    <span className="font-heading text-[4rem] text-primary/10 leading-none h-10 select-none">
                                        &ldquo;
                                    </span>

                                    {/* Quote Content */}
                                    <div className="flex-1 mt-2">
                                        <p className="font-sans text-[15px] leading-relaxed text-primary">
                                            {t.quote}
                                        </p>
                                    </div>

                                    {/* Attachment */}
                                    <div className="mt-8 flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center font-heading text-[11px] text-white uppercase select-none">
                                            {t.initials}
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="font-heading text-[12px] font-medium tracking-wide text-primary uppercase leading-tight">
                                                {t.name}
                                            </p>
                                            <p className="font-sans text-[10px] text-primary/40 uppercase tracking-widest mt-0.5">
                                                {t.stay}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </section>
    )
}
