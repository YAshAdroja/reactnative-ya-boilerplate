import { create } from 'zustand';

/**
 * AppUIState — Lightweight Zustand store for transient UI / client-only state.
 *
 * BOUNDARY:
 *   ✅ Zustand → UI state, drawer state, user preferences, transient flags.
 *   ✅ Redux   → Server/domain state: auth session (authSlice), user entities (userSlice).
 *
 * Do NOT duplicate auth state here.
 * // TODO: Add any app-level UI preferences here (e.g. language, theme mode).
 */
export interface AppUIState {
  /** Whether the drawer is open. Controlled by gesture handler normally;
   *  useful for programmatic open/close from components. */
  isDrawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;

  /** Example lightweight preference: has user seen the onboarding? */
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (value: boolean) => void;

  /** Global snackbar/toast message */
  toastMessage: string | null;
  showToast: (message: string) => void;
  clearToast: () => void;
}

export const useAppUIStore = create<AppUIState>(set => ({
  isDrawerOpen: false,
  setDrawerOpen: value => set({ isDrawerOpen: value }),

  hasSeenOnboarding: false,
  setHasSeenOnboarding: value => set({ hasSeenOnboarding: value }),

  toastMessage: null,
  showToast: message => set({ toastMessage: message }),
  clearToast: () => set({ toastMessage: null }),
}));
