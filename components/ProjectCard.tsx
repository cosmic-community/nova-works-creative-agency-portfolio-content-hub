import Link from 'next/link';
import { Project } from '@/types';
import Badge from './Badge';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { metadata } = project;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/projects/${project.slug}`}>
        <img
          src={`${metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
          alt={metadata.name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="primary">{metadata.category.value}</Badge>
          {metadata.featured && (
            <Badge variant="success">Featured</Badge>
          )}
        </div>
        
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {metadata.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {metadata.short_description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Client: {metadata.client}
          </span>
          
          <Link
            href={`/projects/${project.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            View Project →
          </Link>
        </div>
        
        {metadata.technologies && metadata.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {metadata.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" size="sm">
                {tech}
              </Badge>
            ))}
            {metadata.technologies.length > 3 && (
              <Badge variant="outline" size="sm">
                +{metadata.technologies.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </div>
    </article>
  );
}