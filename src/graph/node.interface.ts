/**
 * Node interface
 * @module graph/node-interface
 */

/**
 * Interface for a graph node
 */
export interface INodeOperations {
	/**
	 * Gets the node ID
	 * @returns Node ID
	 */
	getId(): string;
	
	/**
	 * Gets the graph ID
	 * @returns Graph ID
	 */
	getGraphId(): string;
	
	/**
	 * Gets the node label
	 * @returns Node label
	 */
	getLabel(): string | undefined;
	
	/**
	 * Sets the node label
	 * @param label Node label
	 * @returns This node instance for chaining
	 */
	setLabel(label: string): INodeOperations;
	
	/**
	 * Gets an attribute value
	 * @param key Attribute key
	 * @returns Attribute value or undefined if not found
	 */
	getAttribute(key: string): any;
	
	/**
	 * Sets an attribute value
	 * @param key Attribute key
	 * @param value Attribute value
	 * @returns This node instance for chaining
	 */
	setAttribute(key: string, value: any): INodeOperations;
	
	/**
	 * Removes an attribute
	 * @param key Attribute key
	 * @returns This node instance for chaining
	 */
	removeAttribute(key: string): INodeOperations;
	
	/**
	 * Gets all attributes
	 * @returns All attributes
	 */
	getAttributes(): Record<string, any>;
	
	/**
	 * Sets multiple attributes at once
	 * @param attributes Attributes to set
	 * @returns This node instance for chaining
	 */
	setAttributes(attributes: Record<string, any>): INodeOperations;
	
	/**
	 * Gets a metadata value
	 * @param key Metadata key
	 * @returns Metadata value or undefined if not found
	 */
	getMetadata(key: string): any;
	
	/**
	 * Sets a metadata value
	 * @param key Metadata key
	 * @param value Metadata value
	 * @returns This node instance for chaining
	 */
	setMetadata(key: string, value: any): INodeOperations;
	
	/**
	 * Gets all metadata
	 * @returns All metadata
	 */
	getMetadata(): Record<string, any>;
	
	/**
	 * Gets all outgoing edges
	 * @returns Promise resolving to outgoing edges
	 */
	getOutgoingEdges(): Promise<any[]>;
	
	/**
	 * Gets all incoming edges
	 * @returns Promise resolving to incoming edges
	 */
	getIncomingEdges(): Promise<any[]>;
	
	/**
	 * Gets all neighbor nodes
	 * @param direction Direction of edges to consider ('outgoing', 'incoming', or 'both')
	 * @returns Promise resolving to neighbor nodes
	 */
	getNeighbors(direction?: 'outgoing' | 'incoming' | 'both'): Promise<any[]>;
	
	/**
	 * Serializes the node to a plain object
	 * @returns Serialized node
	 */
	toJSON(): Record<string, any>;
}