# Portfolio Monorepo

Welcome to the **Portfolio** project monorepo. This repository houses all personal projects, libraries, and applications.

## Repositories

This monorepo contains the following repositories as git submodules:

### Core Libraries

- **[liqid-components](https://github.com/marius-patrik/liqid-components.git)** (`liqid-components`): Core React component library with glassmorphism styling (Rslib)
- **[liqid-ui](https://github.com/marius-patrik/liqid-ui.git)** (`liqid-ui`): Desktop UI library for window management and shells (Rslib)
- **[liqid](https://github.com/marius-patrik/liqid.git)** (`liqid`): Liqid design system bundle package

### Applications

- **[liqid-docs](https://github.com/marius-patrik/liqid-docs.git)** (`liqid-docs`): Documentation website (Rsbuild App)
- **[liqid-showcase](https://github.com/marius-patrik/liqid-showcase.git)** (`liqid-showcase`): Demo desktop showcase application (Rsbuild App)
- **[phonebooth](https://github.com/marius-patrik/phonebooth.git)** (`phonebooth`): Phone application
- **[tradebot](https://github.com/marius-patrik/tradebot.git)** (`tradebot`): Trading bot application
- **[pokedex](https://github.com/marius-patrik/pokedex.git)** (`pokedex`): Pokémon database application
- **[portfolio-page](https://github.com/marius-patrik/portfolio-page.git)** (`portfolio-page`): Portfolio showcase website (Rsbuild App)

### Hardware Projects

- **[RobotArm](https://github.com/marius-patrik/RobotArm.git)** (`RobotArm`): Robot arm project
- **[SuperHumanRobot](https://github.com/marius-patrik/SuperHumanRobot.git)** (`SuperHumanRobot`): SuperHuman robot project
- **[VRHeadset](https://github.com/marius-patrik/VRHeadset.git)** (`VRHeadset`): VR headset project

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
   ./.scripts/install_all.sh
   ```

   Or manually install:

   ```bash
   # Root dependencies (workspaces)
   npm install

   # Libraries
   cd liqid-components && npm install && cd ..
   cd liqid-ui && npm install && cd ..
   cd liqid && npm install && cd ..

   # Applications
   cd liqid-docs && npm install && cd ..
   cd liqid-showcase && npm install && cd ..
   cd phonebooth && npm install && cd ..
   cd tradebot && npm install && cd ..
   cd pokedex && npm install && cd ..
   cd portfolio-page && npm install && cd ..
   ```

## Development

Each submodule is independent. You can run `npm run dev` inside any application directory to start their development servers.

Example:
```bash
cd liqid-showcase
npm run dev
```

## Scripts

| Script                          | Description                                      |
| ------------------------------- | ------------------------------------------------ |
| `./.scripts/install_all.sh`     | Install dependencies and build all libraries     |
| `./.scripts/build_all.sh`       | Build all projects (libraries and applications)  |
| `./.scripts/lint_all.sh`        | Lint all submodules                              |
| `./.scripts/push_all.sh`        | Push all submodules and root repo to origin/main |
| `./.scripts/force_push_all.sh`  | Stage, commit, and force push all repos (with confirmation) |
| `./.scripts/squash_all.sh`      | Squash all history and force push (destructive)  |

## License

MIT
