// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getProject } from '@/lib/cosmic'
import { formatDate, getImageUrl } from '@/lib/utils'
import { Badge } from '@/components/Badge'
import { ExternalLink, Calendar, User } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: 'Project Not Found - Nova Works',
    }
  }

  return {
    title: `${project.metadata.name} - Nova Works`,
    description: project.metadata.short_description,
    openGraph: {
      title: project.metadata.name,
      description: project.metadata.short_description,
      images: [
        {
          url: getImageUrl(project.metadata.featured_image.imgix_url, 1200, 630),
          width: 1200,
          height: 630,
          alt: project.metadata.name,
        },
      ],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="container section-padding">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Badge variant="outline">{project.metadata.category.value}</Badge>
            <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
              <Calendar className="w-4 h-4" />
              {formatDate(project.metadata.completion_date)}
            </span>
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
              >
                <ExternalLink className="w-4 h-4" />
                View Live Project
              </a>
            )}
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          <img
            src={getImageUrl(project.metadata.featured_image.imgix_url, 1200, 600)}
            alt={project.metadata.name}
            className="w-full h-auto rounded-lg shadow-lg"
            width={1200}
            height={600}
          />
        </div>

        {/* Technologies */}
        {project.metadata.technologies && project.metadata.technologies.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.metadata.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mb-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: project.metadata.full_description }}
          />
        </div>

        {/* Gallery */}
        {project.metadata.gallery && project.metadata.gallery.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-6">Project Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.metadata.gallery.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src={getImageUrl(image.imgix_url, 800, 600)}
                    alt={`${project.metadata.name} gallery image ${index + 1}`}
                    className="w-full h-auto"
                    width={800}
                    height={600}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}