/**
 * Index manager interface
 * @module storage/index-manager-interface
 */

import { INode } from '../types/node.types';
import { IEdge } from '../types/edge.types';
import { QueryCondition, QueryOptions, QueryResult } from '../types/query.types';

/**
 * Interface for index managers
 */
export interface IIndexManager {
	/**
	 * Initializes the index manager
	 * @returns Promise resolving when initialization is complete
	 */
	initialize(): Promise<void>;
	
	/**
	 * Closes the index manager and releases resources
	 * @returns Promise resolving when closing is complete
	 */
	close(): Promise<void>;
	
	/**
	 * Indexes a node
	 * @param node Node to index
	 * @returns Promise resolving when indexing is complete
	 */
	indexNode(node: INode): Promise<void>;
	
	/**
	 * Removes a node from the index
	 * @param graphId Graph ID
	 * @param nodeId Node ID
	 * @returns Promise resolving when removal is complete
	 */
	removeNodeFromIndex(graphId: string, nodeId: string): Promise<void>;
	
	/**
	 * Updates a node in the index
	 * @param node Node to update
	 * @returns Promise resolving when update is complete
	 */
	updateNodeIndex(node: INode): Promise<void>;
	
	/**
	 * Indexes an edge
	 * @param edge Edge to index
	 * @returns Promise resolving when indexing is complete
	 */
	indexEdge(edge: IEdge): Promise<void>;
	
	/**
	 * Removes an edge from the index
	 * @param graphId Graph ID
	 * @param edgeId Edge ID
	 * @returns Promise resolving when removal is complete
	 */
	removeEdgeFromIndex(graphId: string, edgeId: string): Promise<void>;
	
	/**
	 * Updates an edge in the index
	 * @param edge Edge to update
	 * @returns Promise resolving when update is complete
	 */
	updateEdgeIndex(edge: IEdge): Promise<void>;
	
	/**
	 * Queries nodes using the index
	 * @param graphId Graph ID
	 * @param conditions Query conditions
	 * @param options Query options
	 * @returns Promise resolving to query result
	 */
	queryNodes(
		graphId: string,
		conditions: QueryCondition[],
		options?: QueryOptions
	): Promise<QueryResult<INode>>;
	
	/**
	 * Queries edges using the index
	 * @param graphId Graph ID
	 * @param conditions Query conditions
	 * @param options Query options
	 * @returns Promise resolving to query result
	 */
	queryEdges(
		graphId: string,
		conditions: QueryCondition[],
		options?: QueryOptions
	): Promise<QueryResult<IEdge>>;
	
	/**
	 * Clears all indexes for a graph
	 * @param graphId Graph ID
	 * @returns Promise resolving when clearing is complete
	 */
	clearGraphIndexes(graphId: string): Promise<void>;
	
	/**
	 * Clears all indexes
	 * @returns Promise resolving when clearing is complete
	 */
	clearAllIndexes(): Promise<void>;
	
	/**
	 * Rebuilds indexes for a graph
	 * @param graphId Graph ID
	 * @param nodes Nodes to index
	 * @param edges Edges to index
	 * @returns Promise resolving when rebuilding is complete
	 */
	rebuildIndexes(graphId: string, nodes: INode[], edges: IEdge[]): Promise<void>;
}