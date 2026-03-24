import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function BookingLoading() {
    return (
        <>
            <Navbar />
            <main className="bg-background pb-24">
                {/* Hero */}
                <div className="relative flex h-[50vh] min-h-[400px] items-center justify-center overflow-hidden bg-primary md:h-[60vh] md:min-h-[500px]">
                    <div className="absolute inset-0 z-10 bg-primary/80" />
                    <div className="relative z-20 mx-auto max-w-4xl px-6 text-center space-y-6 flex flex-col items-center">
                        <Skeleton className="h-12 w-3/4 max-w-[500px] bg-white/10" />
                        <Skeleton className="h-6 w-2/3 max-w-[400px] bg-white/10" />
                    </div>
                </div>

                {/* 2-Col Form Skeleton */}
                <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">

                        {/* Left: Form */}
                        <div className="md:col-span-7 lg:col-span-8">
                            <div className="space-y-10 border border-border bg-surface p-8 sm:p-12">
                                <div className="space-y-6">
                                    <Skeleton className="h-8 w-40 rounded-none bg-background" />
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <Skeleton className="h-16 w-full rounded-none bg-background" />
                                        <Skeleton className="h-16 w-full rounded-none bg-background" />
                                    </div>
                                    <Skeleton className="h-16 w-full rounded-none bg-background" />
                                </div>

                                <div className="border-t border-border/50 pt-10 space-y-6">
                                    <Skeleton className="h-8 w-40 rounded-none bg-background" />
                                    <Skeleton className="h-20 w-full rounded-none bg-background" />
                                    <Skeleton className="h-20 w-full rounded-none bg-background" />
                                    <Skeleton className="h-32 w-full rounded-none bg-background" />
                                </div>

                                <Skeleton className="h-14 w-full rounded-none bg-background" />
                            </div>
                        </div>

                        {/* Right: Summary */}
                        <div className="hidden md:block md:col-span-5 lg:col-span-4">
                            <div className="border border-border bg-surface h-[380px]">
                                <div className="border-b border-border/50 p-8 space-y-2">
                                    <Skeleton className="h-8 w-32 rounded-none bg-background" />
                                    <Skeleton className="h-4 w-48 rounded-none bg-background" />
                                </div>
                                <div className="p-8 space-y-6">
                                    <Skeleton className="h-4 w-full rounded-none bg-background" />
                                    <Skeleton className="h-4 w-full rounded-none bg-background" />
                                    <div className="border-t border-border/50 pt-6 flex justify-between">
                                        <Skeleton className="h-6 w-16 rounded-none bg-background" />
                                        <Skeleton className="h-8 w-24 rounded-none bg-background" />
                                    </div>
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
