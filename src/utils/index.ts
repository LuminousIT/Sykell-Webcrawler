export const getFromStorage = <T>(key: string): T | null => {
  try {
    const storageData = sessionStorage.getItem(key);
    if (storageData !== null && storageData !== undefined) {
      return JSON.parse(storageData) as T;
    }
    return null;
  } catch (error) {
    console.error(`Error getting from sessionStorage for key "${key}":`, error);
    sessionStorage.removeItem(key);
    return null;
  }
};
