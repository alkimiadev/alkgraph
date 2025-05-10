/**
 * Event-related type definitions
 * @module types/event
 */

/**
 * Event types enum
 */
export enum EventType {
	GRAPH_CREATED = 'graph.created',
	GRAPH_UPDATED = 'graph.updated',
	GRAPH_DELETED = 'graph.deleted',
	NODE_CREATED = 'node.created',
	NODE_UPDATED = 'node.updated',
	NODE_DELETED = 'node.deleted',
	EDGE_CREATED = 'edge.created',
	EDGE_UPDATED = 'edge.updated',
	EDGE_DELETED = 'edge.deleted',
}

/**
 * Base event interface
 */
export interface IEvent {
	/**
	 * Unique identifier for the event
	 */
	id: string;
	
	/**
	 * Type of the event
	 */
	type: EventType;
	
	/**
	 * Timestamp when the event occurred
	 */
	timestamp: number;
	
	/**
	 * Payload of the event
	 */
	payload: any;
}

/**
 * Event listener interface
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
	 */
	handler: (event: IEvent) => void | Promise<void>;
}

/**
 * Event filter options
 */
export interface EventFilterOptions {
	/**
	 * Event types to filter
	 */
	eventTypes?: EventType[];
	
	/**
	 * Start timestamp for filtering
	 */
	startTimestamp?: number;
	
	/**
	 * End timestamp for filtering
	 */
	endTimestamp?: number;
}