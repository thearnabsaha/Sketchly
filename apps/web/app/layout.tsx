"use client"
import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import Navbar from "@/components/Navbar"
import { usePathname } from "next/navigation"
const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname=usePathname()
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>
          {!(pathname==="/signup"||pathname==="/signin"|| pathname.startsWith("/room/"))&&<Navbar/>}
          {children}
          </Providers>
      </body>
    </html>
  )
}
