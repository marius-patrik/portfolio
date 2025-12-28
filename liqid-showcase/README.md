# 🖥️ Liqid Showcase

<div align="center">

**A desktop explorer portfolio app showcasing the Liqid design system**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 🎯 Overview

**Liqid Showcase** is a fully functional desktop-like portfolio application built using the **Liqid** component library and **Liqid UI** desktop library. This project demonstrates the capabilities of the Liqid ecosystem by providing a complete OS-like interface with a suite of custom applications, window management, and modern glassmorphism design.

### ✨ Key Features

- 🖥️ **Desktop Interface** - Draggable and resizable windows with z-index management
- 🎨 **Customizable Wallpaper** - Choose from color presets or upload your own image
- 🔐 **Email Authentication** - Passwordless login with 6-digit verification codes
- 📱 **Responsive Design** - Touch support for mobile devices
- 🌙 **Glassmorphism UI** - Modern frosted glass aesthetic throughout
- 🪟 **Window Management** - Full window system with minimize, maximize, and close
- 🎯 **Multiple Apps** - 16+ custom applications showcasing various use cases

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/marius-patrik/liqid.git
cd liqid/apps/liqid-showcase

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_PATH=./data.sqlite

# Authentication
JWT_SECRET=your-secret-key-here

# Email (Development)
NODEMAILER_TRANSPORT=json

# Email (Production)
# NODEMAILER_TRANSPORT=smtp
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=your-email@example.com
# SMTP_PASS=your-password
```

You can copy `example.env` as a starting point:

```bash
cp example.env .env
```

### Development

Start both frontend and backend concurrently:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

#### Development Options

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend + all sub-apps |
| `npm run dev:core` | Start only frontend + backend |
| `npm run dev:frontend` | Start only frontend |
| `npm run dev:backend` | Start only backend |
| `npm run dev:phonebooth` | Start Phonebooth sub-app |
| `npm run dev:tradebot` | Start TradeBot sub-app |
| `npm run dev:pokedex` | Start Pokédex sub-app |

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

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.x | UI framework |
| **TypeScript** | 5.9.x | Type safety |
| **Tailwind CSS** | 4.1.x | Styling |
| **wouter** | 3.8.x | Routing |
| **SWR** | 2.3.x | Data fetching |
| **Rsbuild** | 1.6.x | Build tool |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Express** | 5.2.x | Web server |
| **Kysely** | 0.28.x | SQL query builder |
| **better-sqlite3** | 12.5.x | SQLite database |
| **JWT** | 9.0.x | Authentication |
| **Nodemailer** | 7.0.x | Email service |

### Development Tools

| Tool | Purpose |
|------|---------|
| **Biome** | Linting and formatting |
| **tsx** | TypeScript execution |
| **concurrently** | Run multiple processes |

---

## 📱 Applications

### Showcase Apps

Built with **Liqid Components**:

| App | Description |
|-----|-------------|
| **Calculator** | Full-featured calculator with basic operations |
| **Calendar** | Interactive calendar with date selection |
| **Camera** | Camera interface with filters and capture |
| **Clock** | Analog and digital clock displays |
| **E-shop** | E-commerce interface with product browsing |
| **Games** | Collection of mini-games |
| **Messages** | Messaging interface with conversations |
| **Notes** | Note-taking app with rich text editing |
| **Phone** | Phone dialer and call interface |
| **Pokédex** | Pokémon database browser |
| **To-Do List** | Task management application |

### System Apps

Built with **Liqid UI**:

| App | Description |
|-----|-------------|
| **Browser** | Web browser interface |
| **Files** | File explorer and manager |
| **Search** | System-wide search functionality |
| **Settings** | System settings and preferences |
| **Trash** | Deleted items management |

### Sub-Applications

Integrated sub-applications:

- **Phonebooth** - VoIP calling application
- **TradeBot** - Trading bot interface
- **Pokédex** - Pokémon database application

---

## 🏗️ Project Structure

```
liqid-showcase/
├── public/                    # Static assets
│   ├── favicon.png
│   └── wallpaper.png
├── src/
│   ├── components/
│   │   ├── Apps/             # Desktop applications
│   │   │   ├── Calculator/
│   │   │   ├── Calendar/
│   │   │   ├── Camera/
│   │   │   ├── Clock/
│   │   │   ├── Eshop/
│   │   │   ├── Games/
│   │   │   ├── Messages/
│   │   │   ├── Notes/
│   │   │   ├── phonebooth/   # Submodule
│   │   │   ├── Pokedex/
│   │   │   ├── pokedex/      # Submodule
│   │   │   ├── tradebot/     # Submodule
│   │   │   └── ...
│   │   └── Interface/        # UI components
│   │       ├── Login/
│   │       ├── Modal/
│   │       └── SystemInfo/
│   ├── pages/                # Route pages
│   │   ├── explorer.tsx      # Main desktop
│   │   └── login.tsx         # Login page
│   ├── server/               # Express backend
│   │   ├── auth.ts           # Authentication logic
│   │   ├── db.ts             # Database setup
│   │   ├── index.ts          # Server entry
│   │   └── types.ts          # Type definitions
│   ├── hooks/                # Custom React hooks
│   ├── App.css               # App styles
│   ├── global.css            # Global styles
│   └── index.tsx             # Entry point
├── rsbuild.config.ts         # Rsbuild configuration
├── tsconfig.json             # TypeScript configuration
├── biome.json                # Biome configuration
└── package.json              # Dependencies
```

---

## 🔐 Authentication

The application uses **passwordless email authentication**:

1. User enters their email address
2. System sends a 6-digit verification code
3. User enters the code to authenticate
4. JWT token is issued for session management

### Email Configuration

#### Development Mode

Set `NODEMAILER_TRANSPORT=json` to use file-based email logging (no actual emails sent).

#### Production Mode

Configure SMTP settings:

```env
NODEMAILER_TRANSPORT=smtp
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
```

---

## 🗄️ Database

The application uses **SQLite** for data storage. The database file is created automatically on first run.

### Database Schema

- **Users** - User accounts and authentication
- **Sessions** - Active user sessions
- **Applications** - App-specific data (varies by app)

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all services (frontend + backend + sub-apps) |
| `npm run dev:core` | Start frontend + backend only |
| `npm run dev:frontend` | Start frontend development server |
| `npm run dev:backend` | Start backend server in watch mode |
| `npm run dev:phonebooth` | Start Phonebooth sub-app |
| `npm run dev:tradebot` | Start TradeBot sub-app |
| `npm run dev:pokedex` | Start Pokédex sub-app |
| `npm run dev:all` | Start all services concurrently |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Lint code with Biome |
| `npm run format` | Format code with Biome |
| `npm run lint` | Lint and fix code |
| `npm run deploy` | Build and deploy to GitHub Pages |

---

## 🎨 Features in Detail

### Window Management

- **Draggable Windows** - Click and drag window headers to move
- **Resizable Windows** - Drag window edges to resize
- **Z-Index Management** - Clicking a window brings it to front
- **Minimize/Maximize** - Window controls for managing state
- **Close Windows** - Close button to dismiss windows

### Desktop Features

- **Wallpaper Customization** - Set custom wallpapers or use presets
- **Desktop Icons** - Click icons to launch applications
- **Taskbar/Dock** - Quick access to running applications
- **System Search** - Search across applications and files

### Responsive Design

- **Touch Support** - Full touch interaction on mobile devices
- **Adaptive Layout** - Layout adjusts for different screen sizes
- **Mobile Optimizations** - Optimized UI for smaller screens

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_PATH` | SQLite database file path | `:memory:` |
| `JWT_SECRET` | Secret key for JWT signing | Required |
| `NODEMAILER_TRANSPORT` | Email transport type (`json` or `smtp`) | `json` |
| `SMTP_HOST` | SMTP server hostname | - |
| `SMTP_PORT` | SMTP server port | - |
| `SMTP_USER` | SMTP username | - |
| `SMTP_PASS` | SMTP password | - |

---

## 📦 Dependencies

### Core Dependencies

- **react** ^19.2.1 - React library
- **react-dom** ^19.2.1 - React DOM renderer
- **liqid-components** - Liqid component library (local)
- **liqid-ui** - Liqid UI library (local)
- **wouter** ^3.8.1 - Routing
- **swr** ^2.3.7 - Data fetching
- **express** ^5.2.1 - Web server
- **kysely** ^0.28.8 - SQL query builder
- **better-sqlite3** ^12.5.0 - SQLite database
- **jsonwebtoken** ^9.0.3 - JWT authentication
- **nodemailer** ^7.0.11 - Email service

### Development Dependencies

- **@rsbuild/core** ^1.6.12 - Build tool
- **@rsbuild/plugin-react** ^1.4.2 - React plugin
- **@biomejs/biome** 2.3.8 - Linter and formatter
- **tsx** ^4.21.0 - TypeScript execution
- **concurrently** ^9.2.1 - Process management
- **tailwindcss** ^4.1.18 - CSS framework

---

## 🚢 Deployment

### GitHub Pages

The project can be deployed to GitHub Pages:

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

### Custom Deployment

1. Build the project: `npm run build`
2. The `dist/` folder contains the production build
3. Deploy the contents of `dist/` to your hosting service

**Note:** For production deployment, ensure you:
- Set up proper environment variables
- Configure SMTP for email authentication
- Use a persistent database (not `:memory:`)
- Set a secure `JWT_SECRET`

---

## 🤝 Contributing

Contributions are welcome! When contributing:

1. Follow the existing code style
2. Add tests for new features
3. Update documentation as needed
4. Ensure all scripts pass

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🔗 Related Projects

- **[liqid-components](../libraries/liqid-components/)** - Core component library
- **[liqid-ui](../libraries/liqid-ui/)** - Desktop UI library
- **[liqid-docs](../liqid-docs/)** - Documentation website

---

## 📞 Support

For questions, issues, or contributions, please visit the main [Liqid repository](https://github.com/marius-patrik/liqid).

---

<div align="center">

**Built with ❤️ using Liqid**

</div>
