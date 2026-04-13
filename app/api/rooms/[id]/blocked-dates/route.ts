import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { addDays, format, isBefore, parseISO } from "date-fns"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const today = format(new Date(), "yyyy-MM-dd")

        const { data, error } = await supabase
            .from("bookings")
            .select("check_in, check_out")
            .eq("room_id", id)
            .neq("status", "cancelled")
            .gt("check_out", today)

        if (error) {
            console.error("Blocked dates fetch error:", error)
            return NextResponse.json(
                { error: "Failed to fetch blocked dates." },
                { status: 500 }
            )
        }

        const blockedDates = new Set<string>()

        for (const booking of data ?? []) {
            let currentDate = parseISO(booking.check_in)
            const checkOutDate = parseISO(booking.check_out)

            while (isBefore(currentDate, checkOutDate)) {
                blockedDates.add(format(currentDate, "yyyy-MM-dd"))
                currentDate = addDays(currentDate, 1)
            }
        }

        return NextResponse.json(
            { blockedDates: Array.from(blockedDates).sort() },
            { status: 200 }
        )
    } catch (error) {
        console.error("Blocked dates route error:", error)
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        )
    }
}
