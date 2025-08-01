import TeamCard from '@/components/TeamCard'
import { getTeamMembers } from '@/lib/cosmic'
import { generateSEO } from '@/lib/seo'
import { TeamMember } from '@/types'

export const metadata = generateSEO({
  title: 'Our Team - Meet the Creative Experts at Nova Works',
  description: 'Meet our talented team of designers, developers, and strategists who bring creative visions to life with expertise in branding, web design, and development.',
  keywords: [
    'creative team',
    'web designers',
    'web developers',
    'UI/UX designers',
    'brand strategists',
    'creative professionals',
    'design team',
    'development team',
    'agency team'
  ],
  canonical: '/team'
})

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <div className="container section-padding">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Team information coming soon.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container section-padding">
      <header className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          Meet Our <span className="text-gradient">Team</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Our talented team of designers, developers, and strategists who bring your 
          creative vision to life.
        </p>
      </header>

      <section aria-label="Team members">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member: TeamMember) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </div>
  )
}