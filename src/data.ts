import { Profile, SkillCategory, Project, TriviaItem, Milestone, MediaCardItem } from './types';

export const profileData: Profile = {
  name: 'Yahaira Papin',
  pronouns: 'she/her',
  title: 'High School Freshman & Aspiring Registered Nurse',
  location: 'San Diego, CA',
  email: 'yahairapapin@gmail.com',
  github: 'https://github.com/Yahaira8',
  statusMessage: 'Learning hands-on web design with Mr. Benrud • BJJ & Crochet',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  featuredMediaUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
  featuredMediaCaption: 'Handmade Crochet Craft — Intricate plushie yarn creations designed with patience and care.',
  bio: [
    "Hello! My name is Yahaira Papin, and I am currently a high school freshman learning hands-on web design, with my teacher Mr.Benrud. I take pride in building functional, clean, and visually pleasing digital experiences that express my personal style and passions.",
    "My life is filled with a balanced mix of athletic discipline and creative handiwork. I spend my training hours on the mat practicing Brazilian Jiu Jitsu to build resilience and mental focus, while dedicating my relaxation time to designing handmade crochet plushies.",
    "Looking ahead, my core career aspiration is to transition into healthcare and become a Registered Nurse (RN). I am motivated by a strong passion for helping others, providing compassionate care, and making a direct, positive impact on patients' lives every single day."
  ]
};

export const skillsData: SkillCategory[] = [
  {
    title: 'Frontend & Development',
    iconName: 'Code',
    skills: [
      { name: 'TypeScript & JavaScript', level: 'Advanced', description: 'Modern ESNext, type safety, modular design' },
      { name: 'React & Vite', level: 'Advanced', description: 'Component architecture, state hooks, responsive flows' },
      { name: 'HTML5 & Semantic Web', level: 'Proficient', description: 'Accessible layouts, SEO best practices, structured markup' },
      { name: 'Tailwind CSS & Styling', level: 'Advanced', description: 'Utility-first styling, design tokens, micro-interactions' },
      { name: 'Git & GitHub', level: 'Proficient', description: 'Version control, open-source repositories, collaboration' }
    ]
  },
  {
    title: 'Design & Creative',
    iconName: 'Palette',
    skills: [
      { name: 'UI/UX Layout & Ergonomics', level: 'Proficient', description: 'Typography hierarchy, spacing math, accessible contrast' },
      { name: 'Interactive Animations', level: 'Intermediate', description: 'Smooth entrance transitions, motion feedback, gesture cues' },
      { name: 'Visual Media & Photography', level: 'Proficient', description: 'Photo curation, visual storytelling, digital assets' },
      { name: 'Theme & Component Design', level: 'Advanced', description: 'Custom cursors, interactive cards, thematic modal views' }
    ]
  },
  {
    title: 'Passions & Pursuits',
    iconName: 'Sparkles',
    skills: [
      { name: 'Brazilian Jiu Jitsu', level: 'Training', description: 'Building athletic discipline, resilience, and mental focus on the mat' },
      { name: 'Handmade Crochet', level: 'Creative Craft', description: 'Designing handmade crochet plushies with patience and artistry' },
      { name: 'Healthcare & Nursing', level: 'Career Goal', description: 'Aspiring to become a compassionate Registered Nurse (RN)' }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: 'photos-gallery',
    title: 'Dog Photo Gallery & Breed Explorer',
    tagline: 'Thematic interactive showcase of dog breeds, traits, and care tips',
    description: 'A charming, interactive web experience featuring custom paw print cursors, 9 dog breeds, detailed personality cards, Dog of the Month highlight, and practical care guides.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    repoUrl: 'https://github.com/Yahaira8/photos',
    featured: true,
    category: 'Interactive Web App'
  },
  {
    id: 'about-me',
    title: 'About Me — Personal Portfolio',
    tagline: 'Modern personal hub featuring interactive trivia and showcase',
    description: 'This responsive personal showcase highlighting background, technical skills, creative work, and an interactive "Get to Know Me" challenge.',
    tags: ['React 18', 'TypeScript', 'Motion', 'Tailwind CSS'],
    repoUrl: 'https://github.com/Yahaira8/About-me-project',
    featured: true,
    category: 'Portfolio & Profile'
  },
  {
    id: 'interactive-learning',
    title: 'Interactive Wildlife Activities',
    tagline: 'Engaging nature quizzes and matching exercises',
    description: 'Educational matching games and quizzes designed to share fascinating facts about nature, including monarch butterfly migrations and metamorphosis.',
    tags: ['Interactive Learning', 'Educational', 'UX Design'],
    featured: false,
    category: 'Educational Experience'
  },
  {
    id: 'hello-world-foundations',
    title: 'Code Foundations & Experiments',
    tagline: 'Explorations in clean code structure and modern toolchains',
    description: 'Sandbox repository for testing web standards, component lifecycles, and rapid development environments.',
    tags: ['JavaScript', 'HTML5', 'Git'],
    repoUrl: 'https://github.com/Yahaira8/hello-world',
    featured: false,
    category: 'Open Source'
  }
];

export const triviaQuestions: TriviaItem[] = [
  {
    id: 'trivia-1',
    question: "What martial art does Yahaira practice on the mat to build resilience and mental focus?",
    options: ["Brazilian Jiu Jitsu", "Karate", "Taekwondo", "Judo"],
    correctIndex: 0,
    explanation: "Yahaira trains in Brazilian Jiu Jitsu to develop athletic discipline, resilience, and mental focus!"
  },
  {
    id: 'trivia-2',
    question: "What creative handiwork does Yahaira design during relaxation time?",
    options: ["Handmade crochet plushies", "Woodworking", "Origami", "Glassblowing"],
    correctIndex: 0,
    explanation: "Yahaira loves designing handmade crochet plushies with patience, care, and creative styling!"
  },
  {
    id: 'trivia-3',
    question: "What is Yahaira's core future career aspiration in healthcare?",
    options: ["Registered Nurse (RN)", "Hospital Architect", "Pharmacist", "Medical Equipment Designer"],
    correctIndex: 0,
    explanation: "Yahaira aspires to become a Registered Nurse (RN) to provide compassionate patient care and make a daily positive difference."
  }
];

export const journeyMilestones: Milestone[] = [
  {
    year: 'Current',
    title: 'Web Design & Digital Craft',
    organization: 'High School Freshman with Mr. Benrud',
    description: 'Learning hands-on web design, creating clean, functional, and visually pleasing digital experiences.'
  },
  {
    year: 'Discipline',
    title: 'Brazilian Jiu Jitsu Training',
    organization: 'On the Mat',
    description: 'Developing athletic discipline, resilience, and sharp mental focus through consistent martial arts training.'
  },
  {
    year: 'Future Goal',
    title: 'Healthcare & Registered Nursing (RN)',
    organization: 'Career Aspiration',
    description: 'Motivated by a strong passion to help others, provide compassionate care, and make a direct positive impact on patients.'
  }
];

export const mediaGalleryItems: MediaCardItem[] = [
  {
    id: 'media-1',
    type: 'image',
    title: 'Handmade Crochet Bunny Plushie',
    mediaUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    caption: 'Soft pastel handmade bunny plushie crafted using soft chenille yarn and intricate single crochet stitches during evening relaxation time.',
    category: 'Crochet Craft',
    tags: ['Handmade', 'Crochet', 'Creative Craft']
  },
  {
    id: 'media-2',
    type: 'video',
    title: 'Brazilian Jiu Jitsu Drill & Technique',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    caption: 'Training on the mats practicing hip escapes, guard retention, and technical transitions to build physical resilience and sharp discipline.',
    category: 'Jiu Jitsu',
    tags: ['Athletic', 'BJJ', 'Discipline']
  },
  {
    id: 'media-3',
    type: 'social',
    title: 'Crochet Plushie Showcase on Instagram',
    mediaUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    caption: 'Sharing my latest collection of handmade mini animal plushies with the creative crafting community. #CrochetArt #HandmadePlushies',
    category: 'Social Post',
    externalUrl: 'https://instagram.com',
    tags: ['Instagram', 'Community', 'Handmade']
  },
  {
    id: 'media-4',
    type: 'image',
    title: 'Web Design Classroom with Mr. Benrud',
    mediaUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    caption: 'Hands-on web design lab drafting wireframes, testing typography scales, and coding accessible HTML & CSS interfaces.',
    category: 'Web Design',
    tags: ['High School', 'Coding', 'Web Design']
  },
  {
    id: 'media-5',
    type: 'image',
    title: 'San Diego Coastal Inspiration',
    mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    caption: 'Recharging along the Pacific coastline in San Diego, California. The ocean breeze always sparks fresh creativity and calm focus.',
    category: 'Lifestyle',
    tags: ['San Diego', 'California', 'Nature']
  },
  {
    id: 'media-6',
    type: 'video',
    title: 'Crochet Stitching Time-Lapse Demo',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=800&q=80',
    caption: 'A quick demonstration capturing the rhythm, tension control, and counting needed for sculpting 3D amigurumi crochet plushies.',
    category: 'Crochet Craft',
    tags: ['Video', 'Time-lapse', 'Technique']
  },
  {
    id: 'media-7',
    type: 'social',
    title: 'GitHub Milestone: About Me Project Release',
    mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    caption: 'Pushed the newest responsive updates to my personal portfolio repository on GitHub! Clean components and custom styling.',
    category: 'Social Post',
    externalUrl: 'https://github.com/Yahaira8/About-me-project',
    tags: ['GitHub', 'OpenSource', 'Portfolio']
  },
  {
    id: 'media-8',
    type: 'image',
    title: 'Healthcare & Clinical Nursing Studies',
    mediaUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    caption: 'Exploring human anatomy, patient vitals, and compassionate healthcare foundations in preparation for my Registered Nurse (RN) degree.',
    category: 'Healthcare',
    tags: ['Nursing', 'Healthcare', 'Future RN']
  },
  {
    id: 'media-9',
    type: 'image',
    title: 'Custom Color Palette Swatches',
    mediaUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    caption: 'Experimenting with pastel hues (#f7a6df and #ffdef5) to establish a distinctive, soft, yet vibrant aesthetic across my web projects.',
    category: 'Design & Craft',
    tags: ['Design', 'Color Theory', 'Aesthetics']
  },
  {
    id: 'media-10',
    type: 'social',
    title: 'Jiu Jitsu Mat Progress & Stripes',
    mediaUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    caption: 'Another tough week of sparring and technique drilling completed. Growth happens when you step out of your comfort zone every day!',
    category: 'Social Post',
    externalUrl: 'https://instagram.com',
    tags: ['BJJ', 'Growth', 'Fitness']
  }
];
