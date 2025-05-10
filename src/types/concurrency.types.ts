/**
 * Concurrency-related type definitions
 * @module types/concurrency
 */

/**
 * Lock type enum
 */
export enum LockType {
	SHARED = 'shared',
	EXCLUSIVE = 'exclusive',
}

/**
 * Lock status enum
 */
export enum LockStatus {
	ACQUIRED = 'acquired',
	WAITING = 'waiting',
	RELEASED = 'released',
	FAILED = 'failed',
}

/**
 * Lock request interface
 */
export interface LockRequest {
	/**
	 * Resource identifier to lock
	 */
	resourceId: string;
	
	/**
	 * Type of lock
	 */
	type: LockType;
	
	/**
	 * Timeout in milliseconds
	 */
	timeout?: number;
}

/**
 * Lock result interface
 */
export interface LockResult {
	/**
	 * Resource identifier
	 */
	resourceId: string;
	
	/**
	 * Lock status
	 */
	status: LockStatus;
	
	/**
	 * Lock token (if acquired)
	 */
	token?: string;
	
	/**
	 * Error message (if failed)
	 */
	error?: string;
}

/**
 * Isolation level enum
 */
export enum IsolationLevel {
	READ_UNCOMMITTED = 'readUncommitted',
	READ_COMMITTED = 'readCommitted',
	REPEATABLE_READ = 'repeatableRead',
	SERIALIZABLE = 'serializable',
}

/**
 * Transaction options interface
 */
export interface TransactionOptions {
	/**
	 * Isolation level
	 */
	isolationLevel?: IsolationLevel;
	
	/**
	 * Timeout in milliseconds
	 */
	timeout?: number;
	
	/**
	 * Whether to use optimistic concurrency
	 */
	optimistic?: boolean;
}

/**
 * Transaction status enum
 */
export enum TransactionStatus {
	ACTIVE = 'active',
	COMMITTED = 'committed',
	ABORTED = 'aborted',
}