export type ProjectCategory = "code" | "hardware";

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  category: ProjectCategory;
  readmePath: string;
  slug: string;
}

export const projects: Project[] = [
  // Code Projects
  {
    id: "liqid-docs",
    name: "Liqid Docs",
    description:
      "Official documentation website for the Liqid component library with comprehensive component docs, interactive examples, and usage guides.",
    techStack: [
      "React 19",
      "TypeScript",
      "Rsbuild",
      "Tailwind CSS 4",
      "Liqid Components",
    ],
    category: "code",
    readmePath: "../../../liqid-docs/README.md",
    slug: "liqid-docs",
  },
  {
    id: "liqid-showcase",
    name: "Liqid Showcase",
    description:
      "A desktop explorer portfolio app showcasing the Liqid design system with window management, custom apps, and glassmorphism UI.",
    techStack: [
      "React 19",
      "TypeScript",
      "Express.js",
      "SQLite",
      "Liqid UI",
      "Wouter",
    ],
    category: "code",
    readmePath: "../../../liqid-showcase/README.md",
    slug: "liqid-showcase",
  },
  {
    id: "phonebooth",
    name: "Phonebooth",
    description:
      "A modern VoIP calling application built as a monorepo with a React frontend and Express.js backend for making international calls.",
    techStack: [
      "React 19",
      "TypeScript",
      "Express.js",
      "Kysely",
      "SQLite",
      "JWT",
      "SWR",
      "Wouter",
    ],
    category: "code",
    readmePath: "../../../phonebooth/README.md",
    slug: "phonebooth",
  },
  {
    id: "pokedex",
    name: "Pokedex",
    description:
      "Pokémon database application for browsing and searching Pokémon information.",
    techStack: ["React 19", "TypeScript", "Rsbuild", "Liqid Components"],
    category: "code",
    readmePath: "../../../pokedex/README.md",
    slug: "pokedex",
  },
  {
    id: "tradebot",
    name: "TradeBot",
    description:
      "CFD trading bot for IG Markets with React dashboard and TradingView charts for automated trading strategies.",
    techStack: [
      "React 19",
      "TypeScript",
      "Express.js",
      "IG Markets API",
      "TradingView Charts",
      "Kysely",
      "JWT",
    ],
    category: "code",
    readmePath: "../../../tradebot/README.md",
    slug: "tradebot",
  },
  // Hardware Projects
  {
    id: "linear-actuator",
    name: "Linear Actuator",
    description:
      "Linear actuator hardware project for precise linear motion control.",
    techStack: ["Hardware", "Electronics", "Mechanical Engineering"],
    category: "hardware",
    readmePath: "../../../../Hardware/LinearActuator/README.md",
    slug: "linear-actuator",
  },
  {
    id: "robot-arm",
    name: "Robot Arm",
    description:
      "Robotic arm project with multi-axis control and precision movement.",
    techStack: [
      "Hardware",
      "Robotics",
      "Electronics",
      "Mechanical Engineering",
    ],
    category: "hardware",
    readmePath: "../../../../Hardware/RobotArm/README.md",
    slug: "robot-arm",
  },
  {
    id: "rotary-actuator",
    name: "Rotary Actuator",
    description:
      "Rotary actuator hardware project for rotational motion control.",
    techStack: ["Hardware", "Electronics", "Mechanical Engineering"],
    category: "hardware",
    readmePath: "../../../../Hardware/RotaryActuator/README.md",
    slug: "rotary-actuator",
  },
  {
    id: "super-human-robot",
    name: "Super Human Robot",
    description:
      "Advanced humanoid robot project with advanced control systems.",
    techStack: [
      "Hardware",
      "Robotics",
      "AI",
      "Electronics",
      "Mechanical Engineering",
    ],
    category: "hardware",
    readmePath: "../../../../Hardware/SuperHumanRobot/README.md",
    slug: "super-human-robot",
  },
  {
    id: "vr-headset",
    name: "VR Headset",
    description:
      "Virtual reality headset hardware project with immersive display technology.",
    techStack: [
      "Hardware",
      "VR",
      "Electronics",
      "Display Technology",
      "Optics",
    ],
    category: "hardware",
    readmePath: "../../../../Hardware/VRHeadset/README.md",
    slug: "vr-headset",
  },
];

export const codeProjects = projects.filter((p) => p.category === "code");
export const hardwareProjects = projects.filter(
  (p) => p.category === "hardware",
);

export function getProjectBySlug(
  category: ProjectCategory,
  slug: string,
): Project | undefined {
  return projects.find((p) => p.category === category && p.slug === slug);
}
