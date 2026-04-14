import { createSupabaseServerClient } from "@/lib/supabase-server"
import Analytics from "@/components/admin/Analytics"

export const metadata = {
    title: "Analytics | Admin Dashboard",
}

async function getBookings(supabase: any) {
    const { data } = await supabase
        .from("bookings")
        .select(`
            id,
            total_price,
            status,
            created_at,
            rooms (name)
        `)
        .order("created_at", { ascending: false })

    return data ?? []
}

export default async function AnalyticsPage() {
    const supabase = await createSupabaseServerClient()
    const bookings = await getBookings(supabase)

    return (
        <div className="space-y-8">
            <div className="border-b border-border pb-6">
                <h2 className="font-heading text-[2rem] font-medium text-primary">Analytics & Revenue</h2>
                <p className="mt-1 font-sans text-sm text-muted">A detailed breakdown of revenue, bookings, and performance.</p>
            </div>

            <Analytics bookings={bookings} />
        </div>
    )
}
