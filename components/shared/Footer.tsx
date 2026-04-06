import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

const footerLinks = [
    { href: "/rooms", label: "Rooms" },
    { href: "/amenities", label: "Amenities" },
    { href: "/booking", label: "Book a Stay" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
]

export default function Footer() {
    return (
        <footer className="bg-primary text-white/70">
            <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Brand column */}
                    <div className="space-y-4">
                        <h3 className="font-heading text-[1.8rem] font-medium text-white">
                            Ducor Residences
                        </h3>
                        <p className="font-sans text-sm leading-relaxed">
                            Where Monrovia&apos;s story meets modern comfort. A landmark of quiet
                            luxury in the heart of Liberia.
                        </p>
                    </div>

                    {/* Navigation column */}
                    <div className="space-y-4">
                        <h4 className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                            Navigate
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-sans text-sm transition-colors hover:text-accent"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact column */}
                    <div className="space-y-4">
                        <h4 className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                            Contact
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin size={15} className="mt-0.5 shrink-0 text-secondary" />
                                <span className="font-sans text-sm leading-snug">
                                    Ducor Hill, Monrovia, Liberia
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={15} className="shrink-0 text-secondary" />
                                <a
                                    href="tel:+231770000000"
                                    className="font-sans text-sm transition-colors hover:text-accent"
                                >
                                    +231 770 000 000
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={15} className="shrink-0 text-secondary" />
                                <a
                                    href="mailto:hello@ducorresidences.com"
                                    className="font-sans text-sm transition-colors hover:text-accent"
                                >
                                    hello@ducorresidences.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-14 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="font-sans text-xs text-white/40">
                        &copy; {new Date().getFullYear()} Ducor Residences. All rights reserved.
                    </p>
                    <div className="flex flex-col items-center gap-1 sm:items-end">
                        <p className="font-sans text-xs text-white/30">
                            A luxury guest house in Monrovia, Liberia.
                        </p>
                        <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-white/35">
                            Built by WebNova Studio
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
