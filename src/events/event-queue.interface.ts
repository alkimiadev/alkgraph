/**
 * Event queue interface
 * @module events/event-queue-interface
 */

import { IEvent } from '../types/event.types';

/**
 * Interface for event queues
 */
export interface IEventQueue {
	/**
	 * Initializes the event queue
	 * @returns Promise resolving when initialization is complete
	 */
	initialize(): Promise<void>;
	
	/**
	 * Closes the event queue and releases resources
	 * @returns Promise resolving when closing is complete
	 */
	close(): Promise<void>;
	
	/**
	 * Enqueues an event
	 * @param event Event to enqueue
	 * @returns Promise resolving when the event has been enqueued
	 */
	enqueue(event: IEvent): Promise<void>;
	
	/**
	 * Dequeues an event
	 * @returns Promise resolving to the next event, or null if the queue is empty
	 */
	dequeue(): Promise<IEvent | null>;
	
	/**
	 * Peeks at the next event without removing it
	 * @returns Promise resolving to the next event, or null if the queue is empty
	 */
	peek(): Promise<IEvent | null>;
	
	/**
	 * Gets the number of events in the queue
	 * @returns Promise resolving to the queue size
	 */
	size(): Promise<number>;
	
	/**
	 * Checks if the queue is empty
	 * @returns Promise resolving to whether the queue is empty
	 */
	isEmpty(): Promise<boolean>;
	
	/**
	 * Clears all events from the queue
	 * @returns Promise resolving when clearing is complete
	 */
	clear(): Promise<void>;
	
	/**
	 * Enables or disables the queue
	 * @param enabled Whether the queue should be enabled
	 */
	setEnabled(enabled: boolean): void;
	
	/**
	 * Checks if the queue is enabled
	 * @returns Whether the queue is enabled
	 */
	isEnabled(): boolean;
}