import { Graph } from './core/Graph';
import { Node } from './core/Node';

/**
 * Traverses a graph using breadth-first search (BFS)
 * 
 * @param graph - The graph to traverse
 * @param startNodeId - ID of the node to start from
 * @param callback - Function to call for each visited node
 * @returns Array of visited node IDs in traversal order
 */
export function traverseGraph(
	graph: Graph,
	startNodeId: string,
	callback?: (node: Node) => void | boolean
): string[] {
	if (!graph.hasNode(startNodeId)) {
		return [];
	}

	const visited = new Set<string>();
	const queue: string[] = [startNodeId];
	const result: string[] = [];

	visited.add(startNodeId);

	while (queue.length > 0) {
		const currentId = queue.shift()!;
		const currentNode = graph.getNode(currentId)!;
		
		result.push(currentId);

		if (callback) {
			const shouldContinue = callback(currentNode);
			if (shouldContinue === false) {
				break;
			}
		}

		const connectedNodes = graph.getConnectedNodes(currentId);
		
		for (const node of connectedNodes) {
			if (!visited.has(node.id)) {
				visited.add(node.id);
				queue.push(node.id);
			}
		}
	}

	return result;
}

/**
 * Finds a path between two nodes using breadth-first search (BFS)
 * 
 * @param graph - The graph to search
 * @param startNodeId - ID of the start node
 * @param endNodeId - ID of the end node
 * @returns Array of node IDs representing the path, or null if no path exists
 */
export function findPath(
	graph: Graph,
	startNodeId: string,
	endNodeId: string
): string[] | null {
	if (!graph.hasNode(startNodeId) || !graph.hasNode(endNodeId)) {
		return null;
	}

	if (startNodeId === endNodeId) {
		return [startNodeId];
	}

	const visited = new Set<string>();
	const queue: string[] = [startNodeId];
	const previous = new Map<string, string>();

	visited.add(startNodeId);

	while (queue.length > 0) {
		const currentId = queue.shift()!;
		
		if (currentId === endNodeId) {
			// Reconstruct the path
			const path: string[] = [endNodeId];
			let current = endNodeId;
			
			while (previous.has(current)) {
				current = previous.get(current)!;
				path.unshift(current);
			}
			
			return path;
		}

		const connectedNodes = graph.getConnectedNodes(currentId);
		
		for (const node of connectedNodes) {
			if (!visited.has(node.id)) {
				visited.add(node.id);
				queue.push(node.id);
				previous.set(node.id, currentId);
			}
		}
	}

	return null; // No path found
}

/**
 * Finds cycles in a graph using depth-first search (DFS)
 * 
 * @param graph - The graph to search
 * @returns Array of cycles, where each cycle is an array of node IDs
 */
export function findCycles(graph: Graph): string[][] {
	const cycles: string[][] = [];
	const visited = new Set<string>();
	const recursionStack = new Set<string>();

	function dfs(nodeId: string, path: string[] = []): void {
		visited.add(nodeId);
		recursionStack.add(nodeId);
		path.push(nodeId);

		const connectedNodes = graph.getConnectedNodes(nodeId);
		
		for (const node of connectedNodes) {
			if (!visited.has(node.id)) {
				dfs(node.id, [...path]);
			} else if (recursionStack.has(node.id)) {
				// Found a cycle
				const cycleStart = path.indexOf(node.id);
				const cycle = path.slice(cycleStart);
				cycles.push(cycle);
			}
		}

		recursionStack.delete(nodeId);
	}

	for (const node of graph.getNodes()) {
		if (!visited.has(node.id)) {
			dfs(node.id);
		}
	}

	return cycles;
}