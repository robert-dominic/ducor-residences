import { createClient } from "@supabase/supabase-js"
import RoomManager from "@/components/admin/RoomManager"
import type { Room } from "@/types"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function getRooms(): Promise<Room[]> {
    const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("price", { ascending: true })

    if (error) {
        console.error("Error fetching admin rooms:", error)
        return []
    }

    return data as Room[]
}

export default async function AdminRoomsPage() {
    const rooms = await getRooms()

    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-6">
                <h2 className="font-heading text-[2rem] font-medium text-primary">Rooms</h2>
                <p className="mt-1 font-sans text-sm text-muted">Manage room inventory, pricing, and availability.</p>
            </div>

            <RoomManager rooms={rooms} />
        </div>
    )
}
