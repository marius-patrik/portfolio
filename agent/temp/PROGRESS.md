# TODO

## How to Use This File

This TODO file serves as a centralized task tracker for the Liqid project. It's designed to be used by both human developers and AI agents.

### For Humans:

- Review this file regularly to track project progress
- Add new tasks as they arise
- Mark tasks as complete when finished
- Update task status as work progresses using emojis
- Use clear, descriptive task descriptions
- Check "Active Checks" section regularly during development
- Review "End of Development" section before finalizing releases

### For AI Agents:

- Read this file at the start of a coding session to understand pending work
- Update task status when working on items using emojis (e.g., 🔄 when starting, ✅ when done)
- Add new tasks when discovering issues or requirements during development
- Reference this file when planning work to prioritize tasks appropriately
- Use the task descriptions to understand context and requirements
- **MANDATORY**: Check "Active Checks" section items during every coding session
- **MANDATORY**: Review "End of Development" section before marking any release as complete

### Status Emojis:

- ⬜ Pending / Not started
- 🔄 In progress
- ✅ Completed
- ❌ Cancelled

---

## Tasks

- ✅ Make sure tailwind is only used in liqid library (removed @apply from desktop, verified docs has no Tailwind usage)
- ✅ Make an alias for liqid-components liqid (renamed to liqid)
- ✅ Make sure all apps use purely liqid components with just props for styling (verified all desktop components use liqid)
- ✅ Make component default variants unstyled
- ✅ For visual styles, add themeStyle prop instead of using variant prop
- ✅ Make default theme for all components selectable via config file with environment variable support, add glass, flat, frosted, and material themes
- ✅ Make a types package (created @liqid/types as git submodule)
- ✅ Dark mode and layout switching handled entirely by library (added ThemeProvider, useTheme, DarkModeToggle, LayoutProvider, useLayout, LayoutSwitcher components)

---

## Active Checks

**These items must be checked regularly during development, not just at the end.**

These are ongoing requirements that should be verified during every coding session:

- ✅ Ensure all apps use only liqid components (no vanilla HTML/React components) - verified desktop components
- ✅ Verify Tailwind CSS is only used in liqid package, not in docs or showcase-desktop - verified docs has no Tailwind
- ✅ Check that component APIs match their documentation - fixed Button (as prop), Stack (themeStyle prop), updated documentation
- ✅ Verify all components use `themeStyle` prop for themes, not `variant` prop (Button, Card, Box, Stack updated, all usages updated)
- ✅ Ensure code follows Biome linting rules - fixed all linting warnings in ComponentPage.tsx
- ✅ Verify TypeScript types are properly defined (no `any` types) - replaced all `any` types with proper types in ComponentPage.tsx

---

## End of Development

**These items should only be done at the end of development or before releases.**

These tasks are typically performed once development is complete or before finalizing a release:

- ✅ Final documentation review and updates
- ✅ Performance optimization and bundle size analysis
- ✅ Accessibility audit and fixes
- ✅ Cross-browser testing
- ✅ Final build verification for all packages
- ✅ Release notes preparation
- ✅ Version bumping and changelog updates
