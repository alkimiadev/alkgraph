/**
 * Graph-related error classes
 * @module errors/graph
 */

/**
 * Base graph error class
 */
export class GraphError extends Error {
	/**
	 * Creates a new GraphError
	 * @param message Error message
	 */
	constructor(message: string) {
		super(message);
		this.name = 'GraphError';
	}
}

/**
 * Error thrown when a graph is not found
 */
export class GraphNotFoundError extends GraphError {
	/**
	 * Graph ID that was not found
	 */
	graphId: string;

	/**
	 * Creates a new GraphNotFoundError
	 * @param graphId Graph ID that was not found
	 */
	constructor(graphId: string) {
		super(`Graph with ID '${graphId}' not found`);
		this.name = 'GraphNotFoundError';
		this.graphId = graphId;
	}
}

/**
 * Error thrown when a node is not found
 */
export class NodeNotFoundError extends GraphError {
	/**
	 * Graph ID
	 */
	graphId: string;

	/**
	 * Node ID that was not found
	 */
	nodeId: string;

	/**
	 * Creates a new NodeNotFoundError
	 * @param graphId Graph ID
	 * @param nodeId Node ID that was not found
	 */
	constructor(graphId: string, nodeId: string) {
		super(`Node with ID '${nodeId}' not found in graph '${graphId}'`);
		this.name = 'NodeNotFoundError';
		this.graphId = graphId;
		this.nodeId = nodeId;
	}
}

/**
 * Error thrown when an edge is not found
 */
export class EdgeNotFoundError extends GraphError {
	/**
	 * Graph ID
	 */
	graphId: string;

	/**
	 * Edge ID that was not found
	 */
	edgeId: string;

	/**
	 * Creates a new EdgeNotFoundError
	 * @param graphId Graph ID
	 * @param edgeId Edge ID that was not found
	 */
	constructor(graphId: string, edgeId: string) {
		super(`Edge with ID '${edgeId}' not found in graph '${graphId}'`);
		this.name = 'EdgeNotFoundError';
		this.graphId = graphId;
		this.edgeId = edgeId;
	}
}

/**
 * Error thrown when a duplicate graph ID is detected
 */
export class DuplicateGraphError extends GraphError {
	/**
	 * Graph ID that was duplicated
	 */
	graphId: string;

	/**
	 * Creates a new DuplicateGraphError
	 * @param graphId Graph ID that was duplicated
	 */
	constructor(graphId: string) {
		super(`Graph with ID '${graphId}' already exists`);
		this.name = 'DuplicateGraphError';
		this.graphId = graphId;
	}
}