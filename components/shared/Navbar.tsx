"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
    { href: "/rooms", label: "Rooms" },
    { href: "/amenities", label: "Amenities" },
    { href: "/gallery", label: "Gallery" },
    { href: "/booking", label: "Booking" },
    { href: "/contact", label: "Contact" },
]

interface NavbarProps {
    forceSolid?: boolean
}

export default function Navbar({ forceSolid = false }: NavbarProps) {
    const [visible, setVisible] = useState(true)
    const [scrolled, setScrolled] = useState(forceSolid)
    const [mobileOpen, setMobileOpen] = useState(false)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Always visible at the very top.
            if (currentScrollY < 10) {
                setVisible(true)
                setScrolled(forceSolid)
                lastScrollY.current = currentScrollY
                return
            }

            // Solid background past 80px
            setScrolled(forceSolid || currentScrollY > 80)

            // Scroll DOWN → show
            // Scroll UP → hide
            if (currentScrollY > lastScrollY.current) {
                setVisible(true)
            } else {
                setVisible(false)
            }

            lastScrollY.current = currentScrollY
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [forceSolid])

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : ""

        return () => {
            document.body.style.overflow = ""
        }
    }, [mobileOpen])

    return (
        <>
            <motion.nav
                animate={{ y: visible ? 0 : "-100%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 w-full",
                    scrolled
                        ? "bg-primary shadow-[0_1px_0_rgba(201,169,110,0.15)]"
                        : "bg-transparent"
                )}
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo / Wordmark */}
                        <Link
                            href="/"
                            className={cn(
                                "font-heading text-xl font-semibold tracking-wide transition-colors duration-300",
                                scrolled ? "text-accent" : "text-white"
                            )}
                        >
                            Ducor Residences
                        </Link>

                        {/* Desktop nav links */}
                        <ul className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "font-sans text-sm font-medium tracking-wide transition-colors duration-200 hover:text-accent",
                                            scrolled ? "text-white/80" : "text-white/90"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Book Now CTA */}
                        <div className="hidden md:block">
                            <Link
                                href="/booking"
                                className={cn(
                                    "inline-block border px-5 py-2 font-sans text-sm font-medium tracking-wide transition-all duration-200",
                                    "border-accent text-accent hover:bg-accent hover:text-white"
                                )}
                            >
                                Book a Stay
                            </Link>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            type="button"
                            onClick={() => setMobileOpen((prev) => !prev)}
                            className={cn(
                                "p-2 transition-colors md:hidden",
                                mobileOpen && "pointer-events-none opacity-0",
                                scrolled ? "text-white" : "text-white"
                            )}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        >
                            <Menu size={22} />
                        </button>
                    </div>
                </div>

            </motion.nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[60] bg-black/50 md:hidden"
                        onClick={() => setMobileOpen(false)}
                    >
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="flex h-full w-[70vw] max-w-[280px] flex-col bg-primary px-6 pb-8 pt-6"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="border-b border-accent/25 pb-4">
                                <div className="flex items-center justify-between gap-3">
                                    <Link
                                        href="/"
                                        onClick={() => setMobileOpen(false)}
                                        className="font-heading text-xl font-semibold leading-none tracking-wide text-accent"
                                    >
                                        Ducor Residences
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex h-10 w-10 items-center justify-center p-0 text-white transition-colors hover:text-accent"
                                        aria-label="Close menu"
                                    >
                                        <X size={22} />
                                    </button>
                                </div>
                            </div>

                            <ul className="flex flex-col gap-6 pt-8">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="font-sans text-sm tracking-wide text-white/85 transition-colors hover:text-accent"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-8">
                                <Link
                                    href="/booking"
                                    onClick={() => setMobileOpen(false)}
                                    className="inline-flex w-full items-center justify-center border border-accent px-5 py-3 font-sans text-sm font-medium text-accent transition-all duration-200 hover:bg-accent hover:text-white"
                                >
                                    Book a Stay
                                </Link>
                            </div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
