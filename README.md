# Liqid Monorepo

Welcome to the **Liqid** project monorepo. This repository houses the ecosystem for the Liqid design system and applications.

## Structure

- **[liqid-components](./liqid-components)**: Core React component library with glassmorphism styling (Rslib)
- **[liqid-ui](./liqid-ui)**: Desktop UI library for window management and shells (Rslib)
- **[liqid-docs](./liqid-docs)**: Documentation website (Rsbuild App)
- **[liqid-showcase](./liqid-showcase)**: Demo desktop showcase application (Rsbuild App)

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/marius-patrik/liqid.git
   cd liqid
   ```

2. **Initialize submodules:**

   ```bash
   git submodule update --init --recursive
   ```

3. **Install dependencies:**
   Navigate to any submodule to install its specific dependencies.
   ```bash
   cd liqid-components
   npm install
   ```

## Development

Each submodule is independent. You can run `npm run dev` inside `liqid-docs` or `liqid-playground` to start their development servers.

## Scripts

| Script            | Description                                      |
| ----------------- | ------------------------------------------------ |
| `./push_all.sh`   | Push all submodules and root repo to origin/main |
| `./squash_all.sh` | Squash all history and force push (destructive)  |

These scripts are also available as VS Code tasks via **Tasks: Run Task**.

## License

MIT
