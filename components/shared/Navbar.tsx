"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navLinks = [
    { href: "/rooms", label: "Rooms" },
    { href: "/amenities", label: "Amenities" },
    { href: "/booking", label: "Booking" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
]

interface NavbarProps {
    forceSolid?: boolean
}

export default function Navbar({ forceSolid = false }: NavbarProps) {
    const pathname = usePathname()
    const [visible, setVisible] = useState(true)
    const [scrolled, setScrolled] = useState(forceSolid)
    const [mobileOpen, setMobileOpen] = useState(false)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY

            // Show if scrolling up OR at the top (under 60px)
            setVisible(currentY < lastScrollY.current || currentY < 60)

            // Scrolled state past 60px
            setScrolled(forceSolid || currentY > 60)

            lastScrollY.current = currentY
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [forceSolid])

    // Close drawer on route change
    useEffect(() => {
        setMobileOpen(false)
    }, [pathname])

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : ""

        return () => {
            document.body.style.overflow = ""
        }
    }, [mobileOpen])

    return (
        <>
            <motion.header
                animate={{ y: visible ? 0 : "-100%" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
                    "border-b border-border/80 bg-background/98 shadow-sm backdrop-blur-md md:py-2"
                )}
            >
                <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3">
                    {/* Logo / Wordmark */}
                    <Link
                        href="/"
                        className="font-heading text-[0.7rem] md:text-[1rem] tracking-[0.12em] uppercase text-primary transition-colors duration-300 shrink-0"
                    >
                        Ducor Residences
                    </Link>

                    {/* Desktop nav links */}
                    <nav className="hidden items-center gap-7 lg:flex">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "relative font-sans text-[10.5px] tracking-[0.26em] uppercase transition-all duration-300",
                                        isActive ? "text-black" : "text-black hover:text-black/70"
                                    )}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span
                                            className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-center bg-primary"
                                            style={{
                                                animation: 'expandFromCenter 0.3s ease-out forwards',
                                            }}
                                        />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Book Now CTA & Mobile Hamburger */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/booking"
                            className="hidden lg:inline-block rounded-md bg-primary px-5 py-2.5 font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-white transition-all duration-300 ease-in-out hover:bg-black cursor-pointer"
                        >
                            Book a Stay
                        </Link>

                        {/* Mobile hamburger */}
                        <button
                            type="button"
                            onClick={() => setMobileOpen((v) => !v)}
                            className={cn(
                                "inline-flex cursor-pointer items-center justify-center p-1 text-primary transition-all duration-200 hover:opacity-70 lg:hidden",
                                mobileOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                            )}
                            aria-label="Open menu"
                        >
                            <span className="flex h-5 w-6 flex-col justify-center gap-[6px]">
                                <span className="block h-[1px] w-6 self-start bg-current" />
                                <span className="block h-[1px] w-3.5 self-end bg-current transition-all group-hover:w-6" />
                                <span className="block h-[1px] w-5 self-start bg-current" />
                            </span>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.button
                            type="button"
                            aria-label="Close menu overlay"
                            className="fixed inset-0 z-[60] bg-black/10 backdrop-blur-[1px] lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.aside
                            className="fixed top-0 left-0 z-[70] flex h-screen w-[85vw] max-w-sm flex-col border-r border-border bg-background px-6 pt-6 pb-8 lg:hidden shadow-xl"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-4">
                                <Link
                                    href="/"
                                    onClick={() => setMobileOpen(false)}
                                    className="font-heading text-[0.7rem] tracking-[0.14em] uppercase text-primary"
                                >
                                    Ducor Residences
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setMobileOpen(false)}
                                    aria-label="Close menu"
                                    className="inline-flex cursor-pointer items-center justify-center p-1 text-primary transition-colors hover:opacity-60"
                                >
                                    <span className="relative block h-4 w-4">
                                        <span className="absolute top-1/2 left-0 block h-[1px] w-4 -translate-y-1/2 -rotate-45 bg-current" />
                                        <span className="absolute top-1/2 left-0 block h-[1px] w-4 -translate-y-1/2 rotate-45 bg-current" />
                                    </span>
                                </button>
                            </div>

                            <nav className="flex flex-col">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={cn(
                                                "border-b border-border py-4 font-heading text-[0.7rem] leading-none transition-colors duration-200 uppercase tracking-[0.18em]",
                                                isActive ? "text-primary" : "text-black hover:text-black/70"
                                            )}
                                        >
                                            {link.label}
                                            {isActive && (
                                                <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
                                            )}
                                        </Link>
                                    )
                                })}
                            </nav>

                            <div className="mt-8">
                                <Link
                                    href="/booking"
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full rounded-md bg-primary py-4 text-center font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-black"
                                >
                                    Book a Stay
                                </Link>
                            </div>

                            <div className="mt-auto border-t border-border pt-6">
                                <p className="font-sans text-[9px] tracking-[0.24em] uppercase text-muted-foreground opacity-80">
                                    Monrovia, Liberia
                                </p>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
