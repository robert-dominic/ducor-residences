import { createSupabaseServerClient } from "@/lib/supabase-server"
import { notFound } from "next/navigation"
import RoomForm from "@/components/admin/RoomForm"
import type { Room } from "@/types"

export const metadata = {
    title: "Edit Room | Admin Dashboard",
}

async function getRoom(supabase: any, id: string) {
    const { data } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", id)
        .single()
    return data
}

export default async function EditRoomPage({ params }: { params: { id: string } }) {
    const supabase = await createSupabaseServerClient()
    const room = await getRoom(supabase, params.id)

    if (!room) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-6">
                <h2 className="font-heading text-[2rem] font-medium text-primary">Edit Room</h2>
                <p className="mt-1 font-sans text-sm text-muted">Update details for {room.name}.</p>
            </div>
            <RoomForm initialRoom={room as Room} />
        </div>
    )
}
