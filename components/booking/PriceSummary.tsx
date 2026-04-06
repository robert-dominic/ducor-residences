import { formatPrice } from "@/lib/utils"

interface PriceSummaryProps {
    nights: number
    roomTitle: string
    basePrice: number
}

export default function PriceSummary({ nights, roomTitle, basePrice }: PriceSummaryProps) {
    const subtotal = nights * basePrice
    const tax = subtotal * 0.15 // 15% GST roughly
    const total = subtotal + tax

    return (
        <div className="sticky top-28 rounded-2xl border border-border bg-surface shadow-[0_18px_40px_rgba(26,26,26,0.05)]">
            {/* Header */}
            <div className="border-b border-border/50 p-8 space-y-2">
                <h3 className="font-heading text-[1.7rem] font-medium text-primary">
                    Your Stay
                </h3>
                <p className="font-sans text-sm text-muted">
                    {roomTitle || "Select a room"}
                </p>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
                <ul className="space-y-4 font-sans text-sm text-primary/80">
                    <li className="flex justify-between">
                        <span>{formatPrice(basePrice).split(" / ")[0]} × {nights} {nights === 1 ? "night" : "nights"}</span>
                        <span className="font-medium">{formatPrice(subtotal).split(" / ")[0]}</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Taxes & Fees (15%)</span>
                        <span className="font-medium">{formatPrice(tax).split(" / ")[0]}</span>
                    </li>
                </ul>

                <div className="border-t border-border/50 pt-6">
                    <div className="flex justify-between items-baseline">
                        <span className="font-sans text-base font-medium text-primary">Total</span>
                        <span className="font-heading text-[2.1rem] font-medium text-primary">
                            {formatPrice(total).split(" / ")[0]}
                        </span>
                    </div>
                    <p className="font-sans text-[11px] text-muted text-right mt-1.5 uppercase tracking-widest">
                        Due at Property
                    </p>
                </div>
            </div>
        </div>
    )
}
