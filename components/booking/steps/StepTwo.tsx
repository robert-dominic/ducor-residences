"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import PriceSummary from "@/components/booking/PriceSummary"
import type { BookingFormData } from "./types"

const stepTwoSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(8, "Phone number is required"),
    requests: z.string().optional(),
})

type StepTwoValues = z.infer<typeof stepTwoSchema>

interface StepTwoProps {
    formData: BookingFormData
    updateFormData: (data: Partial<BookingFormData>) => void
    onNext: () => void
    onBack: () => void
}

export default function StepTwo({ formData, updateFormData, onNext, onBack }: StepTwoProps) {
    const form = useForm<StepTwoValues>({
        resolver: zodResolver(stepTwoSchema),
        defaultValues: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            requests: formData.requests,
        },
    })

    function onSubmit(values: StepTwoValues) {
        updateFormData(values)
        onNext()
    }

    return (
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
            <div className="order-1 md:order-1 md:col-span-7 lg:col-span-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 rounded-2xl border border-primary/5 bg-[#F9F9F9] px-5 py-8">
                        <h2 className="font-heading text-[1.3rem] font-medium leading-[1.15] text-primary">
                            Guest Details
                        </h2>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                className="h-12 rounded-lg border-border bg-background focus-visible:ring-accent"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="john@example.com"
                                                className="h-12 rounded-lg border-border bg-background focus-visible:ring-accent"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            placeholder="+231 77 000 0000"
                                            className="h-12 rounded-lg border-border bg-background focus-visible:ring-accent"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="requests"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">Special Requests <span className="normal-case tracking-normal text-muted">(optional)</span></FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Any special requests or arrival times..."
                                            className="min-h-[120px] rounded-lg border-border bg-background focus-visible:ring-accent"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onBack}
                                className="h-12 w-full rounded-lg border-border bg-background font-sans text-[10px] md:text-[12px] font-medium uppercase tracking-[0.16em] hover:bg-surface hover:text-primary sm:w-auto sm:min-w-[10rem]"
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                className="h-12 w-full rounded-lg bg-button font-sans text-[10px] md:text-[12px] font-medium uppercase tracking-[0.16em] text-white hover:brightness-105 sm:w-auto sm:min-w-[14rem]"
                            >
                                Review Booking
                            </Button>
                        </div>
                    </form>
                </Form>
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
