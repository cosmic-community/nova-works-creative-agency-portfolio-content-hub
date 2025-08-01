// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { getBlogPost } from '@/lib/cosmic'
import { formatDate, getImageUrl } from '@/lib/utils'
import { generateSEO, generateBlogPostSchema } from '@/lib/seo'
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

  return generateSEO({
    title: post.metadata.title,
    description: post.metadata.excerpt,
    keywords: [
      ...post.metadata.tags || [],
      post.metadata.category.value.toLowerCase(),
      'blog',
      'insights',
      'creative agency'
    ],
    canonical: `/blog/${post.slug}`,
    ogImage: getImageUrl(post.metadata.featured_image.imgix_url, 1200, 630),
    ogType: 'article',
    publishedTime: post.created_at,
    modifiedTime: post.modified_at,
    author: post.metadata.author?.metadata?.name,
    section: post.metadata.category.value,
    tags: post.metadata.tags
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const blogPostSchema = generateBlogPostSchema(post)

  return (
    <>
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostSchema)
        }}
      />
      
      <article className="container section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="outline">{post.metadata.category.value}</Badge>
              <time 
                className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400"
                dateTime={post.created_at}
              >
                <Calendar className="w-4 h-4" />
                {formatDate(post.created_at)}
              </time>
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
          </header>

          {/* Featured Image */}
          <figure className="mb-12">
            <img
              src={getImageUrl(post.metadata.featured_image.imgix_url, 1200, 600)}
              alt={post.metadata.title}
              className="w-full h-auto rounded-lg shadow-lg"
              width={1200}
              height={600}
            />
          </figure>

          {/* Content */}
          <div className="mb-12">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600 prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: post.metadata.content }}
            />
          </div>

          {/* Tags */}
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <footer className="mb-12">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </footer>
          )}
        </div>
      </article>
    </>
  )
}