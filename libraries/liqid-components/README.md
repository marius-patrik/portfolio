# Liqid Components

A React component library inspired by Apple's Liquid Glass design language. Beautiful, modern UI components with that signature frosted glass aesthetic.

## Features

- 🪟 **Liquid Glass** - Frosted glass effects with blur and transparency
- ⚡ **Lightweight** - Tree-shakeable ESM and CJS bundles
- 🎨 **Customizable** - Built with Tailwind CSS v4
- 📦 **TypeScript** - Full type definitions included

## Installation

```bash
npm install liqid
```

## Usage

```tsx
import { Button, Card, Shell } from "liqid";

function App() {
  return (
    <Shell>
      <Card>
        <Button>Click me</Button>
      </Card>
    </Shell>
  );
}
```

## Components

### Core

- **Button** - Versatile button with glass, glass-highlight, icon, and text variants
- **Card** - Container with glass, glass-highlight, and flat variants
- **Loading** - Loading indicator bar

### Layout

- **Box** - Display container with title and buttons areas
- **Spacer** - Flexible spacing element
- **Grid** - CSS Grid wrapper with column and gap options
- **Flex** - Flexbox wrapper with direction, justify, align options
- **Stack** - Vertical flex container
- **Group** - Horizontal flex container

### Interface

- **AppIcon** - Desktop-style app icon with label
- **Footer** - Application footer/dock bar
- **Header** - Application header/status bar
- **Modal** - Modal dialog overlay
- **Shell** - Desktop shell container with header, footer, and pages

## Commands

| Command          | Description             |
| ---------------- | ----------------------- |
| `npm run build`  | Build the library       |
| `npm run dev`    | Build in watch mode     |
| `npm run lint`   | Lint and fix with Biome |
| `npm run format` | Format code with Biome  |

## License

MIT
