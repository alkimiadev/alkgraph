/**
 * Event listener interface
 * @module events/event-listener-interface
 */

import { IEvent, EventType } from '../types/event.types';

/**
 * Interface for event listeners
 */
export interface IEventListener {
	/**
	 * Unique identifier for the listener
	 */
	id: string;
	
	/**
	 * Event types this listener is interested in
	 */
	eventTypes: EventType[];
	
	/**
	 * Handler function for the events
	 * @param event Event to handle
	 * @returns Promise resolving when the event has been handled
	 */
	handleEvent(event: IEvent): Promise<void>;
	
	/**
	 * Gets the listener priority (higher priority listeners are called first)
	 * @returns Listener priority
	 */
	getPriority(): number;
	
	/**
	 * Checks if the listener is enabled
	 * @returns Whether the listener is enabled
	 */
	isEnabled(): boolean;
	
	/**
	 * Enables or disables the listener
	 * @param enabled Whether the listener should be enabled
	 */
	setEnabled(enabled: boolean): void;
}