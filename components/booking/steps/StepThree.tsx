"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import PriceSummary from "@/components/booking/PriceSummary"
import type { BookingFormData } from "./types"

interface StepThreeProps {
    formData: BookingFormData
    onBack: () => void
    onComplete: (bookingRef: string) => void
}

export default function StepThree({ formData, onBack, onComplete }: StepThreeProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleConfirm() {
        setIsSubmitting(true)
        setError(null)

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    roomId: formData.roomId,
                    fullName: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    checkIn: formData.checkIn,
                    checkOut: formData.checkOut,
                    nights: formData.nights,
                    totalPrice: formData.roomPrice * formData.nights,
                    specialRequests: formData.requests,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error ?? "Something went wrong. Please try again.")
                return
            }

            onComplete(data.bookingRef)
        } catch {
            setError("Network error. Please check your connection and try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
            <div className="order-1 md:order-1 md:col-span-7 lg:col-span-8">
                <div className="space-y-8 rounded-2xl border border-border bg-surface px-4 py-6 shadow-[0_18px_40px_rgba(26,26,26,0.05)] sm:p-12">
                    <h2 className="font-heading text-[1.7rem] font-medium leading-[1.15] text-primary">
                        Review Your Booking
                    </h2>

                    {/* Stay details */}
                    <div className="space-y-3">
                        <h3 className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">Stay Details</h3>
                        <div className="space-y-3 rounded-xl border border-border bg-background p-5">
                            <Row label="Room" value={formData.roomName} />
                            <Row
                                label="Check-in"
                                value={formData.checkIn ? format(formData.checkIn, "EEE, MMM dd yyyy") : "—"}
                            />
                            <Row
                                label="Check-out"
                                value={formData.checkOut ? format(formData.checkOut, "EEE, MMM dd yyyy") : "—"}
                            />
                            <Row label="Nights" value={`${formData.nights} night${formData.nights !== 1 ? "s" : ""}`} />
                        </div>
                    </div>

                    {/* Guest details */}
                    <div className="space-y-3">
                        <h3 className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">Guest Details</h3>
                        <div className="space-y-3 rounded-xl border border-border bg-background p-5">
                            <Row label="Name" value={formData.fullName} />
                            <Row label="Email" value={formData.email} />
                            <Row label="Phone" value={formData.phone} />
                            {formData.requests && (
                                <Row label="Requests" value={formData.requests} />
                            )}
                        </div>
                    </div>

                    {/* Policy notice */}
                    <p className="font-sans text-xs text-muted leading-relaxed">
                        By confirming this booking you agree to our cancellation policy — cancellations must be made at least 48 hours before check-in. No charge will be made until your stay is confirmed by our team.
                    </p>

                    {/* Error */}
                    {error && (
                        <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 font-sans text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onBack}
                            disabled={isSubmitting}
                            className="h-14 w-full rounded-lg border-border bg-background font-sans text-[13px] font-medium uppercase tracking-[0.16em] hover:bg-surface hover:text-primary sm:w-auto sm:min-w-[10rem]"
                        >
                            Back
                        </Button>
                        <Button
                            type="button"
                            onClick={handleConfirm}
                            disabled={isSubmitting}
                            className="h-14 w-full rounded-lg bg-button font-sans text-[13px] font-medium uppercase tracking-[0.16em] text-white hover:brightness-105 sm:w-auto sm:min-w-[14rem]"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Confirm Booking"
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Price summary sidebar */}
            <div className="order-2 md:order-2 md:col-span-5 lg:col-span-4">
                <PriceSummary
                    nights={formData.nights}
                    roomTitle={formData.roomName}
                    basePrice={formData.roomPrice}
                />
            </div>
        </div>
    )
}

// Small helper component for review rows
function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:justify-between sm:gap-4">
            <span className="font-sans text-sm text-muted shrink-0">{label}</span>
            <span className="min-w-0 break-words font-sans text-sm text-primary sm:max-w-[70%] sm:text-right">
                {value}
            </span>
        </div>
    )
}
