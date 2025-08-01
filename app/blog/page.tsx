import PostCard from '@/components/PostCard'
import { getBlogPosts } from '@/lib/cosmic'
import { generateSEO } from '@/lib/seo'
import { BlogPost } from '@/types'

export const metadata = generateSEO({
  title: 'Blog - Insights & Trends from Nova Works',
  description: 'Discover the latest insights, trends, and expert tips from our creative team on web design, development, branding, and digital strategy.',
  keywords: [
    'design blog',
    'web development blog', 
    'creative insights',
    'design trends',
    'development tips',
    'digital strategy',
    'UI/UX insights',
    'brand identity',
    'creative agency blog'
  ],
  canonical: '/blog'
})

export default async function BlogPage() {
  const posts = await getBlogPosts()

  if (!posts || posts.length === 0) {
    return (
      <div className="container section-padding">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            No blog posts available at the moment.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container section-padding">
      <header className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          Our <span className="text-gradient">Blog</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Latest insights, trends, and tips from our creative team on design, development, 
          and strategy.
        </p>
      </header>

      <section aria-label="Blog posts">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: BlogPost) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}