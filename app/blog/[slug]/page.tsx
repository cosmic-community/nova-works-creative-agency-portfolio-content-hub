// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getBlogPost } from '@/lib/cosmic'
import { formatDate, getImageUrl } from '@/lib/utils'
import Badge from '@/components/Badge'
import { Calendar, Clock, User } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found - Nova Works',
    }
  }

  return {
    title: `${post.metadata.title} - Nova Works`,
    description: post.metadata.excerpt,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.excerpt,
      images: [
        {
          url: getImageUrl(post.metadata.featured_image.imgix_url, 1200, 630),
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container section-padding">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Badge variant="outline">{post.metadata.category.value}</Badge>
            <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
              <Calendar className="w-4 h-4" />
              {formatDate(post.created_at)}
            </span>
            {post.metadata.reading_time && (
              <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4" />
                {post.metadata.reading_time} min read
              </span>
            )}
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {post.metadata.title}
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
            {post.metadata.excerpt}
          </p>
          
          {post.metadata.author && (
            <div className="flex items-center gap-4">
              <img
                src={getImageUrl(post.metadata.author.metadata.photo.imgix_url, 80, 80)}
                alt={post.metadata.author.metadata.name}
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
              <div>
                <p className="font-medium">{post.metadata.author.metadata.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {post.metadata.author.metadata.title}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          <img
            src={getImageUrl(post.metadata.featured_image.imgix_url, 1200, 600)}
            alt={post.metadata.title}
            className="w-full h-auto rounded-lg shadow-lg"
            width={1200}
            height={600}
          />
        </div>

        {/* Content */}
        <div className="mb-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.metadata.content }}
          />
        </div>

        {/* Tags */}
        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}