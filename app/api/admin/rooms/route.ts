import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { createSupabaseServerClient } from "@/lib/supabase-server"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ROOM_TYPES = ["Single", "Double", "Suite", "Penthouse"]

function parseList(value: unknown) {
    if (typeof value !== "string") return []
    return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
}

export async function POST(req: NextRequest) {
    const supabaseAuth = await createSupabaseServerClient()
    const { data: { user } } = await supabaseAuth.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const body = await req.json()

        const room = {
            name: String(body.name ?? "").trim(),
            slug: String(body.slug ?? "").trim(),
            type: String(body.type ?? "").trim(),
            price: Number(body.price),
            capacity: Number(body.capacity),
            size: String(body.size ?? "").trim(),
            description: String(body.description ?? "").trim(),
            featured: Boolean(body.featured),
            is_available: true,
            images: parseList(body.images),
            amenities: parseList(body.amenities),
        }

        if (
            !room.name ||
            !room.slug ||
            !ROOM_TYPES.includes(room.type) ||
            !Number.isFinite(room.price) ||
            room.price < 0 ||
            !Number.isFinite(room.capacity) ||
            room.capacity < 1 ||
            !room.size ||
            !room.description ||
            room.images.length === 0 ||
            room.amenities.length === 0
        ) {
            return NextResponse.json({ error: "Invalid room data" }, { status: 400 })
        }

        const { data, error } = await supabase
            .from("rooms")
            .insert(room)
            .select("*")
            .single()

        if (error) {
            console.error("Create room error:", error)
            return NextResponse.json({ error: "Failed to create room" }, { status: 500 })
        }

        return NextResponse.json({ room: data }, { status: 201 })
    } catch (error) {
        console.error("Create room route error:", error)
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
    }
}
