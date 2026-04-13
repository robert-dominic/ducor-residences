"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Booking {
    id: string
    full_name: string
    email: string
    phone: string
    check_in: string
    check_out: string
    nights: number
    total_price: number
    status: "pending" | "confirmed" | "cancelled" | "paid"
    special_requests: string | null
    payment_reference: string
    created_at: string
    rooms: { name: string; type: string } | null
}

interface BookingsTableProps {
    bookings: Booking[]
}

const STATUS_STYLES = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
    paid: "bg-blue-50 text-blue-700 border-blue-200",
}

export default function BookingsTable({ bookings }: BookingsTableProps) {
    const [updating, setUpdating] = useState<string | null>(null)
    const [localBookings, setLocalBookings] = useState(bookings)

    async function updateStatus(id: string, status: "confirmed" | "cancelled" | "paid") {
        setUpdating(id)

        try {
            const response = await fetch(`/api/admin/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            })

            if (response.ok) {
                setLocalBookings(prev =>
                    prev.map(b => b.id === id ? { ...b, status } : b)
                )
            } else {
                const data = await response.json()
                console.error("Update failed:", data.error)
            }
        } catch (err) {
            console.error("Network error:", err)
        } finally {
            setUpdating(null)
        }
    }

    if (localBookings.length === 0) {
        return (
            <div className="rounded-2xl border border-border bg-surface px-8 py-16 text-center">
                <p className="font-sans text-sm text-muted">No bookings yet.</p>
            </div>
        )
    }

    function renderActions(booking: Booking) {
        if (booking.status === "pending") {
            return (
                <div className="flex gap-2">
                    <button
                        onClick={() => updateStatus(booking.id, "confirmed")}
                        disabled={updating === booking.id}
                        className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                    >
                        {updating === booking.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Confirm"}
                    </button>
                    <button
                        onClick={() => updateStatus(booking.id, "cancelled")}
                        disabled={updating === booking.id}
                        className="rounded-lg bg-red-50 border border-red-200 px-3 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            )
        }

        if (booking.status === "confirmed") {
            return (
                <button
                    onClick={() => updateStatus(booking.id, "paid")}
                    disabled={updating === booking.id}
                    className="rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-blue-700 hover:bg-blue-100 transition-colors disabled:opacity-50"
                >
                    {updating === booking.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Mark Paid"}
                </button>
            )
        }

        return <span className="font-sans text-xs text-muted">—</span>
    }

    return (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-[0_8px_24px_rgba(26,26,26,0.05)]">
            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-background">
                            {["Reference", "Guest", "Room", "Dates", "Nights", "Total", "Status", "Actions"].map(h => (
                                <th key={h} className="px-5 py-4 text-left font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {localBookings.map(booking => (
                            <tr key={booking.id} className="hover:bg-background/50 transition-colors">
                                <td className="px-5 py-4 font-sans text-xs font-medium text-primary">
                                    {booking.payment_reference}
                                </td>
                                <td className="px-5 py-4">
                                    <p className="font-sans font-medium text-primary">{booking.full_name}</p>
                                    <p className="font-sans text-xs text-muted">{booking.email}</p>
                                    <p className="font-sans text-xs text-muted">{booking.phone}</p>
                                </td>
                                <td className="px-5 py-4">
                                    <p className="font-sans text-primary">{booking.rooms?.name ?? "—"}</p>
                                    <p className="font-sans text-xs text-muted">{booking.rooms?.type}</p>
                                </td>
                                <td className="px-5 py-4 font-sans text-primary">
                                    <p>{format(new Date(booking.check_in), "MMM dd, yyyy")}</p>
                                    <p className="text-xs text-muted">→ {format(new Date(booking.check_out), "MMM dd, yyyy")}</p>
                                </td>
                                <td className="px-5 py-4 font-sans text-primary">
                                    {booking.nights}
                                </td>
                                <td className="px-5 py-4 font-sans font-medium text-primary">
                                    ${booking.total_price}
                                </td>
                                <td className="px-5 py-4">
                                    <span className={cn(
                                        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-sans text-[11px] font-medium uppercase tracking-[0.1em]",
                                        STATUS_STYLES[booking.status]
                                    )}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    {renderActions(booking)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden divide-y divide-border">
                {localBookings.map(booking => (
                    <div key={booking.id} className="p-5 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="font-sans font-medium text-primary">{booking.full_name}</p>
                                <p className="font-sans text-xs text-muted">{booking.payment_reference}</p>
                            </div>
                            <span className={cn(
                                "inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 font-sans text-[11px] font-medium uppercase tracking-[0.1em]",
                                STATUS_STYLES[booking.status]
                            )}>
                                {booking.status}
                            </span>
                        </div>
                        <div className="space-y-1 font-sans text-sm">
                            <p className="text-primary">{booking.rooms?.name ?? "—"}</p>
                            <p className="text-muted">
                                {format(new Date(booking.check_in), "MMM dd")} → {format(new Date(booking.check_out), "MMM dd, yyyy")} · {booking.nights} nights
                            </p>
                            <p className="font-medium text-primary">${booking.total_price}</p>
                        </div>
                        <div>
                            {renderActions(booking)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}