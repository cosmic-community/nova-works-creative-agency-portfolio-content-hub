import { MetadataRoute } from 'next'
import { createBucketClient } from '@cosmicjs/sdk'

interface CosmicObject {
  slug: string
  modified_at?: string
}

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://novaworks.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  try {
    // Get dynamic pages from Cosmic CMS
    const [projectsResponse, blogPostsResponse] = await Promise.all([
      cosmic.objects.find({ type: 'projects' }).props(['slug', 'modified_at']),
      cosmic.objects.find({ type: 'blog-posts' }).props(['slug', 'modified_at']),
    ])

    // Project pages
    const projectPages = projectsResponse.objects.map((project: CosmicObject) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.modified_at || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Blog post pages
    const blogPages = blogPostsResponse.objects.map((post: CosmicObject) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.modified_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...staticPages, ...projectPages, ...blogPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static pages only if CMS fails
    return staticPages
  }
}