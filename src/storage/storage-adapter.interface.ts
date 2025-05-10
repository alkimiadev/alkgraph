/**
 * Storage adapter interface
 * @module storage/storage-adapter-interface
 */

import { StorageOperation, StorageAdapterOptions } from '../types/storage.types';

/**
 * Interface for storage adapters
 */
export interface IStorageAdapter {
	/**
	 * Initializes the storage adapter
	 * @param options Storage adapter options
	 * @returns Promise resolving when initialization is complete
	 */
	initialize(options?: StorageAdapterOptions): Promise<void>;
	
	/**
	 * Closes the storage adapter and releases resources
	 * @returns Promise resolving when closing is complete
	 */
	close(): Promise<void>;
	
	/**
	 * Gets a value from storage
	 * @param key Key to get
	 * @returns Promise resolving to the value if found, null otherwise
	 */
	get(key: string): Promise<any | null>;
	
	/**
	 * Puts a value into storage
	 * @param key Key to put
	 * @param value Value to put
	 * @returns Promise resolving when the operation is complete
	 */
	put(key: string, value: any): Promise<void>;
	
	/**
	 * Deletes a value from storage
	 * @param key Key to delete
	 * @returns Promise resolving to whether the key was deleted
	 */
	delete(key: string): Promise<boolean>;
	
	/**
	 * Checks if a key exists in storage
	 * @param key Key to check
	 * @returns Promise resolving to whether the key exists
	 */
	has(key: string): Promise<boolean>;
	
	/**
	 * Executes a batch of operations
	 * @param operations Operations to execute
	 * @returns Promise resolving when the batch is complete
	 */
	batch(operations: StorageOperation[]): Promise<void>;
	
	/**
	 * Gets all keys in storage
	 * @param prefix Optional prefix to filter keys
	 * @returns Promise resolving to an array of keys
	 */
	keys(prefix?: string): Promise<string[]>;
	
	/**
	 * Gets all key-value pairs in storage
	 * @param prefix Optional prefix to filter keys
	 * @returns Promise resolving to an array of key-value pairs
	 */
	entries(prefix?: string): Promise<Array<[string, any]>>;
	
	/**
	 * Clears all data in storage
	 * @returns Promise resolving when clearing is complete
	 */
	clear(): Promise<void>;
	
	/**
	 * Gets the approximate size of the storage
	 * @returns Promise resolving to the approximate size in bytes
	 */
	approximateSize(): Promise<number>;
}