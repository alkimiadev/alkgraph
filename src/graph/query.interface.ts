/**
 * Query interface
 * @module graph/query-interface
 */

import { QueryCondition, QueryOptions, QueryResult } from '../types/query.types';
import { INode } from '../types/node.types';
import { IEdge } from '../types/edge.types';

/**
 * Interface for graph queries
 */
export interface IQuery {
	/**
	 * Sets the graph ID to query
	 * @param graphId Graph ID
	 * @returns This query instance for chaining
	 */
	forGraph(graphId: string): IQuery;
	
	/**
	 * Adds a condition to the query
	 * @param condition Query condition
	 * @returns This query instance for chaining
	 */
	where(condition: QueryCondition): IQuery;
	
	/**
	 * Adds multiple conditions to the query with AND logic
	 * @param conditions Query conditions
	 * @returns This query instance for chaining
	 */
	and(conditions: QueryCondition[]): IQuery;
	
	/**
	 * Adds multiple conditions to the query with OR logic
	 * @param conditions Query conditions
	 * @returns This query instance for chaining
	 */
	or(conditions: QueryCondition[]): IQuery;
	
	/**
	 * Sets the limit for the query
	 * @param limit Maximum number of results
	 * @returns This query instance for chaining
	 */
	limit(limit: number): IQuery;
	
	/**
	 * Sets the number of results to skip
	 * @param skip Number of results to skip
	 * @returns This query instance for chaining
	 */
	skip(skip: number): IQuery;
	
	/**
	 * Adds a sort option to the query
	 * @param field Field to sort by
	 * @param direction Sort direction ('asc' or 'desc')
	 * @returns This query instance for chaining
	 */
	sort(field: string, direction: 'asc' | 'desc'): IQuery;
	
	/**
	 * Executes the query for nodes
	 * @returns Promise resolving to query result
	 */
	findNodes(): Promise<QueryResult<INode>>;
	
	/**
	 * Executes the query for edges
	 * @returns Promise resolving to query result
	 */
	findEdges(): Promise<QueryResult<IEdge>>;
	
	/**
	 * Counts the number of nodes matching the query
	 * @returns Promise resolving to the count
	 */
	countNodes(): Promise<number>;
	
	/**
	 * Counts the number of edges matching the query
	 * @returns Promise resolving to the count
	 */
	countEdges(): Promise<number>;
	
	/**
	 * Gets the current query options
	 * @returns Query options
	 */
	getOptions(): QueryOptions;
	
	/**
	 * Resets the query to its initial state
	 * @returns This query instance for chaining
	 */
	reset(): IQuery;
}