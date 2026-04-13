"use client"

import { useState } from "react"
import {
    Bar,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { format, parseISO, subDays, subMonths } from "date-fns"

interface Booking {
    created_at: string
    total_price: number
    status: string
    rooms: { name: string } | null
}

interface AnalyticsProps {
    bookings: Booking[]
}

type FilterKey = "30d" | "3m" | "6m" | "all"

const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "30d", label: "Last 30 days" },
    { key: "3m", label: "Last 3 months" },
    { key: "6m", label: "Last 6 months" },
    { key: "all", label: "All time" },
]

function getFilterStartDate(filter: FilterKey) {
    const now = new Date()

    if (filter === "30d") return subDays(now, 30)
    if (filter === "3m") return subMonths(now, 3)
    if (filter === "6m") return subMonths(now, 6)
    return null
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value)
}

export default function Analytics({ bookings }: AnalyticsProps) {
    const [activeFilter, setActiveFilter] = useState<FilterKey>("3m")

    if (bookings.length === 0) {
        return (
            <div className="rounded-2xl border border-border bg-surface px-8 py-16 text-center shadow-[0_8px_24px_rgba(26,26,26,0.05)]">
                <p className="font-sans text-sm text-muted">No data yet — analytics will appear once bookings come in.</p>
            </div>
        )
    }

    const filterStartDate = getFilterStartDate(activeFilter)
    const filteredBookings = bookings.filter((booking) => {
        if (!filterStartDate) return true
        return parseISO(booking.created_at) >= filterStartDate
    })

    const monthlyMap = new Map<string, { month: string; bookings: number; revenue: number; sortKey: number }>()

    filteredBookings.forEach((booking) => {
        const bookingDate = parseISO(booking.created_at)
        const monthKey = format(bookingDate, "yyyy-MM")
        const existing = monthlyMap.get(monthKey)

        if (existing) {
            existing.bookings += 1
            if (booking.status === "paid") {
                existing.revenue += booking.total_price
            }
            return
        }

        monthlyMap.set(monthKey, {
            month: format(bookingDate, "MMM yyyy"),
            bookings: 1,
            revenue: booking.status === "paid" ? booking.total_price : 0,
            sortKey: bookingDate.getTime(),
        })
    })

    const chartData = Array.from(monthlyMap.values())
        .sort((a, b) => a.sortKey - b.sortKey)
        .map(({ sortKey, ...entry }) => entry)

    const roomCount: Record<string, number> = {}
    filteredBookings.forEach((booking) => {
        const roomName = booking.rooms?.name ?? "Unknown"
        roomCount[roomName] = (roomCount[roomName] ?? 0) + 1
    })

    const mostBooked = Object.entries(roomCount).sort((a, b) => b[1] - a[1])[0]

    const convertedBookings = filteredBookings.filter((booking) =>
        booking.status === "confirmed" || booking.status === "paid"
    ).length

    const conversionRate = filteredBookings.length > 0
        ? Math.round((convertedBookings / filteredBookings.length) * 100)
        : 0

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_24px_rgba(26,26,26,0.05)]">
                    <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">Most Booked Room</p>
                    <p className="mt-3 font-heading text-[1.4rem] font-medium leading-tight text-primary">
                        {mostBooked ? mostBooked[0] : "—"}
                    </p>
                    <p className="mt-1 font-sans text-sm text-muted">
                        {mostBooked ? `${mostBooked[1]} booking${mostBooked[1] === 1 ? "" : "s"}` : "No bookings in this range"}
                    </p>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_24px_rgba(26,26,26,0.05)]">
                    <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">Conversion Rate</p>
                    <p className="mt-3 font-heading text-[1.4rem] font-medium leading-tight text-primary">
                        {conversionRate}%
                    </p>
                    <p className="mt-1 font-sans text-sm text-muted">confirmed or paid</p>
                </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_24px_rgba(26,26,26,0.05)]">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h3 className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                        Bookings & Revenue
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter.key}
                                type="button"
                                onClick={() => setActiveFilter(filter.key)}
                                className={
                                    activeFilter === filter.key
                                        ? "rounded-2xl bg-button px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-white"
                                        : "rounded-2xl border border-border bg-surface px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-muted"
                                }
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-6 h-[280px] w-full">
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#7C7066", fontSize: 11, fontFamily: "var(--font-inter)" }}
                                />
                                <YAxis
                                    yAxisId="bookings"
                                    axisLine={false}
                                    tickLine={false}
                                    allowDecimals={false}
                                    tick={{ fill: "#7C7066", fontSize: 11, fontFamily: "var(--font-inter)" }}
                                />
                                <YAxis
                                    yAxisId="revenue"
                                    orientation="right"
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                    tick={{ fill: "#7C7066", fontSize: 11, fontFamily: "var(--font-inter)" }}
                                />
                                <Tooltip
                                    cursor={{ fill: "rgba(201,168,124,0.08)" }}
                                    contentStyle={{
                                        background: "#FBF7F2",
                                        border: "none",
                                        borderRadius: 16,
                                        boxShadow: "0 8px 24px rgba(26,26,26,0.05)",
                                        color: "#1a1a1a",
                                        fontFamily: "var(--font-inter)",
                                    }}
                                    formatter={(value, name) => {
                                        if (name === "Revenue") {
                                            return [formatCurrency(Number(value)), name]
                                        }

                                        return [value, name]
                                    }}
                                />
                                <Bar
                                    yAxisId="bookings"
                                    dataKey="bookings"
                                    name="Bookings"
                                    fill="#c9a87c"
                                    barSize={28}
                                    radius={[8, 8, 0, 0]}
                                />
                                <Line
                                    yAxisId="revenue"
                                    type="monotone"
                                    dataKey="revenue"
                                    name="Revenue"
                                    stroke="#1a1a1a"
                                    strokeWidth={2.5}
                                    dot={{ r: 4, fill: "#1a1a1a", strokeWidth: 0 }}
                                    activeDot={{ r: 5, fill: "#1a1a1a", strokeWidth: 0 }}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex h-full items-center justify-center rounded-2xl bg-background">
                            <p className="font-sans text-sm text-muted">No bookings in this date range.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
