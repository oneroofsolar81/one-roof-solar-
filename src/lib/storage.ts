/**
 * Safe Storage Wrapper
 * Prevents SecurityError on localStorage/sessionStorage inside sandboxed iframes.
 * Gracefully falls back to a temporary in-memory storage dictionary if browser storage is blocked.
 */

class SafeStorageUtility {
  private inMemoryLocalStorage: Record<string, string> = {};
  private inMemorySessionStorage: Record<string, string> = {};

  // Check if standard localStorage is available
  private isLocalAvailable(): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Check if standard sessionStorage is available
  private isSessionAvailable(): boolean {
    try {
      if (typeof window === 'undefined' || !window.sessionStorage) {
        return false;
      }
      const testKey = '__storage_test__';
      window.sessionStorage.setItem(testKey, testKey);
      window.sessionStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // --- LOCAL STORAGE METHODS ---
  
  getLocal(key: string): string | null {
    if (this.isLocalAvailable()) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        console.warn("localStorage.getItem blocked, using fallback memory", e);
      }
    }
    return this.inMemoryLocalStorage[key] !== undefined ? this.inMemoryLocalStorage[key] : null;
  }

  setLocal(key: string, value: string): void {
    if (this.isLocalAvailable()) {
      try {
        window.localStorage.setItem(key, value);
        return;
      } catch (e) {
        console.warn("localStorage.setItem blocked, using fallback memory", e);
      }
    }
    this.inMemoryLocalStorage[key] = String(value);
  }

  removeLocal(key: string): void {
    if (this.isLocalAvailable()) {
      try {
        window.localStorage.removeItem(key);
        return;
      } catch (e) {
        console.warn("localStorage.removeItem blocked, using fallback memory", e);
      }
    }
    delete this.inMemoryLocalStorage[key];
  }

  // --- SESSION STORAGE METHODS ---

  getSession(key: string): string | null {
    if (this.isSessionAvailable()) {
      try {
        return window.sessionStorage.getItem(key);
      } catch (e) {
        console.warn("sessionStorage.getItem blocked, using fallback memory", e);
      }
    }
    return this.inMemorySessionStorage[key] !== undefined ? this.inMemorySessionStorage[key] : null;
  }

  setSession(key: string, value: string): void {
    if (this.isSessionAvailable()) {
      try {
        window.sessionStorage.setItem(key, value);
        return;
      } catch (e) {
        console.warn("sessionStorage.setItem blocked, using fallback memory", e);
      }
    }
    this.inMemorySessionStorage[key] = String(value);
  }

  removeSession(key: string): void {
    if (this.isSessionAvailable()) {
      try {
        window.sessionStorage.removeItem(key);
        return;
      } catch (e) {
        console.warn("sessionStorage.removeItem blocked, using fallback memory", e);
      }
    }
    delete this.inMemorySessionStorage[key];
  }
}

export const safeStorage = new SafeStorageUtility();
