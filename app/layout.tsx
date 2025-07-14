import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nova Works - Creative Agency Portfolio',
  description: 'Modern creative agency specializing in branding, web design, and development. Explore our portfolio and get in touch.',
  keywords: ['creative agency', 'branding', 'web design', 'development', 'portfolio'],
  authors: [{ name: 'Nova Works' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://novaworks.com',
    title: 'Nova Works - Creative Agency Portfolio',
    description: 'Modern creative agency specializing in branding, web design, and development.',
    siteName: 'Nova Works',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nova Works - Creative Agency Portfolio',
    description: 'Modern creative agency specializing in branding, web design, and development.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-light dark:bg-dark">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}