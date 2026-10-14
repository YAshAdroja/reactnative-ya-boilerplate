import { createMMKV } from 'react-native-mmkv';

/**
 * MMKV storage instance.
 * Faster than AsyncStorage; replaces raw AsyncStorage calls for non-Redux-persist data.
 *
 * Use this via the helper functions below rather than calling MMKV directly.
 *
 * // TODO: Add encryption by setting an encryptionKey for production security.
 *   Example: new MMKV({ id: 'ya-storage', encryptionKey: 'your-secret-key' });
 */
export const mmkv = createMMKV({ id: 'ya-app-storage' });

/** Persist any serialisable value */
export const setMMKV = <T>(key: string, value: T): void => {
  try {
    mmkv.set(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[setMMKV] Failed to store "${key}":`, error);
  }
};

/** Retrieve a value (null if not found or parse fails) */
export const getMMKV = <T>(key: string): T | null => {
  try {
    const raw = mmkv.getString(key);
    if (raw === undefined) return null;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`[getMMKV] Failed to retrieve "${key}":`, error);
    return null;
  }
};

/** Remove a single key */
export const removeMMKV = (key: string): void => {
  try {
    mmkv.remove(key);
  } catch (error) {
    console.error(`[removeMMKV] Failed to remove "${key}":`, error);
  }
};

/** Clear all MMKV data (use with caution) */
export const clearMMKV = (): void => {
  try {
    mmkv.clearAll();
  } catch (error) {
    console.error('[clearMMKV] Failed to clear storage:', error);
  }
};
