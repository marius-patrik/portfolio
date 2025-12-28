# 🪟 Liqid

<div align="center">

**A unified React design system bundle with Liquid Glass aesthetics**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Beautiful, modern UI components and desktop environment tools with that signature frosted glass aesthetic.

</div>

---

## 🎯 Overview

**Liqid** is a unified package containing both `liqid-components` (core component library) and `liqid-ui` (desktop environment components). It provides a complete design system for building modern web applications with glassmorphism styling.

### ✨ What's Included

- **liqid-components** - Core React component library with glassmorphism styling
- **liqid-ui** - Desktop environment components (WindowManager, Desktop, Explorer, etc.)

### 🎨 Key Features

- 🪟 **Liquid Glass** - Frosted glass effects with blur and transparency
- ⚡ **Lightweight** - Tree-shakeable ESM and CJS bundles
- 🎨 **Customizable** - Built with Tailwind CSS v4 for easy theming
- 📦 **TypeScript** - Full type definitions included
- 🌙 **Dark Mode** - Built-in dark mode support
- ♿ **Accessible** - WCAG compliant components
- 📱 **Responsive** - Mobile-first design approach
- 🖥️ **Desktop Metaphor** - Window management and desktop environments

---

## 📦 Installation

```bash
npm install liqid
```

### Peer Dependencies

This library requires React 17+ and React DOM 17+:

```bash
npm install react react-dom
```

---

## 🚀 Quick Start

### Basic Usage

```tsx
import { Button, Card, Shell, Window, WindowManager } from "liqid";
import "liqid/styles.css";

function App() {
  return (
    <Shell
      header={<Header>My App</Header>}
      footer={<Footer>Footer</Footer>}
    >
      <Card variant="glass">
        <Button variant="glass">Click me</Button>
      </Card>
      
      <WindowManager>
        <Window title="My Window">
          Window content here
        </Window>
      </WindowManager>
    </Shell>
  );
}
```

### Import Styles

Don't forget to import the CSS file:

```tsx
import "liqid/styles.css";
```

Or in your main CSS file:

```css
@import "liqid/styles.css";
```

---

## 📚 Package Structure

The `liqid` package provides three main entry points:

### Main Export

Import everything from the root:

```tsx
import { Button, Card, Window, WindowManager } from "liqid";
```

This exports all components from both `liqid-components` and `liqid-ui`.

### Subpath Exports

You can also import from specific subpaths if needed:

```tsx
// Components only
import { Button, Card } from "liqid/components";

// UI components only
import { Window, WindowManager } from "liqid/ui";
```

---

## 📚 Components

### Core Components (liqid-components)

The core component library includes:

- **Buttons** - Multiple variants (glass, glass-highlight, icon, text, outline)
- **Cards** - Container components with glassmorphism styling
- **Forms** - Input, Textarea, Select, Checkbox, Radio, Switch, etc.
- **Layout** - Flex, Grid, Stack, Group, Box, Container
- **Navigation** - Tabs, Menu, Drawer, Modal, Popover, Tooltip
- **Data Display** - Progress, Loading, Skeleton, Badge
- **Interface** - Shell, Header, Footer, AppIcon

### UI Components (liqid-ui)

The desktop UI library includes:

- **Window** - Window component with title bar and controls
- **WindowManager** - Window management system
- **Desktop** - Desktop environment components
- **Explorer** - File explorer component
- **DesktopHeader** - Desktop header bar
- **DesktopFooter** - Desktop footer/taskbar

---

## 🛠️ Development

This is a monorepo workspace containing two packages:

- `liqid-components` - Core component library
- `liqid-ui` - Desktop UI library

### Build

Build both packages:

```bash
npm run build
```

### Development Mode

Run both packages in watch mode:

```bash
npm run dev
```

### Linting

Lint all packages:

```bash
npm run lint
```

---

## 📖 Documentation

For more detailed documentation, see:

- [liqid-components README](./liqid-components/README.md) - Core components documentation
- [liqid-ui README](./liqid-ui/README.md) - Desktop UI documentation

---

## 📝 License

MIT

