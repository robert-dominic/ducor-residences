"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import RoomCard from "@/components/shared/RoomCard"
import FilterBar, { type RoomFilterType } from "@/components/rooms/FilterBar"
import type { Room } from "@/types"
import roomsData from "@/data/rooms.json"
import { Skeleton } from "@/components/ui/skeleton"

export default function RoomGrid() {
    const [filter, setFilter] = useState<RoomFilterType>("All")
    const [loading, setLoading] = useState(true)

    // Simulate network delay to show the Skeleton loading state gracefully
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 600)
        return () => clearTimeout(timer)
    }, [])

    const filteredRooms = (roomsData as Room[]).filter((room) => {
        if (filter === "All") return true
        return room.type === filter
    })

    return (
        <section className="bg-background pb-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">

                <FilterBar currentFilter={filter} onFilterChange={setFilter} />

                <div className="mt-8">
                    {loading ? (
                        // Skeleton Layout (must match RoomCard shape exactly)
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_16px_36px_rgba(26,26,26,0.05)]">
                                    <div className="relative aspect-[4/3]">
                                        <Skeleton className="h-full w-full rounded-none" />
                                    </div>
                                    <div className="p-5 space-y-4">
                                        <Skeleton className="h-7 w-2/3 rounded-sm" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-full rounded-sm" />
                                            <Skeleton className="h-4 w-4/5 rounded-sm" />
                                        </div>
                                        <div className="flex gap-5 pt-1">
                                            <Skeleton className="h-4 w-16 rounded-sm" />
                                            <Skeleton className="h-4 w-16 rounded-sm" />
                                        </div>
                                        <div className="border-t border-border my-4" />
                                        <div className="flex items-center justify-between">
                                            <Skeleton className="h-8 w-24 rounded-sm" />
                                            <Skeleton className="h-9 w-28 rounded-sm" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Actual Grid
                        <motion.div
                            layout
                            className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredRooms.map((room) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        key={room.id}
                                    >
                                        <RoomCard room={room} compact />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {!loading && filteredRooms.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-20 text-center"
                        >
                            <p className="font-sans text-muted">No rooms found for this category.</p>
                        </motion.div>
                    )}
                </div>

            </div>
        </section>
    )
}
