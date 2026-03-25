"use client"

import { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { addDays, differenceInDays, format, startOfDay } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"

import { cn, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import ConfirmationScreen from "@/components/booking/ConfirmationScreen"
import type { Room } from "@/types"
import roomsData from "@/data/rooms.json"

// Validation Schema
const formSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(8, "Phone number is required"),
    roomId: z.string().min(1, "Please select a room"),
    checkIn: z.date().optional(),
    checkOut: z.date().optional(),
    requests: z.string().optional(),
}).superRefine((data, ctx) => {
    const today = startOfDay(new Date())

    if (!data.checkIn) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Check-in date is required",
            path: ["checkIn"],
        })
    }

    if (!data.checkOut) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Check-out date is required",
            path: ["checkOut"],
        })
    }

    if (!data.checkIn || !data.checkOut) {
        return
    }

    if (data.checkIn < today) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Check-in cannot be in the past",
            path: ["checkIn"],
        })
    }

    if (data.checkOut < today) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Check-out cannot be in the past",
            path: ["checkOut"],
        })
    }

    if (data.checkOut <= data.checkIn) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Check-out must be after check-in",
            path: ["checkOut"],
        })
    }

    if (differenceInDays(data.checkOut, data.checkIn) < 1) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Check-out must be at least one day after check-in",
            path: ["checkOut"],
        })
    }
})

type BookingFormValues = z.infer<typeof formSchema>

export default function BookingClient() {
    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false)
    const [bookingRef, setBookingRef] = useState("")
    const [checkInOpen, setCheckInOpen] = useState(false)
    const [checkOutOpen, setCheckOutOpen] = useState(false)
    const [isMobileCalendar, setIsMobileCalendar] = useState(false)

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            roomId: "",
            checkIn: undefined,
            checkOut: undefined,
            requests: "",
        },
    })

    // Live watcher for price summary calculations
    const watchedRoomId = useWatch({
        control: form.control,
        name: "roomId",
    })
    const watchedCheckIn = useWatch({
        control: form.control,
        name: "checkIn",
    })
    const watchedCheckOut = useWatch({
        control: form.control,
        name: "checkOut",
    })

    const selectedRoom = (roomsData as Room[]).find(r => r.id === watchedRoomId)
    const currentPrice = selectedRoom?.price || 0
    const roomName = selectedRoom?.name || ""
    const today = startOfDay(new Date())

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)")

        const syncViewport = () => {
            setIsMobileCalendar(mediaQuery.matches)
        }

        syncViewport()
        mediaQuery.addEventListener("change", syncViewport)

        return () => {
            mediaQuery.removeEventListener("change", syncViewport)
        }
    }, [])

    useEffect(() => {
        if (!watchedCheckIn || !watchedCheckOut) {
            return
        }

        if (startOfDay(watchedCheckIn) >= startOfDay(watchedCheckOut)) {
            form.setValue("checkOut", undefined, {
                shouldValidate: true,
                shouldDirty: true,
            })
        }
    }, [form, watchedCheckIn, watchedCheckOut])

    // Calculate nights
    let nights = 0
    if (watchedCheckIn && watchedCheckOut) {
        nights = differenceInDays(watchedCheckOut, watchedCheckIn)
        if (nights < 0) nights = 0
    }

    async function onSubmit(values: BookingFormValues) {
        // Simulate network delay for demo
        await new Promise((resolve) => setTimeout(resolve, 1500))

        console.log("Booking Payload:", values)
        const phoneSuffix = values.phone.replace(/\D/g, "").slice(-4).padStart(4, "0")
        const roomPrefix = values.roomId.slice(0, 3).toUpperCase()
        const mockRef = `DR-${roomPrefix}${phoneSuffix}`

        setBookingRef(mockRef)
        setIsSubmitSuccessful(true)
    }

    // If successful — render confirmation instead of form
    if (isSubmitSuccessful) {
        return (
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
                <div className="md:col-span-7 lg:col-span-8">
                    <ConfirmationScreen email={form.getValues("email")} bookingNumber={bookingRef} />
                </div>
                <div className="hidden md:block md:col-span-5 lg:col-span-4">
                    <PriceSummary nights={nights} roomTitle={roomName} basePrice={currentPrice} />
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">

            {/* LEFT: FORM */}
            <div className="md:col-span-7 lg:col-span-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 border border-border bg-surface py-8 px-3 sm:p-12">

                        <div className="space-y-6">
                            <h2 className="font-heading text-2xl font-semibold text-primary">Guest Details</h2>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted">Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" className="rounded-none border-border bg-background h-12 focus-visible:ring-accent" {...field} />
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
                                            <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted">Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="john@example.com" className="rounded-none border-border bg-background h-12 focus-visible:ring-accent" {...field} />
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
                                        <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted">Phone Number</FormLabel>
                                        <FormControl>
                                            <Input type="tel" placeholder="+1 (555) 000-0000" className="rounded-none border-border bg-background h-12 focus-visible:ring-accent" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="border-t border-border/50 pt-10 space-y-6">
                            <h2 className="font-heading text-2xl font-semibold text-primary">Stay Details</h2>

                            <FormField
                                control={form.control}
                                name="roomId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted">Room Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="rounded-none border-border bg-background h-12 focus:ring-accent">
                                                    <SelectValue placeholder="Select a room" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {(roomsData as Room[]).map(room => (
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

                            <FormField
                                control={form.control}
                                name="checkIn"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted">Check-in</FormLabel>
                                        <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "h-12 w-full justify-start rounded-none border-border bg-background text-left font-normal hover:bg-background hover:text-current active:bg-background focus-visible:border-border focus-visible:ring-0 aria-expanded:bg-background",
                                                            !field.value && "text-muted-foreground",
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? (
                                                            format(field.value, "LLL dd, y")
                                                        ) : (
                                                            <span className="text-muted">Select check-in date</span>
                                                        )}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-[15rem] p-0 sm:w-[19rem] md:w-auto"
                                                align="start"
                                            >
                                                <Calendar
                                                    autoFocus
                                                    mode="single"
                                                    defaultMonth={field.value ?? today}
                                                    selected={field.value}
                                                    onSelect={(date) => {
                                                        if (!date) {
                                                            return
                                                        }

                                                        const normalizedCheckIn = startOfDay(date)
                                                        field.onChange(normalizedCheckIn)

                                                        if (watchedCheckOut && normalizedCheckIn >= startOfDay(watchedCheckOut)) {
                                                            form.setValue("checkOut", undefined, {
                                                                shouldValidate: true,
                                                                shouldDirty: true,
                                                            })
                                                        }

                                                        setCheckInOpen(false)
                                                    }}
                                                    numberOfMonths={isMobileCalendar ? 1 : 2}
                                                    className="w-full"
                                                    disabled={(date) => startOfDay(date) < today}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="checkOut"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted">Check-out</FormLabel>
                                        <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "h-12 w-full justify-start rounded-none border-border bg-background text-left font-normal hover:bg-background hover:text-current active:bg-background focus-visible:border-border focus-visible:ring-0 aria-expanded:bg-background",
                                                            !field.value && "text-muted-foreground",
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? (
                                                            format(field.value, "LLL dd, y")
                                                        ) : (
                                                            <span className="text-muted">Select check-out date</span>
                                                        )}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-[15rem] p-0 sm:w-[19rem] md:w-auto"
                                                align="start"
                                            >
                                                <Calendar
                                                    autoFocus
                                                    mode="single"
                                                    defaultMonth={field.value ?? watchedCheckIn ?? addDays(today, 1)}
                                                    selected={field.value}
                                                    onSelect={(date) => {
                                                        if (!date) {
                                                            return
                                                        }

                                                        field.onChange(startOfDay(date))
                                                        setCheckOutOpen(false)
                                                    }}
                                                    numberOfMonths={isMobileCalendar ? 1 : 2}
                                                    className="w-full"
                                                    disabled={(date) => {
                                                        const normalizedDate = startOfDay(date)
                                                        const minimumCheckOut = watchedCheckIn
                                                            ? addDays(startOfDay(watchedCheckIn), 1)
                                                            : addDays(today, 1)

                                                        return normalizedDate < minimumCheckOut
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="requests"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted">Special Requests</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Any special requests or arrival times..."
                                                className="rounded-none border-border bg-background min-h-[120px] focus-visible:ring-accent"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-none bg-[#B89358] text-white font-sans text-sm font-semibold tracking-wide transition-colors hover:bg-accent"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Processing Request
                                </>
                            ) : (
                                "Request Booking"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>

            {/* RIGHT: SUMMARY (Sticky) */}
            <div className="block md:col-span-5 lg:col-span-4">
                <PriceSummary nights={nights || 0} roomTitle={roomName} basePrice={currentPrice} />
            </div>

        </div>
    )
}
