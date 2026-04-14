import RoomForm from "@/components/admin/RoomForm"

export const metadata = {
    title: "Add Room | Admin Dashboard",
}

export default function NewRoomPage() {
    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-6">
                <h2 className="font-heading text-[2rem] font-medium text-primary">Add Room</h2>
                <p className="mt-1 font-sans text-sm text-muted">Create a new room listing.</p>
            </div>
            <RoomForm />
        </div>
    )
}
