/**
 * Pagination utilities
 * @module utils/pagination
 */

/**
 * Pagination options interface
 */
export interface PaginationOptions {
	/**
	 * Page number (1-based)
	 */
	page?: number;
	
	/**
	 * Page size
	 */
	pageSize?: number;
	
	/**
	 * Cursor for cursor-based pagination
	 */
	cursor?: string;
	
	/**
	 * Maximum number of items to return
	 */
	limit?: number;
}

/**
 * Pagination result interface
 */
export interface PaginationResult<T> {
	/**
	 * Items for the current page
	 */
	items: T[];
	
	/**
	 * Total number of items
	 */
	totalItems: number;
	
	/**
	 * Total number of pages
	 */
	totalPages: number;
	
	/**
	 * Current page number (1-based)
	 */
	currentPage: number;
	
	/**
	 * Page size
	 */
	pageSize: number;
	
	/**
	 * Whether there is a next page
	 */
	hasNextPage: boolean;
	
	/**
	 * Whether there is a previous page
	 */
	hasPreviousPage: boolean;
	
	/**
	 * Next page cursor (for cursor-based pagination)
	 */
	nextCursor?: string;
}

/**
 * Default pagination options
 */
export const DEFAULT_PAGINATION_OPTIONS: Required<Omit<PaginationOptions, 'cursor'>> = {
	page: 1,
	pageSize: 20,
	limit: 1000,
};

/**
 * Applies offset-based pagination to an array
 * @param items Array of items to paginate
 * @param options Pagination options
 * @returns Paginated result
 */
export function paginateArray<T>(
	items: T[],
	options: PaginationOptions = {}
): PaginationResult<T> {
	const { page = DEFAULT_PAGINATION_OPTIONS.page, pageSize = DEFAULT_PAGINATION_OPTIONS.pageSize } = options;
	
	const totalItems = items.length;
	const totalPages = Math.ceil(totalItems / pageSize);
	const currentPage = Math.max(1, Math.min(page, totalPages || 1));
	
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, totalItems);
	
	const paginatedItems = items.slice(startIndex, endIndex);
	
	return {
		items: paginatedItems,
		totalItems,
		totalPages,
		currentPage,
		pageSize,
		hasNextPage: currentPage < totalPages,
		hasPreviousPage: currentPage > 1,
	};
}

/**
 * Applies cursor-based pagination to an array
 * @param items Array of items to paginate
 * @param options Pagination options
 * @param getItemCursor Function to get cursor for an item
 * @param parseCursor Function to parse cursor
 * @returns Paginated result
 */
export function paginateArrayWithCursor<T>(
	items: T[],
	options: PaginationOptions = {},
	getItemCursor: (item: T) => string,
	parseCursor: (cursor: string) => any
): PaginationResult<T> & { nextCursor?: string } {
	const { limit = DEFAULT_PAGINATION_OPTIONS.limit, cursor } = options;
	
	let startIndex = 0;
	
	// If cursor is provided, find the starting index
	if (cursor) {
		const parsedCursor = parseCursor(cursor);
		startIndex = items.findIndex(item => {
			const itemCursor = getItemCursor(item);
			return itemCursor === cursor;
		});
		
		// If cursor not found, start from beginning
		if (startIndex === -1) {
			startIndex = 0;
		} else {
			// Start after the cursor item
			startIndex += 1;
		}
	}
	
	const endIndex = Math.min(startIndex + limit, items.length);
	const paginatedItems = items.slice(startIndex, endIndex);
	
	// Get next cursor from the last item
	const nextCursor = paginatedItems.length > 0 && endIndex < items.length
		? getItemCursor(paginatedItems[paginatedItems.length - 1])
		: undefined;
	
	return {
		items: paginatedItems,
		totalItems: items.length,
		totalPages: Math.ceil(items.length / limit),
		currentPage: Math.floor(startIndex / limit) + 1,
		pageSize: limit,
		hasNextPage: endIndex < items.length,
		hasPreviousPage: startIndex > 0,
		nextCursor,
	};
}

/**
 * Creates a pagination info object for display
 * @param result Pagination result
 * @returns Pagination info object
 */
export function createPaginationInfo(result: PaginationResult<any>): Record<string, any> {
	const { totalItems, totalPages, currentPage, pageSize, hasNextPage, hasPreviousPage } = result;
	
	const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
	const endItem = Math.min(currentPage * pageSize, totalItems);
	
	return {
		totalItems,
		totalPages,
		currentPage,
		pageSize,
		startItem,
		endItem,
		hasNextPage,
		hasPreviousPage,
		showing: `Showing ${startItem} to ${endItem} of ${totalItems} items`,
	};
}