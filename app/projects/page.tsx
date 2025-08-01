import ProjectCard from '@/components/ProjectCard'
import { getProjects } from '@/lib/cosmic'
import { generateSEO } from '@/lib/seo'
import { Project } from '@/types'

export const metadata = generateSEO({
  title: 'Portfolio - Creative Projects by Nova Works',
  description: 'Explore our portfolio of creative projects including brand identity, web design, mobile apps, and full-stack development work for clients worldwide.',
  keywords: [
    'creative portfolio',
    'web design portfolio',
    'brand identity projects', 
    'development case studies',
    'UI/UX projects',
    'mobile app design',
    'e-commerce development',
    'creative agency work',
    'design showcase'
  ],
  canonical: '/projects'
})

export default async function ProjectsPage() {
  const projects = await getProjects()

  if (!projects || projects.length === 0) {
    return (
      <div className="container section-padding">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            No projects available at the moment.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container section-padding">
      <header className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          Our <span className="text-gradient">Projects</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Explore our portfolio of creative projects that showcase our expertise in branding, 
          web design, and development.
        </p>
      </header>

      <section aria-label="Project portfolio">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}