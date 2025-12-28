# Portfolio Monorepo

Welcome to the **Portfolio** project monorepo. This repository houses all personal projects, libraries, and applications.

## Repositories

This monorepo contains the following repositories as git submodules:

### Core Libraries

- **[liqid](https://github.com/marius-patrik/liqid.git)** (`Libraries/liqid`): Liqid design system bundle package containing:
  - **[liqid-components](https://github.com/marius-patrik/liqid-components.git)** (`Libraries/liqid/liqid-components`): Core React component library with glassmorphism styling (Rslib)
  - **[liqid-ui](https://github.com/marius-patrik/liqid-ui.git)** (`Libraries/liqid/liqid-ui`): Desktop UI library for window management and shells (Rslib)

### Applications

- **[liqid-docs](https://github.com/marius-patrik/liqid-docs.git)** (`Applications/liqid-docs`): Documentation website (Rsbuild App)
- **[liqid-showcase](https://github.com/marius-patrik/liqid-showcase.git)** (`Applications/liqid-showcase`): Demo desktop showcase application (Rsbuild App)
- **[phonebooth](https://github.com/marius-patrik/phonebooth.git)** (`Applications/phonebooth`): Phone application
- **[tradebot](https://github.com/marius-patrik/tradebot.git)** (`Applications/tradebot`): Trading bot application
- **[pokedex](https://github.com/marius-patrik/pokedex.git)** (`Applications/pokedex`): Pokémon database application

### Hardware Projects

- **[RobotArm](https://github.com/marius-patrik/RobotArm.git)** (`hardware/RobotArm`): Robot arm project
- **[SuperHumanRobot](https://github.com/marius-patrik/SuperHumanRobot.git)** (`hardware/SuperHumanRobot`): SuperHuman robot project
- **[VRHeadset](https://github.com/marius-patrik/VRHeadset.git)** (`hardware/VRHeadset`): VR headset project

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

   # Liqid library (contains nested submodules)
   cd Libraries/liqid && npm install && cd ../..
   
   # Nested liqid submodules
   cd Libraries/liqid/liqid-components && npm install && cd ../../..
   cd Libraries/liqid/liqid-ui && npm install && cd ../../..

   # Applications
   cd Applications/liqid-docs && npm install && cd ../..
   cd Applications/liqid-showcase && npm install && cd ../..
   cd Applications/phonebooth && npm install && cd ../..
   cd Applications/tradebot && npm install && cd ../..
   cd Applications/pokedex && npm install && cd ../..
   ```

## Development

Each submodule is independent. You can run `npm run dev` inside any application directory to start their development servers.

Example:
```bash
cd Applications/liqid-showcase
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
