"use client"

import { type ReactNode, useMemo, useState } from "react"
import { Loader2, Pencil, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Room } from "@/types"

type RoomType = Room["type"]

interface RoomManagerProps {
    rooms: Room[]
}

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

const ROOM_TYPES: RoomType[] = ["Single", "Double", "Suite", "Penthouse"]

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

export default function RoomManager({ rooms }: RoomManagerProps) {
    const [localRooms, setLocalRooms] = useState(rooms)
    const [formState, setFormState] = useState<RoomFormState>(initialFormState)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [saving, setSaving] = useState(false)
    const [togglingId, setTogglingId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const sortedRooms = useMemo(
        () => [...localRooms].sort((left, right) => left.price - right.price),
        [localRooms]
    )

    function openCreateForm() {
        setEditingId(null)
        setFormState(initialFormState)
        setShowForm(true)
        setError(null)
    }

    function openEditForm(room: Room) {
        setEditingId(room.id)
        setFormState(toFormState(room))
        setShowForm(true)
        setError(null)
    }

    function closeForm() {
        setShowForm(false)
        setEditingId(null)
        setFormState(initialFormState)
        setError(null)
    }

    function updateField<K extends keyof RoomFormState>(field: K, value: RoomFormState[K]) {
        setFormState((prev) => ({ ...prev, [field]: value }))
    }

    async function handleToggleAvailability(room: Room) {
        setTogglingId(room.id)
        setError(null)

        try {
            const response = await fetch(`/api/admin/rooms/${room.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_available: !room.is_available }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error ?? "Failed to update room availability.")
                return
            }

            const updatedRoom = data.room as Room
            setLocalRooms((prev) => prev.map((item) => item.id === updatedRoom.id ? updatedRoom : item))
        } catch {
            setError("Network error. Please try again.")
        } finally {
            setTogglingId(null)
        }
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
                editingId ? `/api/admin/rooms/${editingId}` : "/api/admin/rooms",
                {
                    method: editingId ? "PATCH" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                setError(data.error ?? "Failed to save room.")
                return
            }

            const savedRoom = data.room as Room

            setLocalRooms((prev) => {
                if (editingId) {
                    return prev.map((item) => item.id === savedRoom.id ? savedRoom : item)
                }

                return [...prev, savedRoom]
            })

            closeForm()
        } catch {
            setError("Network error. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="font-heading text-[1.4rem] font-medium text-primary">Room Management</h3>
                    <p className="mt-1 font-sans text-sm text-muted">Add rooms, edit room details, and control availability.</p>
                </div>

                <Button
                    type="button"
                    onClick={openCreateForm}
                    className="h-11 rounded-lg bg-button px-5 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-white hover:brightness-105"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Room
                </Button>
            </div>

            {showForm && (
                <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_8px_24px_rgba(26,26,26,0.05)]">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h4 className="font-heading text-[1.35rem] font-medium text-primary">
                                {editingId ? "Edit Room" : "Add Room"}
                            </h4>
                            <p className="font-sans text-sm text-muted">Update the room details below and save changes.</p>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeForm}
                            className="rounded-lg border-border bg-background font-sans text-[12px] uppercase tracking-[0.14em]"
                        >
                            Cancel
                        </Button>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
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
                            <select
                                value={formState.type}
                                onChange={(event) => updateField("type", event.target.value as RoomType)}
                                className="h-11 w-full rounded-lg border border-border bg-background px-4 font-sans text-sm text-primary outline-none focus:border-ring focus:ring-1 focus:ring-ring/50"
                            >
                                {ROOM_TYPES.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
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
                                "Save"
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeForm}
                            disabled={saving}
                            className="h-11 rounded-lg border-border bg-background px-5 font-sans text-[12px] font-medium uppercase tracking-[0.14em]"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_8px_24px_rgba(26,26,26,0.05)]">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-background">
                                {["Name", "Type", "Price", "Capacity", "Availability", "Actions"].map((heading) => (
                                    <th
                                        key={heading}
                                        className="px-5 py-4 text-left font-sans text-[11px] uppercase tracking-[0.14em] text-muted"
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {sortedRooms.map((room) => (
                                <tr key={room.id} className="hover:bg-background/50 transition-colors">
                                    <td className="px-5 py-4">
                                        <p className="font-sans font-medium text-primary">{room.name}</p>
                                        <p className="font-sans text-xs text-muted">{room.slug}</p>
                                    </td>
                                    <td className="px-5 py-4 font-sans text-primary">{room.type}</td>
                                    <td className="px-5 py-4 font-sans text-primary">${room.price}</td>
                                    <td className="px-5 py-4 font-sans text-primary">{room.capacity}</td>
                                    <td className="px-5 py-4">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleAvailability(room)}
                                            disabled={togglingId === room.id}
                                            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${room.is_available ? "bg-button" : "bg-border"} ${togglingId === room.id ? "opacity-70" : ""}`}
                                            aria-pressed={room.is_available}
                                        >
                                            <span
                                                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${room.is_available ? "translate-x-8" : "translate-x-1"}`}
                                            />
                                        </button>
                                        <p className="mt-2 font-sans text-xs text-muted">
                                            {room.is_available ? "Available" : "Unavailable"}
                                        </p>
                                    </td>
                                    <td className="px-5 py-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => openEditForm(room)}
                                            className="rounded-lg border-border bg-background font-sans text-[11px] uppercase tracking-[0.14em] text-primary"
                                        >
                                            <Pencil className="mr-2 h-3.5 w-3.5" />
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function Field({
    label,
    children,
}: {
    label: string
    children: ReactNode
}) {
    return (
        <label className="space-y-2">
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">{label}</span>
            {children}
        </label>
    )
}
