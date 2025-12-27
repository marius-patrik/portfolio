# Liqid Showcase

A desktop explorer portfolio app built using my **Liqid** component library and **Liqid UI** desktop library. This project showcases the capabilities of the Liqid ecosystem by providing a fully functional OS-like interface and a suite of custom applications.

![Desktop Preview](assets/preview.png)

## Features

- 🖥️ **Desktop Interface** - Draggable and resizable windows with z-index management
- 🎨 **Customizable Wallpaper** - Choose from color presets or upload your own image
- 🔐 **Email Authentication** - Passwordless login with 6-digit verification codes
- 📱 **Responsive Design** - Touch support for mobile devices
- 🌙 **Glassmorphism UI** - Modern frosted glass aesthetic

## Apps

**Showcase Apps** (Built with Liqid):
Calculator, Calendar, Camera, Clock, E-shop, Games, Messages, Notes, Phone, Pokédex, To-Do List

**System Apps** (Liqid UI):
Browser, Files, Search, Settings, Trash

## Tech Stack

| Layer    | Technology                                   |
| -------- | -------------------------------------------- |
| Frontend | React 19, TypeScript, Tailwind CSS 4, wouter |
| Backend  | Express 5, Kysely, better-sqlite3            |
| Auth     | JWT, Nodemailer                              |
| Build    | Rsbuild, Biome                               |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (frontend + backend)
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start frontend + backend concurrently |
| `npm run build`   | Build for production                  |
| `npm run preview` | Preview production build              |
| `npm run check`   | Lint with Biome                       |
| `npm run format`  | Format code with Biome                |

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_PATH=./data.sqlite
JWT_SECRET=your-secret-key
NODEMAILER_TRANSPORT=json
```

| Variable               | Description                            |
| ---------------------- | -------------------------------------- |
| `DATABASE_PATH`        | SQLite file path (default: `:memory:`) |
| `JWT_SECRET`           | JWT signing secret                     |
| `NODEMAILER_TRANSPORT` | `json` (debug) or `smtp`               |
| `SMTP_HOST`            | SMTP server host                       |
| `SMTP_PORT`            | SMTP server port                       |

## Project Structure

```
src/
├── pages/           # Route pages (explorer, login)
├── components/
│   ├── Apps/        # Desktop applications (16 apps)
│   ├── Interface/   # UI components (Header, Footer, etc.)
│   └── WindowManager/ # Window management system
├── hooks/           # React hooks (useWallpaper)
└── server/          # Express API (auth, db)
```

## License

MIT
