import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function AmenitiesLoading() {
    return (
        <>
            <Navbar />
            <main>
                {/* PageHero Skeleton */}
                <div className="relative flex h-[50vh] min-h-[400px] items-center justify-center overflow-hidden bg-primary md:h-[60vh] md:min-h-[500px]">
                    <div className="absolute inset-0 z-10 bg-primary/80" />
                    <div className="relative z-20 mx-auto max-w-4xl px-6 text-center space-y-6 flex flex-col items-center">
                        <Skeleton className="h-4 w-32 bg-white/10" />
                        <Skeleton className="h-12 w-3/4 max-w-[500px] bg-white/10" />
                        <Skeleton className="h-6 w-2/3 max-w-[400px] bg-white/10" />
                        <div className="pt-6">
                            <Skeleton className="h-px w-24 bg-accent/50" />
                        </div>
                    </div>
                </div>

                {/* FeatureGrid Skeleton */}
                <section className="bg-surface py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col gap-4 border border-border bg-background p-8"
                                >
                                    <Skeleton className="h-12 w-12 rounded-none bg-surface" />
                                    <Skeleton className="h-8 w-3/4 rounded-sm" />
                                    <div className="space-y-2 mt-2">
                                        <Skeleton className="h-4 w-full rounded-sm" />
                                        <Skeleton className="h-4 w-full rounded-sm" />
                                        <Skeleton className="h-4 w-4/5 rounded-sm" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Policies Skeleton */}
                <section className="bg-background py-24 border-t border-border">
                    <div className="mx-auto max-w-7xl px-6 lg:px-10">
                        <div className="mb-14 space-y-4">
                            <Skeleton className="h-4 w-24 rounded-sm" />
                            <Skeleton className="h-10 w-64 rounded-sm" />
                            <Skeleton className="h-5 w-full max-w-xl rounded-sm" />
                        </div>

                        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
                            <div className="lg:col-span-4">
                                <Skeleton className="h-[280px] w-full rounded-none bg-surface" />
                            </div>
                            <div className="lg:col-span-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div key={i} className="flex flex-col gap-3">
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="h-5 w-5 rounded-none" />
                                                <Skeleton className="h-7 w-48 rounded-sm" />
                                            </div>
                                            <div className="space-y-2 pl-8">
                                                <Skeleton className="h-4 w-full rounded-sm" />
                                                <Skeleton className="h-4 w-5/6 rounded-sm" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    )
}
