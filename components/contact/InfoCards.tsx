"use client"

import {
  Check,
  Clock3,
  Copy,
  Mail,
  MapPinned,
  Phone,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

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
  const resetTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  const handleCopy = async (field: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(field)

      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current)
      }

      resetTimeoutRef.current = window.setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current))
        resetTimeoutRef.current = null
      }, 1800)
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
        const isCopied = copiedField === item.title
        const href = isPhone
          ? `tel:${item.value.replace(/\s+/g, "")}`
          : isEmail
            ? `mailto:${item.value}`
            : null

        return (
          <article
            key={item.title}
            className="rounded-2xl border border-primary/5 bg-[#F9F9F9] p-6 flex items-start gap-4 group transition-all hover:bg-white"
          >
            <div className="flex h-8 w-8 md:h-12 md:w-12 mt-8 md:mt-5 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Icon size={20} strokeWidth={1.5} />
            </div>

            <div className="space-y-1.5 flex-1">
              <p className="font-heading text-[10px] uppercase tracking-[0.22em] text-primary/40">
                {item.title}
              </p>

              <div className="flex items-center justify-between gap-3">
                {href ? (
                  <a
                    href={href}
                    className="font-heading text-[0.8rem] md:text-[1rem] font-medium leading-none tracking-tight text-primary transition-colors hover:text-primary/70"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-heading text-[0.8rem] md:text-[1rem] font-medium leading-none tracking-tight text-primary">
                    {item.value}
                  </p>
                )}

                {(isPhone || isEmail) && (
                  <button
                    type="button"
                    onClick={() => handleCopy(item.title, item.value)}
                    className="inline-flex items-center justify-center p-2 rounded-lg text-primary/30 hover:text-primary hover:bg-primary/5 transition-all"
                    aria-label={`Copy ${item.title}`}
                    title={isCopied ? "Copied" : `Copy ${item.title}`}
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>

              <p className="font-sans text-[13px] leading-relaxed text-primary/60">
                {item.detail}
              </p>
            </div>
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
