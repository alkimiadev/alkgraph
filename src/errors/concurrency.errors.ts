/**
 * Concurrency-related error classes
 * @module errors/concurrency
 */

/**
 * Base concurrency error class
 */
export class ConcurrencyError extends Error {
	/**
	 * Creates a new ConcurrencyError
	 * @param message Error message
	 */
	constructor(message: string) {
		super(message);
		this.name = 'ConcurrencyError';
	}
}

/**
 * Error thrown when a lock acquisition fails
 */
export class LockAcquisitionError extends ConcurrencyError {
	/**
	 * Resource that could not be locked
	 */
	resourceId: string;

	/**
	 * Lock type that was requested
	 */
	lockType: string;

	/**
	 * Creates a new LockAcquisitionError
	 * @param resourceId Resource that could not be locked
	 * @param lockType Lock type that was requested
	 * @param message Error message
	 */
	constructor(resourceId: string, lockType: string, message?: string) {
		super(message || `Failed to acquire ${lockType} lock on resource '${resourceId}'`);
		this.name = 'LockAcquisitionError';
		this.resourceId = resourceId;
		this.lockType = lockType;
	}
}

/**
 * Error thrown when a lock timeout occurs
 */
export class LockTimeoutError extends ConcurrencyError {
	/**
	 * Resource that timed out
	 */
	resourceId: string;

	/**
	 * Lock type that was requested
	 */
	lockType: string;

	/**
	 * Timeout in milliseconds
	 */
	timeout: number;

	/**
	 * Creates a new LockTimeoutError
	 * @param resourceId Resource that timed out
	 * @param lockType Lock type that was requested
	 * @param timeout Timeout in milliseconds
	 */
	constructor(resourceId: string, lockType: string, timeout: number) {
		super(`Timeout (${timeout}ms) while acquiring ${lockType} lock on resource '${resourceId}'`);
		this.name = 'LockTimeoutError';
		this.resourceId = resourceId;
		this.lockType = lockType;
		this.timeout = timeout;
	}
}

/**
 * Error thrown when a transaction conflict is detected
 */
export class TransactionConflictError extends ConcurrencyError {
	/**
	 * Transaction ID
	 */
	transactionId: string;

	/**
	 * Conflicting transaction ID
	 */
	conflictingTransactionId: string;

	/**
	 * Resource that caused the conflict
	 */
	resourceId: string;

	/**
	 * Creates a new TransactionConflictError
	 * @param transactionId Transaction ID
	 * @param conflictingTransactionId Conflicting transaction ID
	 * @param resourceId Resource that caused the conflict
	 */
	constructor(transactionId: string, conflictingTransactionId: string, resourceId: string) {
		super(
			`Transaction '${transactionId}' conflicts with transaction '${conflictingTransactionId}' on resource '${resourceId}'`
		);
		this.name = 'TransactionConflictError';
		this.transactionId = transactionId;
		this.conflictingTransactionId = conflictingTransactionId;
		this.resourceId = resourceId;
	}
}

/**
 * Error thrown when a transaction is aborted
 */
export class TransactionAbortedError extends ConcurrencyError {
	/**
	 * Transaction ID
	 */
	transactionId: string;

	/**
	 * Reason for aborting
	 */
	reason: string;

	/**
	 * Creates a new TransactionAbortedError
	 * @param transactionId Transaction ID
	 * @param reason Reason for aborting
	 */
	constructor(transactionId: string, reason: string) {
		super(`Transaction '${transactionId}' was aborted: ${reason}`);
		this.name = 'TransactionAbortedError';
		this.transactionId = transactionId;
		this.reason = reason;
	}
}