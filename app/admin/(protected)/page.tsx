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
            <div className="pb-10">
                <p className="font-heading text-[10px] uppercase tracking-[0.28em] text-primary/40">
                    Dashboard
                </p>
                <h2 className="mt-4 font-heading text-[2.2rem] font-medium leading-[1.04] tracking-[0.01em] text-primary">Overview</h2>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                <StatCard label="Total Bookings" value={stats.totalBookings} />
                <StatCard label="Pending" value={stats.pendingCount} accent="amber" />
                <StatCard label="Confirmed" value={stats.confirmedCount} accent="green" />
                <StatCard label="Total Revenue" value={formatPrice(stats.totalRevenue).split(" / ")[0]} />
            </div>

            {/* Analytics */}
            <div className="space-y-6">
                <h3 className="font-heading text-[1.4rem] font-medium leading-[1.04] tracking-[0.01em] text-primary">Performance</h3>
                <Analytics bookings={bookings} />
            </div>

            {/* Bookings table */}
            <div className="space-y-6 relative">
                <div className="flex items-end justify-between">
                    <h3 className="font-heading text-[1.4rem] font-medium leading-[1.04] tracking-[0.01em] text-primary">Recent Bookings</h3>
                    <a href="/admin/bookings" className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-primary/40 hover:text-primary transition-colors">
                        View All
                    </a>
                </div>
                <BookingsTable bookings={bookings.slice(0, 5)} />
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
        <div className="rounded-2xl border border-primary/5 bg-[#F9F9F9] p-7 transition-all hover:bg-white group">
            <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-primary/40 group-hover:text-primary/60 transition-colors uppercase">{label}</p>
            <p className={`mt-4 font-heading text-[1.8rem] font-medium leading-[1.04] tracking-[0.01em] ${accentColor}`}>
                {value}
            </p>
        </div>
    )
}
