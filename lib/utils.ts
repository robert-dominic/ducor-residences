import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a nightly rate as USD.
 * e.g. formatPrice(175) → "$175 / night"
 */
export function formatPrice(price: number): string {
  return `$${price.toLocaleString("en-US")} / night`
}

/**
 * Calculate the number of nights between two date strings.
 * Returns 0 if check-out is not after check-in.
 */
export function calcNights(checkIn: string, checkOut: string): number {
  const msPerDay = 1000 * 60 * 60 * 24
  const start = new Date(checkIn).getTime()
  const end = new Date(checkOut).getTime()
  const nights = Math.floor((end - start) / msPerDay)
  return nights > 0 ? nights : 0
}
