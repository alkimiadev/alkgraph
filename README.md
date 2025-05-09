# AlkGraph

A graph-based library for interfacing with AI Agents, written in TypeScript.

## Overview

AlkGraph provides a flexible and powerful graph-based structure for representing and manipulating AI agent interactions. It allows for complex relationship modeling between different AI components, enabling more sophisticated agent behaviors and interactions.

## Features

- TypeScript-based graph library
- ESM module support
- Designed specifically for AI agent interactions
- Flexible node and edge definitions
- Extensible architecture

## Installation

```bash
npm install alkgraph
```

## Usage

```typescript
import { Graph, Node, Edge } from 'alkgraph';

// Create a new graph
const graph = new Graph();

// Add nodes
const agentNode = new Node('agent', { capabilities: ['text', 'vision'] });
const knowledgeNode = new Node('knowledge', { source: 'wikipedia' });

graph.addNode(agentNode);
graph.addNode(knowledgeNode);

// Connect nodes with an edge
graph.addEdge(new Edge(agentNode, knowledgeNode, 'can_access'));

// Query the graph
const connectedNodes = graph.getConnectedNodes(agentNode);
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build the library
npm run build

# Run tests
npm run test
```

## License

MIT