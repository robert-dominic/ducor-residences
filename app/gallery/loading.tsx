import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { Skeleton } from "@/components/ui/skeleton"

const SKELETON_HEIGHTS = [280, 320, 260, 340, 300, 310, 290, 330, 270]

export default function GalleryLoading() {
    return (
        <>
            <Navbar />
            <main>
                {/* PageHero Skeleton (Compact version) */}
                <div className="relative flex h-[50vh] min-h-[400px] items-center justify-center overflow-hidden bg-primary md:h-[60vh] md:min-h-[500px]">
                    <div className="absolute inset-0 z-10 bg-primary/80" />
                    <div className="relative z-20 mx-auto max-w-4xl px-6 text-center space-y-6 flex flex-col items-center">
                        <Skeleton className="h-12 w-3/4 max-w-[400px] bg-white/10" />
                        <Skeleton className="h-6 w-2/3 max-w-[300px] bg-white/10" />
                        <div className="pt-6">
                            <Skeleton className="h-px w-24 bg-accent/50" />
                        </div>
                    </div>
                </div>

                {/* GalleryGrid Skeleton */}
                <section className="bg-background py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">

                        {/* Filter Tabs Mock */}
                        <div className="flex flex-wrap items-center justify-center gap-3 py-8">
                            <Skeleton className="h-[42px] w-[80px] rounded-sm bg-surface" />
                            <Skeleton className="h-[42px] w-[90px] rounded-sm bg-surface" />
                            <Skeleton className="h-[42px] w-[85px] rounded-sm bg-surface" />
                            <Skeleton className="h-[42px] w-[100px] rounded-sm bg-surface" />
                        </div>

                        <div className="mt-8">
                            {/* Masonry Layout Mock */}
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
                        </div>

                    </div>
                </section>

            </main>
            <Footer />
        </>
    )
}
