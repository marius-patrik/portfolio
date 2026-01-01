# Project Guidelines for Liqid Library

> **Note**: This document establishes project-wide guidelines and standards. For AI agent-specific instructions, see [.cursorrules](.cursorrules).

## Project Overview

**Liqid Monorepo** is a monorepo containing a React component library inspired by Apple's Liquid Glass design language. The project provides a comprehensive set of UI components with glassmorphism styling, built with modern web technologies.

### Monorepo Structure

The repository contains multiple packages:

1. **liqid/** - Core React component library (published to npm)
   - Location: `/liqid/` (git submodule)
   - Purpose: Provides all React components, hooks, types, and styles
   - Build tool: Rslib
   - Output: ESM and CJS bundles in `dist/`

2. **liqid-types/** - TypeScript type definitions package (published to npm)
   - Location: `/liqid-types/` (git submodule)
   - Purpose: Provides shared TypeScript type definitions for the Liqid library
   - Build tool: TypeScript compiler
   - Output: Type declaration files in `dist/`
   - Exports: Theme configuration types, desktop types, layout types

3. **docs/** - Documentation website
   - Location: `/docs/`
   - Purpose: Interactive documentation site showcasing all components
   - Build tool: Rsbuild
   - Must use only liqid components

## Technology Stack

| Category                       | Technology          | Version     |
| ------------------------------ | ------------------- | ----------- |
| **Framework**                  | React               | 19.x        |
| **Language**                   | TypeScript          | 5.7+        |
| **Build Tool (liqid)**         | Rslib               | 0.6.x       |
| **Build Tool (docs/showcase)** | Rsbuild             | 1.6.x       |
| **Styling**                    | Tailwind CSS        | 4.0.x       |
| **Linting**                    | Biome               | 1.9+ / 2.3+ |
| **Icons**                      | @tabler/icons-react | 3.x         |
| **Routing**                    | wouter              | 3.x         |
| **Data Fetching**              | SWR                 | 2.3.x       |

## Key Exports from liqid Library

The liqid library exports:

- **Core Components**: Button, Alert, Avatar, Badge, Kbd, Code, Blockquote
- **Form Components**: Input, Textarea, PasswordInput, NumberInput, Checkbox, Radio, Select, SegmentedControl, Slider, Switch
- **Data Display**: Card, Accordion, Progress, Loading, Skeleton
- **Layout Components**: Box, Container, Grid, Flex, Stack, Group, Spacer, Divider
- **Navigation Components**: Tabs, Menu, Burger, Drawer, Popover, Tooltip, Modal
- **Interface Components**: Shell, Header, Footer, Main, Sidebar, SidebarNavigation, AppIcon, Text, Title
- **Desktop Components**: Desktop, DesktopIcons, WindowManager, Clock, Search, Settings, Wallpaper
- **Utility Components**: DarkModeToggle, LayoutSwitcher, ThemeConfigSettings
- **Hooks**: useTheme (with ThemeProvider), useLayout (with LayoutProvider)
  - Note: Additional hooks (useDesktopLayout, useFooter, useIconSize, useWallpaper) are used internally by components and are not exported from the main library
- **Theme Configuration**: setThemeConfig, getThemeConfig, getComponentTheme, getThemeCustomization, resetThemeConfig, loadLiqidConfig (see Theme Configuration section)
- **CSS Variables Utilities**: getCSSVariables, setCSSVariables, resetCSSVariables, loadStoredCSSVariables, hexToRgb, rgbToHex, DEFAULT_CSS_VARIABLES (see CSS Variables section)
- **Types**: All component prop types, desktop types, layout types, and utility types

## Development Workflow

### Package Dependencies

- **liqid**: No dependencies on other packages in the monorepo
- **liqid-types**: No dependencies on other packages in the monorepo (standalone types package)
- **docs**: Depends on `liqid` (local file reference)

### Working with the Monorepo

1. Each package has its own `package.json` and dependencies
2. **Git Submodules**: Both `liqid` and `liqid-types` are git submodules pointing to separate repositories
   - Initialize submodules: `git submodule update --init --recursive`
   - Update submodules: `git submodule update --remote`
3. Changes to `liqid` require rebuilding before other packages can use them
4. Always work in the specific package directory when running commands
5. Use `npm run build` in `liqid` after making changes before testing in other packages

### Build Commands

#### liqid-types Package

```bash
cd liqid-types
npm run build      # Build type declarations
npm run dev        # Watch mode for development
npm run format     # Format code with Biome
npm run lint       # Lint and fix code
npm run lint:check # Check linting without fixing
```

#### liqid Package

```bash
cd liqid
npm run build      # Build the library
npm run dev        # Watch mode for development
npm run format     # Format code with Biome
npm run lint       # Lint and fix code
npm run lint:check # Check linting without fixing
```

#### docs Package

```bash
cd docs
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run format     # Format code with Biome
npm run lint       # Lint and fix code
npm run lint:check # Check linting without fixing
```

#### desktop, app, page Packages

```bash
cd desktop  # or app, or page
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run format     # Format code with Biome
npm run lint       # Lint and fix code
npm run lint:check # Check linting without fixing
```

## Code Standards

### General Principles

- **Keep code as simple as possible** - Prefer straightforward solutions over clever ones
- **Follow existing patterns** - Maintain consistency with the codebase
- **Use TypeScript strictly** - No `any` types, proper type definitions
- **Follow Biome linting rules** - The project uses Biome for linting and formatting
- **Maintain component prop interfaces** - Keep prop types well-defined and documented

### Styling Guidelines

- **Tailwind CSS only in liqid package** - Do not use Tailwind classes in docs package
- **Default theme is unstyled** - Components have no visual styling by default (use `themeStyle` prop or config to add styling)
- **ThemeStyle prop for visual themes**: Use `themeStyle` prop to set the visual theme (glass, flat, frosted, material, unstyled)
- **Variant prop for semantics**: Use `variant` prop for semantic differences in component behavior/appearance
  - For Button: `variant` is for icon, text, outline, etc. (semantic button styles)
  - For Button: `type` prop is for button purpose (submit, button, reset)
  - For Shell/Main: `variant` is for semantic differences (desktop, app, page, etc.)

### Component Design

- **Default theme unstyled**: Components default to `'unstyled'` (no visual styling)
- **ThemeStyle prop for themes**: Use `themeStyle` prop to select visual theme (glass, flat, frosted, material, unstyled)
- **Theme configuration**: Set default themes globally or per-component using `setThemeConfig()`
- **Variant for semantics**: Use `variant` prop for semantic differences in component behavior
- **Type for Button purpose**: Use `type` prop on Button for HTML button type (submit, button, reset)

### Available Themes

- **glass** - Frosted glass effect with blur and transparency (default glassmorphism)
- **flat** - Solid background with no glass effect
- **frosted** - Enhanced frosted glass effect with more blur
- **material** - Material design inspired styling with shadows
- **unstyled** - No visual styling (default)

### Theme Configuration

The liqid library provides a theme configuration system that allows you to set default themes globally or per-component.

**Config File (Recommended):**

Each app should have a `liqid.config.ts` file in its root directory:

```tsx
import type { ThemeConfig } from "liqid";

const config: ThemeConfig = {
  defaultTheme: "glass",
  componentThemes: {
    Button: "glass",
    Card: "frosted",
  },
};

export default config;
```

Load it in your app entry point:

```tsx
import { loadLiqidConfig } from "liqid";
import config from "./liqid.config";
loadLiqidConfig(config);
```

**Programmatic Configuration:**

```tsx
import { setThemeConfig, Button, Card } from "liqid";

// Set global default theme
setThemeConfig({ defaultTheme: "glass" });

// Set per-component defaults
setThemeConfig({
  defaultTheme: "unstyled",
  componentThemes: {
    Button: "glass",
    Card: "frosted",
  },
});
```

**Environment Variables:**

- Set `LIQID_DEFAULT_THEME` environment variable at build time
- Or use `data-liqid-theme` attribute on `<html>` element for runtime configuration

For detailed configuration options, see [liqid/CONFIG.md](liqid/CONFIG.md).

### Example: Correct Usage

```tsx
// ✅ CORRECT - Using themeStyle prop for theme selection
<Button themeStyle="glass">Click me</Button>
<Button themeStyle="flat">Flat Button</Button>
<Button themeStyle="frosted">Frosted Button</Button>
<Button themeStyle="material">Material Button</Button>

// ✅ CORRECT - Using variant prop for semantic button styles
<Button variant="icon" themeStyle="glass">Icon Button</Button>
<Button variant="text" themeStyle="flat">Text Button</Button>
<Button variant="outline" themeStyle="glass">Outline Button</Button>

// ✅ CORRECT - Using type prop for button purpose
<Button type="submit" variant="outline" themeStyle="glass">Submit</Button>
<Button type="button" variant="text" themeStyle="flat">Cancel</Button>

// ✅ CORRECT - Using variant for semantic differences in other components
<Main variant="desktop">Desktop content</Main>
<Shell variant="app">App shell</Shell>

// ✅ CORRECT - Using config defaults
// After setThemeConfig({ defaultTheme: 'glass' })
<Button>Uses config default (glass)</Button>
<Card themeStyle="frosted">Overrides with frosted</Card>

// ❌ WRONG - Using variant for theme selection
<Button variant="glass">Click me</Button>
```

## Component Usage Requirements

### MANDATORY: Use Liqid Components Exclusively

- **ALL apps must be built using the liqid library components**
- **NO vanilla HTML/React components** - Use liqid components exclusively
- This applies to:
  - **docs** - Must use only liqid components
  - **liqid library itself** - Where possible, use liqid components internally instead of vanilla components

### Examples

❌ **WRONG** - Using vanilla HTML:

```tsx
<div className="container">
  <button onClick={handleClick}>Click me</button>
</div>
```

✅ **CORRECT** - Using liqid components:

```tsx
<Container>
  <Button onClick={handleClick}>Click me</Button>
</Container>
```

### When Vanilla Components Are Acceptable

Vanilla HTML/React components are ONLY acceptable when:

- There is no liqid component equivalent
- The component is a primitive wrapper (e.g., a simple div for layout)
- The component is part of the liqid library's internal implementation and cannot use itself (circular dependency)

Even in these cases, prefer creating a liqid component if it would be reusable.

## Library Code Maintenance

**MANDATORY**: When working with the liqid library package:

- **ALWAYS** update usage/implementations in apps when updating library code (liqid package)
  - When you change a component in the liqid package, update all places where it's used (docs package, etc.)
  - Ensure breaking changes are propagated to all usage sites
  - Update examples and documentation to reflect library changes

- **NEVER** implement functionality in apps that should be in the library
  - If functionality is needed in multiple places or is a core feature, it belongs in the liqid package
  - Apps (like docs) should use library components, not implement their own versions
  - Reusable functionality should always be in the library, not duplicated in apps

- **Prefer library implementation over app implementation**
  - When adding features that could be reusable, add them to the library instead of implementing them directly in apps
  - If you find yourself implementing similar functionality in multiple places, move it to the library
  - Maintain consistency: library code changes should propagate to all usage sites

This ensures the library is the single source of truth for reusable functionality, and apps stay in sync with library updates.

## Package-Specific Guidelines

### liqid (Core Library)

- **Must be tree-shakeable** - Components should be independently importable
- **No side effects** - Components should not have global side effects
- **Use liqid components internally** - Where possible, use liqid components instead of vanilla components
- **TypeScript strict mode** - All code must be properly typed
- **Export structure** - Maintain clear export structure in `src/index.ts`
- **Build output** - Must produce both ESM and CJS bundles

### docs (Documentation Site)

- **Must stay in sync with liqid** - Component documentation must match actual components
- **Use only liqid components** - No vanilla HTML/React components
- **Interactive examples** - All examples should be functional and testable
- **Accurate props tables** - Props documentation must match component interfaces

## Common Pitfalls

### ❌ Things to Avoid

1. **Don't add Tailwind classes outside liqid package**
   - Tailwind should only be used in the liqid package
   - Use liqid components with props for styling in other packages

2. **Don't break component APIs without updating docs**
   - If you change a component's props, update the documentation
   - Update examples in docs package

3. **Don't use vanilla HTML/React components when liqid alternatives exist**
   - Always check if a liqid component exists first
   - Prefer creating a liqid component over using vanilla HTML

4. **Don't use variant prop for visual styling**
   - Use `themeStyle` prop for visual appearance
   - Use `variant` prop only for semantic differences
   - Configure default themes using `setThemeConfig()` instead of setting `themeStyle` on every component

5. **Don't skip quality checks**
   - Always run lint and build after changes
   - Always test functionality
   - Always update todos

6. **Don't forget to update documentation**
   - READMEs should reflect current state
   - Code comments should explain complex logic
   - Component docs should match implementations

## Best Practices

### Code Organization

- Keep components focused and single-purpose
- Extract reusable logic into hooks
- Use TypeScript interfaces for all props
- Group related components in folders

### Testing Approach

- Test components in isolation when possible
- Test in both light and dark modes
- Test responsive behavior
- Test accessibility features

### Documentation

- Write clear, concise code comments
- Document complex algorithms
- Keep README files up-to-date
- Include usage examples in component docs

### Performance

- Use React.memo for expensive components
- Lazy load heavy components when possible
- Optimize bundle size (tree-shaking)
- Minimize re-renders

## Architecture Decisions

This monorepo follows a clear structure:

- **liqid/** - The core library package that gets published to npm. Contains all React components, hooks, types, styles, and theme configuration system. Maintained as a git submodule.
- **liqid-types/** - Standalone TypeScript types package published to npm as `@liqid/types`. Contains shared type definitions (ThemeConfig, AppDefinition, layout variants, etc.). Maintained as a git submodule.
- **docs/** - Documentation site that imports and showcases liqid components. Must use only liqid components.
- **desktop/** - Desktop application showcase that demonstrates desktop components and features. Must use only liqid components.
- **app/** - Application showcase. Must use only liqid components.
- **page/** - Page showcase. Must use only liqid components.

All packages in this monorepo must use the liqid library components exclusively - no vanilla HTML/React components should be used.

## Getting Help

If you encounter issues or are unsure about implementation:

1. Check existing code for similar patterns
2. Review component examples in docs package
3. Check the TODO.md for related tasks
4. Review PROJECT.md (this file) for project guidelines
5. Review .cursorrules for AI agent-specific instructions
