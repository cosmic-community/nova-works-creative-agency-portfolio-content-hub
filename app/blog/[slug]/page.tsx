// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { createBucketClient } from '@cosmicjs/sdk'
import { BlogPost, TeamMember } from '@/types'
import { generateBlogPostSEO } from '@/lib/seo'
import type { Metadata } from 'next'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { object } = await cosmic.objects.findOne({
      type: 'blog-posts',
      slug,
    }).props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at']).depth(1)
    
    return object as BlogPost
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | NovaWorks',
      description: 'The requested blog post could not be found.',
      robots: { index: false, follow: false }
    }
  }

  const author = post.metadata?.author as TeamMember
  const featuredImage = post.metadata?.featured_image?.imgix_url
  
  return generateBlogPostSEO({
    title: post.metadata?.title || post.title,
    excerpt: post.metadata?.excerpt || '',
    featuredImage: featuredImage ? `${featuredImage}?w=1200&h=630&fit=crop&auto=format,compress` : undefined,
    slug: post.slug,
    author: author?.metadata?.name || author?.title,
    publishedAt: post.created_at,
    modifiedAt: post.modified_at,
    tags: post.metadata?.tags || [],
    category: post.metadata?.category?.value || post.metadata?.category
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const author = post.metadata?.author as TeamMember
  const featuredImage = post.metadata?.featured_image
  const publishDate = new Date(post.created_at || '').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Generate Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.metadata?.title || post.title,
    description: post.metadata?.excerpt,
    image: featuredImage?.imgix_url ? `${featuredImage.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress` : undefined,
    datePublished: post.created_at,
    dateModified: post.modified_at || post.created_at,
    author: {
      '@type': 'Person',
      name: author?.metadata?.name || author?.title || 'NovaWorks Team',
      url: author?.metadata?.portfolio || author?.metadata?.linkedin
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
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://novaworks.com'}/blog/${post.slug}`
    },
    keywords: post.metadata?.tags?.join(', '),
    articleSection: post.metadata?.category?.value || post.metadata?.category,
    wordCount: post.metadata?.content?.split(' ').length || 0,
    timeRequired: `PT${post.metadata?.reading_time || 5}M`
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <article>
          <header className="mb-8">
            {post.metadata?.category && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
                  {post.metadata.category.value || post.metadata.category}
                </span>
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {post.metadata?.title || post.title}
            </h1>
            
            {post.metadata?.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {post.metadata.excerpt}
              </p>
            )}
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              {author && (
                <div className="flex items-center space-x-2">
                  {author.metadata?.photo && (
                    <img
                      src={`${author.metadata.photo.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                      alt={author.metadata.name || author.title}
                      className="w-6 h-6 rounded-full"
                      width={24}
                      height={24}
                    />
                  )}
                  <span>{author.metadata?.name || author.title}</span>
                </div>
              )}
              <span>•</span>
              <time dateTime={post.created_at}>{publishDate}</time>
              {post.metadata?.reading_time && (
                <>
                  <span>•</span>
                  <span>{post.metadata.reading_time} min read</span>
                </>
              )}
            </div>
          </header>

          {featuredImage && (
            <div className="mb-8">
              <img
                src={`${featuredImage.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={post.metadata?.title || post.title}
                className="w-full h-96 object-cover rounded-lg"
                width={1200}
                height={600}
              />
            </div>
          )}

          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.metadata?.content || '' }}
          />

          {post.metadata?.tags && post.metadata.tags.length > 0 && (
            <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full dark:bg-gray-700 dark:text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </article>
      </div>
    </>
  )
}