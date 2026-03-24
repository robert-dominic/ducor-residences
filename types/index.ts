export interface Room {
    id: string
    slug: string
    name: string
    type: "Single" | "Double" | "Suite" | "Penthouse"
    price: number
    capacity: number
    size: string
    description: string
    featured: boolean
    images: string[]
    amenities: string[]
}

export interface Testimonial {
    id: string
    name: string
    rating: number
    quote: string
    country: string
}

export interface Amenity {
    id: string
    title: string
    icon: string
    description: string
}

export interface GalleryImage {
    id: string
    src: string
    alt: string
    category: "Rooms" | "Dining" | "Exterior" | "Events"
}
