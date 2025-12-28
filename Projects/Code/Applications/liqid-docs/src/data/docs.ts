export interface ComponentDoc {
  title: string;
  description: string;
  usage: string;
  props: {
    name: string;
    type: string;
    default: string;
    description: string;
  }[];
}

export const docs: ComponentDoc[] = [
  {
    title: "Button",
    description: "Versatile button with multiple variants.",
    usage: `import { Button } from "liqid";

<Button variant="glass" type="button" onClick={() => {}}>
  Click me
</Button>;`,
    props: [
      {
        name: "variant",
        type: '"glass" | "glass-highlight" | "icon" | "text"',
        default: '"glass"',
        description: "Visual style variant",
      },
      {
        name: "type",
        type: '"button" | "submit" | "reset" | "link"',
        default: '"button"',
        description: "Button behavior type",
      },
      {
        name: "href",
        type: "string",
        default: "-",
        description: 'Link URL (when type is "link")',
      },
      {
        name: "children",
        type: "ReactNode",
        default: "-",
        description: "Button content",
      },
    ],
  },
  {
    title: "Card",
    description: "Container component with glassmorphism styling.",
    usage: `import { Card } from "liqid";

<Card variant="glass" header={<h2>Title</h2>} footer={<Button>Action</Button>}>
  Card content
</Card>;`,
    props: [
      {
        name: "variant",
        type: '"glass" | "glass-highlight" | "flat"',
        default: '"glass"',
        description: "Visual style variant",
      },
      {
        name: "header",
        type: "ReactNode",
        default: "-",
        description: "Header slot content",
      },
      {
        name: "footer",
        type: "ReactNode",
        default: "-",
        description: "Footer slot content",
      },
      {
        name: "children",
        type: "ReactNode",
        default: "-",
        description: "Card body content",
      },
    ],
  },
  {
    title: "Loading",
    description: "Loading indicator bar.",
    usage: `import { Loading } from "liqid";

<Loading variant="glass" />;`,
    props: [
      {
        name: "variant",
        type: '"glass" | "primary"',
        default: '"glass"',
        description: "Visual style variant",
      },
    ],
  },
  {
    title: "Box",
    description: "Display container with title and action buttons.",
    usage: `import { Box } from "liqid";

<Box title="Section Title" buttons={<Button>Add</Button>}>
  Content
</Box>;`,
    props: [
      {
        name: "title",
        type: "string",
        default: "-",
        description: "Box title",
      },
      {
        name: "buttons",
        type: "ReactNode",
        default: "-",
        description: "Action buttons slot",
      },
      {
        name: "children",
        type: "ReactNode",
        default: "-",
        description: "Box content",
      },
    ],
  },
  {
    title: "Grid",
    description: "CSS Grid wrapper component.",
    usage: `import { Grid } from "liqid";

<Grid cols={3} gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>;`,
    props: [
      {
        name: "cols",
        type: "1 | 2 | 3 | 4 | 5 | 6 | 12",
        default: "1",
        description: "Number of columns",
      },
      {
        name: "gap",
        type: '"none" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: "Gap between items",
      },
      {
        name: "children",
        type: "ReactNode",
        default: "-",
        description: "Grid items",
      },
    ],
  },
  {
    title: "Flex",
    description: "Flexbox wrapper component.",
    usage: `import { Flex } from "liqid";

<Flex direction="row" justify="between" align="center" gap="md">
  <div>Left</div>
  <div>Right</div>
</Flex>;`,
    props: [
      {
        name: "direction",
        type: '"row" | "col" | "row-reverse" | "col-reverse"',
        default: '"row"',
        description: "Flex direction",
      },
      {
        name: "justify",
        type: '"start" | "end" | "center" | "between" | "around" | "evenly"',
        default: '"start"',
        description: "Justify content",
      },
      {
        name: "align",
        type: '"start" | "end" | "center" | "stretch" | "baseline"',
        default: '"stretch"',
        description: "Align items",
      },
      {
        name: "gap",
        type: '"none" | "sm" | "md" | "lg" | "xl"',
        default: '"none"',
        description: "Gap between items",
      },
      {
        name: "children",
        type: "ReactNode",
        default: "-",
        description: "Flex items",
      },
    ],
  },
  {
    title: "Stack",
    description:
      'Vertical flex container (shorthand for Flex direction="col").',
    usage: `import { Stack } from "liqid";

<Stack gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>;`,
    props: [
      {
        name: "gap",
        type: '"none" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: "Gap between items",
      },
      {
        name: "children",
        type: "ReactNode",
        default: "-",
        description: "Stack items",
      },
    ],
  },
  {
    title: "Group",
    description:
      'Horizontal flex container (shorthand for Flex direction="row").',
    usage: `import { Group } from "liqid";

<Group gap="sm">
  <Button>Save</Button>
  <Button>Cancel</Button>
</Group>;`,
    props: [
      {
        name: "gap",
        type: '"none" | "sm" | "md" | "lg" | "xl"',
        default: '"sm"',
        description: "Gap between items",
      },
      {
        name: "children",
        type: "ReactNode",
        default: "-",
        description: "Group items",
      },
    ],
  },
  {
    title: "Spacer",
    description:
      "Flexible spacing element that expands to fill available space.",
    usage: `import { Spacer } from "liqid";

<Flex>
  <div>Left</div>
  <Spacer />
  <div>Right</div>
</Flex>;`,
    props: [],
  },
  {
    title: "Shell",
    description:
      "Desktop shell container with header, footer, and page management.",
    usage: `import { Shell } from "liqid";

<Shell
  header={<Header />}
  footer={<Footer />}
  pages={[{ id: "home", content: <HomePage /> }]}
  activePage="home"
  activeAppId="home" 
/>;`,
    props: [
      {
        name: "header",
        type: "ReactNode",
        default: "-",
        description: "Header component",
      },
      {
        name: "footer",
        type: "ReactNode",
        default: "-",
        description: "Footer/dock component",
      },
      {
        name: "pages",
        type: "ShellPageProps[]",
        default: "-",
        description: "Array of page configurations",
      },
      {
        name: "activePage",
        type: "string",
        default: "-",
        description: "ID of the currently active page",
      },
      {
        name: "children",
        type: "ReactNode",
        default: "-",
        description: "Desktop content (icons, etc.)",
      },
    ],
  },
  {
    title: "AppIcon",
    description: "Desktop-style application icon.",
    usage: `import { AppIcon } from "liqid";

<AppIcon icon={<IconHome />} label="Home" onClick={() => {}} />;`,
    props: [
      {
        name: "icon",
        type: "ReactNode",
        default: "-",
        description: "Icon element",
      },
      {
        name: "label",
        type: "string",
        default: "-",
        description: "Icon label text",
      },
      {
        name: "onClick",
        type: "() => void",
        default: "-",
        description: "Click handler",
      },
    ],
  },
  {
    title: "Header",
    description: "Application header/status bar.",
    usage: `import { Header } from "liqid";

<Header>
  <span>Status info</span>
</Header>;`,
    props: [
      {
        name: "children",
        type: "ReactNode",
        default: "-",
        description: "Header content",
      },
    ],
  },
  {
    title: "Footer",
    description: "Application footer/dock bar.",
    usage: `import { Footer } from "liqid";

<Footer>
  <AppIcon icon={<IconHome />} label="Home" />
</Footer>;`,
    props: [
      {
        name: "children",
        type: "ReactNode",
        default: "-",
        description: "Dock items",
      },
    ],
  },
  {
    title: "Modal",
    description: "Modal dialog overlay.",
    usage: `import { Modal } from "liqid";

<Modal isOpen={true} onClose={() => {}} title="Dialog Title">
  Modal content
</Modal>;`,
    props: [
      {
        name: "isOpen",
        type: "boolean",
        default: "-",
        description: "Controls visibility",
      },
      {
        name: "onClose",
        type: "() => void",
        default: "-",
        description: "Close handler",
      },
      {
        name: "title",
        type: "string",
        default: "-",
        description: "Modal title",
      },
      {
        name: "children",
        type: "ReactNode",
        default: "-",
        description: "Modal body content",
      },
    ],
  },
];
