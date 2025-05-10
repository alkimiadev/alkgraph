/**
 * Batch operation utilities
 * @module utils/batch
 */

import { StorageOperationType } from '../types/storage.types';
import { BatchOperationError } from '../errors';

/**
 * Batch operation interface
 */
export interface BatchOperation<T = any> {
	/**
	 * Operation type
	 */
	type: StorageOperationType;
	
	/**
	 * Key for the operation
	 */
	key: string;
	
	/**
	 * Value for the operation (only for PUT operations)
	 */
	value?: T;
}

/**
 * Batch result interface
 */
export interface BatchResult {
	/**
	 * Whether the batch operation succeeded
	 */
	success: boolean;
	
	/**
	 * Error if the batch operation failed
	 */
	error?: Error;
	
	/**
	 * Operations that failed
	 */
	failedOperations?: BatchOperation[];
}

/**
 * Executes a batch of operations with chunking
 * @param operations Batch operations
 * @param executeBatch Function to execute a batch of operations
 * @param chunkSize Maximum chunk size (default: 100)
 * @returns Batch result
 */
export async function executeBatchWithChunking<T>(
	operations: BatchOperation<T>[],
	executeBatch: (ops: BatchOperation<T>[]) => Promise<void>,
	chunkSize: number = 100
): Promise<BatchResult> {
	try {
		// Split operations into chunks
		const chunks: BatchOperation<T>[][] = [];
		
		for (let i = 0; i < operations.length; i += chunkSize) {
			chunks.push(operations.slice(i, i + chunkSize));
		}
		
		// Execute each chunk
		for (const chunk of chunks) {
			await executeBatch(chunk);
		}
		
		return { success: true };
	} catch (error) {
		return {
			success: false,
			error: error as Error,
			failedOperations: operations,
		};
	}
}

/**
 * Groups batch operations by type
 * @param operations Batch operations
 * @returns Operations grouped by type
 */
export function groupBatchOperationsByType<T>(
	operations: BatchOperation<T>[]
): Record<StorageOperationType, BatchOperation<T>[]> {
	const result: Record<StorageOperationType, BatchOperation<T>[]> = {
		[StorageOperationType.PUT]: [],
		[StorageOperationType.DELETE]: [],
	};
	
	for (const operation of operations) {
		result[operation.type].push(operation);
	}
	
	return result;
}

/**
 * Creates a PUT batch operation
 * @param key Key for the operation
 * @param value Value for the operation
 * @returns PUT batch operation
 */
export function createPutOperation<T>(key: string, value: T): BatchOperation<T> {
	return {
		type: StorageOperationType.PUT,
		key,
		value,
	};
}

/**
 * Creates a DELETE batch operation
 * @param key Key for the operation
 * @returns DELETE batch operation
 */
export function createDeleteOperation<T = any>(key: string): BatchOperation<T> {
	return {
		type: StorageOperationType.DELETE,
		key,
	};
}

/**
 * Validates batch operations
 * @param operations Batch operations to validate
 * @throws {BatchOperationError} If validation fails
 */
export function validateBatchOperations<T>(operations: BatchOperation<T>[]): void {
	const invalidOperations: BatchOperation<T>[] = [];
	
	for (const operation of operations) {
		// Check required fields
		if (!operation.key) {
			invalidOperations.push(operation);
			continue;
		}
		
		// Check that PUT operations have a value
		if (operation.type === StorageOperationType.PUT && operation.value === undefined) {
			invalidOperations.push(operation);
			continue;
		}
	}
	
	if (invalidOperations.length > 0) {
		throw new BatchOperationError(
			invalidOperations,
			`Invalid batch operations: ${invalidOperations.length} operations are invalid`
		);
	}
}