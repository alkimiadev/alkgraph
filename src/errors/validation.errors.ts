/**
 * Validation-related error classes
 * @module errors/validation
 */

/**
 * Base validation error class
 */
export class ValidationError extends Error {
	/**
	 * Validation errors
	 */
	errors: Record<string, string>;

	/**
	 * Creates a new ValidationError
	 * @param message Error message
	 * @param errors Validation errors
	 */
	constructor(message: string, errors: Record<string, string> = {}) {
		super(message);
		this.name = 'ValidationError';
		this.errors = errors;
	}
}

/**
 * Error thrown when a required field is missing
 */
export class RequiredFieldError extends ValidationError {
	/**
	 * Field that is required
	 */
	field: string;

	/**
	 * Creates a new RequiredFieldError
	 * @param field Field that is required
	 */
	constructor(field: string) {
		super(`Field '${field}' is required`, { [field]: 'Field is required' });
		this.name = 'RequiredFieldError';
		this.field = field;
	}
}

/**
 * Error thrown when a field has an invalid type
 */
export class InvalidTypeError extends ValidationError {
	/**
	 * Field with invalid type
	 */
	field: string;

	/**
	 * Expected type
	 */
	expectedType: string;

	/**
	 * Actual type
	 */
	actualType: string;

	/**
	 * Creates a new InvalidTypeError
	 * @param field Field with invalid type
	 * @param expectedType Expected type
	 * @param actualType Actual type
	 */
	constructor(field: string, expectedType: string, actualType: string) {
		super(
			`Field '${field}' has invalid type. Expected '${expectedType}', got '${actualType}'`,
			{ [field]: `Expected type '${expectedType}', got '${actualType}'` }
		);
		this.name = 'InvalidTypeError';
		this.field = field;
		this.expectedType = expectedType;
		this.actualType = actualType;
	}
}

/**
 * Error thrown when a field value is invalid
 */
export class InvalidValueError extends ValidationError {
	/**
	 * Field with invalid value
	 */
	field: string;

	/**
	 * Value that is invalid
	 */
	value: any;

	/**
	 * Creates a new InvalidValueError
	 * @param field Field with invalid value
	 * @param value Value that is invalid
	 * @param message Error message
	 */
	constructor(field: string, value: any, message?: string) {
		super(
			message || `Field '${field}' has invalid value: ${JSON.stringify(value)}`,
			{ [field]: `Invalid value: ${JSON.stringify(value)}` }
		);
		this.name = 'InvalidValueError';
		this.field = field;
		this.value = value;
	}
}

/**
 * Error thrown when a schema validation fails
 */
export class SchemaValidationError extends ValidationError {
	/**
	 * Schema that failed validation
	 */
	schema: any;

	/**
	 * Data that failed validation
	 */
	data: any;

	/**
	 * Creates a new SchemaValidationError
	 * @param schema Schema that failed validation
	 * @param data Data that failed validation
	 * @param errors Validation errors
	 */
	constructor(schema: any, data: any, errors: Record<string, string>) {
		super('Schema validation failed', errors);
		this.name = 'SchemaValidationError';
		this.schema = schema;
		this.data = data;
	}
}