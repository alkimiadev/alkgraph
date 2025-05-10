/**
 * Edge interface
 * @module graph/edge-interface
 */

/**
 * Interface for a graph edge
 */
export interface IEdgeOperations {
	/**
	 * Gets the edge ID
	 * @returns Edge ID
	 */
	getId(): string;
	
	/**
	 * Gets the graph ID
	 * @returns Graph ID
	 */
	getGraphId(): string;
	
	/**
	 * Gets the source node ID
	 * @returns Source node ID
	 */
	getSourceId(): string;
	
	/**
	 * Gets the target node ID
	 * @returns Target node ID
	 */
	getTargetId(): string;
	
	/**
	 * Gets the edge label
	 * @returns Edge label
	 */
	getLabel(): string | undefined;
	
	/**
	 * Sets the edge label
	 * @param label Edge label
	 * @returns This edge instance for chaining
	 */
	setLabel(label: string): IEdgeOperations;
	
	/**
	 * Gets the edge weight
	 * @returns Edge weight
	 */
	getWeight(): number | undefined;
	
	/**
	 * Sets the edge weight
	 * @param weight Edge weight
	 * @returns This edge instance for chaining
	 */
	setWeight(weight: number): IEdgeOperations;
	
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
	 * @returns This edge instance for chaining
	 */
	setAttribute(key: string, value: any): IEdgeOperations;
	
	/**
	 * Removes an attribute
	 * @param key Attribute key
	 * @returns This edge instance for chaining
	 */
	removeAttribute(key: string): IEdgeOperations;
	
	/**
	 * Gets all attributes
	 * @returns All attributes
	 */
	getAttributes(): Record<string, any>;
	
	/**
	 * Sets multiple attributes at once
	 * @param attributes Attributes to set
	 * @returns This edge instance for chaining
	 */
	setAttributes(attributes: Record<string, any>): IEdgeOperations;
	
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
	 * @returns This edge instance for chaining
	 */
	setMetadata(key: string, value: any): IEdgeOperations;
	
	/**
	 * Gets all metadata
	 * @returns All metadata
	 */
	getMetadata(): Record<string, any>;
	
	/**
	 * Gets the source node
	 * @returns Promise resolving to the source node
	 */
	getSource(): Promise<any>;
	
	/**
	 * Gets the target node
	 * @returns Promise resolving to the target node
	 */
	getTarget(): Promise<any>;
	
	/**
	 * Serializes the edge to a plain object
	 * @returns Serialized edge
	 */
	toJSON(): Record<string, any>;
}