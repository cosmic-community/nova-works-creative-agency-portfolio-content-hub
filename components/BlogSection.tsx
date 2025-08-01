import { BlogPost } from '@/types';
import { getFeaturedBlogPosts } from '@/lib/cosmic';
import PostCard from './PostCard';
import Link from 'next/link';

export default async function BlogSection() {
  const posts = await getFeaturedBlogPosts();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-sage max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and insights from our team of experts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post: BlogPost) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-forest hover:bg-sage transition-colors"
          >
            Read More Articles
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}