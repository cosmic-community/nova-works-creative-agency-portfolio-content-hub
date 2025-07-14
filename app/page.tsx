import { HeroSection } from '@/components/HeroSection'
import { FeaturedProjects } from '@/components/FeaturedProjects'
import { BlogSection } from '@/components/BlogSection'
import { TeamSection } from '@/components/TeamSection'
import { ContactSection } from '@/components/ContactSection'
import { getFeaturedProjects, getFeaturedBlogPosts, getTeamMembers } from '@/lib/cosmic'

export default async function HomePage() {
  const [featuredProjects, featuredPosts, teamMembers] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedBlogPosts(),
    getTeamMembers()
  ])

  return (
    <>
      <HeroSection />
      <FeaturedProjects projects={featuredProjects} />
      <BlogSection posts={featuredPosts} />
      <TeamSection teamMembers={teamMembers} />
      <ContactSection />
    </>
  )
}