import { MetadataRoute } from 'next'
import { getBlogPosts, getProjects, getTeamMembers } from '@/lib/cosmic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://novaworks.com'
  
  // Static pages
  const staticPages = [
    '',
    '/projects',
    '/blog', 
    '/team',
    '/contact'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1 : 0.8
  }))

  // Dynamic blog posts
  let blogPages: any[] = []
  try {
    const posts = await getBlogPosts()
    blogPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.modified_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    }))
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  // Dynamic project pages
  let projectPages: any[] = []
  try {
    const projects = await getProjects()
    projectPages = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.modified_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }))
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
  }

  return [...staticPages, ...blogPages, ...projectPages]
}