/**
 * Resource manager interface
 * @module memory/resource-manager-interface
 */

/**
 * Interface for resource managers
 */
export interface IResourceManager {
	/**
	 * Initializes the resource manager
	 * @returns Promise resolving when initialization is complete
	 */
	initialize(): Promise<void>;
	
	/**
	 * Closes the resource manager and releases resources
	 * @returns Promise resolving when closing is complete
	 */
	close(): Promise<void>;
	
	/**
	 * Allocates memory
	 * @param bytes Number of bytes to allocate
	 * @returns Promise resolving to whether the allocation was successful
	 */
	allocateMemory(bytes: number): Promise<boolean>;
	
	/**
	 * Releases memory
	 * @param bytes Number of bytes to release
	 * @returns Promise resolving to whether the release was successful
	 */
	releaseMemory(bytes: number): Promise<boolean>;
	
	/**
	 * Gets the current memory usage
	 * @returns Promise resolving to the current memory usage in bytes
	 */
	getMemoryUsage(): Promise<number>;
	
	/**
	 * Gets the memory limit
	 * @returns Promise resolving to the memory limit in bytes
	 */
	getMemoryLimit(): Promise<number>;
	
	/**
	 * Sets the memory limit
	 * @param bytes Memory limit in bytes
	 * @returns Promise resolving when the limit has been set
	 */
	setMemoryLimit(bytes: number): Promise<void>;
	
	/**
	 * Checks if memory is available
	 * @param bytes Number of bytes to check
	 * @returns Promise resolving to whether the memory is available
	 */
	isMemoryAvailable(bytes: number): Promise<boolean>;
	
	/**
	 * Gets memory usage statistics
	 * @returns Promise resolving to memory usage statistics
	 */
	getMemoryStats(): Promise<MemoryStats>;
	
	/**
	 * Registers a resource
	 * @param resourceId Resource ID
	 * @param resourceType Resource type
	 * @param metadata Resource metadata
	 * @returns Promise resolving when the resource has been registered
	 */
	registerResource(
		resourceId: string,
		resourceType: string,
		metadata?: Record<string, any>
	): Promise<void>;
	
	/**
	 * Unregisters a resource
	 * @param resourceId Resource ID
	 * @returns Promise resolving to whether the resource was unregistered
	 */
	unregisterResource(resourceId: string): Promise<boolean>;
	
	/**
	 * Gets a resource
	 * @param resourceId Resource ID
	 * @returns Promise resolving to the resource, or null if not found
	 */
	getResource(resourceId: string): Promise<Resource | null>;
	
	/**
	 * Gets all resources
	 * @returns Promise resolving to an array of resources
	 */
	getAllResources(): Promise<Resource[]>;
	
	/**
	 * Gets resources by type
	 * @param resourceType Resource type
	 * @returns Promise resolving to an array of resources
	 */
	getResourcesByType(resourceType: string): Promise<Resource[]>;
	
	/**
	 * Clears all resources
	 * @returns Promise resolving when clearing is complete
	 */
	clearResources(): Promise<void>;
}

/**
 * Memory statistics interface
 */
export interface MemoryStats {
	/**
	 * Current memory usage in bytes
	 */
	currentUsage: number;
	
	/**
	 * Memory limit in bytes
	 */
	limit: number;
	
	/**
	 * Memory usage percentage
	 */
	usagePercentage: number;
	
	/**
	 * Available memory in bytes
	 */
	available: number;
	
	/**
	 * Peak memory usage in bytes
	 */
	peak: number;
	
	/**
	 * Number of allocations
	 */
	allocations: number;
	
	/**
	 * Number of releases
	 */
	releases: number;
}

/**
 * Resource interface
 */
export interface Resource {
	/**
	 * Resource ID
	 */
	id: string;
	
	/**
	 * Resource type
	 */
	type: string;
	
	/**
	 * Resource metadata
	 */
	metadata?: Record<string, any>;
	
	/**
	 * Registration time
	 */
	registeredAt: number;
	
	/**
	 * Last access time
	 */
	lastAccessedAt: number;
	
	/**
	 * Access count
	 */
	accessCount: number;
}