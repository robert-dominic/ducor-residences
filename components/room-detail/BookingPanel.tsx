import Link from "next/link"
import { formatPrice } from "@/lib/utils"

interface BookingPanelProps {
    price: number
    roomSlug: string
    isAvailable: boolean
}

export default function BookingPanel({ price, roomSlug, isAvailable }: BookingPanelProps) {
    return (
        <div className="sticky top-28 rounded-2xl border border-border bg-surface p-8 shadow-[0_16px_36px_rgba(26,26,26,0.05)]">
            <div className="space-y-6">
                <div>
                    <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                        Starting from
                    </p>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-heading text-[2.2rem] font-medium text-primary">
                            {formatPrice(price).split(" / ")[0]}
                        </span>
                        <span className="font-sans text-sm text-muted">
                            / night
                        </span>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border/50">
                    <ul className="space-y-2 font-sans text-sm text-primary/80">
                        <li className="flex justify-between">
                            <span>Check-in</span>
                            <span className="font-normal text-primary">2:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Check-out</span>
                            <span className="font-normal text-primary">12:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Cancellation</span>
                            <span className="font-normal text-primary">48h Notice</span>
                        </li>
                    </ul>
                </div>

                {isAvailable ? (
                    <Link
                        href={`/booking?room=${roomSlug}`}
                        className="flex w-full items-center justify-center rounded-lg bg-button px-4 py-3 font-sans text-[10px] md:text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-accent"
                    >
                        Check Availability
                    </Link>
                ) : (
                    <button
                        type="button"
                        disabled
                        className="flex h-[46px] w-full cursor-not-allowed items-center justify-center rounded-lg bg-muted/50 px-4 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.16em] text-muted"
                    >
                        Currently Unavailable
                    </button>
                )}

                <p className="text-center font-sans text-xs text-muted">
                    No charge until your stay is confirmed.
                </p>
            </div>
        </div>
    )
}
