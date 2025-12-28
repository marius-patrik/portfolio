# Portfolio Page

A portfolio showcase website displaying all Code and Hardware projects built with the Liqid design system.

## Features

- **Project Grid Layout** - Beautiful card-based grid displaying all projects
- **Code & Hardware Separation** - Projects organized by category
- **Individual Project Pages** - Detailed view with README content for each project
- **Modern UI** - Built with Liqid components and glassmorphism design
- **Responsive Design** - Works seamlessly on all device sizes

## Tech Stack

- React 19
- TypeScript
- Rsbuild
- Liqid Bundle (liqid-components + liqid-ui)
- Wouter (routing)
- Biome (linting/formatting)

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build
```

### Preview

```bash
# Preview production build
npm run preview
```

## Project Structure

```
portfolio-page/
├── src/
│   ├── components/
│   │   └── ProjectCard.tsx    # Reusable project card component
│   ├── data/
│   │   └── projects.ts         # Project metadata and data
│   ├── pages/
│   │   ├── Home.tsx           # Main project grid page
│   │   └── ProjectDetail.tsx  # Individual project detail page
│   ├── App.tsx                # Main app with routing
│   ├── index.tsx               # Entry point
│   └── index.css               # Global styles
├── public/
│   └── favicon.svg
└── package.json
```

## Adding Projects

Projects are defined in `src/data/projects.ts`. To add a new project:

1. Add a new project object to the `projects` array
2. Include: name, description, techStack, category, readmePath, and slug
3. The project will automatically appear in the appropriate section

## README Display

Project detail pages attempt to load README files from `/readmes/{category}/{slug}.md`. If a README is not found, a project summary is displayed instead.

To enable full README display, copy project README files to `public/readmes/{category}/{slug}.md` at build time.

