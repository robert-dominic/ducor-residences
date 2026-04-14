import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { AdminSidebar, AdminBottomNav } from "@/components/admin/AdminNav"

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
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <AdminSidebar email={user.email} />

            {/* Main Content Area */}
            <main className="flex-1 w-full md:ml-[220px] mb-16 md:mb-0">
                <div className="p-6 md:p-10 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <AdminBottomNav />
        </div>
    )
}
