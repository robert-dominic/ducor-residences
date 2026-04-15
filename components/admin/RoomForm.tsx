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
        <div className="rounded-2xl border border-primary/5 bg-[#F9F9F9] p-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Field label="Name">
                    <Input
                        value={formState.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        className="h-12 rounded-xl border-primary/5 bg-white px-5 font-sans text-sm text-primary transition-all focus:border-primary/20 focus:ring-4 focus:ring-primary/2"
                    />
                </Field>
                <Field label="Slug">
                    <Input
                        value={formState.slug}
                        onChange={(event) => updateField("slug", event.target.value)}
                        className="h-12 rounded-xl border-primary/5 bg-white px-5 font-sans text-sm text-primary transition-all focus:border-primary/20 focus:ring-4 focus:ring-primary/2"
                    />
                </Field>
                <Field label="Type">
                    <Select
                        value={formState.type}
                        onValueChange={(value) => updateField("type", value as RoomType)}
                    >
                        <SelectTrigger className="h-12 w-full rounded-xl border-primary/5 bg-white px-5 font-sans text-sm text-primary transition-all focus:border-primary/20 focus:ring-4 focus:ring-primary/2">
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-primary/5 shadow-2xl">
                            {ROOM_TYPES.map((type) => (
                                <SelectItem key={type} value={type} className="rounded-lg font-sans text-sm py-2.5">
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>
                <Field label="Price per Night">
                    <Input
                        type="number"
                        min="0"
                        value={formState.price}
                        onChange={(event) => updateField("price", event.target.value)}
                        className="h-12 rounded-xl border-primary/5 bg-white px-5 font-sans text-sm text-primary transition-all focus:border-primary/20 focus:ring-4 focus:ring-primary/2"
                    />
                </Field>
                <Field label="Capacity">
                    <Input
                        type="number"
                        min="1"
                        value={formState.capacity}
                        onChange={(event) => updateField("capacity", event.target.value)}
                        className="h-12 rounded-xl border-primary/5 bg-white px-5 font-sans text-sm text-primary transition-all focus:border-primary/20 focus:ring-4 focus:ring-primary/2"
                    />
                </Field>
                <Field label="Size (e.g. 45m²)">
                    <Input
                        value={formState.size}
                        onChange={(event) => updateField("size", event.target.value)}
                        className="h-12 rounded-xl border-primary/5 bg-white px-5 font-sans text-sm text-primary transition-all focus:border-primary/20 focus:ring-4 focus:ring-primary/2"
                    />
                </Field>
            </div>

            <div className="mt-8">
                <Field label="Description">
                    <Textarea
                        value={formState.description}
                        onChange={(event) => updateField("description", event.target.value)}
                        className="min-h-32 rounded-xl border-primary/5 bg-white px-5 py-4 font-sans text-sm text-primary leading-relaxed transition-all focus:border-primary/20 focus:ring-4 focus:ring-primary/2"
                    />
                </Field>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                <Field label="Image URLs (comma separated)">
                    <Textarea
                        value={formState.images}
                        onChange={(event) => updateField("images", event.target.value)}
                        className="min-h-24 rounded-xl border-primary/5 bg-white px-5 py-4 font-sans text-[13px] text-primary/60 leading-relaxed transition-all focus:border-primary/20 focus:ring-4 focus:ring-primary/2"
                        placeholder="https://..., https://..."
                    />
                </Field>
                <Field label="Amenities (comma separated)">
                    <Textarea
                        value={formState.amenities}
                        onChange={(event) => updateField("amenities", event.target.value)}
                        className="min-h-24 rounded-xl border-primary/5 bg-white px-5 py-4 font-sans text-[13px] text-primary/60 leading-relaxed transition-all focus:border-primary/20 focus:ring-4 focus:ring-primary/2"
                        placeholder="Free WiFi, Air Conditioning, Flat-screen TV"
                    />
                </Field>
            </div>

            <div className="mt-8 flex items-center">
                <label className="inline-flex cursor-pointer items-center gap-3 font-sans text-[13px] font-medium text-primary/60 hover:text-primary transition-colors">
                    <div className="relative flex items-center">
                        <input
                            type="checkbox"
                            checked={formState.featured}
                            onChange={(event) => updateField("featured", event.target.checked)}
                            className="peer h-5 w-5 rounded-lg border-primary/10 bg-white text-primary transition-all focus:ring-0"
                        />
                    </div>
                    Featured Property
                </label>
            </div>

            {error && (
                <p className="mt-8 rounded-xl border border-red-100 bg-white px-5 py-4 font-sans text-sm text-red-600 italic">
                    {error}
                </p>
            )}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="h-12 rounded-xl bg-primary px-8 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white shadow-sm hover:brightness-105 transition-all"
                >
                    {saving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Synchronizing...
                        </>
                    ) : (
                        "Save Definition"
                    )}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/rooms")}
                    disabled={saving}
                    className="h-12 rounded-xl border-primary/10 bg-white px-8 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-primary/60 hover:text-primary transition-all"
                >
                    Return to List
                </Button>
            </div>
        </div>
    )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <span className="font-heading text-[9px] uppercase tracking-[0.24em] text-primary/40 block ml-1">{label}</span>
            {children}
        </div>
    )
}
