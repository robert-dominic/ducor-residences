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
        <div className="space-y-10">
            <div className="pb-10">
                <p className="font-heading text-[10px] uppercase tracking-[0.28em] text-primary/40">
                    Reservations
                </p>
                <h2 className="mt-4 font-heading text-[2.2rem] font-medium leading-[1.04] tracking-[0.01em] text-primary">All Bookings</h2>
            </div>
            <BookingsClient initialBookings={bookings} />
        </div>
    )
}
