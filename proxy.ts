import { createServerClient } from "@supabase/ssr"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
    const isLoginPage = request.nextUrl.pathname === "/admin/login"
    let response = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet, headers) {
                    cookiesToSet.forEach(({ name, value }) => {
                        request.cookies.set(name, value)
                    })

                    response = NextResponse.next({
                        request,
                    })

                    Object.entries(headers).forEach(([key, value]) => {
                        response.headers.set(key, value)
                    })

                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, options)
                    })
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!isLoginPage && !user) {
        return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    return response
}

export const config = {
    matcher: ["/admin/:path*"],
}
