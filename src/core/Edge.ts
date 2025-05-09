import type { EdgeType } from '../types';
import { Node } from './Node';

/**
 * Edge class representing a connection between nodes in the graph
 */
export class Edge implements EdgeType {
	/**
	 * Unique identifier for the edge
	 */
	public id: string;

	/**
	 * ID of the source node
	 */
	public source: string;

	/**
	 * ID of the target node
	 */
	public target: string;

	/**
	 * Type of the edge
	 */
	public type: string;

	/**
	 * Data associated with the edge
	 */
	public data: Record<string, any>;

	/**
	 * Metadata for the edge
	 */
	public metadata: Record<string, any>;

	/**
	 * Creates a new Edge instance
	 * 
	 * @param source - Source node or node ID
	 * @param target - Target node or node ID
	 * @param type - Type of the edge
	 * @param data - Data associated with the edge
	 * @param id - Optional ID (will be auto-generated if not provided)
	 * @param metadata - Optional metadata
	 */
	constructor(
		source: Node | string,
		target: Node | string,
		type: string,
		data: Record<string, any> = {},
		id?: string,
		metadata: Record<string, any> = {}
	) {
		this.id = id || `edge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
		this.source = source instanceof Node ? source.id : source;
		this.target = target instanceof Node ? target.id : target;
		this.type = type;
		this.data = data;
		this.metadata = metadata;
	}

	/**
	 * Updates the edge data
	 * 
	 * @param data - New data to merge with existing data
	 * @returns The updated edge
	 */
	public updateData(data: Record<string, any>): this {
		this.data = { ...this.data, ...data };
		return this;
	}

	/**
	 * Updates the edge metadata
	 * 
	 * @param metadata - New metadata to merge with existing metadata
	 * @returns The updated edge
	 */
	public updateMetadata(metadata: Record<string, any>): this {
		this.metadata = { ...this.metadata, ...metadata };
		return this;
	}

	/**
	 * Serializes the edge to a plain object
	 * 
	 * @returns A plain object representation of the edge
	 */
	public toObject(): EdgeType {
		return {
			id: this.id,
			source: this.source,
			target: this.target,
			type: this.type,
			data: this.data,
			metadata: this.metadata
		};
	}

	/**
	 * Creates an Edge instance from a plain object
	 * 
	 * @param obj - Plain object representation of an edge
	 * @returns A new Edge instance
	 */
	public static fromObject(obj: EdgeType): Edge {
		return new Edge(
			obj.source,
			obj.target,
			obj.type,
			obj.data || {},
			obj.id,
			obj.metadata || {}
		);
	}
}