/**
 * Graph-related type definitions
 * @module types/graph
 */

/**
 * Graph options interface
 */
export interface GraphOptions {
	/**
	 * Unique identifier for the graph
	 */
	id?: string;
	
	/**
	 * Optional name for the graph
	 */
	name?: string;
	
	/**
	 * Optional metadata for the graph
	 */
	metadata?: Record<string, any>;
}

/**
 * Graph interface
 */
export interface IGraph {
	/**
	 * Unique identifier for the graph
	 */
	id: string;
	
	/**
	 * Optional name for the graph
	 */
	name?: string;
	
	/**
	 * Optional metadata for the graph
	 */
	metadata?: Record<string, any>;
}