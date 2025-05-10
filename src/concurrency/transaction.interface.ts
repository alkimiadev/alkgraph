/**
 * Transaction interface
 * @module concurrency/transaction-interface
 */

import { IsolationLevel, TransactionStatus } from '../types/concurrency.types';
import { StorageOperation } from '../types/storage.types';

/**
 * Interface for transactions
 */
export interface ITransaction {
	/**
	 * Gets the transaction ID
	 * @returns Transaction ID
	 */
	getId(): string;
	
	/**
	 * Gets the transaction status
	 * @returns Transaction status
	 */
	getStatus(): TransactionStatus;
	
	/**
	 * Gets the transaction isolation level
	 * @returns Transaction isolation level
	 */
	getIsolationLevel(): IsolationLevel;
	
	/**
	 * Gets the transaction start time
	 * @returns Transaction start time
	 */
	getStartTime(): number;
	
	/**
	 * Gets the transaction timeout
	 * @returns Transaction timeout in milliseconds
	 */
	getTimeout(): number;
	
	/**
	 * Checks if the transaction is active
	 * @returns Whether the transaction is active
	 */
	isActive(): boolean;
	
	/**
	 * Checks if the transaction is committed
	 * @returns Whether the transaction is committed
	 */
	isCommitted(): boolean;
	
	/**
	 * Checks if the transaction is aborted
	 * @returns Whether the transaction is aborted
	 */
	isAborted(): boolean;
	
	/**
	 * Checks if the transaction has timed out
	 * @returns Whether the transaction has timed out
	 */
	hasTimedOut(): boolean;
	
	/**
	 * Begins the transaction
	 * @returns Promise resolving when the transaction has begun
	 */
	begin(): Promise<void>;
	
	/**
	 * Commits the transaction
	 * @returns Promise resolving when the transaction has been committed
	 */
	commit(): Promise<void>;
	
	/**
	 * Aborts the transaction
	 * @param reason Reason for aborting
	 * @returns Promise resolving when the transaction has been aborted
	 */
	abort(reason?: string): Promise<void>;
	
	/**
	 * Adds an operation to the transaction
	 * @param operation Operation to add
	 * @returns Promise resolving when the operation has been added
	 */
	addOperation(operation: StorageOperation): Promise<void>;
	
	/**
	 * Gets all operations in the transaction
	 * @returns Array of operations
	 */
	getOperations(): StorageOperation[];
	
	/**
	 * Gets the number of operations in the transaction
	 * @returns Number of operations
	 */
	getOperationCount(): number;
	
	/**
	 * Clears all operations in the transaction
	 * @returns Promise resolving when operations have been cleared
	 */
	clearOperations(): Promise<void>;
	
	/**
	 * Acquires locks for the transaction
	 * @returns Promise resolving when locks have been acquired
	 */
	acquireLocks(): Promise<void>;
	
	/**
	 * Releases locks for the transaction
	 * @returns Promise resolving when locks have been released
	 */
	releaseLocks(): Promise<void>;
}