/**
 * Metadata-related type definitions
 * @module types/metadata
 */

/**
 * Graph metadata interface
 */
export interface GraphMetadata {
	/**
	 * Creation timestamp
	 */
	createdAt: number;
	
	/**
	 * Last update timestamp
	 */
	updatedAt: number;
	
	/**
	 * Node count
	 */
	nodeCount: number;
	
	/**
	 * Edge count
	 */
	edgeCount: number;
	
	/**
	 * Schema version
	 */
	schemaVersion: string;
	
	/**
	 * Custom metadata
	 */
	custom?: Record<string, any>;
}

/**
 * Node metadata interface
 */
export interface NodeMetadata {
	/**
	 * Creation timestamp
	 */
	createdAt: number;
	
	/**
	 * Last update timestamp
	 */
	updatedAt: number;
	
	/**
	 * Incoming edge count
	 */
	incomingEdgeCount: number;
	
	/**
	 * Outgoing edge count
	 */
	outgoingEdgeCount: number;
	
	/**
	 * Custom metadata
	 */
	custom?: Record<string, any>;
}

/**
 * Edge metadata interface
 */
export interface EdgeMetadata {
	/**
	 * Creation timestamp
	 */
	createdAt: number;
	
	/**
	 * Last update timestamp
	 */
	updatedAt: number;
	
	/**
	 * Custom metadata
	 */
	custom?: Record<string, any>;
}

/**
 * Metadata statistics interface
 */
export interface MetadataStatistics {
	/**
	 * Total node count
	 */
	totalNodeCount: number;
	
	/**
	 * Total edge count
	 */
	totalEdgeCount: number;
	
	/**
	 * Average node degree
	 */
	averageNodeDegree: number;
	
	/**
	 * Graph density
	 */
	graphDensity: number;
}