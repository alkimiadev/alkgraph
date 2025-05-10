/**
 * Storage-related type definitions
 * @module types/storage
 */

/**
 * Storage operation types
 */
export enum StorageOperationType {
	PUT = 'put',
	DELETE = 'delete',
}

/**
 * Storage operation interface
 */
export interface StorageOperation {
	/**
	 * Type of operation
	 */
	type: StorageOperationType;
	
	/**
	 * Key for the operation
	 */
	key: string;
	
	/**
	 * Value for the operation (only for PUT operations)
	 */
	value?: any;
}

/**
 * Storage adapter options
 */
export interface StorageAdapterOptions {
	/**
	 * Path to the database
	 */
	path?: string;
	
	/**
	 * Additional options for the storage adapter
	 */
	options?: Record<string, any>;
}

/**
 * Storage manager options
 */
export interface StorageManagerOptions {
	/**
	 * Storage adapter to use
	 */
	adapter?: any;
	
	/**
	 * Additional options for the storage manager
	 */
	options?: Record<string, any>;
}