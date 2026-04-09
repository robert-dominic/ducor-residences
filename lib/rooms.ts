import { supabase } from "@/lib/supabase"
import type { Room } from "@/types"

// Get all available rooms
export async function getRooms(): Promise<Room[]> {
    const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("price", { ascending: true })

    if (error) {
        console.error("Error fetching rooms:", error)
        return []
    }

    return data as Room[]
}

// Get a single room by slug
export async function getRoomBySlug(slug: string): Promise<Room | null> {
    const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("slug", slug)
        .single()

    if (error) {
        console.error("Error fetching room:", error)
        return null
    }

    return data as Room
}

// Get featured rooms
export async function getFeaturedRooms(): Promise<Room[]> {
    const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("featured", true)
        .order("price", { ascending: true })

    if (error) {
        console.error("Error fetching featured rooms:", error)
        return []
    }

    return data as Room[]
}