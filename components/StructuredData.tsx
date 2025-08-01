'use client'

import { useEffect } from 'react'

interface OrganizationSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  url: string
  logo: string
  sameAs: string[]
  contactPoint: {
    '@type': string
    telephone: string
    contactType: string
    areaServed: string
    availableLanguage: string
  }
  address: {
    '@type': string
    addressCountry: string
    addressRegion: string
  }
  foundingDate: string
  founder: {
    '@type': string
    name: string
  }
  numberOfEmployees: string
  knowsAbout: string[]
  serviceArea: {
    '@type': string
    name: string
  }
}

interface WebsiteSchema {
  '@context': string
  '@type': string
  name: string
  url: string
  description: string
  publisher: {
    '@type': string
    name: string
  }
  potentialAction: {
    '@type': string
    target: string
    'query-input': string
  }
}

export default function StructuredData() {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://novaworks.com'

    // Organization Schema
    const organizationSchema: OrganizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'NovaWorks',
      description: 'Creative agency specializing in web design, development, branding, and digital solutions',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      sameAs: [
        'https://twitter.com/novaworks',
        'https://linkedin.com/company/novaworks',
        'https://instagram.com/novaworks'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-555-0123',
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: 'English'
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
        addressRegion: 'CA'
      },
      foundingDate: '2020-01-01',
      founder: {
        '@type': 'Person',
        name: 'NovaWorks Team'
      },
      numberOfEmployees: '10-50',
      knowsAbout: [
        'Web Design',
        'Web Development',
        'Branding',
        'UI/UX Design',
        'Digital Marketing',
        'E-commerce Development',
        'Mobile App Development'
      ],
      serviceArea: {
        '@type': 'Place',
        name: 'Worldwide'
      }
    }

    // Website Schema
    const websiteSchema: WebsiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'NovaWorks',
      url: baseUrl,
      description: 'Creative agency specializing in web design, development, branding, and digital solutions',
      publisher: {
        '@type': 'Organization',
        name: 'NovaWorks'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }

    // Add schemas to head
    const organizationScript = document.createElement('script')
    organizationScript.type = 'application/ld+json'
    organizationScript.textContent = JSON.stringify(organizationSchema)
    document.head.appendChild(organizationScript)

    const websiteScript = document.createElement('script')
    websiteScript.type = 'application/ld+json'
    websiteScript.textContent = JSON.stringify(websiteSchema)
    document.head.appendChild(websiteScript)

    // Cleanup function
    return () => {
      document.head.removeChild(organizationScript)
      document.head.removeChild(websiteScript)
    }
  }, [])

  return null
}