import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendGuestConfirmationEmail, sendAdminNotificationEmail } from "@/lib/emails"

// Use service role key here — bypasses RLS so we can write to the table
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {
            roomId,
            fullName,
            email,
            phone,
            checkIn,
            checkOut,
            nights,
            totalPrice,
            specialRequests,
        } = body

        // Basic validation
        if (!roomId || !fullName || !email || !phone || !checkIn || !checkOut) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        // Check room availability — look for overlapping bookings
        const { data: overlapping, error: availabilityError } = await supabase
            .from("bookings")
            .select("id")
            .eq("room_id", roomId)
            .neq("status", "cancelled")
            .lt("check_in", checkOut)
            .gt("check_out", checkIn)

        if (availabilityError) {
            return NextResponse.json(
                { error: "Could not verify availability. Please try again." },
                { status: 500 }
            )
        }

        if (overlapping && overlapping.length > 0) {
            return NextResponse.json(
                { error: "This room is no longer available for your selected dates. Please choose different dates or another room." },
                { status: 409 }
            )
        }

        const { data: roomData, error: roomError } = await supabase
            .from("rooms")
            .select("name, is_available")
            .eq("id", roomId)
            .single()

        if (roomError || !roomData) {
            return NextResponse.json(
                { error: "Selected room could not be found." },
                { status: 404 }
            )
        }

        if (!roomData.is_available) {
            return NextResponse.json(
                { error: "This room is currently unavailable for booking." },
                { status: 409 }
            )
        }

        // Generate booking reference
        const phoneSuffix = phone.replace(/\D/g, "").slice(-4).padStart(4, "0")
        const roomPrefix = roomId.slice(0, 3).toUpperCase()
        const timestamp = Date.now().toString().slice(-4)
        const bookingRef = `DR-${roomPrefix}${phoneSuffix}${timestamp}`

        // Save booking to Supabase
        const { error: insertError } = await supabase
            .from("bookings")
            .insert({
                room_id: roomId,
                full_name: fullName,
                email,
                phone,
                check_in: checkIn,
                check_out: checkOut,
                nights,
                total_price: totalPrice,
                status: "pending",
                special_requests: specialRequests ?? null,
                payment_reference: bookingRef,
            })

        if (insertError) {
            console.error("Insert error:", insertError)
            return NextResponse.json(
                { error: "Failed to save booking. Please try again." },
                { status: 500 }
            )
        }

        // Send emails
        const formattedCheckIn = new Date(checkIn).toDateString()
        const formattedCheckOut = new Date(checkOut).toDateString()

        await Promise.all([
            sendGuestConfirmationEmail({
                guestName: fullName,
                guestEmail: email,
                bookingRef,
                roomName: roomData?.name ?? "Your Room",
                checkIn: formattedCheckIn,
                checkOut: formattedCheckOut,
                nights,
                totalPrice,
            }),
            sendAdminNotificationEmail({
                guestName: fullName,
                guestEmail: email,
                guestPhone: phone,
                bookingRef,
                roomName: roomData?.name ?? "Your Room",
                checkIn: formattedCheckIn,
                checkOut: formattedCheckOut,
                nights,
                totalPrice,
                specialRequests,
            }),
        ])

        return NextResponse.json({ bookingRef }, { status: 201 })

    } catch (err) {
        console.error("Booking route error:", err)
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        )
    }
}
