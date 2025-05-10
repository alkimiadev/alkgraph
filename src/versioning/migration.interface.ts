/**
 * Migration interface
 * @module versioning/migration-interface
 */

import { SchemaVersion, MigrationStep } from '../types/versioning.types';

/**
 * Interface for migrations
 */
export interface IMigration {
	/**
	 * Gets the source schema version
	 * @returns Source schema version
	 */
	getFromVersion(): SchemaVersion;
	
	/**
	 * Gets the target schema version
	 * @returns Target schema version
	 */
	getToVersion(): SchemaVersion;
	
	/**
	 * Gets the migration steps
	 * @returns Array of migration steps
	 */
	getSteps(): MigrationStep[];
	
	/**
	 * Adds a migration step
	 * @param step Migration step to add
	 * @returns This migration instance for chaining
	 */
	addStep(step: MigrationStep): IMigration;
	
	/**
	 * Applies the migration to data
	 * @param data Data to migrate
	 * @returns Promise resolving to migrated data
	 */
	apply(data: any): Promise<any>;
	
	/**
	 * Validates that the migration can be applied to data
	 * @param data Data to validate
	 * @returns Promise resolving to whether the migration can be applied
	 */
	canApply(data: any): Promise<boolean>;
	
	/**
	 * Gets validation errors for data
	 * @param data Data to validate
	 * @returns Promise resolving to validation errors, or null if valid
	 */
	getValidationErrors(data: any): Promise<Record<string, string> | null>;
	
	/**
	 * Checks if the migration is reversible
	 * @returns Whether the migration is reversible
	 */
	isReversible(): boolean;
	
	/**
	 * Creates a reverse migration
	 * @returns Promise resolving to the reverse migration, or null if not reversible
	 */
	reverse(): Promise<IMigration | null>;
	
	/**
	 * Gets the migration description
	 * @returns Migration description
	 */
	getDescription(): string;
	
	/**
	 * Sets the migration description
	 * @param description Migration description
	 * @returns This migration instance for chaining
	 */
	setDescription(description: string): IMigration;
}