# React Native Professional Boilerplate

A modern, production-ready, TypeScript-first React Native boilerplate built on React Native 0.87+ and React 19. Designed for scalability, clean architecture, and rapid feature development out of the box.

---

## 🚀 Features

- ⚡ **React Native 0.87 + React 19**: Modern core framework setup.
- 📘 **TypeScript First**: Strict static typing across navigation, Redux, API services, and components.
- 🧭 **React Navigation v7**: Native stack navigation with typed parameter routes and custom hooks.
- 📦 **Redux Toolkit + Redux Persist**: Predictable state management with AsyncStorage persistence and root reset on logout.
- 🌐 **Axios API Layer**: Centralized API service with request/response interceptors, automatic JWT auth header injection, HTTP 401 auto-logout, and mock fallback resilience.
- 🎨 **Centralized Theme System**: Unified color palette, typography scales, spacing, border radius, and shadow presets.
- 🛡️ **Form Handling & Validation**: `react-hook-form` integrated with `yup` and `@hookform/resolvers`.
- 📱 **Unified Screen Wrapper**: Standardized Safe Area, Status Bar, and Keyboard Avoiding view handling via `ScreenWrapper`.
- ♿ **Accessibility Ready**: Accessible touch targets and accessibility props on common components.
- ⚙️ **Environment Management**: Multi-environment configuration (`development`, `staging`, `production`).

---

## 🛠️ Tech Stack

- **Framework**: React Native 0.87.0
- **Language**: TypeScript 6.0
- **State Management**: `@reduxjs/toolkit` 2.x, `react-redux` 9.x, `redux-persist` 6.x
- **Navigation**: `@react-navigation/native` 7.x, `@react-navigation/native-stack` 7.x
- **HTTP Client**: `axios` 1.x
- **Storage**: `@react-native-async-storage/async-storage` 3.x
- **Forms**: `react-hook-form` 7.x, `yup` 1.x

---

## 📋 Requirements

- Node.js >= 22.11.0
- npm or yarn / pnpm
- Android Studio & Android SDK (for Android builds)
- Xcode & CocoaPods (for iOS builds, macOS only)

---

## 📥 Installation

```bash
# 1. Clone the repository
git clone https://github.com/YAshAdroja/reactnative-ya-boilerplate.git
cd reactnative-ya-boilerplate

# 2. Install dependencies
npm install

# 3. Install iOS CocoaPods (macOS only)
npm run pod-install
```

---

## 🏃 Running the Application

### Start Metro Bundler
```bash
npm start
# Or with cache reset
npm run start:reset
```

### Android Build
```bash
npm run android
```

### iOS Build
```bash
npm run ios
```

---

## ⚙️ Environment Configuration

Environment settings are configured in `src/config/env.ts`. It provides typed configurations for different execution modes (`development`, `staging`, `production`):

```typescript
import Config from './src/config/env';

console.log(Config.API_BASE_URL); // Outputs environment specific API URL
```

---

## 📂 Folder Structure

```text
src/
├── components/      # Reusable UI components (CustomButton, CustomInput, ScreenWrapper, etc.)
├── config/          # Environment and application configuration
├── hooks/           # Custom React hooks (useDebounce, etc.)
├── navigation/      # Stack navigation config and typed navigation hooks
├── screens/         # Application screens (Home, Details, UserForm)
├── services/        # Axios API client, interceptors, and endpoints
├── store/           # Redux Toolkit store, rootReducer, and feature slices
├── theme/           # Style design tokens (colors, spacing, typography)
├── types/           # Global TypeScript definitions
├── utils/           # Helper utilities, constants, and AsyncStorage wrapper
└── validation/      # Form validation schemas (Yup)
```

---

## 🧩 Key Architecture Overview

### Navigation
Defined in `src/navigation/AppNavigator.tsx`. Use the typed `useAppNavigation` hook inside components:
```typescript
import { useAppNavigation } from '../navigation/useAppNavigation';

const navigation = useAppNavigation();
navigation.navigate('Details', { id: user.id });
```

### Redux State
State slices are managed in `src/store/slices/`. Use typed hooks:
```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers } from '../store/slices/userSlice';

const dispatch = useAppDispatch();
const { users, loading } = useAppSelector((state) => state.users);
```

### API Service
API requests use the Axios instance in `src/services/api.ts`. Includes mock data fallbacks for seamless offline testing:
```typescript
import { userService } from '../services/api';

const data = await userService.getUsers(page, limit, searchQuery);
```

---

## 🏷️ Renaming the Application

To rename the project from `AwesomeProject` to your custom app name:

1. Update `name` and `displayName` in `app.json`.
2. Update `name` in `package.json`.
3. Use [`react-native-rename`](https://www.npmjs.com/package/react-native-rename) or update bundle identifiers manually:
   - **Android**: `android/app/build.gradle` (`applicationId`), `AndroidManifest.xml` (`package`).
   - **iOS**: Xcode project target bundle identifier and display name.

---

## ➕ Creating a New Feature

1. **Define Types**: Add model interfaces and navigation param definitions in `src/types/index.ts`.
2. **Create Slice**: Create a Redux slice in `src/store/slices/myFeatureSlice.ts` and attach to `src/store/rootReducer.ts`.
3. **Add API Service**: Add endpoints in `src/services/endpoints.ts` and helper methods in `src/services/api.ts`.
4. **Create Screen**: Create screen in `src/screens/MyFeature/MyFeatureScreen.tsx` wrapped with `ScreenWrapper`.
5. **Register Route**: Add route screen to `src/navigation/AppNavigator.tsx`.

---

## 🎨 Theme & Styling

Design tokens are exported from `src/theme/index.ts`:
```typescript
import { colors, spacing, typography } from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.background,
  },
});
```

---

## 🔍 Verification & Linting

```bash
# Type check TypeScript code
npm run typecheck

# Run ESLint linter
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Run Jest tests
npm test
```

---

## 📄 License

This boilerplate is licensed under the MIT License.
