"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { heroHighlights } from "@/lib/home"

const ease = [0.22, 1, 0.36, 1] as const

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 24 : -24,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -24 : 24,
  }),
}

export default function HeroHighlights() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)")

    const syncViewport = () => {
      setIsMobile(mediaQuery.matches)
    }

    syncViewport()
    mediaQuery.addEventListener("change", syncViewport)

    return () => {
      mediaQuery.removeEventListener("change", syncViewport)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setActiveIndex((current) => (current + 1) % heroHighlights.length)
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  const activeItem = heroHighlights[activeIndex]
  const ActiveIcon = activeItem.icon

  const showPrevious = () => {
    setDirection(-1)
    setActiveIndex((current) => (current - 1 + heroHighlights.length) % heroHighlights.length)
  }

  const showNext = () => {
    setDirection(1)
    setActiveIndex((current) => (current + 1) % heroHighlights.length)
  }

  const showItem = (index: number) => {
    if (index === activeIndex) return
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  return (
    <div className="w-full rounded-[1.15rem] border border-border bg-background/88 p-4 text-left shadow-[0_18px_36px_rgba(26,26,26,0.06)] backdrop-blur-sm sm:rounded-2xl sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5 sm:gap-4">
        <div>
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-secondary">
            Why Ducor
          </p>
          <p className="mt-1 font-sans text-[11px] text-muted sm:text-[12px]">
            A few reasons guests stay longer.
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={showPrevious}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border text-primary/65 transition-colors hover:border-accent hover:text-accent"
            aria-label="Show previous highlight"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={showNext}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border text-primary/65 transition-colors hover:border-accent hover:text-accent"
            aria-label="Show next highlight"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeItem.label}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.42, ease }}
          className="min-h-[11rem] space-y-3.5 sm:min-h-[12.5rem] sm:space-y-4"
          {...(isMobile
            ? {
                drag: "x" as const,
                dragConstraints: { left: 0, right: 0 },
                dragDirectionLock: true,
                dragElastic: 0.08,
                style: { touchAction: "pan-y" },
                onDragEnd: (_: unknown, info: { offset: { x: number; y: number } }) => {
                  if (Math.abs(info.offset.x) < Math.abs(info.offset.y)) return
                  if (info.offset.x <= -40) showNext()
                  if (info.offset.x >= 40) showPrevious()
                },
              }
            : {})}
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-accent sm:h-11 sm:w-11 sm:rounded-xl">
              <ActiveIcon size={17} strokeWidth={1.75} />
            </div>
            <p className="font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-muted sm:text-[10px] sm:tracking-[0.24em]">
              {activeItem.label}
            </p>
          </div>

          <h2 className="font-heading text-[1.4rem] font-medium leading-[1.05] text-primary sm:text-[1.85rem]">
            {activeItem.title}
          </h2>

          <p className="font-sans text-[13px] leading-6 text-muted sm:text-[15px] sm:leading-7">
            {activeItem.description}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5 sm:gap-4">
        <div className="flex items-center gap-2">
          {heroHighlights.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => showItem(index)}
              aria-label={`Show ${item.label}`}
              className="group inline-flex cursor-pointer items-center justify-center"
            >
              <span
                className={
                  index === activeIndex
                    ? "block h-1.5 w-8 rounded-full bg-accent transition-all duration-300"
                    : "block h-1.5 w-1.5 rounded-full bg-border transition-all duration-300 group-hover:bg-secondary/60"
                }
              />
            </button>
          ))}
        </div>

        <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted md:hidden">
          Swipe
        </p>
      </div>
    </div>
  )
}
