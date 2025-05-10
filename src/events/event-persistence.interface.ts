/**
 * Event persistence interface
 * @module events/event-persistence-interface
 */

import { IEvent, EventType } from '../types/event.types';

/**
 * Interface for event persistence
 */
export interface IEventPersistence {
	/**
	 * Initializes the event persistence
	 * @returns Promise resolving when initialization is complete
	 */
	initialize(): Promise<void>;
	
	/**
	 * Closes the event persistence and releases resources
	 * @returns Promise resolving when closing is complete
	 */
	close(): Promise<void>;
	
	/**
	 * Saves an event
	 * @param event Event to save
	 * @returns Promise resolving when the event has been saved
	 */
	saveEvent(event: IEvent): Promise<void>;
	
	/**
	 * Gets an event by ID
	 * @param eventId Event ID
	 * @returns Promise resolving to the event if found, null otherwise
	 */
	getEvent(eventId: string): Promise<IEvent | null>;
	
	/**
	 * Gets events by type
	 * @param eventType Event type
	 * @param limit Maximum number of events to return
	 * @param offset Number of events to skip
	 * @returns Promise resolving to an array of events
	 */
	getEventsByType(eventType: EventType, limit?: number, offset?: number): Promise<IEvent[]>;
	
	/**
	 * Gets events by time range
	 * @param startTime Start time (inclusive)
	 * @param endTime End time (inclusive)
	 * @param limit Maximum number of events to return
	 * @param offset Number of events to skip
	 * @returns Promise resolving to an array of events
	 */
	getEventsByTimeRange(
		startTime: number,
		endTime: number,
		limit?: number,
		offset?: number
	): Promise<IEvent[]>;
	
	/**
	 * Gets events by type and time range
	 * @param eventType Event type
	 * @param startTime Start time (inclusive)
	 * @param endTime End time (inclusive)
	 * @param limit Maximum number of events to return
	 * @param offset Number of events to skip
	 * @returns Promise resolving to an array of events
	 */
	getEventsByTypeAndTimeRange(
		eventType: EventType,
		startTime: number,
		endTime: number,
		limit?: number,
		offset?: number
	): Promise<IEvent[]>;
	
	/**
	 * Deletes events older than a specified time
	 * @param time Time threshold
	 * @returns Promise resolving to the number of events deleted
	 */
	deleteEventsOlderThan(time: number): Promise<number>;
	
	/**
	 * Deletes all events
	 * @returns Promise resolving to the number of events deleted
	 */
	deleteAllEvents(): Promise<number>;
	
	/**
	 * Gets the total number of events
	 * @returns Promise resolving to the number of events
	 */
	getEventCount(): Promise<number>;
	
	/**
	 * Gets the number of events by type
	 * @param eventType Event type
	 * @returns Promise resolving to the number of events
	 */
	getEventCountByType(eventType: EventType): Promise<number>;
}