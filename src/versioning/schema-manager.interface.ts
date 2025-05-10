/**
 * Schema manager interface
 * @module versioning/schema-manager-interface
 */

import { SchemaDefinition, SchemaVersion, Migration } from '../types/versioning.types';

/**
 * Interface for schema managers
 */
export interface ISchemaManager {
	/**
	 * Initializes the schema manager
	 * @returns Promise resolving when initialization is complete
	 */
	initialize(): Promise<void>;
	
	/**
	 * Closes the schema manager and releases resources
	 * @returns Promise resolving when closing is complete
	 */
	close(): Promise<void>;
	
	/**
	 * Gets the current schema version
	 * @returns Promise resolving to the current schema version
	 */
	getCurrentVersion(): Promise<SchemaVersion>;
	
	/**
	 * Gets the schema definition for a specific version
	 * @param version Schema version
	 * @returns Promise resolving to the schema definition
	 */
	getSchemaDefinition(version: SchemaVersion): Promise<SchemaDefinition | null>;
	
	/**
	 * Registers a schema definition
	 * @param definition Schema definition to register
	 * @returns Promise resolving when registration is complete
	 */
	registerSchemaDefinition(definition: SchemaDefinition): Promise<void>;
	
	/**
	 * Validates data against a schema
	 * @param data Data to validate
	 * @param version Schema version to validate against
	 * @returns Promise resolving to whether the data is valid
	 */
	validateAgainstSchema(data: any, version: SchemaVersion): Promise<boolean>;
	
	/**
	 * Gets validation errors for data against a schema
	 * @param data Data to validate
	 * @param version Schema version to validate against
	 * @returns Promise resolving to validation errors, or null if valid
	 */
	getValidationErrors(data: any, version: SchemaVersion): Promise<Record<string, string> | null>;
	
	/**
	 * Registers a migration
	 * @param migration Migration to register
	 * @returns Promise resolving when registration is complete
	 */
	registerMigration(migration: Migration): Promise<void>;
	
	/**
	 * Gets all registered migrations
	 * @returns Promise resolving to an array of registered migrations
	 */
	getMigrations(): Promise<Migration[]>;
	
	/**
	 * Gets migrations between two versions
	 * @param fromVersion Source version
	 * @param toVersion Target version
	 * @returns Promise resolving to an array of migrations
	 */
	getMigrationsBetweenVersions(
		fromVersion: SchemaVersion,
		toVersion: SchemaVersion
	): Promise<Migration[]>;
	
	/**
	 * Migrates data from one version to another
	 * @param data Data to migrate
	 * @param fromVersion Source version
	 * @param toVersion Target version
	 * @returns Promise resolving to migrated data
	 */
	migrateData(data: any, fromVersion: SchemaVersion, toVersion: SchemaVersion): Promise<any>;
	
	/**
	 * Checks if a migration path exists between two versions
	 * @param fromVersion Source version
	 * @param toVersion Target version
	 * @returns Promise resolving to whether a migration path exists
	 */
	canMigrate(fromVersion: SchemaVersion, toVersion: SchemaVersion): Promise<boolean>;
	
	/**
	 * Gets all registered schema versions
	 * @returns Promise resolving to an array of registered schema versions
	 */
	getRegisteredVersions(): Promise<SchemaVersion[]>;
	
	/**
	 * Checks if two schema versions are compatible
	 * @param version1 First version
	 * @param version2 Second version
	 * @returns Promise resolving to whether the versions are compatible
	 */
	areVersionsCompatible(version1: SchemaVersion, version2: SchemaVersion): Promise<boolean>;
}