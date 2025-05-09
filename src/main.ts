import './style.css';
import { Graph, Node, Edge } from './index';

// Create a simple graph visualization demo
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>AlkGraph Demo</h1>
    <div class="card">
      <div id="graph-info"></div>
      <button id="add-node" type="button">Add Node</button>
      <button id="add-edge" type="button">Add Edge</button>
      <button id="clear-graph" type="button">Clear Graph</button>
    </div>
    <div id="graph-visualization"></div>
  </div>
`;

// Create a new graph
const graph = new Graph();

// Function to update the graph info display
function updateGraphInfo() {
  const infoElement = document.querySelector<HTMLDivElement>('#graph-info');
  if (!infoElement) return;
  
  infoElement.innerHTML = `
    <p>Nodes: ${graph.getNodes().length}</p>
    <p>Edges: ${graph.getEdges().length}</p>
  `;
  
  renderGraph();
}

// Function to render the graph (very simple visualization)
function renderGraph() {
  const visualizationElement = document.querySelector<HTMLDivElement>('#graph-visualization');
  if (!visualizationElement) return;
  
  const nodes = graph.getNodes();
  const edges = graph.getEdges();
  
  let html = '<div class="graph">';
  
  // Render nodes
  html += '<div class="nodes">';
  for (const node of nodes) {
    html += `
      <div class="node" data-id="${node.id}">
        <div class="node-type">${node.type}</div>
        <div class="node-id">${node.id.substring(0, 8)}...</div>
      </div>
    `;
  }
  html += '</div>';
  
  // Render edges
  html += '<div class="edges">';
  for (const edge of edges) {
    const sourceNode = graph.getNode(edge.source);
    const targetNode = graph.getNode(edge.target);
    if (sourceNode && targetNode) {
      html += `
        <div class="edge">
          <span>${sourceNode.id.substring(0, 8)}...</span>
          <span class="edge-type">${edge.type}</span>
          <span>${targetNode.id.substring(0, 8)}...</span>
        </div>
      `;
    }
  }
  html += '</div>';
  
  html += '</div>';
  
  visualizationElement.innerHTML = html;
}

// Add event listeners
document.querySelector<HTMLButtonElement>('#add-node')?.addEventListener('click', () => {
  const nodeTypes = ['person', 'place', 'thing', 'concept', 'event'];
  const randomType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
  const node = new Node(randomType, { createdAt: new Date().toISOString() });
  graph.addNode(node);
  updateGraphInfo();
});

document.querySelector<HTMLButtonElement>('#add-edge')?.addEventListener('click', () => {
  const nodes = graph.getNodes();
  if (nodes.length < 2) {
    alert('Need at least 2 nodes to create an edge');
    return;
  }
  
  const edgeTypes = ['connects', 'knows', 'contains', 'references', 'depends_on'];
  const randomType = edgeTypes[Math.floor(Math.random() * edgeTypes.length)];
  
  // Pick two random nodes
  const sourceIndex = Math.floor(Math.random() * nodes.length);
  let targetIndex;
  do {
    targetIndex = Math.floor(Math.random() * nodes.length);
  } while (targetIndex === sourceIndex);
  
  const sourceNode = nodes[sourceIndex];
  const targetNode = nodes[targetIndex];
  
  try {
    const edge = new Edge(sourceNode, targetNode, randomType);
    graph.addEdge(edge);
    updateGraphInfo();
  } catch (error) {
    console.error('Failed to add edge:', error);
    alert(`Failed to add edge: ${error instanceof Error ? error.message : String(error)}`);
  }
});

document.querySelector<HTMLButtonElement>('#clear-graph')?.addEventListener('click', () => {
  graph.clear();
  updateGraphInfo();
});

// Initial render
updateGraphInfo();
