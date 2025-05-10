/**
 * Metadata manager interface
 * @module storage/metadata/metadata-manager-interface
 */

import { GraphMetadata, NodeMetadata, EdgeMetadata, MetadataStatistics } from '../../types/metadata.types';

/**
 * Interface for metadata managers
 */
export interface IMetadataManager {
	/**
	 * Initializes the metadata manager
	 * @returns Promise resolving when initialization is complete
	 */
	initialize(): Promise<void>;
	
	/**
	 * Closes the metadata manager and releases resources
	 * @returns Promise resolving when closing is complete
	 */
	close(): Promise<void>;
	
	/**
	 * Gets graph metadata
	 * @param graphId Graph ID
	 * @returns Promise resolving to graph metadata if found, null otherwise
	 */
	getGraphMetadata(graphId: string): Promise<GraphMetadata | null>;
	
	/**
	 * Updates graph metadata
	 * @param graphId Graph ID
	 * @param metadata Metadata to update
	 * @returns Promise resolving to updated metadata
	 */
	updateGraphMetadata(graphId: string, metadata: Partial<GraphMetadata>): Promise<GraphMetadata>;
	
	/**
	 * Gets node metadata
	 * @param graphId Graph ID
	 * @param nodeId Node ID
	 * @returns Promise resolving to node metadata if found, null otherwise
	 */
	getNodeMetadata(graphId: string, nodeId: string): Promise<NodeMetadata | null>;
	
	/**
	 * Updates node metadata
	 * @param graphId Graph ID
	 * @param nodeId Node ID
	 * @param metadata Metadata to update
	 * @returns Promise resolving to updated metadata
	 */
	updateNodeMetadata(
		graphId: string,
		nodeId: string,
		metadata: Partial<NodeMetadata>
	): Promise<NodeMetadata>;
	
	/**
	 * Gets edge metadata
	 * @param graphId Graph ID
	 * @param edgeId Edge ID
	 * @returns Promise resolving to edge metadata if found, null otherwise
	 */
	getEdgeMetadata(graphId: string, edgeId: string): Promise<EdgeMetadata | null>;
	
	/**
	 * Updates edge metadata
	 * @param graphId Graph ID
	 * @param edgeId Edge ID
	 * @param metadata Metadata to update
	 * @returns Promise resolving to updated metadata
	 */
	updateEdgeMetadata(
		graphId: string,
		edgeId: string,
		metadata: Partial<EdgeMetadata>
	): Promise<EdgeMetadata>;
	
	/**
	 * Increments node edge counts
	 * @param graphId Graph ID
	 * @param sourceId Source node ID
	 * @param targetId Target node ID
	 * @returns Promise resolving when the operation is complete
	 */
	incrementEdgeCounts(graphId: string, sourceId: string, targetId: string): Promise<void>;
	
	/**
	 * Decrements node edge counts
	 * @param graphId Graph ID
	 * @param sourceId Source node ID
	 * @param targetId Target node ID
	 * @returns Promise resolving when the operation is complete
	 */
	decrementEdgeCounts(graphId: string, sourceId: string, targetId: string): Promise<void>;
	
	/**
	 * Calculates graph statistics
	 * @param graphId Graph ID
	 * @returns Promise resolving to graph statistics
	 */
	calculateGraphStatistics(graphId: string): Promise<MetadataStatistics>;
	
	/**
	 * Clears all metadata for a graph
	 * @param graphId Graph ID
	 * @returns Promise resolving when clearing is complete
	 */
	clearGraphMetadata(graphId: string): Promise<void>;
	
	/**
	 * Clears all metadata
	 * @returns Promise resolving when clearing is complete
	 */
	clearAllMetadata(): Promise<void>;
}