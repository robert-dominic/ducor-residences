import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

const footerLinks = [
    { href: "/rooms", label: "Our Rooms" },
    { href: "/amenities", label: "Amenities" },
    { href: "/booking", label: "Reservations" },
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Contact Us" },
]

export default function Footer() {
    return (
        <footer className="bg-primary text-white/60 border-t border-white/5">
            <div className="mx-auto max-w-screen-2xl px-3 lg:px-20 pt-20 pb-5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

                    {/* Brand Identity */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <h3 className="font-heading text-[1.5rem] font-medium tracking-tight text-white leading-none">
                                Ducor Residences
                            </h3>
                            <p className="font-sans text-[15px] leading-relaxed max-w-sm">
                                A landmark of quiet luxury in the heart of Monrovia. We combine
                                Liberian warmth with international standards of comfort.
                            </p>
                        </div>

                        {/* Newsletter or minor claim */}
                        <div className="pt-4">
                            <p className="font-heading text-[10px] uppercase tracking-[0.28em] text-white/30">
                                Member of Luxury Guest Houses Liberia
                            </p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-heading text-[10px] font-medium uppercase tracking-[0.28em] text-white/40">
                            Navigate
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-sans text-[14px] transition-all hover:text-white hover:pl-1"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Essential Contact */}
                    <div className="lg:col-span-5 space-y-6 lg:pl-12">
                        <h4 className="font-heading text-[10px] font-medium uppercase tracking-[0.28em] text-white/40">
                            Get in Touch
                        </h4>
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                                    <MapPin size={14} className="text-white/40" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-heading text-[11px] uppercase tracking-widest text-white/80">Address</p>
                                    <p className="font-sans text-[14px]">Ducor Hill, Snapper Hill, Monrovia, Liberia</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                                    <Phone size={14} className="text-white/40" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-heading text-[11px] uppercase tracking-widest text-white/80">Telephone</p>
                                    <a href="tel:+231770000000" className="font-sans text-[14px] hover:text-white transition-colors">
                                        +231 770 000 000
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                                    <Mail size={14} className="text-white/40" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-heading text-[11px] uppercase tracking-widest text-white/80">Email</p>
                                    <a href="mailto:hello@ducorresidences.com" className="font-sans text-[14px] hover:text-white transition-colors">
                                        hello@ducorresidences.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legal & Attribution */}
                <div className="mt-20 lg:mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-1 text-center md:text-left">
                        <p className="font-sans text-[12px] text-white/30">
                            &copy; {new Date().getFullYear()} Ducor Residences. All rights reserved.
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <p className="font-heading text-[9px] uppercase tracking-[0.3em] text-white/20">
                            Designed & Developed by WebNova Studio
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
