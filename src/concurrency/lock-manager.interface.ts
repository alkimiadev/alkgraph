/**
 * Lock manager interface
 * @module concurrency/lock-manager-interface
 */

import { LockType, LockResult } from '../types/concurrency.types';

/**
 * Interface for lock managers
 */
export interface ILockManager {
	/**
	 * Initializes the lock manager
	 * @returns Promise resolving when initialization is complete
	 */
	initialize(): Promise<void>;
	
	/**
	 * Closes the lock manager and releases resources
	 * @returns Promise resolving when closing is complete
	 */
	close(): Promise<void>;
	
	/**
	 * Acquires a lock on a resource
	 * @param resourceId Resource ID to lock
	 * @param lockType Type of lock to acquire
	 * @param timeout Timeout in milliseconds (0 means no timeout)
	 * @returns Promise resolving to the lock result
	 */
	acquireLock(resourceId: string, lockType: LockType, timeout?: number): Promise<LockResult>;
	
	/**
	 * Releases a lock on a resource
	 * @param resourceId Resource ID to unlock
	 * @param lockToken Lock token
	 * @returns Promise resolving to whether the lock was released
	 */
	releaseLock(resourceId: string, lockToken: string): Promise<boolean>;
	
	/**
	 * Checks if a resource is locked
	 * @param resourceId Resource ID to check
	 * @returns Promise resolving to whether the resource is locked
	 */
	isLocked(resourceId: string): Promise<boolean>;
	
	/**
	 * Gets the lock type on a resource
	 * @param resourceId Resource ID to check
	 * @returns Promise resolving to the lock type, or null if not locked
	 */
	getLockType(resourceId: string): Promise<LockType | null>;
	
	/**
	 * Gets all locked resources
	 * @returns Promise resolving to an array of locked resource IDs
	 */
	getLockedResources(): Promise<string[]>;
	
	/**
	 * Forcibly releases all locks
	 * @returns Promise resolving to the number of locks released
	 */
	releaseAllLocks(): Promise<number>;
	
	/**
	 * Forcibly releases all locks on a resource
	 * @param resourceId Resource ID
	 * @returns Promise resolving to the number of locks released
	 */
	releaseAllLocksOnResource(resourceId: string): Promise<number>;
	
	/**
	 * Checks if a lock token is valid for a resource
	 * @param resourceId Resource ID
	 * @param lockToken Lock token
	 * @returns Promise resolving to whether the lock token is valid
	 */
	isValidLockToken(resourceId: string, lockToken: string): Promise<boolean>;
}