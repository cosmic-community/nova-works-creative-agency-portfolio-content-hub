// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug: string;
  created_at: string;
  modified_at: string;
}

// Project interface
export interface Project extends CosmicObject {
  type_slug: 'projects';
  metadata: {
    name: string;
    client: string;
    short_description: string;
    full_description: string;
    featured_image: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    category: {
      key: string;
      value: string;
    };
    technologies?: string[];
    project_url?: string;
    completion_date: string;
    featured: boolean;
  };
}

// Blog post interface
export interface BlogPost extends CosmicObject {
  type_slug: 'blog-posts';
  metadata: {
    title: string;
    excerpt: string;
    content: string;
    featured_image: {
      url: string;
      imgix_url: string;
    };
    category: {
      key: string;
      value: string;
    };
    tags?: string[];
    author?: TeamMember;
    reading_time?: number;
    featured: boolean;
  };
}

// Team member interface
export interface TeamMember extends CosmicObject {
  type_slug: 'team-members';
  metadata: {
    name: string;
    title: string;
    bio: string;
    photo: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
    skills?: string[];
    experience?: number;
    order?: number;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type literals for select-dropdown values
export type ProjectCategory = 'branding' | 'web-design' | 'development' | 'mobile-app' | 'ui-ux';
export type BlogCategory = 'design' | 'development' | 'strategy' | 'industry-news' | 'case-studies' | 'tutorials';

// Type guards for runtime validation
export function isProject(obj: CosmicObject): obj is Project {
  return obj.type_slug === 'projects';
}

export function isBlogPost(obj: CosmicObject): obj is BlogPost {
  return obj.type_slug === 'blog-posts';
}

export function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type_slug === 'team-members';
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  services?: string[];
}

// Theme types
export type Theme = 'light' | 'dark';

// Utility types
export type OptionalMetadata<T> = Partial<T['metadata']>;
export type CreateProjectData = Omit<Project, 'id' | 'created_at' | 'modified_at'>;
export type CreateBlogPostData = Omit<BlogPost, 'id' | 'created_at' | 'modified_at'>;