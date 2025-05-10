/**
 * Storage manager interface
 * @module storage/storage-manager-interface
 */

import { INode } from '../types/node.types';
import { IEdge } from '../types/edge.types';
import { StorageManagerOptions, StorageOperation } from '../types/storage.types';
import { IStorageAdapter } from './storage-adapter.interface';

/**
 * Interface for storage managers
 */
export interface IStorageManager {
	/**
	 * Gets the storage adapter
	 * @returns Storage adapter
	 */
	getAdapter(): IStorageAdapter;
	
	/**
	 * Initializes the storage manager
	 * @param options Storage manager options
	 * @returns Promise resolving when initialization is complete
	 */
	initialize(options?: StorageManagerOptions): Promise<void>;
	
	/**
	 * Closes the storage manager and releases resources
	 * @returns Promise resolving when closing is complete
	 */
	close(): Promise<void>;
	
	/**
	 * Saves a node to storage
	 * @param node Node to save
	 * @returns Promise resolving to the saved node
	 */
	saveNode(node: INode): Promise<INode>;
	
	/**
	 * Gets a node from storage
	 * @param graphId Graph ID
	 * @param nodeId Node ID
	 * @returns Promise resolving to the node if found, null otherwise
	 */
	getNode(graphId: string, nodeId: string): Promise<INode | null>;
	
	/**
	 * Deletes a node from storage
	 * @param graphId Graph ID
	 * @param nodeId Node ID
	 * @returns Promise resolving to whether the node was deleted
	 */
	deleteNode(graphId: string, nodeId: string): Promise<boolean>;
	
	/**
	 * Gets all nodes for a graph
	 * @param graphId Graph ID
	 * @returns Promise resolving to an array of nodes
	 */
	getAllNodes(graphId: string): Promise<INode[]>;
	
	/**
	 * Saves an edge to storage
	 * @param edge Edge to save
	 * @returns Promise resolving to the saved edge
	 */
	saveEdge(edge: IEdge): Promise<IEdge>;
	
	/**
	 * Gets an edge from storage
	 * @param graphId Graph ID
	 * @param edgeId Edge ID
	 * @returns Promise resolving to the edge if found, null otherwise
	 */
	getEdge(graphId: string, edgeId: string): Promise<IEdge | null>;
	
	/**
	 * Deletes an edge from storage
	 * @param graphId Graph ID
	 * @param edgeId Edge ID
	 * @returns Promise resolving to whether the edge was deleted
	 */
	deleteEdge(graphId: string, edgeId: string): Promise<boolean>;
	
	/**
	 * Gets all edges for a graph
	 * @param graphId Graph ID
	 * @returns Promise resolving to an array of edges
	 */
	getAllEdges(graphId: string): Promise<IEdge[]>;
	
	/**
	 * Gets all outgoing edges for a node
	 * @param graphId Graph ID
	 * @param nodeId Node ID
	 * @returns Promise resolving to an array of edges
	 */
	getOutgoingEdges(graphId: string, nodeId: string): Promise<IEdge[]>;
	
	/**
	 * Gets all incoming edges for a node
	 * @param graphId Graph ID
	 * @param nodeId Node ID
	 * @returns Promise resolving to an array of edges
	 */
	getIncomingEdges(graphId: string, nodeId: string): Promise<IEdge[]>;
	
	/**
	 * Executes a batch of operations
	 * @param operations Operations to execute
	 * @returns Promise resolving when the batch is complete
	 */
	batchOperation(operations: StorageOperation[]): Promise<void>;
	
	/**
	 * Clears all data for a graph
	 * @param graphId Graph ID
	 * @returns Promise resolving when clearing is complete
	 */
	clearGraph(graphId: string): Promise<void>;
	
	/**
	 * Clears all data in storage
	 * @returns Promise resolving when clearing is complete
	 */
	clearAll(): Promise<void>;
}