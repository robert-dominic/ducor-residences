import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: NextRequest) {
    try {
        const { fullName, email, phone, message } = await req.json()

        if (!fullName || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        // Save to Supabase
        const { error: insertError } = await supabase
            .from("contact_messages")
            .insert({ full_name: fullName, email, phone, message })

        if (insertError) {
            return NextResponse.json(
                { error: "Failed to save message" },
                { status: 500 }
            )
        }

        // Notify admin
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: process.env.ADMIN_EMAIL!,
            subject: `New Contact Message from ${fullName}`,
            html: `
                <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; color: #1a1a1a;">
                    <h1 style="font-size: 24px; font-weight: 500; margin-bottom: 8px;">New Contact Message</h1>
                    <p style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 32px;">Ducor Residences</p>
                    <div style="padding: 24px; background: #f9f8f6; border-radius: 12px;">
                        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid #e8e6e1;">
                                <td style="padding: 10px 0; color: #888;">Name</td>
                                <td style="padding: 10px 0; text-align: right; word-break: break-word;">${fullName}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e8e6e1;">
                                <td style="padding: 10px 0; color: #888;">Email</td>
                                <td style="padding: 10px 0; text-align: right; word-break: break-word;">${email}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e8e6e1;">
                                <td style="padding: 10px 0; color: #888;">Phone</td>
                                <td style="padding: 10px 0; text-align: right;">${phone ?? "—"}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; vertical-align: top;">Message</td>
                                <td style="padding: 10px 0; text-align: right; white-space: pre-wrap; word-break: break-word;">${message}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            `,
        })

        return NextResponse.json({ success: true }, { status: 201 })

    } catch (err) {
        console.error("Contact route error:", err)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}