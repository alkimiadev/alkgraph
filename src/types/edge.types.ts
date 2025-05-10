/**
 * Edge-related type definitions
 * @module types/edge
 */

/**
 * Edge options interface
 */
export interface EdgeOptions {
	/**
	 * Unique identifier for the edge
	 */
	id?: string;
	
	/**
	 * Source node ID
	 */
	sourceId: string;
	
	/**
	 * Target node ID
	 */
	targetId: string;
	
	/**
	 * Optional label for the edge
	 */
	label?: string;
	
	/**
	 * Optional weight for the edge
	 */
	weight?: number;
	
	/**
	 * Optional attributes for the edge
	 */
	attributes?: Record<string, any>;
	
	/**
	 * Optional metadata for the edge
	 */
	metadata?: Record<string, any>;
}

/**
 * Edge interface
 */
export interface IEdge {
	/**
	 * Unique identifier for the edge
	 */
	id: string;
	
	/**
	 * Graph ID this edge belongs to
	 */
	graphId: string;
	
	/**
	 * Source node ID
	 */
	sourceId: string;
	
	/**
	 * Target node ID
	 */
	targetId: string;
	
	/**
	 * Optional label for the edge
	 */
	label?: string;
	
	/**
	 * Optional weight for the edge
	 */
	weight?: number;
	
	/**
	 * Optional attributes for the edge
	 */
	attributes?: Record<string, any>;
	
	/**
	 * Optional metadata for the edge
	 */
	metadata?: Record<string, any>;
}