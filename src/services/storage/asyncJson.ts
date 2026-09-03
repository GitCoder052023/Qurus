import AsyncStorage from '@react-native-async-storage/async-storage';

export async function readJson<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;
  return JSON.parse(raw) as T;
}

export function writeJson(key: string, value: unknown): void {
  AsyncStorage.setItem(key, JSON.stringify(value)).catch(console.error);
}

export function removeKey(key: string): void {
  AsyncStorage.removeItem(key).catch(console.error);
}
