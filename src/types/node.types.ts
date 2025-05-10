/**
 * Node-related type definitions
 * @module types/node
 */

/**
 * Node options interface
 */
export interface NodeOptions {
	/**
	 * Unique identifier for the node
	 */
	id?: string;
	
	/**
	 * Optional label for the node
	 */
	label?: string;
	
	/**
	 * Optional attributes for the node
	 */
	attributes?: Record<string, any>;
	
	/**
	 * Optional metadata for the node
	 */
	metadata?: Record<string, any>;
}

/**
 * Node interface
 */
export interface INode {
	/**
	 * Unique identifier for the node
	 */
	id: string;
	
	/**
	 * Graph ID this node belongs to
	 */
	graphId: string;
	
	/**
	 * Optional label for the node
	 */
	label?: string;
	
	/**
	 * Optional attributes for the node
	 */
	attributes?: Record<string, any>;
	
	/**
	 * Optional metadata for the node
	 */
	metadata?: Record<string, any>;
}