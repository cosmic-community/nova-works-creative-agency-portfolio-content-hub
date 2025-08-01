// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { createBucketClient } from '@cosmicjs/sdk'
import { Project } from '@/types'
import { generateProjectSEO } from '@/lib/seo'
import type { Metadata } from 'next'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const { object } = await cosmic.objects.findOne({
      type: 'projects',
      slug,
    }).props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at']).depth(1)
    
    return object as Project
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  
  if (!project) {
    return {
      title: 'Project Not Found | NovaWorks',
      description: 'The requested project could not be found.',
      robots: { index: false, follow: false }
    }
  }

  const featuredImage = project.metadata?.featured_image?.imgix_url
  
  return generateProjectSEO({
    title: project.metadata?.name || project.title,
    description: project.metadata?.short_description || '',
    featuredImage: featuredImage ? `${featuredImage}?w=1200&h=630&fit=crop&auto=format,compress` : undefined,
    slug: project.slug,
    technologies: project.metadata?.technologies || [],
    category: project.metadata?.category?.value || project.metadata?.category,
    client: project.metadata?.client
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const featuredImage = project.metadata?.featured_image
  const gallery = project.metadata?.gallery || []
  const completionDate = project.metadata?.completion_date 
    ? new Date(project.metadata.completion_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  // Generate CreativeWork Schema
  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.metadata?.name || project.title,
    description: project.metadata?.short_description,
    image: featuredImage?.imgix_url ? `${featuredImage.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress` : undefined,
    dateCreated: project.metadata?.completion_date,
    dateModified: project.modified_at || project.created_at,
    creator: {
      '@type': 'Organization',
      name: 'NovaWorks'
    },
    publisher: {
      '@type': 'Organization',
      name: 'NovaWorks',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://novaworks.com'}/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://novaworks.com'}/projects/${project.slug}`
    },
    keywords: project.metadata?.technologies?.join(', '),
    genre: project.metadata?.category?.value || project.metadata?.category,
    client: project.metadata?.client,
    url: project.metadata?.project_url
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <article>
          <header className="mb-12">
            {project.metadata?.category && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900 dark:text-purple-200">
                  {project.metadata.category.value || project.metadata.category}
                </span>
              </div>
            )}
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {project.metadata?.name || project.title}
            </h1>
            
            {project.metadata?.client && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                Client: <span className="font-semibold">{project.metadata.client}</span>
              </p>
            )}
            
            {project.metadata?.short_description && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {project.metadata.short_description}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              {completionDate && (
                <div className="flex items-center space-x-1">
                  <span>Completed:</span>
                  <time dateTime={project.metadata?.completion_date}>{completionDate}</time>
                </div>
              )}
              
              {project.metadata?.project_url && (
                <a
                  href={project.metadata.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View Live Project →
                </a>
              )}
            </div>
          </header>

          {featuredImage && (
            <div className="mb-12">
              <img
                src={`${featuredImage.imgix_url}?w=1200&h=700&fit=crop&auto=format,compress`}
                alt={project.metadata?.name || project.title}
                className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-lg"
                width={1200}
                height={700}
              />
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              {project.metadata?.full_description && (
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none mb-12"
                  dangerouslySetInnerHTML={{ __html: project.metadata.full_description }}
                />
              )}

              {gallery.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gallery.map((image: any, index: number) => (
                      <img
                        key={index}
                        src={`${image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                        alt={`${project.metadata?.name || project.title} - Image ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                        width={600}
                        height={400}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="md:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Details</h3>
                
                {project.metadata?.client && (
                  <div className="mb-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Client</dt>
                    <dd className="text-gray-900 dark:text-white">{project.metadata.client}</dd>
                  </div>
                )}
                
                {project.metadata?.category && (
                  <div className="mb-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</dt>
                    <dd className="text-gray-900 dark:text-white">
                      {project.metadata.category.value || project.metadata.category}
                    </dd>
                  </div>
                )}
                
                {completionDate && (
                  <div className="mb-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</dt>
                    <dd className="text-gray-900 dark:text-white">{completionDate}</dd>
                  </div>
                )}
                
                {project.metadata?.technologies && project.metadata.technologies.length > 0 && (
                  <div className="mb-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Technologies</dt>
                    <dd className="flex flex-wrap gap-2">
                      {project.metadata.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="inline-block px-2 py-1 text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded border"
                        >
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                
                {project.metadata?.project_url && (
                  <div className="mt-6">
                    <a
                      href={project.metadata.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center block"
                    >
                      View Live Project
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}