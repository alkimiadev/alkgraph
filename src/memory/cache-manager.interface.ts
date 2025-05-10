/**
 * Cache manager interface
 * @module memory/cache-manager-interface
 */

/**
 * Interface for cache managers
 */
export interface ICacheManager<K = string, V = any> {
	/**
	 * Initializes the cache manager
	 * @returns Promise resolving when initialization is complete
	 */
	initialize(): Promise<void>;
	
	/**
	 * Closes the cache manager and releases resources
	 * @returns Promise resolving when closing is complete
	 */
	close(): Promise<void>;
	
	/**
	 * Sets a value in the cache
	 * @param key Cache key
	 * @param value Value to cache
	 * @param ttl Time to live in milliseconds (0 means no expiration)
	 * @returns Promise resolving when the value has been set
	 */
	set(key: K, value: V, ttl?: number): Promise<void>;
	
	/**
	 * Gets a value from the cache
	 * @param key Cache key
	 * @returns Promise resolving to the cached value, or null if not found
	 */
	get(key: K): Promise<V | null>;
	
	/**
	 * Checks if a key exists in the cache
	 * @param key Cache key
	 * @returns Promise resolving to whether the key exists
	 */
	has(key: K): Promise<boolean>;
	
	/**
	 * Deletes a value from the cache
	 * @param key Cache key
	 * @returns Promise resolving to whether the key was deleted
	 */
	delete(key: K): Promise<boolean>;
	
	/**
	 * Clears all values from the cache
	 * @returns Promise resolving when clearing is complete
	 */
	clear(): Promise<void>;
	
	/**
	 * Gets all keys in the cache
	 * @returns Promise resolving to an array of keys
	 */
	keys(): Promise<K[]>;
	
	/**
	 * Gets the number of items in the cache
	 * @returns Promise resolving to the cache size
	 */
	size(): Promise<number>;
	
	/**
	 * Gets cache statistics
	 * @returns Promise resolving to cache statistics
	 */
	getStats(): Promise<CacheStats>;
	
	/**
	 * Sets the maximum size of the cache
	 * @param size Maximum number of items
	 */
	setMaxSize(size: number): void;
	
	/**
	 * Gets the maximum size of the cache
	 * @returns Maximum number of items
	 */
	getMaxSize(): number;
	
	/**
	 * Sets the default TTL for cache items
	 * @param ttl Default TTL in milliseconds
	 */
	setDefaultTTL(ttl: number): void;
	
	/**
	 * Gets the default TTL for cache items
	 * @returns Default TTL in milliseconds
	 */
	getDefaultTTL(): number;
	
	/**
	 * Enables or disables the cache
	 * @param enabled Whether the cache should be enabled
	 */
	setEnabled(enabled: boolean): void;
	
	/**
	 * Checks if the cache is enabled
	 * @returns Whether the cache is enabled
	 */
	isEnabled(): boolean;
}

/**
 * Cache statistics interface
 */
export interface CacheStats {
	/**
	 * Number of items in the cache
	 */
	size: number;
	
	/**
	 * Number of cache hits
	 */
	hits: number;
	
	/**
	 * Number of cache misses
	 */
	misses: number;
	
	/**
	 * Hit ratio (hits / (hits + misses))
	 */
	hitRatio: number;
	
	/**
	 * Average key age in milliseconds
	 */
	averageKeyAge: number;
	
	/**
	 * Number of evictions
	 */
	evictions: number;
}