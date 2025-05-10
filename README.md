# AlkGraph

A graph-based library for interfacing with AI Agents, written in TypeScript.

## Overview

AlkGraph provides a flexible and powerful graph-based structure for representing and manipulating AI agent interactions. It allows for complex relationship modeling between different AI components, enabling more sophisticated agent behaviors and interactions.

This library is designed to serve as both a practical tool for AI agent development and a template for working with AI coding assistants.

## Project Structure

The project follows a modular, feature-based organization:

```
alkgraph/
├── docs/               # Documentation files
│   ├── memory/         # Agent memory system documentation
│   └── ...             # Other documentation
├── src/                # Source code
│   ├── concurrency/    # Concurrency control components
│   ├── errors/         # Error classes
│   ├── events/         # Event system components
│   ├── graph/          # Core graph components
│   ├── memory/         # Memory management components
│   ├── storage/        # Storage-related components
│   ├── types/          # TypeScript types and interfaces
│   ├── utils/          # Utility functions
│   └── versioning/     # Versioning and schema evolution
└── tests/              # Test files (mirrors src/ structure)
```

For detailed information about the project structure, see [Directory Structure Plan](docs/directory-structure-plan.md).

## Features

- TypeScript-based graph library
- ESM module support
- Designed specifically for AI agent interactions
- Flexible node and edge definitions
- Extensible architecture
- Event-driven architecture
- Concurrency control
- Versioning and schema evolution
- Memory management

## Installation

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)

### Install from npm

```bash
npm install alkgraph
```

### Install from source

```bash
# Clone the repository
git clone https://github.com/alkimiadev/alkgraph.git

# Navigate to the project directory
cd alkgraph

# Install dependencies
npm install
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

## Development Workflow

AlkGraph follows a structured development workflow. For detailed information, see [Development Standards](docs/development-standards.md).

### Quick Start

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

### Documentation

The project includes comprehensive documentation:

- [Directory Structure Plan](docs/directory-structure-plan.md)
- [Storage Architecture Plan](docs/storage-architecture-plan.md)
- [Agent Memory System Plan](docs/agent-memory-system-plan.md)
- [Development Standards](docs/development-standards.md)

## Using AlkGraph as a Template

AlkGraph is designed to serve as a template for working with AI coding assistants. The project structure, documentation, and development workflow are all optimized for AI-assisted development.

Key benefits for AI-assisted development:

1. Clear, modular structure that's easy for AI to understand
2. Comprehensive documentation that provides context
3. Consistent naming conventions and patterns
4. Well-defined interfaces and separation of concerns

## License

MIT