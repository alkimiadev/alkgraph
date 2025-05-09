import type { NodeType } from '../types';

/**
 * Node class representing a vertex in the graph
 */
export class Node implements NodeType {
	/**
	 * Unique identifier for the node
	 */
	public id: string;

	/**
	 * Type of the node
	 */
	public type: string;

	/**
	 * Data associated with the node
	 */
	public data: Record<string, any>;

	/**
	 * Metadata for the node
	 */
	public metadata: Record<string, any>;

	/**
	 * Creates a new Node instance
	 * 
	 * @param type - The type of node
	 * @param data - Data associated with the node
	 * @param id - Optional ID (will be auto-generated if not provided)
	 * @param metadata - Optional metadata
	 */
	constructor(
		type: string,
		data: Record<string, any> = {},
		id?: string,
		metadata: Record<string, any> = {}
	) {
		this.id = id || `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
		this.type = type;
		this.data = data;
		this.metadata = metadata;
	}

	/**
	 * Updates the node data
	 * 
	 * @param data - New data to merge with existing data
	 * @returns The updated node
	 */
	public updateData(data: Record<string, any>): this {
		this.data = { ...this.data, ...data };
		return this;
	}

	/**
	 * Updates the node metadata
	 * 
	 * @param metadata - New metadata to merge with existing metadata
	 * @returns The updated node
	 */
	public updateMetadata(metadata: Record<string, any>): this {
		this.metadata = { ...this.metadata, ...metadata };
		return this;
	}

	/**
	 * Serializes the node to a plain object
	 * 
	 * @returns A plain object representation of the node
	 */
	public toObject(): NodeType {
		return {
			id: this.id,
			type: this.type,
			data: this.data,
			metadata: this.metadata
		};
	}

	/**
	 * Creates a Node instance from a plain object
	 * 
	 * @param obj - Plain object representation of a node
	 * @returns A new Node instance
	 */
	public static fromObject(obj: NodeType): Node {
		return new Node(obj.type, obj.data, obj.id, obj.metadata || {});
	}
}