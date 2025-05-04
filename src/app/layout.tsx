import type { Metadata } from "next"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Lexend } from "next/font/google"
import RootProvider from "@/provider/root-provider"
import Block from "./components/Block"

const lexend = Lexend({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GN Farm",
  description: "GN Farm - Nông trại thông minh",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          lexend.className,
          "min-h-screen bg-background antialiased"
        )}
      >
        <RootProvider>
          <Block>{children}</Block>
        </RootProvider>
      </body>
    </html>
  )
}
