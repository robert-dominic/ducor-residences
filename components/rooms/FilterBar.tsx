"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type RoomFilterType = "All" | "Single" | "Double" | "Suite" | "Penthouse"

interface FilterBarProps {
    currentFilter: RoomFilterType
    onFilterChange: (filter: RoomFilterType) => void
}

const filters: RoomFilterType[] = ["All", "Single", "Double", "Suite", "Penthouse"]

export default function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
    return (
        <div className="flex w-full items-center gap-8 overflow-x-auto pb-4 pt-12 md:justify-center md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-b border-primary/5">
            {filters.map((filter) => {
                const isActive = currentFilter === filter
                return (
                    <button
                        key={filter}
                        onClick={() => onFilterChange(filter)}
                        className={cn(
                            "relative cursor-pointer py-2 font-heading text-[11px] uppercase tracking-[0.25em] transition-all duration-300 whitespace-nowrap",
                            isActive
                                ? "text-primary"
                                : "text-primary/40 hover:text-primary/70"
                        )}
                    >
                        {filter}
                        {isActive && (
                            <motion.div
                                layoutId="filter-indicator"
                                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary"
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                        )}
                    </button>
                )
            })}
        </div>
    )
}
