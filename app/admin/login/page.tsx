"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin() {
        setIsLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError("Invalid email or password.")
            setIsLoading(false)
            return
        }

        window.location.href = "/admin"
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-surface p-10 shadow-[0_16px_36px_rgba(26,26,26,0.07)]">
                <div>
                    <h1 className="font-heading text-[2rem] font-medium text-primary">Ducor Residences</h1>
                    <p className="mt-1 font-sans text-sm text-muted">Admin Portal</p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">Email</label>
                        <Input
                            type="email"
                            placeholder="admin@ducorresidences.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 rounded-lg border-border bg-background focus-visible:ring-accent"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">Password</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            className="h-12 rounded-lg border-border bg-background focus-visible:ring-accent"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 font-sans text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <Button
                        onClick={handleLogin}
                        disabled={isLoading || !email || !password}
                        className="h-14 w-full rounded-lg bg-button font-sans text-[13px] font-medium uppercase tracking-[0.16em] text-white hover:brightness-105"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Signing in.....
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}