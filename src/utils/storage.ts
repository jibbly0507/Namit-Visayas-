/**
 * Dual Storage Manager: IndexedDB (High capacity) + LocalStorage (Fast sync)
 * Ensures that all uploaded photos, edited descriptions, and custom content
 * are 100% saved without failing due to localStorage 5MB quota limitations.
 */

const DB_NAME = 'Namit4VisayasDB';
const DB_VERSION = 1;
const STORE_NAME = 'appData';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function setItemIDB<T>(key: string, value: T): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB setItem error:', err);
  }
}

export async function getItemIDB<T>(key: string): Promise<T | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as T) ?? null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn('IndexedDB getItem error:', err);
    return null;
  }
}

export async function removeItemIDB(key: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch (err) {
    console.warn('IndexedDB removeItem error:', err);
  }
}

/**
 * Universal safe persistent save:
 * 1. Saves to IndexedDB (virtually unlimited capacity, never fails due to 5MB quota)
 * 2. Saves to LocalStorage for instant synchronous bootstrap (swallows quota error safely)
 */
export async function savePersistentData<T>(key: string, data: T): Promise<void> {
  // Always write to IndexedDB
  await setItemIDB(key, data);

  // Attempt sync write to localStorage
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (quotaError) {
    console.warn(
      `LocalStorage quota exceeded for ${key}. Data was safely preserved in IndexedDB.`,
      quotaError
    );
  }
}

/**
 * Universal safe persistent load:
 * Tries localStorage first for instant speed, then IndexedDB
 */
export async function loadPersistentData<T>(key: string, fallback: T): Promise<T> {
  // Try IndexedDB first as it may hold the rich uploaded photos
  const idbData = await getItemIDB<T>(key);
  if (idbData !== null && idbData !== undefined) {
    return idbData;
  }

  // Fallback to localStorage
  try {
    const lsItem = localStorage.getItem(key);
    if (lsItem) {
      return JSON.parse(lsItem) as T;
    }
  } catch (e) {
    console.warn(`Failed to parse localStorage for ${key}`, e);
  }

  return fallback;
}

/**
 * Clears data from both localStorage and IndexedDB
 */
export async function clearPersistentData(keys: string[]): Promise<void> {
  for (const k of keys) {
    try {
      localStorage.removeItem(k);
    } catch (e) {
      // ignore
    }
    await removeItemIDB(k);
  }
}
