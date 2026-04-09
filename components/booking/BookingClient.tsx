"use client"

import { useState } from "react"
import type { Room } from "@/types"
import { initialFormData, type BookingFormData } from "./steps/types"
import StepIndicator from "./StepIndicator"
import StepOne from "./steps/StepOne"
import StepTwo from "./steps/StepTwo"
import StepThree from "./steps/StepThree"
import ConfirmationScreen from "./ConfirmationScreen"

interface BookingClientProps {
    rooms: Room[]
    preselectedSlug?: string
}

const STEPS = ["Stay Details", "Guest Details", "Review & Pay"]

export default function BookingClient({ rooms, preselectedSlug }: BookingClientProps) {
    const preselectedRoom = rooms.find(r => r.slug === preselectedSlug)

    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<BookingFormData>({
        ...initialFormData,
        roomId: preselectedRoom?.id ?? "",
        roomName: preselectedRoom?.name ?? "",
        roomPrice: preselectedRoom?.price ?? 0,
    })
    const [bookingRef, setBookingRef] = useState("")

    function updateFormData(data: Partial<BookingFormData>) {
        setFormData(prev => ({ ...prev, ...data }))
    }

    function nextStep() {
        setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1))
    }

    function prevStep() {
        setCurrentStep(prev => Math.max(prev - 1, 0))
    }

    function onBookingComplete(ref: string) {
        setBookingRef(ref)
        setCurrentStep(3)
    }

    if (currentStep === 3) {
        return <ConfirmationScreen email={formData.email} bookingNumber={bookingRef} />
    }

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-7 lg:col-span-8">
                    <StepIndicator steps={STEPS} currentStep={currentStep} />
                </div>
            </div>

            {currentStep === 0 && (
                <StepOne
                    rooms={rooms}
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={nextStep}
                />
            )}

            {currentStep === 1 && (
                <StepTwo
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={nextStep}
                    onBack={prevStep}
                />
            )}

            {currentStep === 2 && (
                <StepThree
                    formData={formData}
                    onBack={prevStep}
                    onComplete={onBookingComplete}
                />
            )}
        </div>
    )
}
