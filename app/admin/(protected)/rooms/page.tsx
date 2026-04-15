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
            <div className="pb-10">
                <p className="font-heading text-[10px] uppercase tracking-[0.28em] text-primary/40">
                    Inventory
                </p>
                <h2 className="mt-4 font-heading text-[2.2rem] font-medium leading-[1.04] tracking-[0.01em] text-primary">Rooms</h2>
            </div>

            <RoomList initialRooms={rooms} />
        </div>
    )
}
