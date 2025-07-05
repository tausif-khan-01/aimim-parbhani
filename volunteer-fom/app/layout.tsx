import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AIMIM Parbhani - Volunteer Registration",
  description:
    "Join AIMIM Parbhani as a volunteer and help strengthen our community across 9 Talukas in Parbhani district.",
  keywords: "AIMIM, Parbhani, volunteer, registration, community, politics, Maharashtra",
  authors: [{ name: "AIMIM Parbhani" }],
  openGraph: {
    title: "AIMIM Parbhani - Volunteer Registration",
    description: "Join AIMIM Parbhani as a volunteer and help strengthen our community.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIMIM Parbhani - Volunteer Registration",
    description: "Join AIMIM Parbhani as a volunteer and help strengthen our community.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
