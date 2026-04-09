export interface BookingFormData {
    // Step 1
    roomId: string
    roomName: string
    roomPrice: number
    checkIn: Date | undefined
    checkOut: Date | undefined
    nights: number

    // Step 2
    fullName: string
    email: string
    phone: string
    requests: string
}

export const initialFormData: BookingFormData = {
    roomId: "",
    roomName: "",
    roomPrice: 0,
    checkIn: undefined,
    checkOut: undefined,
    nights: 0,
    fullName: "",
    email: "",
    phone: "",
    requests: "",
}