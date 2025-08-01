import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function generateSEO({
  title,
  description,
  keywords = [],
  image = '/og-image.jpg',
  url = '',
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = []
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://novaworks.com'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullTitle = title ? `${title} | NovaWorks` : 'NovaWorks - Creative Agency & Digital Solutions'
  const defaultDescription = 'NovaWorks is a creative agency specializing in web design, development, branding, and digital solutions. We create exceptional digital experiences that drive results.'
  const metaDescription = description || defaultDescription
  
  const defaultKeywords = ['creative agency', 'web design', 'web development', 'branding', 'digital solutions', 'UI/UX design']
  const allKeywords = [...defaultKeywords, ...keywords]

  const metadata: Metadata = {
    title: fullTitle,
    description: metaDescription,
    keywords: allKeywords,
    authors: author ? [{ name: author }] : [{ name: 'NovaWorks Team' }],
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
      type,
      locale: 'en_US',
      url: fullUrl,
      siteName: 'NovaWorks',
      title: fullTitle,
      description: metaDescription,
      images: [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title || 'NovaWorks - Creative Agency',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [image.startsWith('http') ? image : `${baseUrl}${image}`],
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
    },
  }

  // Add article-specific metadata
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : ['NovaWorks Team'],
      section,
      tags,
    }
  }

  return metadata
}

export function generateBlogPostSEO({
  title,
  excerpt,
  featuredImage,
  slug,
  author,
  publishedAt,
  modifiedAt,
  tags = [],
  category
}: {
  title: string
  excerpt: string
  featuredImage?: string
  slug: string
  author?: string
  publishedAt?: string
  modifiedAt?: string
  tags?: string[]
  category?: string
}): Metadata {
  return generateSEO({
    title,
    description: excerpt,
    keywords: tags,
    image: featuredImage,
    url: `/blog/${slug}`,
    type: 'article',
    publishedTime: publishedAt,
    modifiedTime: modifiedAt,
    author,
    section: category,
    tags
  })
}

export function generateProjectSEO({
  title,
  description,
  featuredImage,
  slug,
  technologies = [],
  category,
  client
}: {
  title: string
  description: string
  featuredImage?: string
  slug: string
  technologies?: string[]
  category?: string
  client?: string
}): Metadata {
  const keywords = [...technologies, category, 'project', 'case study', client].filter(Boolean) as string[]
  
  return generateSEO({
    title,
    description,
    keywords,
    image: featuredImage,
    url: `/projects/${slug}`,
    type: 'article'
  })
}