import { Profile, SkillCategory, Project, TriviaItem, Milestone } from './types';

export const profileData: Profile = {
  name: 'Yahaira Papin',
  pronouns: 'she/her',
  title: 'Creative Frontend Developer & Designer',
  location: 'New York, NY',
  email: 'yahairapapin@gmail.com',
  github: 'https://github.com/Yahaira8',
  statusMessage: 'Building engaging web experiences & exploring creative interfaces',
  bio: [
    "Hello and welcome! I'm Yahaira, a passionate web creator focused on crafting intuitive, interactive, and visually delightful web applications.",
    "I enjoy turning creative ideas into polished software — from charming thematic experiences like interactive pet galleries to educational tools and modern web apps.",
    "When I'm not coding, you can find me exploring digital photography, learning about animal care & wildlife preservation, and experimenting with new creative design patterns."
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
    title: 'Interests & Values',
    iconName: 'Sparkles',
    skills: [
      { name: 'Animal Advocacy & Pet Care', level: 'Passion', description: 'Informed pet nutrition, breed personalities, rescue care' },
      { name: 'Nature & Wildlife Ecology', level: 'Passion', description: 'Monarch butterfly conservation and environmental education' },
      { name: 'Continuous Learning', level: 'Ongoing', description: 'Always expanding frontend engineering and design horizons' }
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
    question: "Which web experience featured custom paw print and dog bone mouse cursors?",
    options: ["Photos & Breed Explorer", "Weather Dashboard", "Task Tracker", "Audio Synthesizer"],
    correctIndex: 0,
    explanation: "Yahaira built the delightful 'Photos' dog-themed gallery with custom paw-print cursors and personality trait cards!"
  },
  {
    id: 'trivia-2',
    question: "Which insect's migration and life cycle inspired educational matching activities?",
    options: ["Honeybee", "Monarch Butterfly", "Dragonfly", "Ladybug"],
    correctIndex: 1,
    explanation: "Yahaira created engaging interactive matching activities and quizzes about monarch butterflies!"
  },
  {
    id: 'trivia-3',
    question: "What is Yahaira's primary focus when creating digital experiences?",
    options: ["Complex enterprise legacy systems", "Crafting intuitive, delightful, and human-friendly web apps", "Data mining algorithms only", "Command-line terminal utilities"],
    correctIndex: 1,
    explanation: "Yahaira specializes in user-centered design, combining expressive interfaces with solid modern frontend engineering."
  }
];

export const journeyMilestones: Milestone[] = [
  {
    year: 'Present',
    title: 'Modern Frontend Development & Interactive Design',
    organization: 'Independent Projects & Creative Work',
    description: 'Designing and coding dynamic web apps using React, TypeScript, and modern styling libraries.'
  },
  {
    year: 'Projects',
    title: 'Interactive Applications & Thematic Portfolios',
    organization: 'GitHub & Web Showcase',
    description: 'Created the Dog Breed Explorer gallery and interactive digital learning activities.'
  },
  {
    year: 'Foundations',
    title: 'Exploration of Web Technologies',
    organization: 'Self-Directed Learning & Practice',
    description: 'Built foundational knowledge in HTML, CSS, JavaScript, and responsive design principles.'
  }
];
