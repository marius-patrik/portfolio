# Portfolio Monorepo

Welcome to the **Portfolio** project monorepo. This repository houses all personal projects, libraries, and applications.

## Repositories

This monorepo contains the following repositories as git submodules:

### Core Libraries

- **[liqid-components](https://github.com/marius-patrik/liqid-components.git)** (`libraries/liqid-components`): Core React component library with glassmorphism styling (Rslib)
- **[liqid-ui](https://github.com/marius-patrik/liqid-ui.git)** (`libraries/liqid-ui`): Desktop UI library for window management and shells (Rslib)

### Applications

- **[liqid-docs](https://github.com/marius-patrik/liqid-docs.git)** (`apps/liqid-docs`): Documentation website (Rsbuild App)
- **[liqid-showcase](https://github.com/marius-patrik/liqid-showcase.git)** (`apps/liqid-showcase`): Demo desktop showcase application (Rsbuild App)
- **[phonebooth](https://github.com/marius-patrik/phonebooth.git)** (`apps/liqid-showcase/src/components/Apps/phonebooth`): Phone application (nested submodule)
- **[tradebot](https://github.com/marius-patrik/tradebot.git)** (`apps/liqid-showcase/src/components/Apps/tradebot`): Trading bot application (nested submodule)

### Repository Structure

- **[portfolio](https://github.com/marius-patrik/portfolio.git)**: Root repository (this repo)
- **[libraries](https://github.com/marius-patrik/libraries.git)**: Libraries collection (legacy, replaced by individual submodules)
- **[apps](https://github.com/marius-patrik/apps.git)**: Applications collection (legacy, replaced by individual submodules)

## Setup

1. **Clone the repository:**

   ```bash
   git clone --recurse-submodules https://github.com/marius-patrik/portfolio.git
   cd portfolio
   ```

   Or if already cloned:

   ```bash
   git clone https://github.com/marius-patrik/portfolio.git
   cd portfolio
   git submodule update --init --recursive
   ```

2. **Install dependencies:**

   Run the installation script to install all dependencies:

   ```bash
   ./install_all.sh
   ```

   Or manually install:

   ```bash
   # Root dependencies (workspaces)
   npm install

   # Individual submodules
   cd libraries/liqid-components && npm install && cd ../..
   cd libraries/liqid-ui && npm install && cd ../..
   cd apps/liqid-docs && npm install && cd ../..
   cd apps/liqid-showcase && npm install && cd ../..
   ```

## Development

Each submodule is independent. You can run `npm run dev` inside any application directory to start their development servers.

Example:
```bash
cd apps/liqid-showcase
npm run dev
```

## Scripts

| Script            | Description                                      |
| ----------------- | ------------------------------------------------ |
| `./install_all.sh` | Install dependencies and build all libraries     |
| `./lint_all.sh`   | Lint all submodules                              |
| `./push_all.sh`   | Push all submodules and root repo to origin/main |
| `./squash_all.sh` | Squash all history and force push (destructive)  |

## License

MIT
