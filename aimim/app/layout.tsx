import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Analytics from "../components/Analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIMIM Parbhani - All India Majlis-e-Ittehadul Muslimeen",
  description: "Official website of AIMIM Parbhani. Join the movement for justice, equality, and progress. All India Majlis-e-Ittehadul Muslimeen working for community development and social justice in Parbhani.",
  keywords: [
    "AIMIM",
    "AIMIM Parbhani", 
    "All India Majlis-e-Ittehadul Muslimeen",
    "Parbhani",
    "Maharashtra",
    "Political Party",
    "Social Justice",
    "Community Development",
    "Volunteer",
    "Unity",
    "Progress",
    "Justice",
    "Asaduddin Owaisi",
    "Muslim Community",
    "Secular Politics"
  ],
  authors: [{ name: "AIMIM Parbhani" }],
  creator: "AIMIM Parbhani",
  publisher: "AIMIM Parbhani",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mimparbhani.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AIMIM Parbhani - All India Majlis-e-Ittehadul Muslimeen",
    description: "Join AIMIM Parbhani in our mission for justice, equality, and progress. Official website of All India Majlis-e-Ittehadul Muslimeen Parbhani unit.",
    url: "https://mimparbhani.com",
    siteName: "AIMIM Parbhani",
    images: [
      {
        url: "/aimim-rally.jpg",
        width: 1200,
        height: 630,
        alt: "AIMIM Parbhani Rally - All India Majlis-e-Ittehadul Muslimeen",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIMIM Parbhani - All India Majlis-e-Ittehadul Muslimeen",
    description: "Join AIMIM Parbhani in our mission for justice, equality, and progress.",
    images: ["/aimim-rally.jpg"],
    creator: "@AIMIMParbhani",
    site: "@AIMIMParbhani",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Additional SEO and performance optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#16a34a" />
        <link rel="canonical" href="https://mimparbhani.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AIMIM Parbhani" />
        
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PoliticalParty",
              "name": "AIMIM Parbhani",
              "description": "All India Majlis-e-Ittehadul Muslimeen Parbhani unit working for justice, equality, and progress",
              "url": "https://mimparbhani.com",
              "logo": "https://mimparbhani.com/aimim-logo.png",
              "sameAs": [
                "https://twitter.com/AIMIMParbhani",
                "https://facebook.com/AIMIMParbhani",
                "https://instagram.com/AIMIMParbhani"
              ],
              "areaServed": {
                "@type": "City",
                "name": "Parbhani",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
