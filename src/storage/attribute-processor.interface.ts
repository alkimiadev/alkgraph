/**
 * Attribute processor interface
 * @module storage/attribute-processor-interface
 */

/**
 * Interface for attribute processors
 */
export interface IAttributeProcessor {
	/**
	 * Processes an attribute value before storage
	 * @param key Attribute key
	 * @param value Attribute value
	 * @returns Processed value
	 */
	processForStorage(key: string, value: any): any;
	
	/**
	 * Processes an attribute value after retrieval
	 * @param key Attribute key
	 * @param value Attribute value
	 * @returns Processed value
	 */
	processAfterRetrieval(key: string, value: any): any;
	
	/**
	 * Checks if the processor can handle a specific attribute
	 * @param key Attribute key
	 * @param value Attribute value
	 * @returns Whether the processor can handle the attribute
	 */
	canProcess(key: string, value: any): boolean;
	
	/**
	 * Gets the processor priority (higher priority processors are applied first)
	 * @returns Processor priority
	 */
	getPriority(): number;
}

/**
 * Interface for the attribute processor registry
 */
export interface IAttributeProcessorRegistry {
	/**
	 * Registers an attribute processor
	 * @param processor Processor to register
	 * @returns This registry instance for chaining
	 */
	registerProcessor(processor: IAttributeProcessor): IAttributeProcessorRegistry;
	
	/**
	 * Unregisters an attribute processor
	 * @param processor Processor to unregister
	 * @returns Whether the processor was unregistered
	 */
	unregisterProcessor(processor: IAttributeProcessor): boolean;
	
	/**
	 * Gets all registered processors
	 * @returns Array of registered processors
	 */
	getProcessors(): IAttributeProcessor[];
	
	/**
	 * Processes an attribute value before storage
	 * @param key Attribute key
	 * @param value Attribute value
	 * @returns Processed value
	 */
	processForStorage(key: string, value: any): any;
	
	/**
	 * Processes an attribute value after retrieval
	 * @param key Attribute key
	 * @param value Attribute value
	 * @returns Processed value
	 */
	processAfterRetrieval(key: string, value: any): any;
	
	/**
	 * Processes all attributes in an object before storage
	 * @param attributes Attributes object
	 * @returns Processed attributes object
	 */
	processAttributesForStorage(attributes: Record<string, any>): Record<string, any>;
	
	/**
	 * Processes all attributes in an object after retrieval
	 * @param attributes Attributes object
	 * @returns Processed attributes object
	 */
	processAttributesAfterRetrieval(attributes: Record<string, any>): Record<string, any>;
}