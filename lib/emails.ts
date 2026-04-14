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
            <div style="background-color: #F7F3EE; padding: 40px 20px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(26,26,46,0.04);">
                    <tr>
                        <td style="padding: 40px; font-family: Helvetica, Arial, sans-serif; color: #1A1A2E;">
                            <h1 style="font-family: Georgia, serif; font-size: 28px; font-weight: 500; margin: 0 0 8px 0; color: #1A1A2E;">Ducor Residences</h1>
                            <p style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.16em; margin: 0 0 32px 0;">Booking Confirmation</p>
                            
                            <p style="font-size: 15px; line-height: 1.6; margin: 0 0 24px 0; color: #1A1A2E;">
                                Dear ${guestName},<br/><br/>
                                Thank you for choosing Ducor Residences. We have received your booking request and our team will confirm your reservation shortly.
                            </p>

                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F7F3EE; border-radius: 8px; margin: 32px 0;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px; color: #1A1A2E;">
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); color: #666;">Reference</td>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); text-align: right; font-weight: 600;">${bookingRef}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); color: #666;">Room</td>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); text-align: right;">${roomName}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); color: #666;">Check-in</td>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); text-align: right;">${checkIn}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); color: #666;">Check-out</td>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); text-align: right;">${checkOut}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); color: #666;">Nights</td>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); text-align: right;">${nights}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; color: #666;">Total</td>
                                                <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #1A1A2E;">$${totalPrice} USD</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size: 13px; color: #666; line-height: 1.6; margin: 0 0 32px 0;">
                                Check-in is from 2:00 PM. Check-out is by 12:00 PM.<br/>
                                Cancellations must be made at least 48 hours before check-in.
                            </p>

                            <p style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.16em; margin: 0;">
                                Ducor Residences · Monrovia, Liberia
                            </p>
                        </td>
                    </tr>
                </table>
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
            <div style="background-color: #F7F3EE; padding: 40px 20px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(26,26,46,0.04);">
                    <tr>
                        <td style="padding: 40px; font-family: Helvetica, Arial, sans-serif; color: #1A1A2E;">
                            <h1 style="font-family: Georgia, serif; font-size: 28px; font-weight: 500; margin: 0 0 8px 0; color: #1A1A2E;">New Booking Request</h1>
                            <p style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.16em; margin: 0 0 32px 0;">Admin Notification</p>

                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F7F3EE; border-radius: 8px; margin: 32px 0;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px; color: #1A1A2E;">
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); color: #666;">Reference</td>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); text-align: right; font-weight: 600;">${bookingRef}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); color: #666;">Guest</td>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); text-align: right;">${guestName}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); color: #666;">Email</td>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); text-align: right;">${guestEmail}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); color: #666;">Phone</td>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); text-align: right;">${guestPhone}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); color: #666;">Room</td>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); text-align: right;">${roomName}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); color: #666;">Check-in</td>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); text-align: right;">${checkIn}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); color: #666;">Check-out</td>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); text-align: right;">${checkOut}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); color: #666;">Nights</td>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); text-align: right;">${nights}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); color: #666;">Total</td>
                                                <td style="padding: 12px 0; border-bottom: 1px solid rgba(26,26,46,0.1); text-align: right; font-weight: 600; color: #1A1A2E;">$${totalPrice} USD</td>
                                            </tr>
                                            ${specialRequests ? `
                                            <tr>
                                                <td style="padding: 12px 0; color: #666; vertical-align: top;">Requests</td>
                                                <td style="padding: 12px 0; text-align: right; white-space: pre-wrap;">${specialRequests}</td>
                                            </tr>
                                            ` : ""}
                                        </table>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>
            </div>
        `,
    })
}
