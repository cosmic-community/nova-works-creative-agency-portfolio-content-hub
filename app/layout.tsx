import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://novaworks.com'),
  title: {
    default: 'Nova Works - Creative Digital Agency | Web Design & Development',
    template: '%s | Nova Works'
  },
  description: 'Nova Works is a premier creative digital agency specializing in brand identity, web design, and full-stack development. Transform your digital presence with our expert team.',
  keywords: [
    'creative agency',
    'digital agency', 
    'web design',
    'web development',
    'brand identity',
    'UI/UX design',
    'full-stack development',
    'React development',
    'Next.js development',
    'responsive design',
    'e-commerce development',
    'mobile app design',
    'San Francisco',
    'California'
  ],
  authors: [{ name: 'Nova Works', url: 'https://novaworks.com' }],
  creator: 'Nova Works',
  publisher: 'Nova Works',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://novaworks.com',
    title: 'Nova Works - Creative Digital Agency | Web Design & Development',
    description: 'Transform your digital presence with Nova Works. Expert web design, development, and brand identity services.',
    siteName: 'Nova Works',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nova Works - Creative Digital Agency'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nova Works - Creative Digital Agency | Web Design & Development',
    description: 'Transform your digital presence with Nova Works. Expert web design, development, and brand identity services.',
    images: ['/og-image.jpg'],
    creator: '@novaworks'
  },
  alternates: {
    canonical: 'https://novaworks.com'
  },
  verification: {
    google: 'your-google-verification-code',
    other: {
      'facebook-domain-verification': 'your-facebook-verification-code'
    }
  }
}

export default function RootLayout({
  children,
}: {
  childreN: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2D5533" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <StructuredData />
        <ThemeProvider>
          <div className="min-h-screen bg-light dark:bg-dark">
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
            >
              Skip to main content
            </a>
            <Header />
            <main id="main-content" role="main">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}