"use client"

import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { addDays, differenceInDays, format, isAfter, parseISO, startOfDay } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

import { cn, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import PriceSummary from "@/components/booking/PriceSummary"
import type { Room } from "@/types"
import type { BookingFormData } from "./types"

const stepOneSchema = z.object({
    roomId: z.string().min(1, "Please select a room"),
    checkIn: z.date().optional(),
    checkOut: z.date().optional(),
}).superRefine((data, ctx) => {
    const today = startOfDay(new Date())

    if (!data.checkIn) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Check-in date is required",
            path: ["checkIn"],
        })
        return
    }

    if (!data.checkOut) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Check-out date is required",
            path: ["checkOut"],
        })
        return
    }

    if (data.checkIn < today) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Check-in cannot be in the past",
            path: ["checkIn"],
        })
    }

    if (data.checkOut <= data.checkIn) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Check-out must be after check-in",
            path: ["checkOut"],
        })
    }
})

type StepOneValues = z.infer<typeof stepOneSchema>

interface StepOneProps {
    rooms: Room[]
    formData: BookingFormData
    updateFormData: (data: Partial<BookingFormData>) => void
    onNext: () => void
}

export default function StepOne({ rooms, formData, updateFormData, onNext }: StepOneProps) {
    const [checkInOpen, setCheckInOpen] = useState(false)
    const [checkOutOpen, setCheckOutOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [blockedDates, setBlockedDates] = useState<Date[]>([])
    const [checkingAvailability, setCheckingAvailability] = useState(false)
    const today = startOfDay(new Date())

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)")
        const sync = () => setIsMobile(mq.matches)
        sync()
        mq.addEventListener("change", sync)
        return () => mq.removeEventListener("change", sync)
    }, [])

    const form = useForm<StepOneValues>({
        resolver: zodResolver(stepOneSchema),
        defaultValues: {
            roomId: formData.roomId,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
        },
    })

    const watchedRoomId = useWatch({ control: form.control, name: "roomId" })
    const watchedCheckIn = useWatch({ control: form.control, name: "checkIn" })
    const watchedCheckOut = useWatch({ control: form.control, name: "checkOut" })

    const selectedRoom = rooms.find(r => r.id === watchedRoomId)
    const nights = watchedCheckIn && watchedCheckOut
        ? Math.max(differenceInDays(watchedCheckOut, watchedCheckIn), 0)
        : 0

    useEffect(() => {
        if (!watchedRoomId) {
            setBlockedDates([])
            setCheckingAvailability(false)
            return
        }

        const controller = new AbortController()

        async function fetchBlockedDates() {
            setBlockedDates([])
            setCheckingAvailability(true)

            try {
                const response = await fetch(`/api/rooms/${watchedRoomId}/blocked-dates`, {
                    signal: controller.signal,
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.error ?? "Failed to fetch blocked dates")
                }

                setBlockedDates(
                    (data.blockedDates as string[]).map((dateString) => startOfDay(parseISO(dateString)))
                )
            } catch (error) {
                if (controller.signal.aborted) return
                console.error("Blocked dates fetch failed:", error)
                setBlockedDates([])
            } finally {
                if (!controller.signal.aborted) {
                    setCheckingAvailability(false)
                }
            }
        }

        fetchBlockedDates()

        return () => controller.abort()
    }, [watchedRoomId])

    function isBlockedDate(date: Date) {
        const normalizedDate = startOfDay(date)
        return blockedDates.some(
            (blockedDate) => blockedDate.getTime() === normalizedDate.getTime()
        )
    }

    const firstBlockedAfterCheckIn = watchedCheckIn
        ? blockedDates
            .filter((d) => isAfter(d, startOfDay(watchedCheckIn)))
            .sort((a, b) => a.getTime() - b.getTime())[0]
        : null

    function onSubmit(values: StepOneValues) {
        const room = rooms.find(r => r.id === values.roomId)
        updateFormData({
            roomId: values.roomId,
            roomName: room?.name ?? "",
            roomPrice: room?.price ?? 0,
            checkIn: values.checkIn,
            checkOut: values.checkOut,
            nights,
        })
        onNext()
    }

    return (
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
            <div className="order-1 md:order-1 md:col-span-7 lg:col-span-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 rounded-2xl border border-primary/5 bg-[#F9F9F9] px-5 py-8">
                        <h2 className="font-heading text-[1.3rem] font-medium leading-[1.15] text-primary">
                            Stay Details
                        </h2>

                        {/* Room selector */}
                        <FormField
                            control={form.control}
                            name="roomId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">Room Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-12 rounded-lg border-border bg-background focus:ring-accent">
                                                <SelectValue placeholder="Select a room" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {rooms.map(room => (
                                                <SelectItem key={room.id} value={room.id}>
                                                    {room.name} — {formatPrice(room.price).split(" / ")[0]}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Check-in */}
                        <FormField
                            control={form.control}
                            name="checkIn"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">Check-in</FormLabel>
                                    <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "h-12 w-full justify-start rounded-lg border-border bg-background text-left font-normal hover:bg-background hover:text-current focus-visible:ring-0 aria-expanded:border-border aria-expanded:bg-background aria-expanded:text-current",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {checkingAvailability ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            <span className="text-muted">Checking availability...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value ? format(field.value, "LLL dd, y") : <span className="text-muted">Select check-in date</span>}
                                                        </>
                                                    )}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[280px] p-0 sm:w-[19rem] md:w-auto" align="start">
                                            <Calendar
                                                autoFocus
                                                mode="single"
                                                defaultMonth={field.value ?? today}
                                                selected={field.value}
                                                onSelect={(date) => {
                                                    if (!date) return
                                                    const normalized = startOfDay(date)
                                                    field.onChange(normalized)
                                                    if (watchedCheckOut && normalized >= startOfDay(watchedCheckOut)) {
                                                        form.setValue("checkOut", undefined, { shouldValidate: true })
                                                    }
                                                    setCheckInOpen(false)
                                                }}
                                                numberOfMonths={isMobile ? 1 : 2}
                                                disabled={(date) => {
                                                    const d = startOfDay(date)
                                                    const max = watchedCheckOut ? startOfDay(watchedCheckOut) : null
                                                    return d < today || isBlockedDate(date) || (max !== null && d >= max)
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Check-out */}
                        <FormField
                            control={form.control}
                            name="checkOut"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">Check-out</FormLabel>
                                    <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "h-12 w-full justify-start rounded-lg border-border bg-background text-left font-normal hover:bg-background hover:text-current focus-visible:ring-0 aria-expanded:border-border aria-expanded:bg-background aria-expanded:text-current",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {checkingAvailability ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            <span className="text-muted">Checking availability...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value ? format(field.value, "LLL dd, y") : <span className="text-muted">Select check-out date</span>}
                                                        </>
                                                    )}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[280px] p-0 sm:w-[19rem] md:w-auto" align="start">
                                            <Calendar
                                                autoFocus
                                                mode="single"
                                                defaultMonth={field.value ?? watchedCheckIn ?? addDays(today, 1)}
                                                selected={field.value}
                                                onSelect={(date) => {
                                                    if (!date) return
                                                    field.onChange(startOfDay(date))
                                                    setCheckOutOpen(false)
                                                }}
                                                numberOfMonths={isMobile ? 1 : 2}
                                                disabled={(date) => {
                                                    const d = startOfDay(date)
                                                    const min = watchedCheckIn
                                                        ? addDays(startOfDay(watchedCheckIn), 1)
                                                        : addDays(today, 1)

                                                    return (
                                                        d < min ||
                                                        d < today ||
                                                        (!!firstBlockedAfterCheckIn && isAfter(d, firstBlockedAfterCheckIn))
                                                    )
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="h-14 w-full rounded-lg bg-button font-sans text-[10px] md:text-[12px] font-medium uppercase tracking-[0.16em] text-white hover:brightness-105"
                        >
                            Continue to Guest Details
                        </Button>
                    </form>
                </Form>
            </div>

            {/* Price summary sidebar */}
            <div className="order-2 md:order-2 md:col-span-5 lg:col-span-4">
                <PriceSummary
                    nights={nights}
                    roomTitle={selectedRoom?.name ?? ""}
                    basePrice={selectedRoom?.price ?? 0}
                />
            </div>
        </div>
    )
}
