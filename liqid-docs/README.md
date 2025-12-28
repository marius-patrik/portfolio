# 📚 Liqid Docs

<div align="center">

**Official documentation website for the Liqid component library**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Rsbuild](https://img.shields.io/badge/Rsbuild-1.6-FF6B6B?logo=vite&logoColor=white)](https://rsbuild.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 🎯 Overview

**Liqid Docs** is the official documentation website for the **Liqid** component library. It provides comprehensive documentation, interactive examples, and usage guides for all components in the Liqid ecosystem.

### ✨ Features

- 📖 **Comprehensive Documentation** - Detailed component documentation with props, examples, and usage patterns
- 🎨 **Interactive Examples** - Live code examples for each component
- 🔍 **Easy Navigation** - Sidebar navigation for quick access to components
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🌙 **Dark Mode Support** - Built-in dark mode for comfortable viewing
- ⚡ **Fast & Modern** - Built with React 19 and optimized with Rsbuild

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/marius-patrik/liqid.git
cd liqid/apps/liqid-docs

# Install dependencies
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The documentation site will be available at [http://localhost:3000](http://localhost:3000).

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 19.x |
| **Language** | TypeScript | 5.9.x |
| **Build Tool** | Rsbuild | 1.6.x |
| **Styling** | Tailwind CSS | 4.0.x |
| **Linting** | Biome | 2.3.x |

---

## 📁 Project Structure

```
liqid-docs/
├── public/              # Static assets
│   ├── favicon.png
│   └── favicon.svg
├── src/
│   ├── components/      # React components
│   │   └── Sidebar.tsx  # Navigation sidebar
│   ├── data/            # Documentation data
│   │   └── docs.ts      # Component documentation definitions
│   ├── pages/           # Page components
│   │   └── ComponentPage.tsx  # Component documentation page
│   ├── App.tsx          # Main app component
│   ├── App.css          # App styles
│   ├── index.tsx        # Entry point
│   └── index.css        # Global styles
├── rsbuild.config.ts    # Rsbuild configuration
├── tsconfig.json        # TypeScript configuration
├── biome.json           # Biome configuration
└── package.json         # Project dependencies
```

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Lint and fix code with Biome |

---

## 🎨 Features in Detail

### Component Documentation

Each component in the Liqid library is documented with:

- **Title & Description** - Clear explanation of what the component does
- **Usage Examples** - Code snippets showing how to use the component
- **Props Table** - Complete list of props with types, defaults, and descriptions
- **Interactive Examples** - Live examples you can interact with

### Navigation

The sidebar provides quick access to:

- All available components
- Component categories (Core, Layout, Interface, etc.)
- Search functionality (if implemented)

---

## 🔧 Configuration

### Rsbuild Configuration

The project uses Rsbuild for building. Configuration can be found in `rsbuild.config.ts`.

### TypeScript Configuration

TypeScript settings are defined in `tsconfig.json` with strict type checking enabled.

### Biome Configuration

Code formatting and linting rules are configured in `biome.json`.

---

## 📦 Dependencies

### Core Dependencies

- **react** ^19.2.3 - React library
- **react-dom** ^19.2.3 - React DOM renderer
- **liqid-components** - Liqid component library (local)
- **liqid-ui** - Liqid UI library (local)

### Development Dependencies

- **@rsbuild/core** ^1.6.14 - Build tool
- **@rsbuild/plugin-react** ^1.4.2 - React plugin for Rsbuild
- **@biomejs/biome** ^2.3.10 - Linter and formatter
- **tailwindcss** ^4.0.0 - Utility-first CSS framework
- **typescript** ^5.9.3 - TypeScript compiler

---

## 🤝 Contributing

Contributions are welcome! When contributing to the documentation:

1. Ensure all code examples are accurate and up-to-date
2. Follow the existing documentation style
3. Test all examples before submitting
4. Update component documentation when adding new components

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🔗 Related Projects

- **[liqid-components](../libraries/liqid-components/)** - Core component library
- **[liqid-ui](../libraries/liqid-ui/)** - Desktop UI library
- **[liqid-showcase](../liqid-showcase/)** - Demo application

---

## 📞 Support

For questions, issues, or contributions, please visit the main [Liqid repository](https://github.com/marius-patrik/liqid).

---

<div align="center">

**Built with ❤️ using Liqid**

</div>
