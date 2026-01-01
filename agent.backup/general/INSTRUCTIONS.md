# Agent Instructions for Liqid Library

> **IMPORTANT**: This file contains AI agent-specific instructions. For project guidelines, code standards, and development workflow, see [PROJECT.md](PROJECT.md).

## Project Reference

**MANDATORY**: Before starting any work, review [PROJECT.md](PROJECT.md) which contains:

- Project overview and monorepo structure
- Technology stack and key exports
- Development workflow and build commands
- Code standards and styling guidelines
- Component usage requirements
- Package-specific guidelines
- Architecture decisions

All project guidelines are established in PROJECT.md. This file (.cursorrules) focuses on AI agent behavior and task management.

## Session Initialization

**MANDATORY**: At the beginning of every coding session, the agent MUST:

1. **Analyze All Documentation**:
   - Read and understand [PROJECT.md](PROJECT.md) for project guidelines and standards
   - Read [README.md](README.md) for project overview and structure
   - Read [TODO.md](TODO.md) to understand current tasks and status
   - Read [COMMANDS.md](COMMANDS.md) for command documentation
   - Read all package README files (liqid/README.md, docs/README.md, etc.)
   - Review component documentation in docs/src/data/ if relevant

2. **Analyze Codebase Structure**:
   - Review package structure and organization
   - Understand component architecture and patterns
   - Review key configuration files (package.json, build configs, etc.)
   - Understand the theme system, hooks, and utilities
   - Review recent changes if applicable

3. **Establish Context**:
   - Understand the current state of the project
   - Identify any patterns or conventions in use
   - Note any recent changes or ongoing work
   - Prepare to maintain consistency with existing codebase

This initialization ensures the agent has full context before starting any work and maintains consistency with project standards and patterns.

## Task Management Requirements

### MANDATORY: Active Todo List Tracking

- **ALWAYS** use the todo list to track all tasks
- **CRITICAL**: **ALL** agent work MUST be tracked via TODO.md except when the user explicitly uses `:now` or `now:` command
- The `:now` or `now:` command is the **ONLY** exception to mandatory todo tracking
- For all other agent work, the agent MUST:
  - Create a todo entry in TODO.md before starting work (unless using `:now`)
  - Update todo status as work progresses
  - Mark todos complete after full verification (see Quality Assurance Checklist below)
- Create todos for complex tasks (3+ steps)
- Update todo status as work progresses:
  - ⬜ Pending / Not started
  - 🔄 In progress
  - ✅ Completed
  - ❌ Cancelled
- Mark todos complete ONLY after full verification (see Quality Assurance Checklist below)
- **MANDATORY**: Mark tasks as finished (✅) after EVERY task is completed
- Reference TODO.md at the start of every coding session

### MANDATORY: Planning Before Execution

- **ALWAYS** plan out all tasks and feature implementation before proceeding
- Break down complex tasks into clear, actionable steps
- Identify dependencies between tasks
- Estimate the scope and complexity
- **MANDATORY**: Prompt the user with the plan before beginning execution
- Wait for user confirmation before proceeding with implementation
- Update the plan if new information is discovered during execution
- **CRITICAL**: With all tasks, think about the fact that the entire codebase should be consistent
  - Ensure new code follows existing patterns and conventions
  - Maintain consistency in naming, structure, and style across all packages
  - Consider how changes affect the overall architecture and consistency
- **CRITICAL**: Whenever changing any system, realize it's going to affect the entire codebase
  - Consider cross-package dependencies and impacts
  - Evaluate how changes to shared systems (build configs, types, styles, etc.) will affect all packages
  - Test changes across all affected packages, not just the one being modified
  - Plan for cascading updates that may be required in dependent packages

### TODO.md Structure

The TODO.md file is organized into three main sections:

1. **Tasks** - Regular development tasks that can be worked on at any time
   - Features to implement
   - Bugs to fix
   - Refactoring work
   - Documentation updates

2. **Active Checks** - Items that MUST be verified during every coding session
   - These are ongoing requirements that should be checked regularly
   - Examples: ensuring only liqid components are used, verifying Tailwind is only in liqid package, checking component APIs match documentation
   - **MANDATORY**: Review and verify these items during every coding session

3. **End of Development** - Items that should only be done at the end of development or before releases
   - Final documentation review
   - Performance optimization
   - Accessibility audit
   - Cross-browser testing
   - Release preparation tasks
   - **MANDATORY**: Review this section before marking any release as complete

### When to Create Todos

- Complex tasks requiring multiple steps
- Features that need implementation
- Bugs that need fixing
- Refactoring work
- Documentation updates
- Any task that cannot be completed in a single action

### Where to Place Todos

- **Tasks section**: Regular development work, features, bugs, refactoring
- **Active Checks section**: Ongoing requirements that need regular verification (e.g., "ensure only liqid components are used")
- **End of Development section**: Tasks that should only be done at the end (e.g., "final documentation review", "accessibility audit")

## Quality Assurance Checklist (After Every Task)

**MANDATORY**: After completing ANY task, the agent MUST perform ALL of the following:

1. **Confirm Implementation**
   - Verify the feature/code works as intended
   - Test the functionality manually if possible
   - Ensure the implementation matches requirements

2. **Run Lint**
   - Execute `npm run lint` in the relevant package(s)
   - Fix ALL linting issues
   - Do not proceed until linting passes

3. **Run Build**
   - Execute `npm run build` in the relevant package(s)
   - Fix ALL build errors
   - Do not proceed until build succeeds

4. **Test Functionality**
   - Ensure the feature works correctly
   - Test edge cases if applicable
   - Verify no regressions were introduced

5. **Keep Code Simple**
   - Review the code for unnecessary complexity
   - Refactor if code is overly complicated
   - Prefer simple, readable solutions

6. **Update Todo List**
   - **MANDATORY**: Mark completed tasks in TODO.md
   - Update status from 🔄 (in progress) to ✅ (completed)
   - Only mark complete after all quality checks pass
   - **MUST** update todo status after EVERY task completion, not just at the end

7. **Update Documentation**
   - **MANDATORY**: At the end of every feature implementation, update ALL documentation:
     - All README files (.md files) in the repository
     - Component documentation in the docs app (docs package)
     - Code comments if logic changed
     - Component APIs and props documentation
     - Agent instructions (.cursorrules) if workflow or standards changed
   - Ensure documentation accurately reflects the current implementation
   - Verify examples in docs app are functional and up-to-date

**DO NOT skip any of these steps. They are mandatory for every task completion.**

## Component Usage and Code Standards

**MANDATORY**: Follow all guidelines in [PROJECT.md](PROJECT.md) regarding:

- Component usage requirements (use liqid components exclusively)
- Code standards and styling guidelines
- Package-specific guidelines
- Architecture decisions

The agent must enforce these project guidelines during all development work.

**MANDATORY**: Follow Library Code Maintenance guidelines in [PROJECT.md](PROJECT.md) - see the "Library Code Maintenance" section for requirements about updating library code and maintaining consistency between library and apps.

## User Command Handling

> **IMPORTANT**: All command documentation has been moved to [COMMANDS.md](COMMANDS.md). Please refer to that file for complete command documentation.

**Note**: Command prefixes can be used at the beginning OR end of the message. For example:

- `agent: <message>` OR `<message>: agent` - both work the same
- `todo: <message>` OR `<message>: todo` - both work the same
- All commands support both formats

**Command Chaining with Semicolons**:

- When a semicolon (`;`) is used in a command, it means "another thing to do with the same command"
- Example: `agent: something ; else` is equivalent to `agent: something :then agent: else`
- Semicolons allow chaining multiple commands in a single message
- Each command separated by a semicolon is executed sequentially
- The agent should parse semicolon-separated commands and execute them in order

**Alternative Formats for Update Commands**:

- `update: code` OR `:update code` - equivalent to `updatecode:` or `:updatecode`
- `updatecode:` OR `:updatecode` OR `update: code` OR `:update code` - all work the same
- This pattern applies to other update commands as well

For complete documentation of all available commands, see [COMMANDS.md](COMMANDS.md).

## Common Pitfalls

**MANDATORY**: Review the "Common Pitfalls" and "Best Practices" sections in [PROJECT.md](PROJECT.md) for project-specific guidelines.

### Agent-Specific Pitfalls

1. **Don't skip quality checks**
   - Always run lint and build after changes
   - Always test functionality
   - Always update todos

2. **Don't forget to update todos**
   - Mark tasks as in progress when starting
   - Mark tasks as complete when finished
   - Add new todos when discovering issues

3. **Don't forget to update documentation**
   - READMEs should reflect current state
   - Code comments should explain complex logic
   - Component docs should match implementations
   - Update PROJECT.md if project guidelines change

## Getting Help

If you encounter issues or are unsure about implementation:

1. Check existing code for similar patterns
2. Review component examples in docs package
3. Check the TODO.md for related tasks
4. Review [PROJECT.md](PROJECT.md) for project guidelines
5. Review .cursorrules (this file) for agent-specific instructions
6. Follow the quality assurance checklist

## Summary

Remember:

- ✅ **MANDATORY**: Review [PROJECT.md](PROJECT.md) for all project guidelines before starting work
- ✅ Use todo list actively for all tasks
- ✅ **ALWAYS** plan out tasks and features before execution, prompt user with plan
- ✅ Mark tasks as finished (✅) after EVERY task completion
- ✅ Run lint and build after every change
- ✅ Follow all guidelines in [PROJECT.md](PROJECT.md) (component usage, code standards, etc.)
- ✅ Keep code simple and well-documented
- ✅ **MANDATORY**: At end of every feature implementation, update ALL documentation:
  - All .md files (READMEs, PROJECT.md, etc.)
  - Docs app component documentation
  - Agent instructions (.cursorrules) if workflow changed
- ✅ **MANDATORY**: Track ALL agent work via TODO.md except when user explicitly uses `:now` or `now:` command
- ✅ Update todos and documentation after completing tasks
- ✅ Handle all commands appropriately (see [COMMANDS.md](COMMANDS.md) for complete command documentation; prefix can be at beginning or end)
- ✅ Support alternative formats: `update: code` or `:update code` for code updates, `update: docs` or `:update docs` for documentation updates, `update: project` or `:update project` for project updates, `update: commands` or `:update commands` for command documentation updates
- ✅ Support command chaining with semicolons (`;`) - `agent: something ; else` is equivalent to `agent: something :then agent: else`
- ✅ Commands with parameters: `update: <target>` supports `docs`, `code`, `project`, `commands`; `help: <command>` supports any command name; `streamline: <targets>` supports `code`, `docs`, `todo`, `project`, `commands`, or `all` (comma-separated for multiple targets)

Follow these instructions carefully to maintain code quality and project consistency.
