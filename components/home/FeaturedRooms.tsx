import { getFeaturedRooms } from "@/lib/rooms"
import FeaturedRoomsClient from "@/components/home/FeaturedRoomsClient"

export default async function FeaturedRooms() {
    const featuredRooms = await getFeaturedRooms()

    return <FeaturedRoomsClient featuredRooms={featuredRooms} />
}
