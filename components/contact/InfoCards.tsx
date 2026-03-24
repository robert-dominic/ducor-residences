import {
  Clock3,
  Mail,
  MapPinned,
  Phone,
} from "lucide-react"

import Reveal from "@/components/shared/Reveal"
import { Skeleton } from "@/components/ui/skeleton"

const CONTACT_ITEMS = [
  {
    title: "Address",
    value: "Monrovia, Liberia",
    detail: "Ducor Hill area with quick access to central business and waterfront routes.",
    icon: MapPinned,
  },
  {
    title: "Phone",
    value: "+231 77 000 0000",
    detail: "Call reception for reservations, guest support, and transport coordination.",
    icon: Phone,
  },
  {
    title: "Email",
    value: "stay@ducorresidences.com",
    detail: "Send booking inquiries, partnership requests, or concierge questions.",
    icon: Mail,
  },
  {
    title: "Reception Hours",
    value: "24hr",
    detail: "Our front desk is available around the clock for arriving guests.",
    icon: Clock3,
  },
] as const

export default function InfoCards() {
  return (
    <Reveal className="space-y-5" delay={0.1}>
      {CONTACT_ITEMS.map((item) => {
        const Icon = item.icon

        return (
          <article
            key={item.title}
            className="border border-border bg-surface p-6 sm:p-7"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center border border-border bg-background">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <p className="font-sans text-xs uppercase tracking-[0.24em] text-muted">
                {item.title}
              </p>
            </div>

            <h2 className="font-heading text-2xl font-semibold text-primary">
              {item.value}
            </h2>
            <p className="mt-3 font-sans text-sm leading-7 text-muted">
              {item.detail}
            </p>
          </article>
        )
      })}
    </Reveal>
  )
}

export function InfoCardsSkeleton() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="border border-border bg-surface p-6 sm:p-7"
        >
          <div className="mb-5 flex items-center gap-3">
            <Skeleton className="h-11 w-11 bg-background" />
            <Skeleton className="h-4 w-24 bg-background" />
          </div>
          <Skeleton className="h-8 w-2/3 bg-background" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full bg-background" />
            <Skeleton className="h-4 w-5/6 bg-background" />
          </div>
        </div>
      ))}
    </div>
  )
}
