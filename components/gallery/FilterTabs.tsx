"use client"

import { cn } from "@/lib/utils"

export type GalleryFilterType = "All" | "Rooms" | "Dining" | "Exterior" | "Events"

interface FilterTabsProps {
    currentFilter: GalleryFilterType
    onFilterChange: (filter: GalleryFilterType) => void
}

const filters: GalleryFilterType[] = ["All", "Rooms", "Dining", "Exterior", "Events"]

export default function FilterTabs({ currentFilter, onFilterChange }: FilterTabsProps) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3 py-8">
            {filters.map((filter) => {
                const isActive = currentFilter === filter
                return (
                    <button
                        key={filter}
                        onClick={() => onFilterChange(filter)}
                        className={cn(
                            "rounded-sm border px-6 py-2.5 font-sans text-sm font-medium tracking-wide transition-all duration-300",
                            isActive
                                ? "border-[#B89358] bg-[#B89358] text-white hover:bg-accent"
                                : "border-border bg-surface text-muted hover:border-button hover:text-button"
                        )}
                    >
                        {filter}
                    </button>
                )
            })}
        </div>
    )
}
