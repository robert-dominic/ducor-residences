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

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabaseAuth = await createSupabaseServerClient()
    const { data: { user } } = await supabaseAuth.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { id } = await params
        const body = await req.json()

        let updates: Record<string, unknown>

        if (typeof body.is_available === "boolean" && Object.keys(body).length === 1) {
            updates = { is_available: body.is_available }
        } else {
            const parsed = {
                name: String(body.name ?? "").trim(),
                slug: String(body.slug ?? "").trim(),
                type: String(body.type ?? "").trim(),
                price: Number(body.price),
                capacity: Number(body.capacity),
                size: String(body.size ?? "").trim(),
                description: String(body.description ?? "").trim(),
                featured: Boolean(body.featured),
                images: parseList(body.images),
                amenities: parseList(body.amenities),
            }

            if (
                !parsed.name ||
                !parsed.slug ||
                !ROOM_TYPES.includes(parsed.type) ||
                !Number.isFinite(parsed.price) ||
                parsed.price < 0 ||
                !Number.isFinite(parsed.capacity) ||
                parsed.capacity < 1 ||
                !parsed.size ||
                !parsed.description ||
                parsed.images.length === 0 ||
                parsed.amenities.length === 0
            ) {
                return NextResponse.json({ error: "Invalid room data" }, { status: 400 })
            }

            updates = parsed
        }

        const { data, error } = await supabase
            .from("rooms")
            .update(updates)
            .eq("id", id)
            .select("*")
            .single()

        if (error) {
            console.error("Update room error:", error)
            return NextResponse.json({ error: "Failed to update room" }, { status: 500 })
        }

        return NextResponse.json({ room: data }, { status: 200 })
    } catch (error) {
        console.error("Update room route error:", error)
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
    }
}
