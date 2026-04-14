import type { Metadata } from "next"
import { Montserrat_Alternates, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const montserrat = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jakarta",
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
      className={cn(montserrat.variable, jakarta.variable)}
    >
      <body className={cn("min-h-full flex flex-col bg-background text-primary antialiased font-sans")}>
        {children}
      </body>
    </html>
  )
}
