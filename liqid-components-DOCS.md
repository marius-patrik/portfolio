# Liqid Components - API Reference

Complete API documentation for all exported components.

---

## Core Components

### Button

Versatile button with multiple variants.

```tsx
import { Button } from "liqid";

<Button variant="glass" type="button" onClick={() => {}}>
  Click me
</Button>;
```

| Prop       | Type                                               | Default    | Description                    |
| ---------- | -------------------------------------------------- | ---------- | ------------------------------ |
| `variant`  | `"glass" \| "glass-highlight" \| "icon" \| "text"` | `"glass"`  | Visual style variant           |
| `type`     | `"button" \| "submit" \| "reset" \| "link"`        | `"button"` | Button behavior type           |
| `href`     | `string`                                           | -          | Link URL (when type is "link") |
| `children` | `ReactNode`                                        | -          | Button content                 |

---

### Card

Container component with glassmorphism styling.

```tsx
import { Card } from "liqid";

<Card variant="glass" header={<h2>Title</h2>} footer={<Button>Action</Button>}>
  Card content
</Card>;
```

| Prop       | Type                                     | Default   | Description          |
| ---------- | ---------------------------------------- | --------- | -------------------- |
| `variant`  | `"glass" \| "glass-highlight" \| "flat"` | `"glass"` | Visual style variant |
| `header`   | `ReactNode`                              | -         | Header slot content  |
| `footer`   | `ReactNode`                              | -         | Footer slot content  |
| `children` | `ReactNode`                              | -         | Card body content    |

---

### Loading

Loading indicator bar.

```tsx
import { Loading } from "liqid";

<Loading variant="glass" />;
```

| Prop      | Type                   | Default   | Description          |
| --------- | ---------------------- | --------- | -------------------- |
| `variant` | `"glass" \| "primary"` | `"glass"` | Visual style variant |

---

## Layout Components

### Box

Display container with title and action buttons.

```tsx
import { Box } from "liqid";

<Box title="Section Title" buttons={<Button>Add</Button>}>
  Content
</Box>;
```

| Prop       | Type        | Default | Description         |
| ---------- | ----------- | ------- | ------------------- |
| `title`    | `string`    | -       | Box title           |
| `buttons`  | `ReactNode` | -       | Action buttons slot |
| `children` | `ReactNode` | -       | Box content         |

---

### Grid

CSS Grid wrapper component.

```tsx
import { Grid } from "liqid";

<Grid cols={3} gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>;
```

| Prop       | Type                                     | Default | Description       |
| ---------- | ---------------------------------------- | ------- | ----------------- |
| `cols`     | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 12`       | `1`     | Number of columns |
| `gap`      | `"none" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"`  | Gap between items |
| `children` | `ReactNode`                              | -       | Grid items        |

---

### Flex

Flexbox wrapper component.

```tsx
import { Flex } from "liqid";

<Flex direction="row" justify="between" align="center" gap="md">
  <div>Left</div>
  <div>Right</div>
</Flex>;
```

| Prop        | Type                                                                | Default     | Description       |
| ----------- | ------------------------------------------------------------------- | ----------- | ----------------- |
| `direction` | `"row" \| "col" \| "row-reverse" \| "col-reverse"`                  | `"row"`     | Flex direction    |
| `justify`   | `"start" \| "end" \| "center" \| "between" \| "around" \| "evenly"` | `"start"`   | Justify content   |
| `align`     | `"start" \| "end" \| "center" \| "stretch" \| "baseline"`           | `"stretch"` | Align items       |
| `gap`       | `"none" \| "sm" \| "md" \| "lg" \| "xl"`                            | `"none"`    | Gap between items |
| `children`  | `ReactNode`                                                         | -           | Flex items        |

---

### Stack

Vertical flex container (shorthand for `Flex direction="col"`).

```tsx
import { Stack } from "liqid";

<Stack gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>;
```

| Prop       | Type                                     | Default | Description       |
| ---------- | ---------------------------------------- | ------- | ----------------- |
| `gap`      | `"none" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"`  | Gap between items |
| `children` | `ReactNode`                              | -       | Stack items       |

---

### Group

Horizontal flex container (shorthand for `Flex direction="row"`).

```tsx
import { Group } from "liqid";

<Group gap="sm">
  <Button>Save</Button>
  <Button>Cancel</Button>
</Group>;
```

| Prop       | Type                                     | Default | Description       |
| ---------- | ---------------------------------------- | ------- | ----------------- |
| `gap`      | `"none" \| "sm" \| "md" \| "lg" \| "xl"` | `"sm"`  | Gap between items |
| `children` | `ReactNode`                              | -       | Group items       |

---

### Spacer

Flexible spacing element that expands to fill available space.

```tsx
import { Spacer } from "liqid";

<Flex>
  <div>Left</div>
  <Spacer />
  <div>Right</div>
</Flex>;
```

No props.

---

## Interface Components

### Shell

Desktop shell container with header, footer, and page management.

```tsx
import { Shell } from "liqid";

<Shell
  header={<Header />}
  footer={<Footer />}
  pages={[{ id: "home", content: <HomePage /> }]}
  activePage="home"
/>;
```

| Prop         | Type               | Default | Description                     |
| ------------ | ------------------ | ------- | ------------------------------- |
| `header`     | `ReactNode`        | -       | Header component                |
| `footer`     | `ReactNode`        | -       | Footer/dock component           |
| `pages`      | `ShellPageProps[]` | -       | Array of page configurations    |
| `activePage` | `string`           | -       | ID of the currently active page |
| `children`   | `ReactNode`        | -       | Desktop content (icons, etc.)   |

---

### AppIcon

Desktop-style application icon.

```tsx
import { AppIcon } from "liqid";

<AppIcon icon={<IconHome />} label="Home" onClick={() => {}} />;
```

| Prop      | Type         | Default | Description     |
| --------- | ------------ | ------- | --------------- |
| `icon`    | `ReactNode`  | -       | Icon element    |
| `label`   | `string`     | -       | Icon label text |
| `onClick` | `() => void` | -       | Click handler   |

---

### Header

Application header/status bar.

```tsx
import { Header } from "liqid";

<Header>
  <span>Status info</span>
</Header>;
```

| Prop       | Type        | Default | Description    |
| ---------- | ----------- | ------- | -------------- |
| `children` | `ReactNode` | -       | Header content |

---

### Footer

Application footer/dock bar.

```tsx
import { Footer } from "liqid";

<Footer>
  <AppIcon icon={<IconHome />} label="Home" />
</Footer>;
```

| Prop       | Type        | Default | Description |
| ---------- | ----------- | ------- | ----------- |
| `children` | `ReactNode` | -       | Dock items  |

---

### Modal

Modal dialog overlay.

```tsx
import { Modal } from "liqid";

<Modal isOpen={true} onClose={() => {}} title="Dialog Title">
  Modal content
</Modal>;
```

| Prop       | Type         | Default | Description         |
| ---------- | ------------ | ------- | ------------------- |
| `isOpen`   | `boolean`    | -       | Controls visibility |
| `onClose`  | `() => void` | -       | Close handler       |
| `title`    | `string`     | -       | Modal title         |
| `children` | `ReactNode`  | -       | Modal body content  |
