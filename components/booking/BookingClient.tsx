"use client"

import { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format, differenceInDays } from "date-fns"
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
    date: z.object({
        from: z.date({ message: "Check-in date is required" }),
        to: z.date({ message: "Check-out date is required" }),
    }).refine((data) => data.from < data.to, {
        message: "Check-out must be after check-in",
        path: ["to"],
    }),
    requests: z.string().optional(),
})

type BookingFormValues = z.infer<typeof formSchema>

export default function BookingClient() {
    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false)
    const [bookingRef, setBookingRef] = useState("")
    const [calendarOpen, setCalendarOpen] = useState(false)
    const [isMobileCalendar, setIsMobileCalendar] = useState(false)

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            roomId: "",
            requests: "",
        },
    })

    // Live watcher for price summary calculations
    const watchedRoomId = useWatch({
        control: form.control,
        name: "roomId",
    })
    const watchedDate = useWatch({
        control: form.control,
        name: "date",
    })

    const selectedRoom = (roomsData as Room[]).find(r => r.id === watchedRoomId)
    const currentPrice = selectedRoom?.price || 0
    const roomName = selectedRoom?.name || ""

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

    // Calculate nights
    let nights = 0
    if (watchedDate?.from && watchedDate?.to) {
        nights = differenceInDays(watchedDate.to, watchedDate.from)
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
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-8">
                    <ConfirmationScreen email={form.getValues("email")} bookingNumber={bookingRef} />
                </div>
                <div className="lg:col-span-4 hidden lg:block">
                    <PriceSummary nights={nights} roomTitle={roomName} basePrice={currentPrice} />
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">

            {/* LEFT: FORM */}
            <div className="lg:col-span-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 border border-border bg-surface p-8 sm:p-12">

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
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="font-sans text-xs uppercase tracking-widest text-muted">Check-in / Check-out</FormLabel>
                                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "h-12 w-full justify-start rounded-none border-border bg-background text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value?.from ? (
                                                            field.value.to ? (
                                                                <>
                                                                    {format(field.value.from, "LLL dd, y")} -{" "}
                                                                    {format(field.value.to, "LLL dd, y")}
                                                                </>
                                                            ) : (
                                                                format(field.value.from, "LLL dd, y")
                                                            )
                                                        ) : (
                                                            <span className="text-muted">Select dates</span>
                                                        )}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-[17.5rem] p-0 sm:w-[19rem] md:w-auto"
                                                align="start"
                                            >
                                                <Calendar
                                                    initialFocus
                                                    mode="range"
                                                    defaultMonth={field.value?.from}
                                                    selected={field.value}
                                                    onSelect={(range) => {
                                                        field.onChange(range)

                                                        if (range?.from && range?.to) {
                                                            setCalendarOpen(false)
                                                        } else {
                                                            setCalendarOpen(true)
                                                        }
                                                    }}
                                                    numberOfMonths={isMobileCalendar ? 1 : 2}
                                                    className="w-full"
                                                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
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
                            className="w-full h-14 rounded-none bg-accent text-primary font-sans text-sm font-semibold tracking-wide hover:bg-secondary hover:text-white transition-colors"
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
            <div className="lg:col-span-4">
                <PriceSummary nights={nights || 0} roomTitle={roomName} basePrice={currentPrice} />
            </div>

        </div>
    )
}
