import Link from 'next/link';
import { BlogPost } from '@/types';
import Badge from './Badge';

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  const { metadata } = post;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/blog/${post.slug}`} className="block">
        <img
          src={`${metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
          alt={`${metadata.title} - Featured image`}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          width={600}
          height={400}
          loading="lazy"
        />
      </Link>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary">{metadata.category.value}</Badge>
          {metadata.reading_time && (
            <span className="text-sm text-gray-500">{metadata.reading_time} min read</span>
          )}
        </div>
        
        <Link href={`/blog/${post.slug}`} className="block group">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {metadata.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {metadata.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          {metadata.author && (
            <div className="flex items-center">
              <img
                src={`${metadata.author.metadata.photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={`${metadata.author.metadata.name} - Author photo`}
                className="w-8 h-8 rounded-full mr-3"
                width={32}
                height={32}
                loading="lazy"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{metadata.author.metadata.name}</p>
                <p className="text-xs text-gray-500">{metadata.author.metadata.title}</p>
              </div>
            </div>
          )}
          
          <Link
            href={`/blog/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            aria-label={`Read more about ${metadata.title}`}
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}