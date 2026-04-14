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
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <span className="font-sans text-sm font-medium uppercase tracking-widest text-muted">Filter By Status:</span>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px] rounded-lg border-border bg-surface font-sans text-sm outline-none focus:ring-accent">
                        <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Bookings</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <BookingsTable bookings={filteredBookings} />
        </div>
    )
}
