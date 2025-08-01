import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function generateSEO(config: SEOConfig): Metadata {
  const baseUrl = 'https://novaworks.com'
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = '/og-image.jpg',
    ogType = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = []
  } = config

  const fullTitle = title.includes('Nova Works') ? title : `${title} | Nova Works`
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: author ? [{ name: author }] : [{ name: 'Nova Works' }],
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      url: canonicalUrl,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      publishedTime,
      modifiedTime,
      authors: author ? [author] : ['Nova Works'],
      section,
      tags
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`],
      creator: '@novaworks'
    },
    alternates: {
      canonical: canonicalUrl
    }
  }
}

export function generateBlogPostSchema(post: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.metadata.title,
    "description": post.metadata.excerpt,
    "image": post.metadata.featured_image.imgix_url,
    "author": {
      "@type": "Person",
      "name": post.metadata.author?.metadata?.name || "Nova Works Team",
      "url": post.metadata.author?.metadata?.portfolio || "https://novaworks.com/team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nova Works",
      "logo": {
        "@type": "ImageObject",
        "url": "https://novaworks.com/logo.png"
      }
    },
    "datePublished": post.created_at,
    "dateModified": post.modified_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://novaworks.com/blog/${post.slug}`
    },
    "articleSection": post.metadata.category.value,
    "keywords": post.metadata.tags?.join(', ') || '',
    "wordCount": post.metadata.content?.replace(/<[^>]*>/g, '').split(' ').length || 0,
    "timeRequired": post.metadata.reading_time ? `PT${post.metadata.reading_time}M` : undefined
  }
}

export function generateProjectSchema(project: any) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.metadata.name,
    "description": project.metadata.short_description,
    "image": project.metadata.featured_image.imgix_url,
    "creator": {
      "@type": "Organization",
      "name": "Nova Works"
    },
    "dateCreated": project.metadata.completion_date,
    "url": `https://novaworks.com/projects/${project.slug}`,
    "about": project.metadata.category.value,
    "keywords": project.metadata.technologies?.join(', ') || '',
    "client": {
      "@type": "Organization",
      "name": project.metadata.client
    }
  }
}