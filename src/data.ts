import { Profile, SkillCategory, Project, TriviaItem, Milestone } from './types';

export const profileData: Profile = {
  name: 'Yahaira Papin',
  pronouns: 'she/her',
  title: 'High School Freshman & Aspiring Registered Nurse',
  location: 'San Diego, CA',
  email: 'yahairapapin@gmail.com',
  github: 'https://github.com/Yahaira8',
  statusMessage: 'Learning hands-on web design with Mr. Benrud • BJJ & Crochet',
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
