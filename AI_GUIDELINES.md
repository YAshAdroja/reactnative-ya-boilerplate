# AI Coding Guidelines for React Native Boilerplate

This repository is designed as a clean, production-ready React Native boilerplate. When modifying or extending this codebase, all AI assistants and developers MUST strictly follow the conventions outlined below.

---

## 1. Golden Rules & Architectural Constraints

1. **Protect Existing Functionality**: Never delete existing features, components, or utilities without verifying dependencies and providing a safe migration path.
2. **Incremental Modifications**: Make point-to-point, minimal file edits. Do NOT refactor the entire codebase for cosmetic formatting.
3. **No Greenfield Rewrites**: Respect the existing Redux Toolkit, React Navigation v7, and Axios architecture.
4. **Type Safety**: Maintain strict TypeScript typing. Avoid using `any` unless strictly necessary.

---

## 2. Directory & Responsibility Matrix

| Directory | Responsibility | Guidelines |
| :--- | :--- | :--- |
| `src/config/` | Environment & app configurations | Source environment parameters from `env.ts`. |
| `src/components/` | Reusable UI components | Pure, presentational components. Export via `index.ts`. |
| `src/hooks/` | Custom React hooks | Isolated stateful or side-effect logic (e.g., `useDebounce`). |
| `src/navigation/` | Navigation setup & typing | Define stack screens and typed navigation hooks (`useAppNavigation`). |
| `src/screens/` | Screen views | Thin components managing UI flow, connected to Redux or hooks. |
| `src/services/` | API client & endpoints | Axios instance (`api.ts`) with interceptors and endpoints mapping (`endpoints.ts`). |
| `src/store/` | Redux state management | Redux Toolkit slices (`createSlice`, `createAsyncThunk`) with typed hooks. |
| `src/theme/` | Style tokens | Colors, spacing, typography, radius, and shadows. |
| `src/types/` | Global TypeScript definitions | API interfaces, state contracts, navigation parameter lists. |
| `src/utils/` | General helper functions | Storage wrapper, formatting utilities, constants. |
| `src/validation/` | Form validation schemas | Yup schemas for form field validation. |

---

## 3. Code Standards & Patterns

### Components
- Use functional components typed with `React.FC<Props>`.
- Always wrap screen views in `ScreenWrapper` for uniform status bar and safe area handling.
- Provide accessibility attributes (`accessibilityRole`, `accessibilityLabel`, `accessibilityState`).
- Keep components modular and export them cleanly through `src/components/index.ts`.

### Redux State Management
- Use typed Redux hooks `useAppDispatch()` and `useAppSelector()`.
- Place async operations inside `createAsyncThunk` in their respective slice file.
- Handle `pending`, `fulfilled`, and `rejected` cases explicitly.

### API Services
- Call API operations through `userService` or service modules rather than raw `axios` calls inside components.
- Rely on Axios interceptors in `src/services/api.ts` for Authorization header injection and 401 handling.

### TypeScript
- Define types and interfaces in `src/types/index.ts` or co-located type files.
- Export navigation parameter list as `RootStackParamList`.

---

## 4. What AI Must NOT Change

- Do NOT replace Redux Toolkit with another state management library (Zustand, MobX).
- Do NOT replace React Navigation v7 with another routing solution.
- Do NOT remove mock data fallbacks in `src/services/api.ts` as they ensure graceful offline testing.
- Do NOT modify raw native Android/iOS project files unless explicitly required for native plugin setup.
