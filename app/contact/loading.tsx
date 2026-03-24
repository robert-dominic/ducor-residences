import { InfoCardsSkeleton } from "@/components/contact/InfoCards"
import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"
import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <>
      <Navbar />
      <main className="bg-background pb-24">
        <div className="relative flex h-[50vh] min-h-[400px] items-center justify-center overflow-hidden bg-primary md:h-[60vh] md:min-h-[500px]">
          <div className="absolute inset-0 z-10 bg-primary/80" />
          <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center space-y-6 px-6 text-center">
            <Skeleton className="h-12 w-3/4 max-w-[420px] bg-white/10" />
            <Skeleton className="h-6 w-2/3 max-w-[360px] bg-white/10" />
            <Skeleton className="h-px w-12 bg-accent/50" />
          </div>
        </div>

        <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="border border-border bg-surface p-8 sm:p-12">
                <div className="mb-8 space-y-3">
                  <Skeleton className="h-4 w-32 bg-background" />
                  <Skeleton className="h-10 w-full max-w-[520px] bg-background" />
                  <Skeleton className="h-5 w-full max-w-[560px] bg-background" />
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Skeleton className="h-16 w-full bg-background" />
                    <Skeleton className="h-16 w-full bg-background" />
                  </div>
                  <Skeleton className="h-16 w-full bg-background" />
                  <Skeleton className="h-[180px] w-full bg-background" />
                  <Skeleton className="h-14 w-full bg-background" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <InfoCardsSkeleton />
            </div>
          </div>

          <div className="mt-16 border border-border bg-surface">
            <div className="border-b border-border px-6 py-5 sm:px-8">
              <Skeleton className="h-4 w-20 bg-background" />
              <Skeleton className="mt-3 h-8 w-48 bg-background" />
            </div>
            <Skeleton className="h-[420px] w-full bg-background" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
