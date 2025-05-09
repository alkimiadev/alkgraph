import type { EdgeType, GraphEvent, GraphEventListener, GraphOptions, NodeType } from '../types';
import { GraphEventType } from '../types';
import { Edge } from './Edge';
import { Node } from './Node';

/**
 * Graph class representing a collection of nodes and edges
 */
export class Graph {
	/**
	 * Map of node IDs to Node instances
	 */
	private nodes: Map<string, Node> = new Map();

	/**
	 * Map of edge IDs to Edge instances
	 */
	private edges: Map<string, Edge> = new Map();

	/**
	 * Map of node IDs to sets of connected edge IDs
	 */
	private adjacencyList: Map<string, Set<string>> = new Map();

	/**
	 * Graph options
	 */
	private options: Required<GraphOptions>;

	/**
	 * Event listeners
	 */
	private eventListeners: Map<string, Set<GraphEventListener>> = new Map();

	/**
	 * Creates a new Graph instance
	 * 
	 * @param options - Graph options
	 */
	constructor(options: GraphOptions = {}) {
		this.options = {
			directed: options.directed ?? true,
			multigraph: options.multigraph ?? false,
			strict: options.strict ?? false,
			metadata: options.metadata ?? {},
		};
	}

	/**
	 * Adds a node to the graph
	 * 
	 * @param node - Node instance or node data
	 * @returns The added node
	 * @throws Error if a node with the same ID already exists and strict mode is enabled
	 */
	public addNode(node: Node | NodeType): Node {
		const nodeInstance = node instanceof Node ? node : Node.fromObject(node);
		
		if (this.options.strict && this.hasNode(nodeInstance.id)) {
			throw new Error(`Node with ID "${nodeInstance.id}" already exists`);
		}

		this.nodes.set(nodeInstance.id, nodeInstance);
		this.adjacencyList.set(nodeInstance.id, new Set());

		this.emit({
			type: GraphEventType.NODE_ADDED,
			data: nodeInstance,
			timestamp: Date.now(),
		});

		return nodeInstance;
	}

	/**
	 * Adds an edge to the graph
	 * 
	 * @param edge - Edge instance or edge data
	 * @returns The added edge
	 * @throws Error if the source or target node does not exist
	 * @throws Error if an edge with the same ID already exists and strict mode is enabled
	 * @throws Error if an edge between the same nodes already exists and multigraph is disabled
	 */
	public addEdge(edge: Edge | EdgeType): Edge {
		const edgeInstance = edge instanceof Edge ? edge : Edge.fromObject(edge);

		if (!this.hasNode(edgeInstance.source)) {
			throw new Error(`Source node with ID "${edgeInstance.source}" does not exist`);
		}

		if (!this.hasNode(edgeInstance.target)) {
			throw new Error(`Target node with ID "${edgeInstance.target}" does not exist`);
		}

		if (this.options.strict && this.hasEdge(edgeInstance.id)) {
			throw new Error(`Edge with ID "${edgeInstance.id}" already exists`);
		}

		if (!this.options.multigraph && this.hasEdgeBetween(edgeInstance.source, edgeInstance.target)) {
			throw new Error(`Edge between nodes "${edgeInstance.source}" and "${edgeInstance.target}" already exists`);
		}

		this.edges.set(edgeInstance.id, edgeInstance);
		this.adjacencyList.get(edgeInstance.source)!.add(edgeInstance.id);

		if (!this.options.directed) {
			this.adjacencyList.get(edgeInstance.target)!.add(edgeInstance.id);
		}

		this.emit({
			type: GraphEventType.EDGE_ADDED,
			data: edgeInstance,
			timestamp: Date.now(),
		});

		return edgeInstance;
	}

	/**
	 * Removes a node from the graph
	 * 
	 * @param id - ID of the node to remove
	 * @returns True if the node was removed, false if it did not exist
	 */
	public removeNode(id: string): boolean {
		if (!this.hasNode(id)) {
			return false;
		}

		const node = this.getNode(id)!;
		
		// Remove all edges connected to this node
		const edgesToRemove = this.getEdgesForNode(id);
		for (const edge of edgesToRemove) {
			this.removeEdge(edge.id);
		}

		// Remove the node
		this.nodes.delete(id);
		this.adjacencyList.delete(id);

		this.emit({
			type: GraphEventType.NODE_REMOVED,
			data: node,
			timestamp: Date.now(),
		});

		return true;
	}

	/**
	 * Removes an edge from the graph
	 * 
	 * @param id - ID of the edge to remove
	 * @returns True if the edge was removed, false if it did not exist
	 */
	public removeEdge(id: string): boolean {
		if (!this.hasEdge(id)) {
			return false;
		}

		const edge = this.getEdge(id)!;
		
		// Remove the edge from the adjacency list
		this.adjacencyList.get(edge.source)!.delete(id);
		
		if (!this.options.directed) {
			this.adjacencyList.get(edge.target)!.delete(id);
		}

		// Remove the edge
		this.edges.delete(id);

		this.emit({
			type: GraphEventType.EDGE_REMOVED,
			data: edge,
			timestamp: Date.now(),
		});

		return true;
	}

	/**
	 * Gets a node by ID
	 * 
	 * @param id - ID of the node to get
	 * @returns The node, or undefined if it does not exist
	 */
	public getNode(id: string): Node | undefined {
		return this.nodes.get(id);
	}

	/**
	 * Gets an edge by ID
	 * 
	 * @param id - ID of the edge to get
	 * @returns The edge, or undefined if it does not exist
	 */
	public getEdge(id: string): Edge | undefined {
		return this.edges.get(id);
	}

	/**
	 * Checks if a node exists
	 * 
	 * @param id - ID of the node to check
	 * @returns True if the node exists, false otherwise
	 */
	public hasNode(id: string): boolean {
		return this.nodes.has(id);
	}

	/**
	 * Checks if an edge exists
	 * 
	 * @param id - ID of the edge to check
	 * @returns True if the edge exists, false otherwise
	 */
	public hasEdge(id: string): boolean {
		return this.edges.has(id);
	}

	/**
	 * Checks if an edge exists between two nodes
	 * 
	 * @param source - ID of the source node
	 * @param target - ID of the target node
	 * @returns True if an edge exists between the nodes, false otherwise
	 */
	public hasEdgeBetween(source: string, target: string): boolean {
		if (!this.hasNode(source) || !this.hasNode(target)) {
			return false;
		}

		const sourceEdges = this.adjacencyList.get(source)!;
		
		for (const edgeId of sourceEdges) {
			const edge = this.getEdge(edgeId)!;
			if (edge.target === target) {
				return true;
			}
		}

		if (!this.options.directed) {
			const targetEdges = this.adjacencyList.get(target)!;
			
			for (const edgeId of targetEdges) {
				const edge = this.getEdge(edgeId)!;
				if (edge.target === source) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Gets all nodes in the graph
	 * 
	 * @returns Array of all nodes
	 */
	public getNodes(): Node[] {
		return Array.from(this.nodes.values());
	}

	/**
	 * Gets all edges in the graph
	 * 
	 * @returns Array of all edges
	 */
	public getEdges(): Edge[] {
		return Array.from(this.edges.values());
	}

	/**
	 * Gets all edges connected to a node
	 * 
	 * @param nodeId - ID of the node
	 * @returns Array of connected edges
	 */
	public getEdgesForNode(nodeId: string): Edge[] {
		if (!this.hasNode(nodeId)) {
			return [];
		}

		const result: Edge[] = [];
		
		// Outgoing edges
		const outgoingEdgeIds = this.adjacencyList.get(nodeId)!;
		for (const edgeId of outgoingEdgeIds) {
			result.push(this.getEdge(edgeId)!);
		}

		// Incoming edges (if directed)
		if (this.options.directed) {
			for (const edge of this.getEdges()) {
				if (edge.target === nodeId && edge.source !== nodeId) {
					result.push(edge);
				}
			}
		}

		return result;
	}

	/**
	 * Gets all nodes connected to a node
	 * 
	 * @param nodeId - ID of the node
	 * @returns Array of connected nodes
	 */
	public getConnectedNodes(nodeId: string): Node[] {
		if (!this.hasNode(nodeId)) {
			return [];
		}

		const connectedNodeIds = new Set<string>();
		const edges = this.getEdgesForNode(nodeId);

		for (const edge of edges) {
			if (edge.source === nodeId) {
				connectedNodeIds.add(edge.target);
			} else {
				connectedNodeIds.add(edge.source);
			}
		}

		return Array.from(connectedNodeIds).map(id => this.getNode(id)!);
	}

	/**
	 * Clears the graph, removing all nodes and edges
	 */
	public clear(): void {
		this.nodes.clear();
		this.edges.clear();
		this.adjacencyList.clear();

		this.emit({
			type: GraphEventType.GRAPH_CLEARED,
			data: null,
			timestamp: Date.now(),
		});
	}

	/**
	 * Adds an event listener
	 * 
	 * @param eventType - Type of event to listen for
	 * @param listener - Event listener function
	 */
	public on(eventType: string, listener: GraphEventListener): void {
		if (!this.eventListeners.has(eventType)) {
			this.eventListeners.set(eventType, new Set());
		}

		this.eventListeners.get(eventType)!.add(listener);
	}

	/**
	 * Removes an event listener
	 * 
	 * @param eventType - Type of event
	 * @param listener - Event listener function to remove
	 * @returns True if the listener was removed, false otherwise
	 */
	public off(eventType: string, listener: GraphEventListener): boolean {
		if (!this.eventListeners.has(eventType)) {
			return false;
		}

		return this.eventListeners.get(eventType)!.delete(listener);
	}

	/**
	 * Emits an event
	 * 
	 * @param event - Event to emit
	 */
	private emit(event: GraphEvent): void {
		const listeners = this.eventListeners.get(event.type) || new Set();
		
		for (const listener of listeners) {
			listener(event);
		}
	}

	/**
	 * Serializes the graph to a plain object
	 * 
	 * @returns A plain object representation of the graph
	 */
	public toObject(): {
		nodes: NodeType[];
		edges: EdgeType[];
		options: Required<GraphOptions>;
	} {
		return {
			nodes: this.getNodes().map(node => node.toObject()),
			edges: this.getEdges().map(edge => edge.toObject()),
			options: this.options,
		};
	}

	/**
	 * Creates a Graph instance from a plain object
	 * 
	 * @param obj - Plain object representation of a graph
	 * @returns A new Graph instance
	 */
	public static fromObject(obj: {
		nodes: NodeType[];
		edges: EdgeType[];
		options?: GraphOptions;
	}): Graph {
		const graph = new Graph(obj.options);
		
		// Add nodes first
		for (const nodeData of obj.nodes) {
			graph.addNode(nodeData);
		}
		
		// Then add edges
		for (const edgeData of obj.edges) {
			graph.addEdge(edgeData);
		}
		
		return graph;
	}
}