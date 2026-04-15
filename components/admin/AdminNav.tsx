"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CalendarDays, BedDouble, BarChart3, LogOut } from "lucide-react"

const navItems = [
    { name: "Home", href: "/admin", icon: Home },
    { name: "All Bookings", href: "/admin/bookings", icon: CalendarDays },
    { name: "Rooms", href: "/admin/rooms", icon: BedDouble },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
]

export function AdminSidebar({ email }: { email?: string }) {
    const pathname = usePathname()
    const initial = email ? email.charAt(0).toUpperCase() : "A"

    return (
        <aside className="fixed left-0 top-0 bottom-0 z-40 hidden w-[240px] flex-col bg-primary md:flex border-r border-white/5">
            <div className="flex h-20 shrink-0 items-center px-8">
                <Link href="/" className="font-heading text-[1.1rem] font-medium tracking-[0.05em] uppercase text-white">
                    Ducor<span className="text-white/40 ml-1.5 font-light">Admin</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-8">
                <ul className="space-y-1.5 px-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`group flex items-center gap-3.5 rounded-xl px-4 py-3 font-sans text-[13px] font-medium transition-all duration-300 ${isActive
                                        ? "bg-white/10 text-white shadow-sm"
                                        : "text-white/50 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <item.icon className={`h-4.5 w-4.5 transition-colors ${isActive ? "text-white" : "text-white/40 group-hover:text-white"}`} strokeWidth={1.5} />
                                    <span className="tracking-wide">{item.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="border-t border-white/5 p-6 bg-black/10">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white font-heading text-base font-medium border border-white/10">
                        {initial}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate font-sans text-xs font-medium text-white/90">
                            {email || "admin@ducor.com"}
                        </p>
                        <p className="font-sans text-[10px] text-white/30 uppercase tracking-widest mt-1">Property Manager</p>
                    </div>
                </div>
                <form action="/api/admin/logout" method="POST">
                    <button
                        type="submit"
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/5 py-3 font-sans text-[11px] font-medium uppercase tracking-widest text-white/50 transition-all hover:bg-white/10 hover:text-white border border-white/5"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </form>
            </div>
        </aside>
    )
}

export function AdminBottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-white/5 bg-primary md:hidden pb-safe px-2">
            {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex flex-col items-center justify-center gap-1.5 rounded-xl px-1 py-1.5 transition-all duration-300 flex-1 ${isActive ? "text-white" : "text-white/40 hover:text-white"
                            }`}
                    >
                        <div className={`relative flex items-center justify-center transition-all ${isActive ? "scale-110" : ""}`}>
                            <item.icon className="h-5 w-5" strokeWidth={isActive ? 2 : 1.5} />
                            {isActive && (
                                <div className="absolute -inset-2 bg-white/10 rounded-full blur-md -z-10" />
                            )}
                        </div>
                        <span className={`font-sans text-[9px] font-medium uppercase tracking-[0.1em] transition-opacity ${isActive ? "opacity-100" : "opacity-60"}`}>
                            {item.name.replace("All ", "")}
                        </span>
                    </Link>
                )
            })}
        </nav>
    )
}
