// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { getProject } from '@/lib/cosmic'
import { formatDate, getImageUrl } from '@/lib/utils'
import { generateSEO, generateProjectSchema } from '@/lib/seo'
import Badge from '@/components/Badge'
import { ExternalLink, Calendar, User } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: 'Project Not Found - Nova Works',
    }
  }

  return generateSEO({
    title: project.metadata.name,
    description: project.metadata.short_description,
    keywords: [
      ...project.metadata.technologies || [],
      project.metadata.category.value.toLowerCase(),
      'portfolio',
      'case study',
      project.metadata.client.toLowerCase()
    ],
    canonical: `/projects/${project.slug}`,
    ogImage: getImageUrl(project.metadata.featured_image.imgix_url, 1200, 630),
    ogType: 'article',
    publishedTime: project.metadata.completion_date,
    modifiedTime: project.modified_at,
    section: project.metadata.category.value,
    tags: project.metadata.technologies
  })
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const projectSchema = generateProjectSchema(project)

  return (
    <>
      <Script
        id="project-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema)
        }}
      />
      
      <article className="container section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="outline">{project.metadata.category.value}</Badge>
              <time 
                className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400"
                dateTime={project.metadata.completion_date}
              >
                <Calendar className="w-4 h-4" />
                {formatDate(project.metadata.completion_date)}
              </time>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {project.metadata.name}
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
              {project.metadata.short_description}
            </p>
            
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                <User className="w-4 h-4" />
                Client: {project.metadata.client}
              </span>
              
              {project.metadata.project_url && (
                <a
                  href={project.metadata.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                  aria-label={`View live project: ${project.metadata.name}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Project
                </a>
              )}
            </div>
          </header>

          {/* Featured Image */}
          <figure className="mb-12">
            <img
              src={getImageUrl(project.metadata.featured_image.imgix_url, 1200, 600)}
              alt={`${project.metadata.name} project showcase`}
              className="w-full h-auto rounded-lg shadow-lg"
              width={1200}
              height={600}
            />
          </figure>

          {/* Technologies */}
          {project.metadata.technologies && project.metadata.technologies.length > 0 && (
            <section className="mb-12">
              <h2 className="text-lg font-semibold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.metadata.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {/* Content */}
          <section className="mb-12">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600 prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: project.metadata.full_description }}
            />
          </section>

          {/* Gallery */}
          {project.metadata.gallery && project.metadata.gallery.length > 0 && (
            <section className="mb-12">
              <h2 className="text-lg font-semibold mb-6">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.metadata.gallery.map((image, index) => (
                  <figure key={index} className="rounded-lg overflow-hidden shadow-md">
                    <img
                      src={getImageUrl(image.imgix_url, 800, 600)}
                      alt={`${project.metadata.name} gallery image ${index + 1}`}
                      className="w-full h-auto"
                      width={800}
                      height={600}
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  )
}