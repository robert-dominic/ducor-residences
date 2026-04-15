"use client"

import { useState } from "react"

const brands = [
    { name: "Aman", logo: <AmanLogo /> },
    { name: "Aesop", logo: <AesopLogo /> },
    { name: "Four Seasons", logo: <FourSeasonsLogo /> },
    { name: "Bang & Olufsen", logo: <BOLogo /> },
    { name: "LVMH", logo: <LVMHLogo /> },
    { name: "Rolex", logo: <RolexLogo /> },
    { name: "Hermès", logo: <HermesLogo /> },
    { name: "Ritz-Carlton", logo: <RitzLogo /> },
    { name: "Le Labo", logo: <LeLaboLogo /> },
    { name: "Hyatt", logo: <HyattLogo /> },
    { name: "Marriott", logo: <MarriottLogo /> },
]

export default function Collaborators() {
    const [isPaused, setIsPaused] = useState(false)

    const togglePause = () => {
        setIsPaused((p) => !p)
    }

    // Duplicate the brands to create a seamless infinite loop (2 sets for perfect -50% translation)
    const duplicatedBrands = [...brands, ...brands]

    return (
        <section className="py-8 border-b border-border bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
                <div className="mb-10 flex items-center justify-center gap-4">
                    <span className="h-px w-8 bg-primary/20" />
                    <p className="font-heading text-[10px] tracking-[0.28em] uppercase text-primary/60">
                        Selected Partnerships
                    </p>
                    <span className="h-px w-8 bg-primary/20" />
                </div>

                <div
                    className="relative overflow-hidden w-full cursor-pointer group"
                    onClick={togglePause}
                >
                    {/* Faded edges */}
                    <div className="absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />

                    <div
                        className="animate-marquee flex items-center gap-16 md:gap-24 whitespace-nowrap will-change-transform"
                        style={{
                            animationPlayState: isPaused ? "paused" : "running"
                        }}
                    >
                        {duplicatedBrands.map((brand, index) => (
                            <div
                                key={`${brand.name}-${index}`}
                                className="flex items-center grayscale opacity-50 transition-all duration-500 hover:grayscale-0 hover:opacity-100 h-10 select-none"
                            >
                                {brand.logo}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="font-sans text-[9px] tracking-[0.14em] uppercase text-primary/40 flex items-center gap-2">
                            <span className={`h-1 w-1 rounded-full ${isPaused ? "bg-amber-500 animate-pulse" : "bg-green-500"}`} />
                            {isPaused ? "Paused • Tap to resume" : "Auto-scrolling • Tap to pause"}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

function AmanLogo() {
    return <span className="font-heading text-[1.4rem] tracking-[0.35em] uppercase text-primary">Aman</span>
}

function AesopLogo() {
    return (
        <svg viewBox="0 0 100 24" className="h-5 w-auto fill-primary">
            <text x="0" y="20" className="font-heading text-[1.4rem] tracking-tight lowercase font-bold">Aesop</text>
        </svg>
    )
}

function FourSeasonsLogo() {
    return (
        <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-auto fill-primary">
                <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
            </svg>
            <span className="font-heading text-[0.85rem] tracking-[0.15em] uppercase font-medium">Four Seasons</span>
        </div>
    )
}

function BOLogo() {
    return (
        <svg viewBox="0 0 24 24" className="h-9 w-auto stroke-primary fill-none" strokeWidth="1.2">
            <circle cx="12" cy="12" r="10.5" />
            <text x="12" y="12.5" textAnchor="middle" dominantBaseline="central" className="font-heading text-[7.5px] fill-primary stroke-none font-bold">B&O</text>
        </svg>
    )
}

function LVMHLogo() {
    return <span className="font-heading text-[1.2rem] tracking-[0.1em] font-bold text-primary">L V M H</span>
}

function RolexLogo() {
    return (
        <div className="flex flex-col items-center">
            <svg viewBox="0 0 24 24" className="h-5 w-auto fill-primary">
                <path d="M12 4L15 9L21 8L18 13L12 11L6 13L3 8L9 9L12 4Z" />
            </svg>
            <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-bold mt-1">Rolex</span>
        </div>
    )
}

function HermesLogo() {
    return <span className="font-heading text-[1.1rem] tracking-[0.4em] uppercase text-primary">HERMÈS</span>
}

function RitzLogo() {
    return (
        <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-auto fill-primary">
                <path d="M12,2L4,10H10V22H14V10H20L12,2Z" />
            </svg>
            <span className="font-heading text-[0.9rem] tracking-[0.1em] uppercase">Ritz-Carlton</span>
        </div>
    )
}

function LeLaboLogo() {
    return (
        <div className="px-2 py-1 border border-primary/20 rounded">
            <span className="font-mono text-[0.85rem] tracking-tighter uppercase font-bold">Le Labo</span>
        </div>
    )
}

function HyattLogo() {
    return <span className="font-heading text-[1.2rem] tracking-[0.15em] uppercase text-primary">HYATT</span>
}

function MarriottLogo() {
    return <span className="font-sans text-[0.9rem] tracking-[0.05em] uppercase font-bold text-primary">Marriott</span>
}
