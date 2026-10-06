import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async <T>(key: string, value: T): Promise<boolean> => {
  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
    return true;
  } catch (error) {
    console.error(`[setStorage Error] Failed to store ${key}:`, error);
    return false;
  }
};

export const getStorage = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  } catch (error) {
    console.error(`[getStorage Error] Failed to retrieve ${key}:`, error);
    return null;
  }
};

export const removeStorage = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[removeStorage Error] Failed to remove ${key}:`, error);
    return false;
  }
};

export const clearStorage = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('[clearStorage Error] Failed to clear storage:', error);
    return false;
  }
};
