import { supabase } from "@/lib/supabase"
import type { Room } from "@/types"

export async function checkRoomAvailability(
    roomId: string,
    checkIn: Date,
    checkOut: Date
): Promise<boolean> {
    const { data, error } = await supabase
        .from("bookings")
        .select("id")
        .eq("room_id", roomId)
        .neq("status", "cancelled")
        .lt("check_in", checkOut.toISOString().split("T")[0])
        .gt("check_out", checkIn.toISOString().split("T")[0])

    if (error) {
        console.error("Availability check error:", error)
        return false
    }

    return data.length === 0
}