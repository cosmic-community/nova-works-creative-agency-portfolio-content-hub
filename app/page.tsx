import HeroSection from '@/components/HeroSection'
import FeaturedProjects from '@/components/FeaturedProjects'
import BlogSection from '@/components/BlogSection'
import TeamSection from '@/components/TeamSection'
import ContactSection from '@/components/ContactSection'

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <BlogSection />
      <TeamSection />
      <ContactSection />
    </>
  )
}