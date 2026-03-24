import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ducor Residences — Luxury Guest House in Monrovia",
  description:
    "Where Monrovia's story meets modern comfort. Experience luxury accommodation at Ducor Residences, nestled in the heart of Monrovia, Liberia.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(cormorant.variable, inter.variable)}
    >
      <body className={cn("min-h-full flex flex-col bg-background text-primary antialiased font-sans")}>
        {children}
      </body>
    </html>
  )
}
