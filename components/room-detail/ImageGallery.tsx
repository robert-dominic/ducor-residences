import Image from "next/image"

interface ImageGalleryProps {
    images: string[]
    roomName: string
}

export default function ImageGallery({ images, roomName }: ImageGalleryProps) {
    if (!images?.length) return null

    const mainImage = images[0]
    const thumbnails = images.slice(1, 5)

    return (
        <div className="flex flex-col gap-4">
            {/* Main Hero Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface">
                <Image
                    src={mainImage}
                    alt={`${roomName} - Main View`}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="100vw"
                />
            </div>

            {/* Thumbnails (desktop: 4, mobile: 2 or scroll) */}
            {thumbnails.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {thumbnails.map((src, i) => (
                        <div
                            key={i}
                            className="relative aspect-[4/3] w-full overflow-hidden bg-surface"
                        >
                            <Image
                                src={src}
                                alt={`${roomName} - View ${i + 2}`}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
