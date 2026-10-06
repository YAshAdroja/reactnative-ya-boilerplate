# React Native Boilerplate — Safe Point-to-Point Update Prompt

## Repository

GitHub:

`https://github.com/YAshAdroja/reactnative-ya-boilerplate.git`

---

# MAIN OBJECTIVE

I already have a working React Native boilerplate.

**DO NOT create a new boilerplate from scratch.**

Your task is to:

> **Review my existing boilerplate and improve it safely without breaking the current working functionality.**

The existing project is the **source of truth**.

Do not replace the architecture blindly.

Do not rewrite the complete project.

Do not make large changes without first understanding the current implementation.

---

# GOLDEN RULE

## Existing functionality must continue working.

Before changing anything:

1. Understand the current implementation.
2. Identify what is already working.
3. Identify what needs improvement.
4. Make the smallest necessary change.
5. Verify the change.
6. Move to the next improvement.

### Never do this:

```text
Existing project
      ↓
Delete everything
      ↓
Create new architecture
```

### Do this:

```text
Existing project
      ↓
Understand
      ↓
Review
      ↓
Improve
      ↓
Verify
      ↓
Keep existing functionality
```

---

# STEP 1 — INSPECT FIRST

Before writing or modifying code, inspect:

- `package.json`
- `src/`
- Navigation
- Redux
- API
- Controllers
- Components
- Utils
- Constants
- Theme
- Configuration
- Android
- iOS
- `App.tsx`
- `index.js` / entry files
- `babel.config.js`
- `metro.config.js`
- `tsconfig.json`
- ESLint configuration
- Prettier configuration
- `.gitignore`
- `README.md`

Do not make changes during the initial inspection.

First understand the project.

---

# STEP 2 — CREATE A CURRENT PROJECT SUMMARY

Before implementation, summarize:

### Current Architecture

Explain how the current application works.

### Current Folder Structure

Explain the responsibility of important folders.

### Current Dependencies

Explain important dependencies.

### Current Data Flow

Explain:

```text
Screen
 ↓
Controller
 ↓
API / Redux
 ↓
Backend
```

Use the actual project architecture instead of assuming this structure.

### Current Strengths

Identify what should remain unchanged.

### Current Problems

Identify what should be improved.

---

# STEP 3 — CREATE A CHANGE PLAN

Before modifying code, create a point-to-point change list.

Use:

```text
1. Change:
   Reason:
   Files:
   Risk:
   Priority:

2. Change:
   Reason:
   Files:
   Risk:
   Priority:
```

Use priorities:

- 🔴 Critical
- 🟠 High
- 🟡 Medium
- 🟢 Optional

---

# STEP 4 — DO NOT IMPLEMENT EVERYTHING AT ONCE

Implement **one logical change at a time**.

For every change:

```text
Review
 ↓
Change
 ↓
Check
 ↓
Verify
 ↓
Continue
```

Do not make 20 unrelated changes in one step.

---

# STEP 5 — PROTECT EXISTING FUNCTIONALITY

Before modifying any existing feature, identify:

- Current behavior
- Current imports
- Current dependencies
- Current callers
- Current navigation usage
- Current Redux usage
- Current API usage

Do not remove an existing function/component/file until you confirm it is unused or there is a safe migration path.

---

# STEP 6 — DEPENDENCY CHANGES

Do not add or remove dependencies automatically.

For every dependency change, explain:

```text
Package:
Current purpose:
Problem:
Why change:
Replacement:
Impact:
```

Before removing a dependency:

1. Search where it is used.
2. Confirm all usages.
3. Replace usages safely.
4. Remove the dependency only after migration.

Never remove a dependency only because you personally prefer another library.

---

# STEP 7 — SPLASH SCREEN

Review the existing `react-native-bootsplash` implementation.

Do not replace it if it is already working correctly.

Only improve if necessary:

- Android setup
- iOS setup
- Initialization
- Hide timing
- Blank screen issue
- Theme support
- Documentation

Preserve the current working splash screen behavior.

---

# STEP 8 — APP CONFIGURATION

Review the existing application configuration.

Improve only where needed.

Check:

- App name
- Bundle ID
- Android Application ID
- Version
- API URL
- Environment
- App icon
- Splash screen

Do not rename files or folders unnecessarily.

If a value is currently hardcoded, determine whether making it configurable is genuinely useful.

---

# STEP 9 — ENVIRONMENT CONFIGURATION

Review the existing environment setup.

If there is already an environment system:

> Improve it instead of replacing it.

If there is no environment system:

> Recommend the simplest suitable approach before implementing it.

Support where appropriate:

```text
Development
Staging
Production
```

Do not expose secrets.

Do not commit:

```text
.env
.env.local
.env.production
API keys
Private keys
Signing credentials
```

---

# STEP 10 — NAVIGATION

Review the existing navigation.

Check:

- Stack
- Tabs
- Authentication
- Public screens
- Protected screens
- Nested navigation
- Navigation parameters
- Type safety

Do not replace working navigation architecture unless there is a clear problem.

If types are missing, improve typing incrementally.

---

# STEP 11 — API

Review the existing API implementation.

Check:

- API client
- Base URL
- Headers
- Authentication
- Token handling
- Error handling
- Timeout
- Logging
- Request cancellation

Do not create a new API architecture if the current implementation is already clean.

Improve only the actual problems.

---

# STEP 12 — API ERROR HANDLING

Check whether API errors are handled consistently.

Support common cases:

```text
401
403
404
422
500
Network Error
Unknown Error
```

Do not change the existing API response format unnecessarily.

If a change is required, maintain backward compatibility wherever possible.

---

# STEP 13 — REDUX

Review the existing Redux implementation.

Check:

- Store
- Slices
- Actions
- Selectors
- Middleware
- Async operations
- Persistence
- Typed hooks

Do not replace Redux with another state-management library unless there is a very strong reason.

Improve the current Redux architecture.

---

# STEP 14 — STATE MANAGEMENT

Review where state is currently stored.

Identify whether state should be:

- Local state
- Redux
- Context
- API/server state

Do not move state unnecessarily.

Only refactor state when there is a clear maintainability or performance problem.

---

# STEP 15 — COMPONENTS

Review current common components.

Examples:

- Button
- Input
- Text
- Loader
- Modal
- Header
- Empty State
- Error State

For every component check:

- Reusability
- Props
- TypeScript
- Accessibility
- Styling
- Naming
- Duplication

Do not replace working components unnecessarily.

---

# STEP 16 — THEME

Check whether the current project already has:

- Colors
- Fonts
- Typography
- Spacing
- Radius
- Shadows

If a theme already exists:

> Improve it.

Do not create a second theme system.

If no theme exists:

> Recommend a lightweight theme approach.

Do not create an enterprise-level design system.

---

# STEP 17 — SCREEN RESOLUTION

Review the current screen-resolution/common dimension implementation.

Do not automatically remove it.

First determine:

- Where it is used.
- Why it exists.
- Whether it solves a real problem.
- Whether React Native's normal layout can replace parts of it.

If it is useful:

> Keep it and improve it.

If it is unnecessary:

> Migrate usage first, then remove it safely.

---

# STEP 18 — CONTROLLERS

Review current controllers.

Check whether business logic is unnecessarily placed inside screens.

Improve only where required.

Preferred principle:

```text
Screen
 ↓
Controller / Hook
 ↓
Service / API
```

But do not force this structure onto every screen.

Simple screens can remain simple.

---

# STEP 19 — TYPESCRIPT

Review TypeScript.

Search for unnecessary:

```ts
any;
```

Improve types for:

- Components
- Navigation
- Redux
- API
- Controllers
- Configuration

Do not introduce complicated generic types only to remove a small amount of `any`.

Prefer readable types.

---

# STEP 20 — CODE QUALITY

Check:

- Duplicate code
- Dead code
- Unused imports
- Unused variables
- Large functions
- Large components
- Naming problems
- Magic numbers
- Magic strings

Fix only meaningful problems.

Do not refactor the entire codebase for formatting alone.

---

# STEP 21 — ESLINT / PRETTIER

Check current lint and formatting configuration.

If already configured:

> Improve only where necessary.

If missing:

> Recommend a minimal setup.

Do not add dozens of strict rules that make development difficult.

---

# STEP 22 — PERFORMANCE

Review common performance issues:

- Unnecessary renders
- Incorrect `useEffect`
- Large lists
- Expensive calculations
- Incorrect Redux selectors
- Unnecessary state updates
- Image performance

Do not optimize code without evidence or a clear reason.

Avoid premature optimization.

---

# STEP 23 — SECURITY

Review:

- Token storage
- Sensitive information
- Logs
- Environment variables
- API configuration
- Debug configuration

Identify security problems.

Do not make large security architecture changes without explaining the impact first.

---

# STEP 24 — STORAGE

If storage already exists:

> Review and improve the current implementation.

If storage does not exist:

> Recommend whether a storage abstraction is actually required.

Potential use cases:

- Auth token
- Refresh token
- Preferences
- Onboarding
- App settings

Do not add storage just because a boilerplate "should have it."

---

# STEP 25 — ERROR / LOADING / EMPTY STATES

Review whether reusable patterns already exist.

If they exist:

> Improve them.

If they do not exist:

> Recommend a simple reusable solution.

Do not force every screen into a complex abstraction.

---

# STEP 26 — ACCESSIBILITY

Review reusable components for:

- Accessibility labels
- Buttons
- Inputs
- Touch targets
- Screen readers

Add improvements where practical.

Do not redesign the UI solely for accessibility unless required.

---

# STEP 27 — TESTING

Review existing tests.

Do not create a huge testing framework.

Recommend a practical baseline for:

- Utilities
- Controllers
- Redux
- Important reusable components

If tests already exist:

> Preserve and improve them.

Never delete existing tests simply to simplify the project.

---

# STEP 28 — GIT

Review:

```text
.gitignore
README.md
Git configuration
```

Make sure the repository does not include:

- Secrets
- Environment files
- Build artifacts
- Signing files
- Local configuration

Do not change Git history.

Do not delete existing commits.

---

# STEP 29 — README

Improve the README without removing useful existing information.

It should explain:

1. What the boilerplate is.
2. Features.
3. Tech stack.
4. Requirements.
5. Installation.
6. Android setup.
7. iOS setup.
8. Environment configuration.
9. Folder structure.
10. Navigation.
11. Redux.
12. API.
13. Components.
14. Theme.
15. Splash screen.
16. Renaming the application.
17. Creating a new feature.
18. Build process.
19. Troubleshooting.

Keep documentation concise and practical.

---

# STEP 30 — AI GUIDELINES

If useful, create:

```text
AI_GUIDELINES.md
```

Document:

- Architecture
- Folder responsibilities
- Naming
- API rules
- Redux rules
- Component rules
- Controller rules
- TypeScript rules
- What AI should not change
- How AI should modify existing code safely

Important:

> AI must follow the existing architecture before proposing a new architecture.

---

# STEP 31 — REFERENCE CODE

I may provide additional reference repositories or code.

For each reference:

1. Understand the implementation.
2. Compare with the current boilerplate.
3. Identify useful improvements.
4. Identify unnecessary complexity.
5. Explain what should be adopted.
6. Explain what should not be adopted.

Do not copy reference code blindly.

---

# STEP 32 — SAFE MIGRATION RULE

If an existing implementation needs to be replaced:

### First

Create the new implementation.

### Second

Migrate existing usages.

### Third

Verify the application.

### Fourth

Remove the old implementation.

Never do:

```text
Delete old code
 ↓
Create new code
 ↓
Hope it works
```

Instead:

```text
Old implementation
        ↓
New implementation
        ↓
Migrate
        ↓
Verify
        ↓
Remove old code
```

---

# STEP 33 — FILE CHANGE LIMIT

For each logical improvement:

> Change the minimum number of files required.

Before changing a large number of files, explain:

```text
Why are these files required?
What is the risk?
Can this be done with fewer changes?
```

Prefer small, reviewable changes.

---

# STEP 34 — BACKWARD COMPATIBILITY

When improving an existing utility, component, controller, API, or Redux structure:

Try to preserve the existing public interface.

For example, if the current code uses:

```ts
someFunction(data);
```

do not change it to:

```ts
someFunction(data, options, config, context);
```

unless there is a strong reason.

Prefer backward-compatible improvements where possible.

---

# STEP 35 — DO NOT BREAK BUILD

After meaningful changes, verify:

```text
TypeScript
ESLint
Tests
Android
iOS
```

If Android/iOS cannot be executed in the current environment, clearly report that.

Never claim:

> "Build successful"

unless it was actually verified.

---

# STEP 36 — CHANGE REPORT

After each implementation phase, report:

```text
### Changed

- File:
- Change:
- Reason:

### Not Changed

- File:
- Reason:

### Risk

Low / Medium / High

### Verification

- TypeScript:
- ESLint:
- Tests:
- Android:
- iOS:
```

---

# STEP 37 — FINAL REVIEW

After all safe improvements are completed, provide:

## Current Score

| Category             |   Score |
| -------------------- | ------: |
| Architecture         |     /10 |
| Scalability          |     /10 |
| Code Quality         |     /10 |
| Maintainability      |     /10 |
| Reusability          |     /10 |
| Performance          |     /10 |
| Security             |     /10 |
| Developer Experience |     /10 |
| Documentation        |     /10 |
| Production Readiness |     /10 |
| **Overall**          | **/10** |

---

# STEP 38 — FINAL FILE CHANGES

Provide:

### Modified Files

```text
file/path
file/path
file/path
```

### Added Files

```text
file/path
file/path
```

### Removed Files

```text
file/path
```

If nothing was removed, explicitly say:

```text
No files removed.
```

---

# STEP 39 — FINAL DEPENDENCY CHANGES

### Added

```text
package-name
```

Reason:

```text
...
```

### Removed

```text
package-name
```

Reason:

```text
...
```

If no dependency changes were required:

> No dependency changes.

---

# STEP 40 — FINAL VERIFICATION

Confirm:

- [ ] Existing functionality preserved
- [ ] No unnecessary architecture rewrite
- [ ] No unnecessary dependencies
- [ ] TypeScript passes
- [ ] ESLint passes
- [ ] Tests pass
- [ ] Android verified or limitation reported
- [ ] iOS verified or limitation reported
- [ ] README updated
- [ ] No secrets added
- [ ] No unnecessary files removed
- [ ] Git history untouched

---

# MOST IMPORTANT RULE

## This is an EXISTING working boilerplate.

Do not treat this as a greenfield project.

Your priority is:

```text
1. Protect existing functionality
2. Understand current implementation
3. Identify real problems
4. Make small improvements
5. Verify every change
6. Keep the architecture simple
7. Avoid unnecessary dependencies
8. Avoid unnecessary rewrites
```

---

# FINAL GOAL

Improve the existing project from:

> **Working React Native Boilerplate**

to:

> **Professional, reusable, scalable React Native Boilerplate**

without turning it into an unnecessarily complicated framework.

The best result is **not the project with the most features**.

The best result is:

> **A stable boilerplate that a developer can clone, configure, and immediately start building a new React Native application.**
