"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import FilterTabs, { type GalleryFilterType } from "@/components/gallery/FilterTabs"
import type { GalleryImage } from "@/types"
import galleryData from "@/data/gallery.json"
import { Skeleton } from "@/components/ui/skeleton"

const SKELETON_HEIGHTS = [280, 320, 260, 340, 300, 310, 290, 330, 270]

export default function GalleryGrid() {
    const [filter, setFilter] = useState<GalleryFilterType>("All")
    const [loading, setLoading] = useState(true)

    // Lightbox state
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)

    // Simulate network delay to show masonry Skeleton gracefully
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 750)
        return () => clearTimeout(timer)
    }, [])

    const filteredImages = (galleryData as GalleryImage[]).filter((img) => {
        if (filter === "All") return true
        return img.category === filter
    })

    // Format images for Lightbox
    const lightboxSlides = filteredImages.map((img) => ({
        src: img.src,
        alt: img.alt,
    }))

    const handleOpenLightbox = (index: number) => {
        setLightboxIndex(index)
        setLightboxOpen(true)
    }

    // Disable context menu to prevent easy downloads
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
    }

    return (
        <section className="bg-background pb-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">

                <FilterTabs currentFilter={filter} onFilterChange={setFilter} />

                <div className="mt-8">
                    {loading ? (
                        // Masonry Skeleton (CSS columns)
                        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 space-y-6">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <div key={i} className="break-inside-avoid relative overflow-hidden bg-surface">
                                    <Skeleton
                                        className="w-full rounded-none"
                                        style={{
                                            height: `${SKELETON_HEIGHTS[i % SKELETON_HEIGHTS.length]}px`
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Actual Masonry Grid
                        <motion.div
                            layout
                            className="columns-1 gap-6 sm:columns-2 lg:columns-3 space-y-6"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredImages.map((img, index) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        key={img.id}
                                        className="break-inside-avoid relative cursor-pointer overflow-hidden bg-surface group"
                                        onClick={() => handleOpenLightbox(index)}
                                        onContextMenu={handleContextMenu}
                                        style={{ WebkitTouchCallout: "none" }} // Disable iOS long-press menu
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            width={0}
                                            height={0}
                                            className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            style={{ width: "100%", height: "auto" }}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />

                                        {/* Hover overlay hint */}
                                        <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/20" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {!loading && filteredImages.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-20 text-center"
                        >
                            <p className="font-sans text-muted">No images found for this category.</p>
                        </motion.div>
                    )}
                </div>

                {/* Lightbox */}
                <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)}
                    index={lightboxIndex}
                    slides={lightboxSlides}
                    carousel={{ padding: 0 }}
                    animation={{ swipe: 250 }}
                    controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
                    styles={{
                        container: { backgroundColor: "#1a1a1a" },
                        button: { filter: "none" }, // Remove default dropshadow from plugin buttons
                    }}
                    render={{
                        slide: ({ slide }) => (
                            <div
                                className="relative h-full w-full"
                                onContextMenu={handleContextMenu}
                                style={{ WebkitTouchCallout: "none" }}
                            >
                                <Image
                                    src={slide.src}
                                    alt={slide.alt || ""}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                    draggable={false}
                                />
                            </div>
                        )
                    }}
                />

            </div>
        </section>
    )
}
