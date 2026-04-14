import { createSupabaseServerClient } from "@/lib/supabase-server"
import RoomList from "@/components/admin/RoomList"
import type { Room } from "@/types"

export const metadata = {
    title: "Rooms | Admin Dashboard",
}

async function getRooms(supabase: any): Promise<Room[]> {
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
    const supabase = await createSupabaseServerClient()
    const rooms = await getRooms(supabase)

    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-6">
                <h2 className="font-heading text-[2rem] font-medium text-primary">Rooms</h2>
                <p className="mt-1 font-sans text-sm text-muted">Manage room inventory, pricing, and availability.</p>
            </div>

            <RoomList initialRooms={rooms} />
        </div>
    )
}
