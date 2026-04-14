"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { heroHighlights } from "@/lib/home"

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 28 : -28,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -28 : 28,
  }),
}

export default function HeroHighlights() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setActiveIndex((current) => (current + 1) % heroHighlights.length)
    }, 15000)

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
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md md:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/90">
          Why Ducor?
        </p>
        <div className="flex items-center gap-2">
          {heroHighlights.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => showItem(index)}
              aria-label={`Show ${item.label}`}
              className="group inline-flex items-center justify-center cursor-pointer"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${activeIndex === index
                  ? 'w-8 bg-white'
                  : 'w-1.5 bg-white/30 group-hover:bg-white/50'
                  }`}
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.label}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 h-[180px] overflow-hidden"
          {...(isMobile ? {
            drag: 'x' as const,
            dragConstraints: { left: 0, right: 0 },
            dragDirectionLock: true,
            dragElastic: 0.08,
            style: { touchAction: 'pan-y' },
            onDragEnd: (_: unknown, info: { offset: { x: number; y: number } }) => {
              if (Math.abs(info.offset.x) < Math.abs(info.offset.y)) return
              if (info.offset.x <= -40) showNext()
              else if (info.offset.x >= 40) showPrevious()
            },
          } : {})}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white">
              <ActiveIcon size={18} strokeWidth={1.5} />
            </div>
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-white/50">
              {activeItem.label}
            </p>
          </div>
          <h2 className="font-heading text-[1.2rem] leading-tight text-white md:text-[1.6rem]">
            {activeItem.title}
          </h2>
          <p className="font-sans text-[12px] leading-7 text-white/80 md:text-[15px]">
            {activeItem.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
