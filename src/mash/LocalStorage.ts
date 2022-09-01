interface LocalStorage {
  getItem(key: string): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

class InMemoryStorage implements LocalStorage {
  private db: Map<string, string> = new Map();

  getItem(key: string): string | null {
    return this.db.get(key) || null;
  }

  removeItem(key: string): void {
    this.db.delete(key);
  }

  setItem(key: string, value: string): void {
    this.db.set(key, value);
  }
}

function getStorage(): LocalStorage {
  try {
    // See if localStorage is available
    return window.localStorage;
  } catch {
    return new InMemoryStorage();
  }
}

const storage = getStorage();

if (storage instanceof InMemoryStorage) {
  /* eslint-disable-next-line */
  console.warn("@mash/localstorage is using in-memory storage backend. window.localStorage is undefined");
}

const localstorage = {
  set<T = Record<string, unknown>>(key: string, data: T): void {
    storage.setItem(key, JSON.stringify(data));
  },
  get<T = Record<string, unknown>>(key: string): T | null {
    const data = storage.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  },
  remove(key: string) {
    storage.removeItem(key);
  },
};

export default localstorage;
