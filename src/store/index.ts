import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { createMMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist';
import rootReducer from './rootReducer';
import { setAuthTokenSupplier, setUnauthorizedHandler } from '../services/api';
import { logout } from './slices/authSlice';

/**
 * MMKV instance used exclusively as the redux-persist storage adapter.
 * This is separate from src/utils/mmkvStorage.ts which is used for
 * non-Redux MMKV reads/writes (e.g. preferences).
 *
 * MMKV provides synchronous access, making it faster than AsyncStorage for
 * redux-persist rehydration on app start.
 */
const reduxMMKV = createMMKV({ id: 'redux-persist-storage' });

/**
 * MMKVStorage — Bridges MMKV's sync API to redux-persist's async Storage interface.
 */
const MMKVStorage: Storage = {
  setItem: (key: string, value: string) => {
    reduxMMKV.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = reduxMMKV.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem: (key: string) => {
    reduxMMKV.remove(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: MMKVStorage,
  whitelist: ['auth'], // Only persist auth state (user, token, isAuthenticated)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Connect token supplier for API Axios instance
setAuthTokenSupplier(() => {
  const state = store.getState();
  return state.auth.token;
});

// Auto logout on HTTP 401 Unauthorized
setUnauthorizedHandler(() => {
  store.dispatch(logout());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
