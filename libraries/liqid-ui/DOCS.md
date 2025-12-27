# Liqid UI - Documentation

Liqid UI extends liqid-components with specialized components for building desktop-like interfaces.

## Overview

This library provides higher-level components for creating full desktop experiences including:

- Window management systems
- Desktop layouts
- Application shells
- Taskbars and docks

## Usage

```tsx
import { Shell, AppIcon, Header, Footer } from "liqid";
// or import directly from liqid-ui when published

function Desktop() {
  return (
    <Shell
      header={<Header>Status Bar</Header>}
      footer={
        <Footer>
          <AppIcon icon={<Icon />} label="App" />
        </Footer>
      }>
      {/* Desktop content */}
    </Shell>
  );
}
```

## Relationship to liqid-components

Liqid UI is built on top of liqid-components and re-exports its interface components. For core components like Button, Card, and layout utilities, import directly from `liqid`.

## Development

This package uses Rslib for building and outputs both ESM and CJS formats.

```bash
# Build the library
npm run build

# Watch mode for development
npm run dev
```
