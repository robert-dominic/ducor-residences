import Link from "next/link"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase-server"

export default async function ProtectedAdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/admin/login")
    }

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border bg-surface px-6 py-4">
                <div className="mx-auto max-w-7xl flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <h1 className="font-heading text-xl font-medium text-primary">Ducor Residences</h1>
                        <nav className="flex items-center gap-3">
                            <Link
                                href="/admin"
                                className="rounded-lg border border-border bg-background px-3 py-2 font-sans text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-primary"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/admin/rooms"
                                className="rounded-lg border border-border bg-background px-3 py-2 font-sans text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-primary"
                            >
                                Rooms
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted">Admin Dashboard</p>
                        <form action="/api/admin/logout" method="POST">
                            <button
                                type="submit"
                                className="font-sans text-sm text-muted hover:text-primary transition-colors"
                            >
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-10">
                {children}
            </main>
        </div>
    )
}
