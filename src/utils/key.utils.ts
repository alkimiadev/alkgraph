/**
 * Key generation utilities
 * @module utils/key
 */

import { randomBytes } from 'crypto';

/**
 * Generates a random UUID v4
 * @returns Random UUID string
 */
export function generateUUID(): string {
	const bytes = randomBytes(16);
	
	// Set version (4) and variant (RFC4122)
	bytes[6] = (bytes[6] & 0x0f) | 0x40;
	bytes[8] = (bytes[8] & 0x3f) | 0x80;
	
	// Convert to hex string with dashes
	return [
		bytes.slice(0, 4).toString('hex'),
		bytes.slice(4, 6).toString('hex'),
		bytes.slice(6, 8).toString('hex'),
		bytes.slice(8, 10).toString('hex'),
		bytes.slice(10, 16).toString('hex')
	].join('-');
}

/**
 * Generates a random ID with specified length
 * @param length Length of the ID (default: 16)
 * @returns Random ID string
 */
export function generateRandomId(length: number = 16): string {
	return randomBytes(Math.ceil(length / 2))
		.toString('hex')
		.slice(0, length);
}

/**
 * Generates a composite key from parts
 * @param parts Key parts
 * @param separator Separator character (default: ':')
 * @returns Composite key string
 */
export function generateCompositeKey(parts: string[], separator: string = ':'): string {
	return parts.join(separator);
}

/**
 * Splits a composite key into parts
 * @param key Composite key
 * @param separator Separator character (default: ':')
 * @returns Key parts
 */
export function splitCompositeKey(key: string, separator: string = ':'): string[] {
	return key.split(separator);
}

/**
 * Generates a node key
 * @param graphId Graph ID
 * @param nodeId Node ID
 * @returns Node key
 */
export function generateNodeKey(graphId: string, nodeId: string): string {
	return generateCompositeKey(['graph', graphId, 'node', nodeId]);
}

/**
 * Generates an edge key
 * @param graphId Graph ID
 * @param edgeId Edge ID
 * @returns Edge key
 */
export function generateEdgeKey(graphId: string, edgeId: string): string {
	return generateCompositeKey(['graph', graphId, 'edge', edgeId]);
}

/**
 * Generates a node index key
 * @param graphId Graph ID
 * @param attribute Attribute name
 * @param value Attribute value
 * @returns Node index key
 */
export function generateNodeIndexKey(graphId: string, attribute: string, value: string): string {
	return generateCompositeKey(['graph', graphId, 'node-index', attribute, value]);
}

/**
 * Generates an edge index key
 * @param graphId Graph ID
 * @param attribute Attribute name
 * @param value Attribute value
 * @returns Edge index key
 */
export function generateEdgeIndexKey(graphId: string, attribute: string, value: string): string {
	return generateCompositeKey(['graph', graphId, 'edge-index', attribute, value]);
}

/**
 * Generates a graph metadata key
 * @param graphId Graph ID
 * @returns Graph metadata key
 */
export function generateGraphMetadataKey(graphId: string): string {
	return generateCompositeKey(['graph', graphId, 'metadata']);
}

/**
 * Generates a node outgoing edges key
 * @param graphId Graph ID
 * @param nodeId Node ID
 * @returns Node outgoing edges key
 */
export function generateNodeOutgoingEdgesKey(graphId: string, nodeId: string): string {
	return generateCompositeKey(['graph', graphId, 'node', nodeId, 'outgoing']);
}

/**
 * Generates a node incoming edges key
 * @param graphId Graph ID
 * @param nodeId Node ID
 * @returns Node incoming edges key
 */
export function generateNodeIncomingEdgesKey(graphId: string, nodeId: string): string {
	return generateCompositeKey(['graph', graphId, 'node', nodeId, 'incoming']);
}