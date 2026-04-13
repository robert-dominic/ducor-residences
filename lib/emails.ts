import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!
const FROM_EMAIL = "onboarding@resend.dev"

export async function sendGuestConfirmationEmail({
    guestName,
    guestEmail,
    bookingRef,
    roomName,
    checkIn,
    checkOut,
    nights,
    totalPrice,
}: {
    guestName: string
    guestEmail: string
    bookingRef: string
    roomName: string
    checkIn: string
    checkOut: string
    nights: number
    totalPrice: number
}) {
    await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL, // sends to you in sandbox mode
        subject: `Booking Request Received — ${bookingRef}`,
        html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
                <h1 style="font-size: 28px; font-weight: 500; margin-bottom: 8px;">Ducor Residences</h1>
                <p style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 40px;">Monrovia, Liberia</p>

                <h2 style="font-size: 20px; font-weight: 500; margin-bottom: 16px;">Your Booking Request</h2>
                <p style="font-size: 15px; line-height: 1.7; color: #444;">
                    Dear ${guestName},<br/><br/>
                    Thank you for choosing Ducor Residences. We have received your booking request and our team will confirm your reservation shortly.
                </p>

                <div style="margin: 32px 0; padding: 24px; background: #f9f8f6; border-radius: 12px;">
                    <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #e8e6e1;">
                            <td style="padding: 10px 0; color: #888;">Booking Reference</td>
                            <td style="padding: 10px 0; text-align: right; font-weight: 600; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">${bookingRef}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e8e6e1;">
                            <td style="padding: 10px 0; color: #888;">Room</td>
                            <td style="padding: 10px 0; text-align: right; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">${roomName}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e8e6e1;">
                            <td style="padding: 10px 0; color: #888;">Check-in</td>
                            <td style="padding: 10px 0; text-align: right; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">${checkIn}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e8e6e1;">
                            <td style="padding: 10px 0; color: #888;">Check-out</td>
                            <td style="padding: 10px 0; text-align: right; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">${checkOut}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e8e6e1;">
                            <td style="padding: 10px 0; color: #888;">Nights</td>
                            <td style="padding: 10px 0; text-align: right; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">${nights}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #888;">Total</td>
                            <td style="padding: 10px 0; text-align: right; font-weight: 600; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">$${totalPrice} USD</td>
                        </tr>
                    </table>
                </div>

                <p style="font-size: 13px; color: #888; line-height: 1.7;">
                    Check-in is from 2:00 PM. Check-out is by 12:00 PM.<br/>
                    Cancellations must be made at least 48 hours before check-in.
                </p>

                <p style="font-size: 13px; color: #888; margin-top: 40px;">
                    Ducor Residences · Monrovia, Liberia
                </p>
            </div>
        `,
    })
}

export async function sendAdminNotificationEmail({
    guestName,
    guestEmail,
    guestPhone,
    bookingRef,
    roomName,
    checkIn,
    checkOut,
    nights,
    totalPrice,
    specialRequests,
}: {
    guestName: string
    guestEmail: string
    guestPhone: string
    bookingRef: string
    roomName: string
    checkIn: string
    checkOut: string
    nights: number
    totalPrice: number
    specialRequests?: string
}) {
    await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Booking Request — ${bookingRef}`,
        html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
                <h1 style="font-size: 28px; font-weight: 500; margin-bottom: 8px;">New Booking Request</h1>
                <p style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 40px;">Ducor Residences Admin</p>

                <div style="margin: 32px 0; padding: 24px; background: #f9f8f6; border-radius: 12px;">
                    <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #e8e6e1;">
                            <td style="padding: 10px 0; color: #888;">Reference</td>
                            <td style="padding: 10px 0; text-align: right; font-weight: 600; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">${bookingRef}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e8e6e1;">
                            <td style="padding: 10px 0; color: #888;">Guest</td>
                            <td style="padding: 10px 0; text-align: right; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">${guestName}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e8e6e1;">
                            <td style="padding: 10px 0; color: #888;">Email</td>
                            <td style="padding: 10px 0; text-align: right; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">${guestEmail}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e8e6e1;">
                            <td style="padding: 10px 0; color: #888;">Phone</td>
                            <td style="padding: 10px 0; text-align: right; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">${guestPhone}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e8e6e1;">
                            <td style="padding: 10px 0; color: #888;">Room</td>
                            <td style="padding: 10px 0; text-align: right; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">${roomName}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e8e6e1;">
                            <td style="padding: 10px 0; color: #888;">Check-in</td>
                            <td style="padding: 10px 0; text-align: right; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">${checkIn}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e8e6e1;">
                            <td style="padding: 10px 0; color: #888;">Check-out</td>
                            <td style="padding: 10px 0; text-align: right; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">${checkOut}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e8e6e1;">
                            <td style="padding: 10px 0; color: #888;">Nights</td>
                            <td style="padding: 10px 0; text-align: right; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">${nights}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e8e6e1;">
                            <td style="padding: 10px 0; color: #888;">Total</td>
                            <td style="padding: 10px 0; text-align: right; font-weight: 600; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: normal;">$${totalPrice} USD</td>
                        </tr>
                        ${specialRequests ? `
                        <tr>
                            <td style="padding: 10px 0; color: #888;">Requests</td>
                            <td style="padding: 10px 0; text-align: right; word-break: break-word; overflow-wrap: break-word; max-width: 300px; white-space: pre-wrap;">${specialRequests}</td>
                        </tr>
                        ` : ""}
                    </table>
                </div>
            </div>
        `,
    })
}
