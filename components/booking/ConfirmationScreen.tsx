import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

interface ConfirmationScreenProps {
    email: string
    bookingNumber: string
}

export default function ConfirmationScreen({ email, bookingNumber }: ConfirmationScreenProps) {
    return (
        <div className="flex h-full min-h-[500px] flex-col items-center justify-center space-y-8 bg-surface p-12 text-center border border-border">
            <div className="bg-accent/10 p-4 text-accent">
                <CheckCircle2 size={48} strokeWidth={1.5} />
            </div>

            <div className="space-y-4">
                <h2 className="font-heading text-4xl font-semibold text-primary">
                    Booking Request Received
                </h2>
                <p className="font-sans text-base leading-relaxed text-muted max-w-md mx-auto">
                    Thank you for choosing Ducor Residences. We have received your booking request
                    and will send a confirmation to <strong className="font-medium text-primary">{email}</strong> shortly.
                </p>
            </div>

            <div className="bg-background border border-border px-8 py-5 text-sm font-sans flex flex-col gap-2 min-w-[280px]">
                <span className="text-muted tracking-wide uppercase text-xs">Reference Number</span>
                <span className="text-primary font-mono font-medium text-lg">{bookingNumber}</span>
            </div>

            <div className="pt-4">
                <Link
                    href="/"
                    className="inline-block border border-secondary px-8 py-3.5 font-sans text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-white"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}
