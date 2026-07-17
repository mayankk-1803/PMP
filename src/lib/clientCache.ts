export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
}

class ClientCache {
  private cache = new Map<string, CacheEntry>();
  private pendingRequests = new Map<string, Promise<any>>();
  private lruList: string[] = [];
  
  // Default values
  private maxEntries = 50;
  private ttl = 3 * 60 * 1000; // 3 minutes cache lifetime

  constructor(maxEntries = 50, ttl = 180000) {
    this.maxEntries = maxEntries;
    this.ttl = ttl;
  }

  private touch(key: string) {
    // Move key to the end of LRU list (most recently used)
    this.lruList = this.lruList.filter((k) => k !== key);
    this.lruList.push(key);

    // Evict least recently used if cache exceeds size
    if (this.lruList.length > this.maxEntries) {
      const oldestKey = this.lruList.shift();
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }
  }

  public get<T = any>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check expiration
    const isExpired = Date.now() - entry.timestamp > this.ttl;
    if (isExpired) {
      this.cache.delete(key);
      this.lruList = this.lruList.filter((k) => k !== key);
      return null;
    }

    this.touch(key);
    return entry.data as T;
  }

  public set<T = any>(key: string, data: T): void {
    // If the data is empty or invalid, don't cache
    if (data === null || data === undefined) return;

    this.cache.set(key, { data, timestamp: Date.now() });
    this.touch(key);
  }

  public has(key: string): boolean {
    return this.get(key) !== null;
  }

  public clear(): void {
    this.cache.clear();
    this.lruList = [];
    this.pendingRequests.clear();
  }

  /**
   * Fetches data from a URL with built-in cache checks and promise de-duplication.
   * If a fetch is already in progress for this URL, returns the existing promise.
   */
  public async fetchWithCache<T = any>(
    url: string, 
    options?: RequestInit, 
    forceRefresh = false
  ): Promise<T> {
    if (!forceRefresh) {
      const cached = this.get<T>(url);
      if (cached !== null) {
        return cached;
      }
    }

    // Request De-duplication: Return existing promise if request is already in-flight
    const pending = this.pendingRequests.get(url);
    if (pending) {
      return pending as Promise<T>;
    }

    const requestPromise = fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        this.set(url, data);
        this.pendingRequests.delete(url);
        return data as T;
      })
      .catch((err) => {
        this.pendingRequests.delete(url);
        throw err;
      });

    this.pendingRequests.set(url, requestPromise);
    return requestPromise;
  }

  /**
   * Generic function to cache any promise-returning function (e.g. server action or custom fetching).
   * Supports promise de-duplication.
   */
  public async executeWithCache<T = any>(
    key: string,
    action: () => Promise<T>,
    forceRefresh = false
  ): Promise<T> {
    if (!forceRefresh) {
      const cached = this.get<T>(key);
      if (cached !== null) {
        return cached;
      }
    }

    const pending = this.pendingRequests.get(key);
    if (pending) {
      return pending as Promise<T>;
    }

    const actionPromise = action()
      .then((data) => {
        this.set(key, data);
        this.pendingRequests.delete(key);
        return data;
      })
      .catch((err) => {
        this.pendingRequests.delete(key);
        throw err;
      });

    this.pendingRequests.set(key, actionPromise);
    return actionPromise;
  }
}

export const clientCache = new ClientCache();
