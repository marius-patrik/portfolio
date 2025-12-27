# TODO

## Instructions

**Human**: Add tasks with ⬜. Update status as work progresses.
**Agent**: Check this file every response. Update status after completing items.

### Status Legend

| Icon | Title   | Meaning     |
| ---- | ------- | ----------- |
| ⬜   | Todo    | Not started |
| 🔄   | Active  | In progress |
| ✅   | Done    | Completed   |
| 🚫   | Blocked | Needs input |

---

## Pre-Publish

- ✅ Add `description`, `author`, `license`, `repository` to package.json
- ✅ Migrate existing components (Button, Card, Box, Spacer, Loading)
- ⬜ Migrate to pure CSS (after component migration)
- ⬜ Update version
- ⬜ Publish to npm

## Component Refactoring

- ✅ Consolidate buttons into single Button component with variants
- ✅ Consolidate links into single Link component with variants
- ✅ Consolidate cards into single Card component
- ✅ Add Loading (variants: bar, spinner)
- ⬜ Remove specialized app logic from components
- ✅ Extend React interfaces for customization
- ✅ Make all component exports match their filenames
- ✅ Add all component exports to the index file
- ✅ Implement Grid, Flex, Stack, and Group components with Tailwind
- ✅ Migrate Interface components (AppIcon, Footer, Header, Modal)
- ✅ Merge Interface utility classes into styles.css

## Documentation

- ⬜ Add component documentation
- ⬜ Add usage examples
