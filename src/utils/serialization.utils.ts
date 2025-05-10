/**
 * Serialization utilities
 * @module utils/serialization
 */

import { SerializationError } from '../errors';

/**
 * Serializes an object to a JSON string
 * @param data Object to serialize
 * @returns Serialized JSON string
 * @throws {SerializationError} If serialization fails
 */
export function serialize(data: any): string {
	try {
		return JSON.stringify(data);
	} catch (error) {
		throw new SerializationError(data, `Failed to serialize data: ${(error as Error).message}`);
	}
}

/**
 * Deserializes a JSON string to an object
 * @param data JSON string to deserialize
 * @returns Deserialized object
 * @throws {SerializationError} If deserialization fails
 */
export function deserialize<T = any>(data: string): T {
	try {
		return JSON.parse(data) as T;
	} catch (error) {
		throw new SerializationError(data, `Failed to deserialize data: ${(error as Error).message}`);
	}
}

/**
 * Serializes an object to a Buffer
 * @param data Object to serialize
 * @returns Buffer containing serialized data
 * @throws {SerializationError} If serialization fails
 */
export function serializeToBuffer(data: any): Buffer {
	try {
		const jsonString = JSON.stringify(data);
		return Buffer.from(jsonString);
	} catch (error) {
		throw new SerializationError(data, `Failed to serialize data to buffer: ${(error as Error).message}`);
	}
}

/**
 * Deserializes a Buffer to an object
 * @param buffer Buffer to deserialize
 * @returns Deserialized object
 * @throws {SerializationError} If deserialization fails
 */
export function deserializeFromBuffer<T = any>(buffer: Buffer): T {
	try {
		const jsonString = buffer.toString('utf8');
		return JSON.parse(jsonString) as T;
	} catch (error) {
		throw new SerializationError(
			buffer,
			`Failed to deserialize data from buffer: ${(error as Error).message}`
		);
	}
}

/**
 * Creates a deep clone of an object
 * @param data Object to clone
 * @returns Deep clone of the object
 * @throws {SerializationError} If cloning fails
 */
export function deepClone<T>(data: T): T {
	try {
		return JSON.parse(JSON.stringify(data)) as T;
	} catch (error) {
		throw new SerializationError(data, `Failed to deep clone data: ${(error as Error).message}`);
	}
}