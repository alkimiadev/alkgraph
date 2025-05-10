/**
 * Validation utilities
 * @module utils/validation
 */

import {
	ValidationError,
	RequiredFieldError,
	InvalidTypeError,
	InvalidValueError
} from '../errors';

/**
 * Validates that a value is not null or undefined
 * @param value Value to validate
 * @param fieldName Field name for error reporting
 * @throws {RequiredFieldError} If the value is null or undefined
 */
export function validateRequired(value: any, fieldName: string): void {
	if (value === null || value === undefined) {
		throw new RequiredFieldError(fieldName);
	}
}

/**
 * Validates that a value is of a specific type
 * @param value Value to validate
 * @param fieldName Field name for error reporting
 * @param expectedType Expected type
 * @throws {InvalidTypeError} If the value is not of the expected type
 */
export function validateType(value: any, fieldName: string, expectedType: string): void {
	if (value === null || value === undefined) {
		return; // Skip type validation for null/undefined values
	}

	const actualType = Array.isArray(value) ? 'array' : typeof value;
	
	if (
		(expectedType === 'array' && !Array.isArray(value)) ||
		(expectedType !== 'array' && actualType !== expectedType)
	) {
		throw new InvalidTypeError(fieldName, expectedType, actualType);
	}
}

/**
 * Validates that a string value matches a regular expression
 * @param value String value to validate
 * @param fieldName Field name for error reporting
 * @param pattern Regular expression pattern
 * @param message Custom error message
 * @throws {InvalidValueError} If the value does not match the pattern
 */
export function validatePattern(
	value: string,
	fieldName: string,
	pattern: RegExp,
	message?: string
): void {
	if (value === null || value === undefined) {
		return; // Skip pattern validation for null/undefined values
	}

	if (!pattern.test(value)) {
		throw new InvalidValueError(
			fieldName,
			value,
			message || `Value does not match pattern ${pattern}`
		);
	}
}

/**
 * Validates that a number value is within a range
 * @param value Number value to validate
 * @param fieldName Field name for error reporting
 * @param min Minimum value (inclusive)
 * @param max Maximum value (inclusive)
 * @throws {InvalidValueError} If the value is not within the range
 */
export function validateRange(
	value: number,
	fieldName: string,
	min?: number,
	max?: number
): void {
	if (value === null || value === undefined) {
		return; // Skip range validation for null/undefined values
	}

	if ((min !== undefined && value < min) || (max !== undefined && value > max)) {
		const rangeText = min !== undefined && max !== undefined
			? `between ${min} and ${max}`
			: min !== undefined
				? `greater than or equal to ${min}`
				: `less than or equal to ${max}`;
		
		throw new InvalidValueError(
			fieldName,
			value,
			`Value must be ${rangeText}`
		);
	}
}

/**
 * Validates that a value is one of a set of allowed values
 * @param value Value to validate
 * @param fieldName Field name for error reporting
 * @param allowedValues Array of allowed values
 * @throws {InvalidValueError} If the value is not in the allowed values
 */
export function validateEnum(
	value: any,
	fieldName: string,
	allowedValues: any[]
): void {
	if (value === null || value === undefined) {
		return; // Skip enum validation for null/undefined values
	}

	if (!allowedValues.includes(value)) {
		throw new InvalidValueError(
			fieldName,
			value,
			`Value must be one of: ${allowedValues.join(', ')}`
		);
	}
}

/**
 * Field schema definition for validation
 */
interface FieldSchema {
	type?: string;
	required?: boolean;
	pattern?: string;
	patternMessage?: string;
	minimum?: number;
	maximum?: number;
	enum?: any[];
}

/**
 * Validation schema definition
 */
interface ValidationSchema {
	required?: string[];
	properties?: Record<string, FieldSchema>;
}

/**
 * Validates an object against a schema
 * @param obj Object to validate
 * @param schema Validation schema
 * @returns Validated object
 * @throws {ValidationError} If validation fails
 */
export function validateObject<T>(obj: any, schema: ValidationSchema): T {
	const errors: Record<string, string> = {};
	
	// Check required fields
	if (schema.required) {
		for (const field of schema.required) {
			if (obj[field] === undefined || obj[field] === null) {
				errors[field] = 'Field is required';
			}
		}
	}
	
	// Check field types and constraints
	if (schema.properties) {
		for (const [field, fieldSchema] of Object.entries(schema.properties)) {
			if (obj[field] === undefined || obj[field] === null) {
				continue; // Skip validation for missing fields (already handled by required check)
			}
			
			// Type validation
			if (fieldSchema.type) {
				const actualType = Array.isArray(obj[field]) ? 'array' : typeof obj[field];
				if (
					(fieldSchema.type === 'array' && !Array.isArray(obj[field])) ||
					(fieldSchema.type !== 'array' && actualType !== fieldSchema.type)
				) {
					errors[field] = `Expected type '${fieldSchema.type}', got '${actualType}'`;
					continue; // Skip further validation for this field
				}
			}
			
			// Pattern validation for strings
			if (fieldSchema.type === 'string' && fieldSchema.pattern) {
				const pattern = new RegExp(fieldSchema.pattern);
				if (!pattern.test(obj[field])) {
					errors[field] = fieldSchema.patternMessage || `Value does not match pattern ${fieldSchema.pattern}`;
				}
			}
			
			// Range validation for numbers
			if (fieldSchema.type === 'number' || fieldSchema.type === 'integer') {
				if (
					(fieldSchema.minimum !== undefined && obj[field] < fieldSchema.minimum) ||
					(fieldSchema.maximum !== undefined && obj[field] > fieldSchema.maximum)
				) {
					const rangeText = fieldSchema.minimum !== undefined && fieldSchema.maximum !== undefined
						? `between ${fieldSchema.minimum} and ${fieldSchema.maximum}`
						: fieldSchema.minimum !== undefined
							? `greater than or equal to ${fieldSchema.minimum}`
							: `less than or equal to ${fieldSchema.maximum}`;
					
					errors[field] = `Value must be ${rangeText}`;
				}
			}
			
			// Enum validation
			if (fieldSchema.enum) {
				if (!fieldSchema.enum.includes(obj[field])) {
					errors[field] = `Value must be one of: ${fieldSchema.enum.join(', ')}`;
				}
			}
		}
	}
	
	if (Object.keys(errors).length > 0) {
		throw new ValidationError('Object validation failed', errors);
	}
	
	return obj as T;
}