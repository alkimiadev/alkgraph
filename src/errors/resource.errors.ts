/**
 * Resource-related error classes
 * @module errors/resource
 */

/**
 * Base resource error class
 */
export class ResourceError extends Error {
	/**
	 * Creates a new ResourceError
	 * @param message Error message
	 */
	constructor(message: string) {
		super(message);
		this.name = 'ResourceError';
	}
}

/**
 * Error thrown when a resource limit is exceeded
 */
export class ResourceLimitExceededError extends ResourceError {
	/**
	 * Resource type
	 */
	resourceType: string;

	/**
	 * Current usage
	 */
	currentUsage: number;

	/**
	 * Maximum limit
	 */
	limit: number;

	/**
	 * Creates a new ResourceLimitExceededError
	 * @param resourceType Resource type
	 * @param currentUsage Current usage
	 * @param limit Maximum limit
	 */
	constructor(resourceType: string, currentUsage: number, limit: number) {
		super(`Resource limit exceeded for ${resourceType}: ${currentUsage} > ${limit}`);
		this.name = 'ResourceLimitExceededError';
		this.resourceType = resourceType;
		this.currentUsage = currentUsage;
		this.limit = limit;
	}
}

/**
 * Error thrown when a resource is not available
 */
export class ResourceNotAvailableError extends ResourceError {
	/**
	 * Resource type
	 */
	resourceType: string;

	/**
	 * Resource ID
	 */
	resourceId: string;

	/**
	 * Creates a new ResourceNotAvailableError
	 * @param resourceType Resource type
	 * @param resourceId Resource ID
	 */
	constructor(resourceType: string, resourceId: string) {
		super(`Resource '${resourceId}' of type '${resourceType}' is not available`);
		this.name = 'ResourceNotAvailableError';
		this.resourceType = resourceType;
		this.resourceId = resourceId;
	}
}

/**
 * Error thrown when a resource allocation fails
 */
export class ResourceAllocationError extends ResourceError {
	/**
	 * Resource type
	 */
	resourceType: string;

	/**
	 * Requested amount
	 */
	requestedAmount: number;

	/**
	 * Available amount
	 */
	availableAmount: number;

	/**
	 * Creates a new ResourceAllocationError
	 * @param resourceType Resource type
	 * @param requestedAmount Requested amount
	 * @param availableAmount Available amount
	 */
	constructor(resourceType: string, requestedAmount: number, availableAmount: number) {
		super(
			`Failed to allocate ${requestedAmount} of resource '${resourceType}', only ${availableAmount} available`
		);
		this.name = 'ResourceAllocationError';
		this.resourceType = resourceType;
		this.requestedAmount = requestedAmount;
		this.availableAmount = availableAmount;
	}
}

/**
 * Error thrown when a memory limit is exceeded
 */
export class MemoryLimitExceededError extends ResourceLimitExceededError {
	/**
	 * Creates a new MemoryLimitExceededError
	 * @param currentUsage Current memory usage in bytes
	 * @param limit Memory limit in bytes
	 */
	constructor(currentUsage: number, limit: number) {
		super('memory', currentUsage, limit);
		this.name = 'MemoryLimitExceededError';
	}
}