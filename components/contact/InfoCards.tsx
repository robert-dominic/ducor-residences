"use client"

import {
  Clock3,
  Copy,
  Mail,
  MapPinned,
  Phone,
} from "lucide-react"
import { useState } from "react"

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
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = async (field: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(field)
      window.setTimeout(() => setCopiedField((current) => (current === field ? null : current)), 1800)
    } catch {
      setCopiedField(null)
    }
  }

  return (
    <Reveal className="space-y-5" delay={0.1}>
      {CONTACT_ITEMS.map((item) => {
        const Icon = item.icon
        const isPhone = item.title === "Phone"
        const isEmail = item.title === "Email"
        const href = isPhone
          ? `tel:${item.value.replace(/\s+/g, "")}`
          : isEmail
            ? `mailto:${item.value}`
            : null

        return (
          <article
            key={item.title}
            className="rounded-2xl border border-border bg-surface p-6 shadow-[0_16px_36px_rgba(26,26,26,0.05)] sm:p-7"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <p className="font-sans text-xs uppercase tracking-[0.24em] text-muted">
                {item.title}
              </p>
            </div>

            {href ? (
              <div className="flex items-start justify-between gap-3">
                <a
                  href={href}
                  className="font-heading text-[1.65rem] font-medium text-primary transition-colors hover:text-accent"
                >
                  {item.value}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(item.title, item.value)}
                  className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-primary/70 transition-colors hover:border-accent hover:text-accent"
                  aria-label={`Copy ${item.title}`}
                  title={copiedField === item.title ? "Copied" : `Copy ${item.title}`}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <h2 className="font-heading text-[1.65rem] font-medium text-primary">
                {item.value}
              </h2>
            )}
            <p className="mt-3 font-sans text-[15px] leading-7 text-muted">
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
          className="rounded-2xl border border-border bg-surface p-6 shadow-[0_16px_36px_rgba(26,26,26,0.05)] sm:p-7"
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
