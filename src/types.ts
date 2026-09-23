export interface Profile {
  name: string;
  pronouns: string;
  title: string;
  bio: string[];
  location: string;
  email: string;
  github: string;
  statusMessage: string;
  avatarUrl?: string;
  featuredMediaUrl?: string;
  featuredMediaCaption?: string;
}

export interface MediaCardItem {
  id: string;
  type: 'image' | 'video' | 'social';
  title: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  caption: string;
  category: string;
  tags?: string[];
  externalUrl?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: Array<{
    name: string;
    level: string;
    description: string;
  }>;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  featured: boolean;
  category: string;
}

export interface TriviaItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Milestone {
  year: string;
  title: string;
  organization?: string;
  description: string;
}
