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

export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to sessionStorage for key "${key}":`, error);
  }
};

export const getErrorMessage = (error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  return errorMessage;
};
