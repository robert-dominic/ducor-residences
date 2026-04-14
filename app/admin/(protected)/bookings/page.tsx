import { createSupabaseServerClient } from "@/lib/supabase-server"
import BookingsClient from "./BookingsClient"

export const metadata = {
    title: "All Bookings | Admin Dashboard",
}

async function getAllBookings(supabase: any) {
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

export default async function BookingsPage() {
    const supabase = await createSupabaseServerClient()
    const bookings = await getAllBookings(supabase)

    return (
        <div className="space-y-8">
            <div className="border-b border-border pb-6 flex items-end justify-between">
                <div>
                    <h2 className="font-heading text-[2rem] font-medium text-primary">All Bookings</h2>
                    <p className="mt-1 font-sans text-sm text-muted">Manage reservations, update statuses, and view guest details.</p>
                </div>
            </div>
            <BookingsClient initialBookings={bookings} />
        </div>
    )
}
