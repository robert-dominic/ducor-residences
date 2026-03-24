import Link from "next/link"
import { formatPrice } from "@/lib/utils"

interface BookingPanelProps {
    price: number
}

export default function BookingPanel({ price }: BookingPanelProps) {
    return (
        <div className="sticky top-28 border border-border bg-surface p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="space-y-6">
                <div>
                    <p className="font-sans text-sm font-medium uppercase tracking-widest text-muted">
                        Starting from
                    </p>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-heading text-4xl font-bold text-primary">
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
                            <span className="font-medium">2:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Check-out</span>
                            <span className="font-medium">12:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Cancellation</span>
                            <span className="font-medium">48h Notice</span>
                        </li>
                    </ul>
                </div>

                <Link
                    href="/booking"
                    className="flex w-full items-center justify-center bg-accent px-4 py-3.5 font-sans text-sm font-semibold tracking-wide text-primary transition-colors hover:bg-secondary hover:text-white"
                >
                    Check Availability
                </Link>

                <p className="text-center font-sans text-xs text-muted">
                    No charge until your stay is confirmed.
                </p>
            </div>
        </div>
    )
}
