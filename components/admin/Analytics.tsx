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
            <div className="rounded-2xl border border-primary/5 bg-[#F9F9F9] px-8 py-16 text-center">
                <p className="font-sans text-sm text-primary/40 leading-relaxed max-w-xs mx-auto italic">No data yet — analytics will appear once bookings come in.</p>
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
            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-primary/5 bg-[#F9F9F9] p-7 transition-all hover:bg-white group">
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-primary/40 group-hover:text-primary/60 transition-colors uppercase">Most Booked Room</p>
                    <p className="mt-4 font-heading text-[1.6rem] font-medium leading-[1.04] tracking-[0.01em] text-primary">
                        {mostBooked ? mostBooked[0] : "—"}
                    </p>
                    <p className="mt-2 font-sans text-xs text-primary/40">
                        {mostBooked ? `${mostBooked[1]} booking${mostBooked[1] === 1 ? "" : "s"}` : "No bookings in this range"}
                    </p>
                </div>

                <div className="rounded-2xl border border-primary/5 bg-[#F9F9F9] p-7 transition-all hover:bg-white group">
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-primary/40 group-hover:text-primary/60 transition-colors uppercase">Conversion Rate</p>
                    <p className="mt-4 font-heading text-[1.6rem] font-medium leading-[1.04] tracking-[0.01em] text-primary">
                        {conversionRate}%
                    </p>
                    <p className="mt-2 font-sans text-xs text-primary/40 lowercase italic">Confirmed or paid success rate</p>
                </div>
            </div>

            <div className="rounded-2xl border border-primary/5 bg-[#F9F9F9] p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-primary/40">
                        Bookings & Revenue
                    </h3>

                    <div className="flex flex-wrap gap-3">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter.key}
                                type="button"
                                onClick={() => setActiveFilter(filter.key)}
                                className={
                                    activeFilter === filter.key
                                        ? "rounded-xl bg-primary px-5 py-2 font-sans text-[10px] uppercase tracking-[0.2em] text-white shadow-sm"
                                        : "rounded-xl border border-primary/5 bg-white px-5 py-2 font-sans text-[10px] uppercase tracking-[0.2em] text-primary/40 hover:text-primary transition-colors"
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
                                    cursor={{ fill: "rgba(26,26,26,0.02)" }}
                                    contentStyle={{
                                        background: "#ffffff",
                                        border: "1px solid rgba(26,26,26,0.05)",
                                        borderRadius: 16,
                                        boxShadow: "0 12px 32px rgba(26,26,26,0.04)",
                                        color: "#1a1a2e",
                                        fontFamily: "var(--font-jakarta)",
                                        fontSize: "12px",
                                        padding: "16px",
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
                                    fill="#1a1a2e"
                                    barSize={20}
                                    radius={[4, 4, 0, 0]}
                                    opacity={0.15}
                                />
                                <Line
                                    yAxisId="revenue"
                                    type="monotone"
                                    dataKey="revenue"
                                    name="Revenue"
                                    stroke="#1a1a2e"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: "#ffffff", stroke: "#1a1a2e", strokeWidth: 1.5 }}
                                    activeDot={{ r: 4, fill: "#ffffff", stroke: "#1a1a2e", strokeWidth: 2 }}
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
