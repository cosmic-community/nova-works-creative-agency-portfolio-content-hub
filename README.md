# Nova Works - Creative Agency Portfolio & Content Hub

![Nova Works Preview](https://imgix.cosmicjs.com/dfca3670-60d4-11f0-a051-23c10f41277a-photo-1547658719-da2b51169166-1752512784551.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, high-impact portfolio and content hub for Nova Works creative agency. Built with Next.js 15, TypeScript, and Tailwind CSS, powered by [Cosmic](https://www.cosmicjs.com) for seamless content management.

## ✨ Features

- **Dynamic Hero Section** with animated backgrounds and bold headlines
- **Project Showcase** featuring detailed case studies with image galleries
- **AI-Powered Blog** with categorized posts and author profiles
- **Team Directory** with professional bios and social links
- **Contact Form** with modern validation and submission handling
- **Dark/Light Theme Toggle** with smooth transitions
- **Responsive Design** optimized for all devices
- **Smooth Scroll Animations** throughout the application

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=new-test-production)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build me a modern, high-impact portfolio and content hub for a fictional creative agency called 'Nova Works'. The site should feature:
	•	A hero section with a bold headline and background animation
	•	A featured project spotlight with case studies pulled from a content model
	•	A blog powered by the CMS with AI-generated posts
	•	A team page with bios and photos
	•	A contact page with a form
	•	A light/dark toggle and smooth scroll animations

The design should be sleek and professional, using a dark theme with accent colors. Automatically generate content models for blog posts, team members, and projects. Deploy to Vercel and include editable content via the Cosmic CMS."

### Code Generation Prompt

> "Build me a modern, high-impact portfolio and content hub for a fictional creative agency called 'Nova Works'. The site should feature:
	•	A hero section with a bold headline and background animation
	•	A featured project spotlight with case studies pulled from a content model
	•	A blog powered by the CMS with AI-generated posts
	•	A team page with bios and photos
	•	A contact page with a form
	•	A light/dark toggle and smooth scroll animations

The design should be sleek and professional, using a dark theme with accent colors. Automatically generate content models for blog posts, team members, and projects. Deploy to Vercel and include editable content via the Cosmic CMS."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form** - Form handling and validation
- **Lucide React** - Modern icon library

## 🏁 Getting Started

### Prerequisites

- Node.js 18.0 or later
- A [Cosmic](https://www.cosmicjs.com) account and bucket

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd nova-works-portfolio
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Cosmic credentials to `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

5. Run the development server:
```bash
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Cosmic SDK Examples

### Fetching Projects
```typescript
import { cosmic } from '@/lib/cosmic'

const projects = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Blog Posts
```typescript
const posts = await cosmic.objects
  .find({ type: 'blog-posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Team Members
```typescript
const team = await cosmic.objects
  .find({ type: 'team-members' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## 🌐 Cosmic CMS Integration

This application integrates with your existing Cosmic bucket structure:

- **Projects** - Showcases agency work with case studies and galleries
- **Blog Posts** - AI-generated content with categories and authors
- **Team Members** - Professional profiles with bios and social links

All content is dynamically fetched from Cosmic and rendered with proper TypeScript types and error handling.

## 📦 Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Build the application: `bun run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables

### Environment Variables
Set these in your deployment platform:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

For more information about [Cosmic](https://www.cosmicjs.com), check out the [Cosmic docs](https://www.cosmicjs.com/docs).

<!-- README_END -->