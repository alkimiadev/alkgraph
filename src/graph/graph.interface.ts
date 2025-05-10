/**
 * Graph interface
 * @module graph/graph-interface
 */

import { INode } from '../types/node.types';
import { IEdge } from '../types/edge.types';
import { GraphOptions } from '../types/graph.types';
import { QueryOptions, QueryResult } from '../types/query.types';

/**
 * Interface for a graph
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
	
	/**
	 * Adds a node to the graph
	 * @param node Node to add
	 * @returns Added node
	 */
	addNode(node: Partial<INode>): Promise<INode>;
	
	/**
	 * Gets a node from the graph
	 * @param nodeId Node ID
	 * @returns Node if found, null otherwise
	 */
	getNode(nodeId: string): Promise<INode | null>;
	
	/**
	 * Updates a node in the graph
	 * @param nodeId Node ID
	 * @param updates Updates to apply
	 * @returns Updated node
	 */
	updateNode(nodeId: string, updates: Partial<INode>): Promise<INode>;
	
	/**
	 * Removes a node from the graph
	 * @param nodeId Node ID
	 * @returns Whether the node was removed
	 */
	removeNode(nodeId: string): Promise<boolean>;
	
	/**
	 * Adds an edge to the graph
	 * @param edge Edge to add
	 * @returns Added edge
	 */
	addEdge(edge: Partial<IEdge>): Promise<IEdge>;
	
	/**
	 * Gets an edge from the graph
	 * @param edgeId Edge ID
	 * @returns Edge if found, null otherwise
	 */
	getEdge(edgeId: string): Promise<IEdge | null>;
	
	/**
	 * Updates an edge in the graph
	 * @param edgeId Edge ID
	 * @param updates Updates to apply
	 * @returns Updated edge
	 */
	updateEdge(edgeId: string, updates: Partial<IEdge>): Promise<IEdge>;
	
	/**
	 * Removes an edge from the graph
	 * @param edgeId Edge ID
	 * @returns Whether the edge was removed
	 */
	removeEdge(edgeId: string): Promise<boolean>;
	
	/**
	 * Gets all nodes in the graph
	 * @returns All nodes
	 */
	getAllNodes(): Promise<INode[]>;
	
	/**
	 * Gets all edges in the graph
	 * @returns All edges
	 */
	getAllEdges(): Promise<IEdge[]>;
	
	/**
	 * Gets all outgoing edges for a node
	 * @param nodeId Node ID
	 * @returns Outgoing edges
	 */
	getOutgoingEdges(nodeId: string): Promise<IEdge[]>;
	
	/**
	 * Gets all incoming edges for a node
	 * @param nodeId Node ID
	 * @returns Incoming edges
	 */
	getIncomingEdges(nodeId: string): Promise<IEdge[]>;
	
	/**
	 * Gets all neighbors of a node
	 * @param nodeId Node ID
	 * @param direction Direction of edges to consider ('outgoing', 'incoming', or 'both')
	 * @returns Neighboring nodes
	 */
	getNeighbors(nodeId: string, direction?: 'outgoing' | 'incoming' | 'both'): Promise<INode[]>;
	
	/**
	 * Queries nodes in the graph
	 * @param options Query options
	 * @returns Query result
	 */
	queryNodes(options?: QueryOptions): Promise<QueryResult<INode>>;
	
	/**
	 * Queries edges in the graph
	 * @param options Query options
	 * @returns Query result
	 */
	queryEdges(options?: QueryOptions): Promise<QueryResult<IEdge>>;
	
	/**
	 * Clears all data in the graph
	 * @returns Whether the graph was cleared
	 */
	clear(): Promise<boolean>;
	
	/**
	 * Gets the number of nodes in the graph
	 * @returns Node count
	 */
	getNodeCount(): Promise<number>;
	
	/**
	 * Gets the number of edges in the graph
	 * @returns Edge count
	 */
	getEdgeCount(): Promise<number>;
	
	/**
	 * Exports the graph to a serializable object
	 * @returns Serializable graph data
	 */
	export(): Promise<Record<string, any>>;
	
	/**
	 * Imports data into the graph
	 * @param data Graph data to import
	 * @returns Whether the import was successful
	 */
	import(data: Record<string, any>): Promise<boolean>;
}