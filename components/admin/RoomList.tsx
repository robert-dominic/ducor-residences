"use client"

import { useState } from "react"
import { Pencil, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Room } from "@/types"

interface RoomListProps {
    initialRooms: Room[]
}

export default function RoomList({ initialRooms }: RoomListProps) {
    const [rooms, setRooms] = useState(initialRooms)
    const [togglingId, setTogglingId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

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
            setRooms((prev) => prev.map((item) => item.id === updatedRoom.id ? updatedRoom : item))
        } catch {
            setError("Network error. Please try again.")
        } finally {
            setTogglingId(null)
        }
    }

    const sortedRooms = [...rooms].sort((a, b) => a.price - b.price)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-heading text-[1.4rem] font-medium text-primary">All Rooms</h3>
                    <p className="mt-1 font-sans text-sm text-muted">Manage your inventory and availability.</p>
                </div>
                <Link href="/admin/rooms/new">
                    <Button className="h-11 rounded-lg bg-button px-5 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-white hover:brightness-105">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Room
                    </Button>
                </Link>
            </div>

            {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-600">
                    {error}
                </p>
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
                                        <Link href={`/admin/rooms/${room.id}/edit`}>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="rounded-lg border-border bg-background font-sans text-[11px] uppercase tracking-[0.14em] text-primary"
                                            >
                                                <Pencil className="mr-2 h-3.5 w-3.5" />
                                                Edit
                                            </Button>
                                        </Link>
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
