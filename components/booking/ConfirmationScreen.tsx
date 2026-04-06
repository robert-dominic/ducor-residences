import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

interface ConfirmationScreenProps {
    email: string
    bookingNumber: string
}

export default function ConfirmationScreen({ email, bookingNumber }: ConfirmationScreenProps) {
    return (
        <div className="flex h-full min-h-[500px] flex-col items-center justify-center space-y-8 rounded-2xl border border-border bg-surface p-12 text-center shadow-[0_18px_40px_rgba(26,26,26,0.05)]">
            <div className="p-4 text-accent">
                <CheckCircle2 size={48} strokeWidth={1.5} />
            </div>

            <div className="space-y-4">
                <h2 className="font-heading text-[2rem] font-medium text-primary md:text-[2.4rem]">
                    Booking Request Received
                </h2>
                <p className="mx-auto max-w-md font-sans text-[15px] leading-7 text-muted">
                    Thank you for choosing Ducor Residences. We have received your booking request
                    and will send a confirmation to <strong className="font-medium text-primary">{email}</strong> shortly.
                </p>
            </div>

            <div className="flex min-w-[280px] flex-col gap-2 rounded-lg border border-border bg-background px-5 py-4 font-sans text-sm">
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted">Reference Number</span>
                <span className="text-primary font-mono font-medium text-base">{bookingNumber}</span>
            </div>

            <div className="pt-4">
                <Link
                    href="/"
                    className="inline-block rounded-lg border border-button bg-button px-7 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-accent"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}
