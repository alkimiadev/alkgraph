/**
 * Event dispatcher interface
 * @module events/event-dispatcher-interface
 */

import { IEvent, EventType, IEventListener } from '../types/event.types';

/**
 * Interface for event dispatchers
 */
export interface IEventDispatcher {
	/**
	 * Initializes the event dispatcher
	 * @returns Promise resolving when initialization is complete
	 */
	initialize(): Promise<void>;
	
	/**
	 * Closes the event dispatcher and releases resources
	 * @returns Promise resolving when closing is complete
	 */
	close(): Promise<void>;
	
	/**
	 * Dispatches an event
	 * @param event Event to dispatch
	 * @returns Promise resolving when the event has been dispatched
	 */
	dispatch(event: IEvent): Promise<void>;
	
	/**
	 * Registers an event listener
	 * @param listener Event listener to register
	 * @returns Promise resolving to the registered listener ID
	 */
	registerListener(listener: IEventListener): Promise<string>;
	
	/**
	 * Unregisters an event listener
	 * @param listenerId Listener ID to unregister
	 * @returns Promise resolving to whether the listener was unregistered
	 */
	unregisterListener(listenerId: string): Promise<boolean>;
	
	/**
	 * Gets all registered listeners
	 * @returns Promise resolving to an array of registered listeners
	 */
	getListeners(): Promise<IEventListener[]>;
	
	/**
	 * Gets listeners for a specific event type
	 * @param eventType Event type
	 * @returns Promise resolving to an array of listeners for the event type
	 */
	getListenersForEventType(eventType: EventType): Promise<IEventListener[]>;
	
	/**
	 * Clears all listeners
	 * @returns Promise resolving when clearing is complete
	 */
	clearListeners(): Promise<void>;
	
	/**
	 * Enables or disables the event dispatcher
	 * @param enabled Whether the dispatcher should be enabled
	 */
	setEnabled(enabled: boolean): void;
	
	/**
	 * Checks if the event dispatcher is enabled
	 * @returns Whether the dispatcher is enabled
	 */
	isEnabled(): boolean;
}