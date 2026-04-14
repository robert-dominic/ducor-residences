"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import type { Room } from "@/types"

type RoomType = Room["type"]
const ROOM_TYPES: RoomType[] = ["Single", "Double", "Suite", "Penthouse"]

interface RoomFormState {
    name: string
    slug: string
    type: RoomType
    price: string
    capacity: string
    size: string
    description: string
    featured: boolean
    images: string
    amenities: string
}

const initialFormState: RoomFormState = {
    name: "",
    slug: "",
    type: "Single",
    price: "",
    capacity: "",
    size: "",
    description: "",
    featured: false,
    images: "",
    amenities: "",
}

function toFormState(room: Room): RoomFormState {
    return {
        name: room.name,
        slug: room.slug,
        type: room.type,
        price: String(room.price),
        capacity: String(room.capacity),
        size: room.size,
        description: room.description,
        featured: room.featured,
        images: room.images.join(", "),
        amenities: room.amenities.join(", "),
    }
}

interface RoomFormProps {
    initialRoom?: Room
}

export default function RoomForm({ initialRoom }: RoomFormProps) {
    const router = useRouter()
    const [formState, setFormState] = useState<RoomFormState>(
        initialRoom ? toFormState(initialRoom) : initialFormState
    )
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    function updateField<K extends keyof RoomFormState>(field: K, value: RoomFormState[K]) {
        setFormState((prev) => ({ ...prev, [field]: value }))
    }

    async function handleSave() {
        setSaving(true)
        setError(null)

        try {
            const payload = {
                name: formState.name,
                slug: formState.slug,
                type: formState.type,
                price: Number(formState.price),
                capacity: Number(formState.capacity),
                size: formState.size,
                description: formState.description,
                featured: formState.featured,
                images: formState.images,
                amenities: formState.amenities,
            }

            const response = await fetch(
                initialRoom ? `/api/admin/rooms/${initialRoom.id}` : "/api/admin/rooms",
                {
                    method: initialRoom ? "PATCH" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                setError(data.error ?? "Failed to save room.")
                return
            }

            router.push("/admin/rooms")
            router.refresh()
        } catch {
            setError("Network error. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_24px_rgba(26,26,26,0.05)]">
            <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Name">
                    <Input
                        value={formState.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        className="h-11 rounded-lg border-border bg-background px-4 text-sm text-primary"
                    />
                </Field>
                <Field label="Slug">
                    <Input
                        value={formState.slug}
                        onChange={(event) => updateField("slug", event.target.value)}
                        className="h-11 rounded-lg border-border bg-background px-4 text-sm text-primary"
                    />
                </Field>
                <Field label="Type">
                    <Select
                        value={formState.type}
                        onValueChange={(value) => updateField("type", value as RoomType)}
                    >
                        <SelectTrigger className="h-11 w-full rounded-lg border-border bg-background px-4 font-sans text-sm text-primary focus:ring-accent">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            {ROOM_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>
                <Field label="Price">
                    <Input
                        type="number"
                        min="0"
                        value={formState.price}
                        onChange={(event) => updateField("price", event.target.value)}
                        className="h-11 rounded-lg border-border bg-background px-4 text-sm text-primary"
                    />
                </Field>
                <Field label="Capacity">
                    <Input
                        type="number"
                        min="1"
                        value={formState.capacity}
                        onChange={(event) => updateField("capacity", event.target.value)}
                        className="h-11 rounded-lg border-border bg-background px-4 text-sm text-primary"
                    />
                </Field>
                <Field label="Size">
                    <Input
                        value={formState.size}
                        onChange={(event) => updateField("size", event.target.value)}
                        className="h-11 rounded-lg border-border bg-background px-4 text-sm text-primary"
                    />
                </Field>
            </div>

            <div className="mt-5">
                <Field label="Description">
                    <Textarea
                        value={formState.description}
                        onChange={(event) => updateField("description", event.target.value)}
                        className="min-h-28 rounded-lg border-border bg-background px-4 py-3 text-sm text-primary"
                    />
                </Field>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Images">
                    <Textarea
                        value={formState.images}
                        onChange={(event) => updateField("images", event.target.value)}
                        className="min-h-24 rounded-lg border-border bg-background px-4 py-3 text-sm text-primary"
                        placeholder="https://..., https://..."
                    />
                </Field>
                <Field label="Amenities">
                    <Textarea
                        value={formState.amenities}
                        onChange={(event) => updateField("amenities", event.target.value)}
                        className="min-h-24 rounded-lg border-border bg-background px-4 py-3 text-sm text-primary"
                        placeholder="Free WiFi, Air Conditioning, Flat-screen TV"
                    />
                </Field>
            </div>

            <label className="mt-5 inline-flex items-center gap-3 font-sans text-sm text-primary">
                <input
                    type="checkbox"
                    checked={formState.featured}
                    onChange={(event) => updateField("featured", event.target.checked)}
                    className="h-4 w-4 rounded border-border"
                />
                Featured room
            </label>

            {error && (
                <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-600">
                    {error}
                </p>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="h-11 rounded-lg bg-button px-5 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-white hover:brightness-105"
                >
                    {saving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Save Room"
                    )}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/rooms")}
                    disabled={saving}
                    className="h-11 rounded-lg border-border bg-background px-5 font-sans text-[12px] font-medium uppercase tracking-[0.14em]"
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <label className="space-y-2">
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">{label}</span>
            {children}
        </label>
    )
}
