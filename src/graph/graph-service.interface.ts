/**
 * Graph service interface
 * @module graph/graph-service-interface
 */

import { IGraph } from './graph.interface';
import { GraphOptions } from '../types/graph.types';

/**
 * Interface for the graph service
 */
export interface IGraphService {
	/**
	 * Creates a new graph
	 * @param options Graph options
	 * @returns Promise resolving to the created graph
	 */
	createGraph(options?: GraphOptions): Promise<IGraph>;
	
	/**
	 * Gets a graph by ID
	 * @param graphId Graph ID
	 * @returns Promise resolving to the graph if found, null otherwise
	 */
	getGraph(graphId: string): Promise<IGraph | null>;
	
	/**
	 * Checks if a graph exists
	 * @param graphId Graph ID
	 * @returns Promise resolving to whether the graph exists
	 */
	hasGraph(graphId: string): Promise<boolean>;
	
	/**
	 * Deletes a graph
	 * @param graphId Graph ID
	 * @returns Promise resolving to whether the graph was deleted
	 */
	deleteGraph(graphId: string): Promise<boolean>;
	
	/**
	 * Lists all graphs
	 * @param limit Maximum number of graphs to return
	 * @param offset Number of graphs to skip
	 * @returns Promise resolving to an array of graphs
	 */
	listGraphs(limit?: number, offset?: number): Promise<IGraph[]>;
	
	/**
	 * Counts the number of graphs
	 * @returns Promise resolving to the number of graphs
	 */
	countGraphs(): Promise<number>;
	
	/**
	 * Clears all graphs
	 * @returns Promise resolving to whether all graphs were cleared
	 */
	clearAllGraphs(): Promise<boolean>;
	
	/**
	 * Exports all graphs to a serializable object
	 * @returns Promise resolving to serializable graph data
	 */
	exportAllGraphs(): Promise<Record<string, any>>;
	
	/**
	 * Imports graphs from serialized data
	 * @param data Serialized graph data
	 * @returns Promise resolving to whether the import was successful
	 */
	importGraphs(data: Record<string, any>): Promise<boolean>;
	
	/**
	 * Initializes the graph service
	 * @returns Promise resolving when initialization is complete
	 */
	initialize(): Promise<void>;
	
	/**
	 * Closes the graph service and releases resources
	 * @returns Promise resolving when closing is complete
	 */
	close(): Promise<void>;
}