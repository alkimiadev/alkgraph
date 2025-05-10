/**
 * Versioning-related type definitions
 * @module types/versioning
 */

/**
 * Schema version interface
 */
export interface SchemaVersion {
	/**
	 * Major version
	 */
	major: number;
	
	/**
	 * Minor version
	 */
	minor: number;
	
	/**
	 * Patch version
	 */
	patch: number;
}

/**
 * Schema definition interface
 */
export interface SchemaDefinition {
	/**
	 * Schema version
	 */
	version: SchemaVersion;
	
	/**
	 * Node schema definitions
	 */
	nodeSchemas: Record<string, NodeSchemaDefinition>;
	
	/**
	 * Edge schema definitions
	 */
	edgeSchemas: Record<string, EdgeSchemaDefinition>;
}

/**
 * Node schema definition interface
 */
export interface NodeSchemaDefinition {
	/**
	 * Node type
	 */
	type: string;
	
	/**
	 * Required attributes
	 */
	required?: string[];
	
	/**
	 * Attribute definitions
	 */
	attributes: Record<string, AttributeDefinition>;
}

/**
 * Edge schema definition interface
 */
export interface EdgeSchemaDefinition {
	/**
	 * Edge type
	 */
	type: string;
	
	/**
	 * Required attributes
	 */
	required?: string[];
	
	/**
	 * Attribute definitions
	 */
	attributes: Record<string, AttributeDefinition>;
	
	/**
	 * Source node types
	 */
	sourceTypes?: string[];
	
	/**
	 * Target node types
	 */
	targetTypes?: string[];
}

/**
 * Attribute definition interface
 */
export interface AttributeDefinition {
	/**
	 * Attribute type
	 */
	type: 'string' | 'number' | 'boolean' | 'object' | 'array';
	
	/**
	 * Whether the attribute is indexed
	 */
	indexed?: boolean;
	
	/**
	 * Default value
	 */
	default?: any;
	
	/**
	 * Validation rules
	 */
	validation?: Record<string, any>;
}

/**
 * Migration interface
 */
export interface Migration {
	/**
	 * Source schema version
	 */
	fromVersion: SchemaVersion;
	
	/**
	 * Target schema version
	 */
	toVersion: SchemaVersion;
	
	/**
	 * Migration steps
	 */
	steps: MigrationStep[];
}

/**
 * Migration step interface
 */
export interface MigrationStep {
	/**
	 * Step type
	 */
	type: 'addAttribute' | 'removeAttribute' | 'renameAttribute' | 'changeAttributeType' | 'addNodeType' | 'removeNodeType' | 'addEdgeType' | 'removeEdgeType';
	
	/**
	 * Step parameters
	 */
	params: Record<string, any>;
}