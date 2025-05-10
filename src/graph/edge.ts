/**
 * Edge implementation
 * @module graph/edge
 */

import { IEdge } from '../types/edge.types';
import { INode } from '../types/node.types';
import { IEdgeOperations } from './edge.interface';

/**
 * Edge implementation
 */
export class Edge implements IEdge, IEdgeOperations {
	/**
	 * Edge ID
	 */
	public readonly id: string;
	
	/**
	 * Graph ID
	 */
	public readonly graphId: string;
	
	/**
	 * Source node ID
	 */
	public readonly sourceId: string;
	
	/**
	 * Target node ID
	 */
	public readonly targetId: string;
	
	/**
	 * Edge label
	 */
	public label?: string;
	
	/**
	 * Edge weight
	 */
	public weight?: number;
	
	/**
	 * Edge attributes
	 */
	public attributes: Record<string, any>;
	
	/**
	 * Edge metadata
	 */
	public metadata: Record<string, any>;
	
	/**
	 * Creates a new Edge
	 * @param id Edge ID
	 * @param graphId Graph ID
	 * @param sourceId Source node ID
	 * @param targetId Target node ID
	 * @param label Edge label
	 * @param weight Edge weight
	 * @param attributes Edge attributes
	 * @param metadata Edge metadata
	 */
	constructor(
		id: string,
		graphId: string,
		sourceId: string,
		targetId: string,
		label?: string,
		weight?: number,
		attributes: Record<string, any> = {},
		metadata: Record<string, any> = {}
	) {
		this.id = id;
		this.graphId = graphId;
		this.sourceId = sourceId;
		this.targetId = targetId;
		this.label = label;
		this.weight = weight;
		this.attributes = attributes;
		this.metadata = metadata;
	}
	
	/**
	 * Gets the edge ID
	 * @returns Edge ID
	 */
	getId(): string {
		return this.id;
	}
	
	/**
	 * Gets the graph ID
	 * @returns Graph ID
	 */
	getGraphId(): string {
		return this.graphId;
	}
	
	/**
	 * Gets the source node ID
	 * @returns Source node ID
	 */
	getSourceId(): string {
		return this.sourceId;
	}
	
	/**
	 * Gets the target node ID
	 * @returns Target node ID
	 */
	getTargetId(): string {
		return this.targetId;
	}
	
	/**
	 * Gets the edge label
	 * @returns Edge label
	 */
	getLabel(): string | undefined {
		return this.label;
	}
	
	/**
	 * Sets the edge label
	 * @param label Edge label
	 * @returns This edge instance for chaining
	 */
	setLabel(label: string): IEdgeOperations {
		this.label = label;
		return this;
	}
	
	/**
	 * Gets the edge weight
	 * @returns Edge weight
	 */
	getWeight(): number | undefined {
		return this.weight;
	}
	
	/**
	 * Sets the edge weight
	 * @param weight Edge weight
	 * @returns This edge instance for chaining
	 */
	setWeight(weight: number): IEdgeOperations {
		this.weight = weight;
		return this;
	}
	
	/**
	 * Gets an attribute value
	 * @param key Attribute key
	 * @returns Attribute value or undefined if not found
	 */
	getAttribute(key: string): any {
		return this.attributes[key];
	}
	
	/**
	 * Sets an attribute value
	 * @param key Attribute key
	 * @param value Attribute value
	 * @returns This edge instance for chaining
	 */
	setAttribute(key: string, value: any): IEdgeOperations {
		this.attributes[key] = value;
		return this;
	}
	
	/**
	 * Removes an attribute
	 * @param key Attribute key
	 * @returns This edge instance for chaining
	 */
	removeAttribute(key: string): IEdgeOperations {
		delete this.attributes[key];
		return this;
	}
	
	/**
	 * Gets all attributes
	 * @returns All attributes
	 */
	getAttributes(): Record<string, any> {
		return { ...this.attributes };
	}
	
	/**
	 * Sets multiple attributes at once
	 * @param attributes Attributes to set
	 * @returns This edge instance for chaining
	 */
	setAttributes(attributes: Record<string, any>): IEdgeOperations {
		this.attributes = { ...this.attributes, ...attributes };
		return this;
	}
	
	/**
	 * Gets a metadata value
	 * @param key Metadata key
	 * @returns Metadata value or undefined if not found
	 */
	getMetadataValue(key: string): any {
		return this.metadata[key];
	}
	
	/**
	 * Sets a metadata value
	 * @param key Metadata key
	 * @param value Metadata value
	 * @returns This edge instance for chaining
	 */
	setMetadata(key: string, value: any): IEdgeOperations {
		this.metadata[key] = value;
		return this;
	}
	
	/**
	 * Gets all metadata
	 * @returns All metadata
	 */
	getMetadata(): Record<string, any> {
		return { ...this.metadata };
	}
	
	/**
	 * Gets the source node
	 * @returns Promise resolving to the source node
	 */
	async getSource(): Promise<INode> {
		// Placeholder implementation
		throw new Error('Method not implemented');
	}
	
	/**
	 * Gets the target node
	 * @returns Promise resolving to the target node
	 */
	async getTarget(): Promise<INode> {
		// Placeholder implementation
		throw new Error('Method not implemented');
	}
	
	/**
	 * Serializes the edge to a plain object
	 * @returns Serialized edge
	 */
	toJSON(): Record<string, any> {
		return {
			id: this.id,
			graphId: this.graphId,
			sourceId: this.sourceId,
			targetId: this.targetId,
			label: this.label,
			weight: this.weight,
			attributes: { ...this.attributes },
			metadata: { ...this.metadata },
		};
	}
}