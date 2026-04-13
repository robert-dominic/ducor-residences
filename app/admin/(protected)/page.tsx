import { createSupabaseServerClient } from "@/lib/supabase-server"
import { formatPrice } from "@/lib/utils"
import BookingsTable from "@/components/admin/BookingsTable"
import Analytics from "@/components/admin/Analytics"

async function getStats(supabase: any) {
    const [
        { count: totalBookings },
        { count: pendingCount },
        { count: confirmedCount },
        { data: revenueData },
    ] = await Promise.all([
        supabase.from("bookings").select("*", { count: "exact", head: true }),
        supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "confirmed"),
        supabase.from("bookings").select("total_price").eq("status", "paid"),
    ])

    const totalRevenue = revenueData?.reduce((sum: number, b: any) => sum + (b.total_price ?? 0), 0) ?? 0

    return {
        totalBookings: totalBookings ?? 0,
        pendingCount: pendingCount ?? 0,
        confirmedCount: confirmedCount ?? 0,
        totalRevenue,
    }
}

async function getBookings(supabase: any) {
    const { data } = await supabase
        .from("bookings")
        .select(`
            id,
            full_name,
            email,
            phone,
            check_in,
            check_out,
            nights,
            total_price,
            status,
            special_requests,
            payment_reference,
            created_at,
            rooms (name, type)
        `)
        .order("created_at", { ascending: false })

    return data ?? []
}

export default async function AdminDashboardPage() {
    const supabase = await createSupabaseServerClient()
    const [stats, bookings] = await Promise.all([
        getStats(supabase),
        getBookings(supabase),
    ])

    return (
        <div className="space-y-10">

            {/* Page header */}
            <div className="border-b border-border pb-6">
                <h2 className="font-heading text-[2rem] font-medium text-primary">Overview</h2>
                <p className="mt-1 font-sans text-sm text-muted">All bookings and property activity at a glance.</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard label="Total Bookings" value={stats.totalBookings} />
                <StatCard label="Pending" value={stats.pendingCount} accent="amber" />
                <StatCard label="Confirmed" value={stats.confirmedCount} accent="green" />
                <StatCard label="Total Revenue" value={formatPrice(stats.totalRevenue).split(" / ")[0]} />
            </div>

            {/* Analytics */}
            <div className="space-y-4">
                <h3 className="font-heading text-[1.4rem] font-medium text-primary">Analytics</h3>
                <Analytics bookings={bookings} />
            </div>

            {/* Bookings table */}
            <div className="space-y-4">
                <h3 className="font-heading text-[1.4rem] font-medium text-primary">All Bookings</h3>
                <BookingsTable bookings={bookings} />
            </div>

        </div>
    )
}

function StatCard({
    label,
    value,
    accent,
}: {
    label: string
    value: string | number
    accent?: "amber" | "green"
}) {
    const accentColor = accent === "amber"
        ? "text-amber-600"
        : accent === "green"
            ? "text-emerald-600"
            : "text-primary"

    return (
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_24px_rgba(26,26,26,0.05)]">
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">{label}</p>
            <p className={`mt-3 font-heading text-[2rem] font-medium leading-none ${accentColor}`}>
                {value}
            </p>
        </div>
    )
}
