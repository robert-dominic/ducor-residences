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
        <div className="space-y-8">
            <div className="flex items-end justify-between">
                <div>
                    <h3 className="font-heading text-[1.4rem] font-medium leading-[1.04] tracking-[0.01em] text-primary">All Rooms</h3>
                    <p className="mt-2 font-sans text-[11px] text-primary/40 leading-relaxed uppercase tracking-[0.1em]">Manage your inventory and availability.</p>
                </div>
                <Link href="/admin/rooms/new">
                    <Button className="h-12 rounded-xl bg-primary px-6 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white shadow-sm hover:brightness-105 transition-all">
                        <Plus className="mr-2 h-4 w-4" strokeWidth={1.5} />
                        Add Room
                    </Button>
                </Link>
            </div>

            {error && (
                <p className="rounded-xl border border-red-100 bg-white px-5 py-4 font-sans text-sm text-red-600 italic">
                    {error}
                </p>
            )}

            <div className="overflow-hidden rounded-2xl border border-primary/5 bg-[#F9F9F9]">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-primary/5 bg-white">
                                {["Name", "Type", "Price", "Capacity", "Availability", "Actions"].map((heading) => (
                                    <th
                                        key={heading}
                                        className="px-6 py-5 text-left font-heading text-[9px] uppercase tracking-[0.24em] text-primary/40"
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5 bg-[#F9F9F9]">
                            {sortedRooms.map((room) => (
                                <tr key={room.id} className="hover:bg-white transition-colors duration-300">
                                    <td className="px-6 py-5">
                                        <p className="font-sans font-medium text-primary text-[13px]">{room.name}</p>
                                        <p className="font-sans text-[10px] text-primary/40 mt-0.5 uppercase tracking-wider">{room.slug}</p>
                                    </td>
                                    <td className="px-6 py-5 font-sans text-primary/60 text-[13px]">{room.type}</td>
                                    <td className="px-6 py-5 font-sans font-medium text-primary text-[13px]">${room.price}</td>
                                    <td className="px-6 py-5 font-sans text-primary/60 text-[13px]">{room.capacity} <span className="text-[9px] uppercase ml-1">guests</span></td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <button
                                                type="button"
                                                onClick={() => handleToggleAvailability(room)}
                                                disabled={togglingId === room.id}
                                                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-all duration-300 ${room.is_available ? "bg-emerald-500" : "bg-primary/10"} ${togglingId === room.id ? "opacity-50" : ""}`}
                                                aria-pressed={room.is_available}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${room.is_available ? "translate-x-7" : "translate-x-1"}`}
                                                />
                                            </button>
                                            <span className={`font-sans text-[11px] font-medium uppercase tracking-widest ${room.is_available ? "text-emerald-600" : "text-primary/30"}`}>
                                                {room.is_available ? "Live" : "Hidden"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <Link href={`/admin/rooms/${room.id}/edit`}>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="h-9 rounded-lg border-primary/10 bg-white px-4 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-primary/60 hover:text-primary hover:border-primary/20 transition-all"
                                            >
                                                <Pencil className="mr-2 h-3 w-3" />
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
