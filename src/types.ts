/**
 * Type definitions for AlkGraph
 */

/**
 * Node type definition
 */
export interface NodeType {
	id: string;
	type: string;
	data: Record<string, any>;
	metadata?: Record<string, any>;
}

/**
 * Edge type definition
 */
export interface EdgeType {
	id: string;
	source: string;
	target: string;
	type: string;
	data?: Record<string, any>;
	metadata?: Record<string, any>;
}

/**
 * Graph options
 */
export interface GraphOptions {
	directed?: boolean;
	multigraph?: boolean;
	strict?: boolean;
	metadata?: Record<string, any>;
}

/**
 * Graph event types
 */
export const GraphEventType = {
	NODE_ADDED: 'node_added',
	NODE_REMOVED: 'node_removed',
	NODE_UPDATED: 'node_updated',
	EDGE_ADDED: 'edge_added',
	EDGE_REMOVED: 'edge_removed',
	EDGE_UPDATED: 'edge_updated',
	GRAPH_CLEARED: 'graph_cleared',
} as const;

export type GraphEventType = typeof GraphEventType[keyof typeof GraphEventType];

/**
 * Graph event
 */
export interface GraphEvent {
	type: GraphEventType;
	data: any;
	timestamp: number;
}

/**
 * Graph event listener
 */
export type GraphEventListener = (event: GraphEvent) => void;