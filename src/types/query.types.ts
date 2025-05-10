/**
 * Query-related type definitions
 * @module types/query
 */

/**
 * Query operator enum
 */
export enum QueryOperator {
	EQUALS = 'equals',
	NOT_EQUALS = 'notEquals',
	GREATER_THAN = 'greaterThan',
	GREATER_THAN_OR_EQUAL = 'greaterThanOrEqual',
	LESS_THAN = 'lessThan',
	LESS_THAN_OR_EQUAL = 'lessThanOrEqual',
	CONTAINS = 'contains',
	STARTS_WITH = 'startsWith',
	ENDS_WITH = 'endsWith',
	IN = 'in',
	NOT_IN = 'notIn',
}

/**
 * Query condition interface
 */
export interface QueryCondition {
	/**
	 * Field to query on
	 */
	field: string;
	
	/**
	 * Operator to use
	 */
	operator: QueryOperator;
	
	/**
	 * Value to compare against
	 */
	value: any;
}

/**
 * Query options interface
 */
export interface QueryOptions {
	/**
	 * Conditions for the query
	 */
	conditions?: QueryCondition[];
	
	/**
	 * Logical operator to combine conditions
	 */
	logicalOperator?: 'AND' | 'OR';
	
	/**
	 * Limit the number of results
	 */
	limit?: number;
	
	/**
	 * Skip a number of results
	 */
	skip?: number;
	
	/**
	 * Sort options
	 */
	sort?: {
		field: string;
		direction: 'asc' | 'desc';
	}[];
}

/**
 * Query result interface
 */
export interface QueryResult<T> {
	/**
	 * Results of the query
	 */
	results: T[];
	
	/**
	 * Total count of results (before limit/skip)
	 */
	totalCount: number;
	
	/**
	 * Whether there are more results
	 */
	hasMore: boolean;
}