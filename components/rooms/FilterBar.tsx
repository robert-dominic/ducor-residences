"use client"

import { cn } from "@/lib/utils"

export type RoomFilterType = "All" | "Single" | "Double" | "Suite" | "Penthouse"

interface FilterBarProps {
    currentFilter: RoomFilterType
    onFilterChange: (filter: RoomFilterType) => void
}

const filters: RoomFilterType[] = ["All", "Single", "Double", "Suite", "Penthouse"]

export default function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3 py-8">
            {filters.map((filter) => {
                const isActive = currentFilter === filter
                return (
                    <button
                        key={filter}
                        onClick={() => onFilterChange(filter)}
                        className={cn(
                            "cursor-pointer rounded-lg border px-5 py-2.5 font-sans text-[12px] font-medium uppercase tracking-[0.14em] transition-all duration-300",
                            isActive
                                ? "border-button bg-button text-white hover:brightness-105"
                                : "border-border bg-surface text-muted hover:border-button hover:bg-background hover:text-button"
                        )}
                    >
                        {filter}
                    </button>
                )
            })}
        </div>
    )
}
