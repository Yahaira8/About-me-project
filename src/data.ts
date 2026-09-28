import { Profile, SkillCategory, Project, TriviaItem, Milestone, MediaCardItem } from './types';

export const profileData: Profile = {
  name: 'Yahaira Papin',
  pronouns: 'she/her',
  title: 'High School Freshman & Aspiring Registered Nurse',
  location: 'San Diego, CA',
  email: 'yahairapapin@gmail.com',
  github: 'https://github.com/Yahaira8',
  statusMessage: 'Learning hands-on web design with Mr. Benrud • BJJ & Crochet',
  avatarUrl: 'https://i.imgur.com/u3VBDSd.jpeg',
  featuredMediaUrl: 'https://i.imgur.com/jareEOL.jpeg',
  featuredMediaCaption: 'Handmade Crochet Jellyfishes — Custom yarn creations with curly tentacles sculpted with patience and artistry.',
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
    title: 'Pretty Camping Trip 🌲⛺',
    mediaUrl: '/pretty-camping-trip.jpeg',
    caption: 'It was such a memorable experience going on this really pretty camping trip! I enjoyed it so much—super pretty views, fresh air, and a wonderfully fun time spending time outdoors.',
    category: 'Camping Trip',
    tags: ['Camping', 'Outdoors', 'Nature']
  },
  {
    id: 'media-2',
    type: 'video',
    title: 'San Francisco Trip 🌉🌁',
    mediaUrl: 'https://i.imgur.com/fDPC4ZD.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
    caption: 'I went on an amazing trip to San Francisco in May with my friends! We had such a fun time exploring the city, seeing iconic landmarks, and creating unforgettable memories together.',
    category: 'Travel & Trips',
    tags: ['San Francisco', 'Friends', 'Travel', 'Trip Memories']
  },
  {
    id: 'media-3',
    type: 'image',
    title: '8th Grade Graduation 🎓',
    mediaUrl: 'https://i.imgur.com/cpqBKCF.jpeg',
    caption: 'I celebrated my 8th grade graduation in June 2026 with my friends, classmates, and family! It was so much fun celebrating together. 🎓✨',
    category: 'Graduation & Milestones',
    tags: ['Graduation', '8th Grade', 'Milestones', 'Memories']
  },
  {
    id: 'media-4',
    type: 'image',
    title: 'School Dance Night 🪩✨',
    mediaUrl: 'https://i.imgur.com/fArK1Nd.jpeg',
    caption: 'I had such an amazing time attending the middle school dance with my friends! We spent the evening dancing, laughing, taking photos, and making unforgettable middle school memories together.',
    category: 'School Events',
    tags: ['School Dance', 'Friends', 'Memories', 'Fun']
  },
  {
    id: 'media-5',
    type: 'image',
    title: 'Nicky Alice Tesseract Display 🧊✨',
    mediaUrl: 'https://i.imgur.com/faVHj0l.jpeg',
    caption: "I went and visited artist Nicky Alice's tesseract display! It was so incredible to see in person—he spends so much time, passion, and meticulous detail crafting these mind-bending 4D light sculptures. Click the button below to explore more on his website!",
    category: 'Art & Inspiration',
    tags: ['Nicky Alice', 'Tesseract', '4D Art', 'Inspiration'],
    externalUrl: 'https://www.nickyalice.com/tesseract-sculptures/',
    externalUrlLabel: 'Visit Nicky Alice Website'
  },
  {
    id: 'media-6',
    type: 'image',
    title: 'Disneyland Trip 🏰✨',
    mediaUrl: 'https://i.imgur.com/uMs2yPj.png',
    caption: 'I went on a super fun trip to Disneyland with my brother! We went on so many exciting rides, explored the park together, and had an awesome time making great memories.',
    category: 'Family & Trips',
    tags: ['Disneyland', 'Family', 'Brother', 'Theme Park', 'Memories']
  },
  {
    id: 'media-7',
    type: 'social',
    title: 'Frank Ocean - Creative & Musical Inspiration 🌊🎤',
    mediaUrl: 'https://i.imgur.com/hXbXMaI.png',
    caption: "Frank Ocean's soulful storytelling, artistic authenticity, and timeless music are a major source of inspiration for my creative work, from website design to hand-crafted art. Click the button below to view the original Instagram post!",
    category: 'Inspiration & Music',
    externalUrl: 'https://www.instagram.com/p/S-t7D/?utm_source=ig_web_copy_link&igsi=NTc4MTIwNjQ2YQ%3D%3D',
    externalUrlLabel: 'View Post on Instagram',
    tags: ['Frank Ocean', 'Music', 'Inspiration', 'Creative Vibes']
  },
  {
    id: 'media-8',
    type: 'image',
    title: 'Parkway Bowl Night 🎳',
    mediaUrl: 'https://i.imgur.com/VbVksan.jpeg',
    caption: 'I went to Parkway Bowl in El Cajon with my best friend Ayden and my brother Gabriel! We had an awesome time hanging out, laughing, and playing a few games together.',
    category: 'Friends & Fun',
    externalUrl: 'https://parkwaybowl.com/',
    externalUrlLabel: 'Visit Parkway Bowl Website',
    tags: ['Bowling', 'Parkway Bowl', 'Friends', 'El Cajon', 'Memories']
  },
  {
    id: 'media-10',
    type: 'image',
    title: 'Jiu Jitsu Belt Promotion Ceremony',
    mediaUrl: 'https://i.imgur.com/IzzqkAx.jpeg',
    caption: 'Coach presenting the newly earned belt to Yahaira Papin ("Yami P.") on the academy mats—celebrating discipline, persistence, and continuous technical growth in Brazilian Jiu Jitsu.',
    category: 'Jiu Jitsu',
    tags: ['BJJ', 'BeltPromotion', 'YamiP', 'Discipline']
  }
];
