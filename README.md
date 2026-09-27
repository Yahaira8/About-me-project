# About Me Project

Personal profile and portfolio web application built with React, TypeScript, Vite, and Tailwind CSS.

## Features
- **Hero & Profile**: Name, headline, pronouns, status message, location, and quick copy-to-clipboard email action.
- **Story & Background**: Narrative bio, development journey milestones, and core values.
- **Skills & Craft**: Categorized competencies across frontend development, interface design, and community interests.
- **Featured Projects**: Showcase cards for web applications (such as the Dog Photo Gallery and educational activities) with detail modals and GitHub links.
- **Interactive Trivia**: A "Get to Know Yahaira" mini-quiz with instant feedback, scoring, and replay capabilities.
- **Contact & Connect**: Direct contact details, quick-copy email, and a working note form with local storage persistence.

## Development
- Dev Server: `npm run dev` (starts on `http://0.0.0.0:5000`)
- Build: `npm run build`
- Lint: `npm run lint`
- Browser smoke check: `npm run test:smoke`

The smoke check starts the Vite server when needed, opens the home page in Chromium,
and verifies the hero content plus the About, Skills, Projects, Trivia, and Contact
navigation targets.
