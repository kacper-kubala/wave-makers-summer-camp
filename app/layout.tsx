import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { OptimizedFonts } from "@/components/optimized-fonts"

export const metadata = {
  title: "WaveMakers Summer Camp 2026 - Wakacyjna Przygoda Pełna Ruchu",
  description:
    "Obóz sportowo-rekreacyjny dla dzieci w wieku 8-16 lat. Zajęcia sportowe, zabawy wodne, atrakcje rekreacyjne i wiele więcej nad jeziorem w sercu Kaszub!",
  keywords: ["obóz letni", "obóz sportowy", "wakacje dla dzieci", "Kaszuby", "sporty wodne", "aktywne wakacje"],
  authors: [{ name: "WaveMakers Sports Academy" }],
  openGraph: {
    title: "WaveMakers Summer Camp 2026 - Wakacyjna Przygoda Pełna Ruchu",
    description:
      "Obóz sportowo-rekreacyjny dla dzieci w wieku 8-16 lat. Zajęcia sportowe, zabawy wodne, atrakcje rekreacyjne i wiele więcej!",
    url: "https://wave-makers.pl",
    siteName: "WaveMakers Sports Academy",
    images: [
      {
        url: "/images/summer-camp-hero.png",
        width: 1200,
        height: 630,
        alt: "WaveMakers Summer Camp 2026",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  // Dodane metadane dla Core Web Vitals
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: "#3B82F6",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.png" }],
    apple: [{ url: "/favicon.png" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        {/* Preload kluczowych zasobów */}
        <link rel="preload" href="/images/logo-white.png" as="image" />
        <link rel="preload" href="/images/hero-background.png" as="image" />
        <link rel="preload" href="/images/logo-color.png" as="image" />

        {/* Priority Hints dla przeglądarek, które je obsługują */}
        <link rel="preload" href="/images/logo-white.png" as="image" fetchPriority="high" />
        <link rel="preload" href="/images/hero-background.png" as="image" fetchPriority="high" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body suppressHydrationWarning>
        <OptimizedFonts>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </OptimizedFonts>
      </body>
    </html>
  )
}