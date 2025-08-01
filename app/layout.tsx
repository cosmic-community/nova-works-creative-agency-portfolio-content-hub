import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { StructuredData } from '@/components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NovaWorks - Creative Agency & Digital Solutions',
  description: 'NovaWorks is a creative agency specializing in web design, development, branding, and digital solutions. We create exceptional digital experiences that drive results.',
  keywords: ['creative agency', 'web design', 'web development', 'branding', 'digital solutions', 'UI/UX design'],
  authors: [{ name: 'NovaWorks Team' }],
  creator: 'NovaWorks',
  publisher: 'NovaWorks',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://novaworks.com',
    siteName: 'NovaWorks',
    title: 'NovaWorks - Creative Agency & Digital Solutions',
    description: 'NovaWorks is a creative agency specializing in web design, development, branding, and digital solutions. We create exceptional digital experiences that drive results.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NovaWorks - Creative Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NovaWorks - Creative Agency & Digital Solutions',
    description: 'NovaWorks is a creative agency specializing in web design, development, branding, and digital solutions.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://novaworks.com'),
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}