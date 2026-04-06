"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
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

    const isActiveLink = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

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
                        ? "border-b border-border/70 bg-background/92 shadow-[0_10px_30px_rgba(26,26,26,0.06)] backdrop-blur-md"
                        : "border-b border-border/45 bg-background/72 backdrop-blur-md"
                )}
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="flex h-15 items-center justify-between lg:h-[4.6rem]">
                        {/* Logo / Wordmark */}
                        <Link
                            href="/"
                            className={cn(
                                "font-heading text-[1.15rem] font-medium tracking-[0.07em] transition-colors duration-300 sm:text-[1.2rem] lg:text-[1.35rem]",
                                "text-primary"
                            )}
                        >
                            Ducor Residences
                        </Link>

                        {/* Desktop nav links */}
                        <ul className="hidden md:flex items-center gap-9 lg:gap-10">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        aria-current={isActiveLink(link.href) ? "page" : undefined}
                                        className={cn(
                                            "relative inline-flex pb-2 font-sans text-[10px] font-normal uppercase tracking-[0.24em] transition-colors duration-200 hover:text-primary/90 lg:text-[11px]",
                                            isActiveLink(link.href)
                                                ? "text-primary"
                                                : "text-primary/68"
                                        )}
                                    >
                                        {link.label}
                                        <span
                                            className={cn(
                                                "absolute bottom-0 left-1/2 h-px w-7 -translate-x-1/2 origin-center bg-primary/75 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                                isActiveLink(link.href) ? "scale-x-100" : "scale-x-0"
                                            )}
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Book Now CTA */}
                        <div className="hidden md:block">
                            <Link
                                href="/booking"
                                className={cn(
                                    "inline-block rounded-lg border border-accent bg-accent px-4 py-2.5 font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-white transition-all duration-200 hover:brightness-105 lg:px-5"
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
                                "cursor-pointer text-primary"
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
                            className="flex h-full w-[78vw] max-w-[320px] flex-col border-r border-border bg-background px-6 pb-8 pt-6 shadow-[0_18px_40px_rgba(26,26,26,0.08)]"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="border-b border-border pb-4">
                                <div className="flex items-center justify-between gap-3">
                                    <Link
                                        href="/"
                                        onClick={() => setMobileOpen(false)}
                                        className="font-heading text-[1.1rem] font-medium leading-none tracking-[0.07em] text-primary"
                                    >
                                        Ducor Residences
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex h-10 w-10 items-center justify-center rounded-full p-0 text-primary transition-colors hover:bg-surface hover:text-accent cursor-pointer"
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
                                            aria-current={isActiveLink(link.href) ? "page" : undefined}
                                            className={cn(
                                                "flex items-center justify-between rounded-lg px-3 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-200",
                                                isActiveLink(link.href)
                                                    ? "border border-accent/30 bg-surface text-accent"
                                                    : "text-primary/80 hover:bg-surface hover:text-accent"
                                            )}
                                        >
                                            {link.label}
                                            <span
                                                className={cn(
                                                    "h-px w-5 origin-left bg-accent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                                    isActiveLink(link.href) ? "scale-x-100" : "scale-x-0"
                                                )}
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-8">
                                <Link
                                    href="/booking"
                                    onClick={() => setMobileOpen(false)}
                                    className="inline-flex w-full items-center justify-center rounded-lg border border-accent bg-accent px-5 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.14em] text-white transition-all duration-200 hover:brightness-105"
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
