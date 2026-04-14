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
        <div className="flex w-full items-center gap-3 overflow-x-auto pb-4 pt-8 md:justify-center md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filters.map((filter) => {
                const isActive = currentFilter === filter
                return (
                    <button
                        key={filter}
                        onClick={() => onFilterChange(filter)}
                        className={cn(
                            "cursor-pointer rounded-full border px-4 py-1.5 font-sans text-sm transition-colors duration-300 whitespace-nowrap",
                            isActive
                                ? "border-primary bg-primary text-white"
                                : "border-border bg-surface text-muted hover:border-primary hover:bg-background hover:text-primary"
                        )}
                    >
                        {filter}
                    </button>
                )
            })}
        </div>
    )
}
