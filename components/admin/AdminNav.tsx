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
        <aside className="fixed left-0 top-0 bottom-0 z-40 hidden w-[220px] flex-col bg-primary md:flex">
            <div className="flex h-16 shrink-0 items-center px-6">
                <Link href="/" className="font-heading text-lg font-medium tracking-wide text-white">
                    Ducor Admin
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-6">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`group flex items-center gap-3 border-l-4 px-5 py-3 font-sans text-sm font-medium transition-colors ${isActive
                                            ? "border-accent bg-white/5 text-white"
                                            : "border-transparent text-white/70 hover:border-accent/40 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <item.icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="border-t border-white/10 p-5">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary font-heading text-lg font-medium">
                        {initial}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate font-sans text-xs font-medium text-white/90">
                            {email || "admin@ducor.com"}
                        </p>
                    </div>
                </div>
                <form action="/api/admin/logout" method="POST">
                    <button
                        type="submit"
                        className="flex w-full cursor-pointer items-center gap-2 rounded-lg py-2 font-sans text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white"
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
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-white/10 bg-primary md:hidden pb-safe">
            {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex flex-col items-center justify-center gap-1.5 px-3 py-2 transition-colors ${isActive ? "text-accent" : "text-white/60 hover:text-white"
                            }`}
                    >
                        <item.icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                        <span className="font-sans text-[10px] font-medium uppercase tracking-wider">
                            {item.name.replace("All ", "")}
                        </span>
                    </Link>
                )
            })}
        </nav>
    )
}
