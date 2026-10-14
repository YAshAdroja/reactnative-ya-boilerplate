# React Native Boilerplate — Update Prompt

I already have a working React Native boilerplate.

Repository:

`https://github.com/YAshAdroja/reactnative-ya-boilerplate.git`

## Important

**Do NOT create a new boilerplate.**

Review my existing code first and improve it without breaking the current functionality.

- Reuse existing architecture where possible.
- Do not rewrite working code unnecessarily.
- Do not add duplicate libraries.
- Do not remove existing functionality without a clear reason.
- Keep changes simple and reusable.
- Make changes step-by-step and verify them.

---

## 1. Add / Improve Core Setup

Review and properly configure:

- React Native BootSplash (`react-native-bootsplash`)
- Zustand
- React Native Bottom Tab Navigation
- React Native Drawer Navigation
- React Native MMLV — use the exact package/reference I provide
- Existing Redux
- Existing API setup
- Existing common components
- Existing controllers
- Existing project structure

If any of these already exist, **improve/reuse the current implementation instead of creating another implementation.**

---

## 2. Basic Application Flow

Create a simple working demo flow inside the existing architecture:

```text
Splash Screen
      ↓
Login Screen
      ↓
Sign In
      ↓
Home
```

After login, show:

```text
Home
 ├── Tab 1
 ├── Tab 2
 └── Tab 3
```

Each tab should initially have a simple centered message.

Example:

```text
Home Screen
Second Screen
Third Screen
```

Keep these screens intentionally simple so they can be renamed/replaced easily in a real project.

---

## 3. Drawer / Menu

Add a simple drawer/menu accessible from the main application.

Menu:

```text
Profile
Settings
Logout
----------------
Version 1.0.0
```

Create basic:

- Profile Screen
- Settings Screen
- Logout flow

Use demo data only.

Logout should clear the authentication state and return to Login.

---

## 4. Authentication

Use a simple authentication state.

For demo purposes, Sign In can use mock logic.

Structure it so a real API can be connected later.

Expected flow:

```text
Not authenticated → Login

Sign In → Home

Logout → Login
```

Avoid creating duplicate authentication state in Redux, Zustand, and component state.

Use one clear source of truth.

---

## 5. Zustand

Add a simple Zustand implementation for lightweight global state.

Clearly document:

**Redux:** existing/complex global application state.

**Zustand:** lightweight shared state.

Do not store the same state in both.

---

## 6. Common Screens & Components

Create a small set of reusable basic components/screens that can be used directly with minimal changes.

Examples:

```text
AppText
AppButton
AppInput
AppLoader
AppHeader
CommonScreen
EmptyState
ErrorState

LoginScreen
HomeScreen
ProfileScreen
SettingsScreen
```

Do not create unnecessary components.

Keep them simple and generic.

---

## 7. TODO & Developer Guidance

Add meaningful `TODO` comments where developers need to customize the boilerplate.

Examples:

```text
TODO: Replace demo authentication with API.
TODO: Replace demo user data.
TODO: Rename bottom tabs.
TODO: Configure API environment.
TODO: Replace splash screen.
```

Also update the README with a short:

### Before Starting a New Project

```text
1. Rename app
2. Update Bundle ID / Application ID
3. Configure environment/API
4. Replace splash screen and icon
5. Configure authentication
6. Rename/remove demo screens
7. Configure bottom tabs
8. Configure drawer menu
9. Update app version
```

---

## 8. README Guidance

Update the README to briefly explain:

- Installation
- Project structure
- Navigation
- Bottom tabs
- Drawer
- Redux
- Zustand
- API setup
- BootSplash
- Common components
- How to add a new screen
- How to add a new tab
- How to add a drawer item
- TODO/setup checklist

Keep documentation concise and practical.

---

## 9. Safety Rules

Before changing any file:

1. Understand its current purpose.
2. Check where it is used.
3. Make the smallest required change.
4. Keep existing functionality working.
5. Verify imports and dependencies.
6. Do not remove code unless it is confirmed unnecessary.

If a large architectural change is required, **explain it before implementing it**.

---

## 10. Final Validation

After implementation, verify:

- BootSplash
- Login
- Sign In
- Authentication state
- Home
- Three bottom tabs
- Drawer
- Profile
- Settings
- Logout
- Version display
- Zustand
- Redux
- API setup
- Common components
- TypeScript
- ESLint
- Tests if available

If Android/iOS cannot be tested in the current environment, clearly mention that.

---

## Final Goal

Turn the existing project into a **clean, reusable React Native boilerplate** where a developer can:

```text
Clone
 ↓
Configure
 ↓
Rename Demo Screens
 ↓
Connect API
 ↓
Start Building
```

with minimum setup and without unnecessary complexity.

**Improve the existing boilerplate — do not rebuild it.**
