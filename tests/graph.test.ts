import { describe, it, expect } from 'vitest';
import { Graph, Node, Edge } from '../src';

describe('Graph', () => {
	it('should create an empty graph', () => {
		const graph = new Graph();
		expect(graph.getNodes()).toHaveLength(0);
		expect(graph.getEdges()).toHaveLength(0);
	});

	it('should add nodes to the graph', () => {
		const graph = new Graph();
		const node1 = new Node('person', { name: 'Alice' });
		const node2 = new Node('person', { name: 'Bob' });

		graph.addNode(node1);
		graph.addNode(node2);

		expect(graph.getNodes()).toHaveLength(2);
		expect(graph.hasNode(node1.id)).toBe(true);
		expect(graph.hasNode(node2.id)).toBe(true);
	});

	it('should add edges to the graph', () => {
		const graph = new Graph();
		const node1 = new Node('person', { name: 'Alice' });
		const node2 = new Node('person', { name: 'Bob' });

		graph.addNode(node1);
		graph.addNode(node2);

		const edge = new Edge(node1, node2, 'knows');
		graph.addEdge(edge);

		expect(graph.getEdges()).toHaveLength(1);
		expect(graph.hasEdge(edge.id)).toBe(true);
		expect(graph.hasEdgeBetween(node1.id, node2.id)).toBe(true);
	});

	it('should remove nodes from the graph', () => {
		const graph = new Graph();
		const node1 = new Node('person', { name: 'Alice' });
		const node2 = new Node('person', { name: 'Bob' });

		graph.addNode(node1);
		graph.addNode(node2);

		const edge = new Edge(node1, node2, 'knows');
		graph.addEdge(edge);

		graph.removeNode(node1.id);

		expect(graph.getNodes()).toHaveLength(1);
		expect(graph.hasNode(node1.id)).toBe(false);
		expect(graph.hasNode(node2.id)).toBe(true);
		expect(graph.getEdges()).toHaveLength(0);
		expect(graph.hasEdge(edge.id)).toBe(false);
	});

	it('should get connected nodes', () => {
		const graph = new Graph();
		const node1 = new Node('person', { name: 'Alice' });
		const node2 = new Node('person', { name: 'Bob' });
		const node3 = new Node('person', { name: 'Charlie' });

		graph.addNode(node1);
		graph.addNode(node2);
		graph.addNode(node3);

		graph.addEdge(new Edge(node1, node2, 'knows'));
		graph.addEdge(new Edge(node1, node3, 'knows'));

		const connectedNodes = graph.getConnectedNodes(node1.id);
		expect(connectedNodes).toHaveLength(2);
		expect(connectedNodes.map(n => n.id)).toContain(node2.id);
		expect(connectedNodes.map(n => n.id)).toContain(node3.id);
	});
});

describe('Graph Algorithms', () => {
	it('should traverse the graph', () => {
		const graph = new Graph();
		const node1 = new Node('person', { name: 'Alice' });
		const node2 = new Node('person', { name: 'Bob' });
		const node3 = new Node('person', { name: 'Charlie' });

		graph.addNode(node1);
		graph.addNode(node2);
		graph.addNode(node3);

		graph.addEdge(new Edge(node1, node2, 'knows'));
		graph.addEdge(new Edge(node2, node3, 'knows'));

		const visited: string[] = [];
		const traversal = import('../src/algorithms').then(({ traverseGraph }) => {
			return traverseGraph(graph, node1.id, (node) => {
				visited.push(node.id);
			});
		});

		return traversal.then((result) => {
			expect(result).toHaveLength(3);
			expect(visited).toHaveLength(3);
			expect(result).toContain(node1.id);
			expect(result).toContain(node2.id);
			expect(result).toContain(node3.id);
		});
	});

	it('should find a path between nodes', () => {
		const graph = new Graph();
		const node1 = new Node('person', { name: 'Alice' });
		const node2 = new Node('person', { name: 'Bob' });
		const node3 = new Node('person', { name: 'Charlie' });
		const node4 = new Node('person', { name: 'Dave' });

		graph.addNode(node1);
		graph.addNode(node2);
		graph.addNode(node3);
		graph.addNode(node4);

		graph.addEdge(new Edge(node1, node2, 'knows'));
		graph.addEdge(new Edge(node2, node3, 'knows'));
		graph.addEdge(new Edge(node3, node4, 'knows'));

		const pathPromise = import('../src/algorithms').then(({ findPath }) => {
			return findPath(graph, node1.id, node4.id);
		});

		return pathPromise.then((path) => {
			expect(path).not.toBeNull();
			expect(path).toHaveLength(4);
			expect(path![0]).toBe(node1.id);
			expect(path![1]).toBe(node2.id);
			expect(path![2]).toBe(node3.id);
			expect(path![3]).toBe(node4.id);
		});
	});
});