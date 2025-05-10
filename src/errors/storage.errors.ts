/**
 * Storage-related error classes
 * @module errors/storage
 */

/**
 * Base storage error class
 */
export class StorageError extends Error {
	/**
	 * Creates a new StorageError
	 * @param message Error message
	 */
	constructor(message: string) {
		super(message);
		this.name = 'StorageError';
	}
}

/**
 * Error thrown when a storage operation fails
 */
export class StorageOperationError extends StorageError {
	/**
	 * Operation that failed
	 */
	operation: string;

	/**
	 * Key that was involved
	 */
	key?: string;

	/**
	 * Creates a new StorageOperationError
	 * @param operation Operation that failed
	 * @param key Key that was involved
	 * @param message Error message
	 */
	constructor(operation: string, key?: string, message?: string) {
		super(message || `Storage operation '${operation}' failed${key ? ` for key '${key}'` : ''}`);
		this.name = 'StorageOperationError';
		this.operation = operation;
		this.key = key;
	}
}

/**
 * Error thrown when a key is not found in storage
 */
export class KeyNotFoundError extends StorageError {
	/**
	 * Key that was not found
	 */
	key: string;

	/**
	 * Creates a new KeyNotFoundError
	 * @param key Key that was not found
	 */
	constructor(key: string) {
		super(`Key '${key}' not found in storage`);
		this.name = 'KeyNotFoundError';
		this.key = key;
	}
}

/**
 * Error thrown when a batch operation fails
 */
export class BatchOperationError extends StorageError {
	/**
	 * Operations that failed
	 */
	operations: any[];

	/**
	 * Creates a new BatchOperationError
	 * @param operations Operations that failed
	 * @param message Error message
	 */
	constructor(operations: any[], message?: string) {
		super(message || `Batch operation failed for ${operations.length} operations`);
		this.name = 'BatchOperationError';
		this.operations = operations;
	}
}

/**
 * Error thrown when a serialization operation fails
 */
export class SerializationError extends StorageError {
	/**
	 * Data that failed to serialize/deserialize
	 */
	data: any;

	/**
	 * Creates a new SerializationError
	 * @param data Data that failed to serialize/deserialize
	 * @param message Error message
	 */
	constructor(data: any, message?: string) {
		super(message || 'Serialization operation failed');
		this.name = 'SerializationError';
		this.data = data;
	}
}

/**
 * Error thrown when a storage adapter is not initialized
 */
export class StorageNotInitializedError extends StorageError {
	/**
	 * Creates a new StorageNotInitializedError
	 */
	constructor() {
		super('Storage adapter is not initialized');
		this.name = 'StorageNotInitializedError';
	}
}