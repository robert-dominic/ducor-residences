"use client"

import { useState } from "react"
import BookingsTable from "@/components/admin/BookingsTable"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface BookingsClientProps {
    initialBookings: any[]
}

export default function BookingsClient({ initialBookings }: BookingsClientProps) {
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredBookings = initialBookings.filter((b) => {
        if (statusFilter === "all") return true
        return b.status === statusFilter
    })

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-6">
                <span className="font-heading text-[9px] uppercase tracking-[0.2em] text-primary/40">Filter Status</span>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[200px] h-11 rounded-xl border-primary/5 bg-white font-sans text-sm text-primary shadow-sm outline-none focus:ring-primary/2 transition-all">
                        <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-primary/5 shadow-2xl">
                        <SelectItem value="all" className="rounded-lg py-2.5 font-sans text-sm">All Bookings</SelectItem>
                        <SelectItem value="pending" className="rounded-lg py-2.5 font-sans text-sm">Pending</SelectItem>
                        <SelectItem value="confirmed" className="rounded-lg py-2.5 font-sans text-sm">Confirmed</SelectItem>
                        <SelectItem value="paid" className="rounded-lg py-2.5 font-sans text-sm">Paid</SelectItem>
                        <SelectItem value="cancelled" className="rounded-lg py-2.5 font-sans text-sm">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <BookingsTable bookings={filteredBookings} />
        </div>
    )
}
