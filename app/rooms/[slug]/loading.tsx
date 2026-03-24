import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function RoomDetailLoading() {
    return (
        <>
            <Navbar />
            <main className="bg-background pb-0 pt-24 md:pt-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">

                    {/* ImageGallery Skeleton */}
                    <div className="flex flex-col gap-4 mb-16">
                        <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
                            <Skeleton className="h-full w-full rounded-none" />
                        </div>
                        <div className="hidden md:grid grid-cols-4 gap-4">
                            <Skeleton className="aspect-[4/3] w-full rounded-none" />
                            <Skeleton className="aspect-[4/3] w-full rounded-none" />
                            <Skeleton className="aspect-[4/3] w-full rounded-none" />
                            <Skeleton className="aspect-[4/3] w-full rounded-none" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 pb-16">

                        {/* Left Col: RoomInfo + Amenities */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Type Badge */}
                            <Skeleton className="h-6 w-20 rounded-none" />

                            {/* Title */}
                            <div className="space-y-3">
                                <Skeleton className="h-12 w-3/4 rounded-sm" />
                                <Skeleton className="h-12 w-1/2 rounded-sm" />
                            </div>

                            {/* Meta row */}
                            <div className="flex gap-6 border-y border-border py-4">
                                <Skeleton className="h-5 w-24 rounded-sm" />
                                <Skeleton className="h-5 w-24 rounded-sm" />
                            </div>

                            {/* Description body */}
                            <div className="space-y-3 pt-2">
                                <Skeleton className="h-4 w-full rounded-sm" />
                                <Skeleton className="h-4 w-full rounded-sm" />
                                <Skeleton className="h-4 w-5/6 rounded-sm" />
                            </div>

                            {/* Amenities Grid */}
                            <div className="pt-8 space-y-6">
                                <Skeleton className="h-8 w-40 rounded-sm" />
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <div key={i} className="flex gap-3">
                                            <Skeleton className="h-5 w-5 rounded-none" />
                                            <Skeleton className="h-5 w-32 rounded-sm" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Col: BookingPanel Sticky */}
                        <div className="lg:col-span-4 hidden lg:block">
                            <div className="border border-border bg-surface p-8 h-[380px]">
                                <div className="space-y-6">
                                    <Skeleton className="h-4 w-24 rounded-sm" />
                                    <Skeleton className="h-10 w-40 rounded-sm" />
                                    <div className="space-y-3 pt-4 border-t border-border/50">
                                        <Skeleton className="h-5 w-full rounded-sm" />
                                        <Skeleton className="h-5 w-full rounded-sm" />
                                        <Skeleton className="h-5 w-full rounded-sm" />
                                    </div>
                                    <Skeleton className="h-12 w-full rounded-none mt-6" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
