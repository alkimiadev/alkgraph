/**
 * Logging utilities
 * @module utils/logging
 */

/**
 * Log levels
 */
export enum LogLevel {
	DEBUG = 'debug',
	INFO = 'info',
	WARN = 'warn',
	ERROR = 'error',
}

/**
 * Log entry interface
 */
export interface LogEntry {
	/**
	 * Timestamp of the log entry
	 */
	timestamp: number;
	
	/**
	 * Log level
	 */
	level: LogLevel;
	
	/**
	 * Message
	 */
	message: string;
	
	/**
	 * Optional context
	 */
	context?: Record<string, any>;
	
	/**
	 * Optional error
	 */
	error?: Error;
}

/**
 * Logger interface
 */
export interface Logger {
	/**
	 * Logs a debug message
	 * @param message Message to log
	 * @param context Optional context
	 */
	debug(message: string, context?: Record<string, any>): void;
	
	/**
	 * Logs an info message
	 * @param message Message to log
	 * @param context Optional context
	 */
	info(message: string, context?: Record<string, any>): void;
	
	/**
	 * Logs a warning message
	 * @param message Message to log
	 * @param context Optional context
	 */
	warn(message: string, context?: Record<string, any>): void;
	
	/**
	 * Logs an error message
	 * @param message Message to log
	 * @param error Optional error
	 * @param context Optional context
	 */
	error(message: string, error?: Error, context?: Record<string, any>): void;
}

/**
 * Console logger implementation
 */
export class ConsoleLogger implements Logger {
	/**
	 * Minimum log level to display
	 */
	private minLevel: LogLevel;
	
	/**
	 * Creates a new ConsoleLogger
	 * @param minLevel Minimum log level to display (default: DEBUG)
	 */
	constructor(minLevel: LogLevel = LogLevel.DEBUG) {
		this.minLevel = minLevel;
	}
	
	/**
	 * Logs a debug message
	 * @param message Message to log
	 * @param context Optional context
	 */
	debug(message: string, context?: Record<string, any>): void {
		this.log(LogLevel.DEBUG, message, undefined, context);
	}
	
	/**
	 * Logs an info message
	 * @param message Message to log
	 * @param context Optional context
	 */
	info(message: string, context?: Record<string, any>): void {
		this.log(LogLevel.INFO, message, undefined, context);
	}
	
	/**
	 * Logs a warning message
	 * @param message Message to log
	 * @param context Optional context
	 */
	warn(message: string, context?: Record<string, any>): void {
		this.log(LogLevel.WARN, message, undefined, context);
	}
	
	/**
	 * Logs an error message
	 * @param message Message to log
	 * @param error Optional error
	 * @param context Optional context
	 */
	error(message: string, error?: Error, context?: Record<string, any>): void {
		this.log(LogLevel.ERROR, message, error, context);
	}
	
	/**
	 * Internal log method
	 * @param level Log level
	 * @param message Message to log
	 * @param error Optional error
	 * @param context Optional context
	 */
	private log(level: LogLevel, message: string, error?: Error, context?: Record<string, any>): void {
		// Skip if below minimum level
		if (!this.shouldLog(level)) {
			return;
		}
		
		const entry: LogEntry = {
			timestamp: Date.now(),
			level,
			message,
			context,
			error,
		};
		
		// Format and log to console
		const timestamp = new Date(entry.timestamp).toISOString();
		const levelUpper = entry.level.toUpperCase();
		
		let logMessage = `[${timestamp}] [${levelUpper}] ${entry.message}`;
		
		// Add context if available
		if (entry.context && Object.keys(entry.context).length > 0) {
			logMessage += `\nContext: ${JSON.stringify(entry.context, null, 2)}`;
		}
		
		// Add error if available
		if (entry.error) {
			logMessage += `\nError: ${entry.error.message}`;
			if (entry.error.stack) {
				logMessage += `\nStack: ${entry.error.stack}`;
			}
		}
		
		// Log to appropriate console method
		switch (level) {
			case LogLevel.DEBUG:
				console.debug(logMessage);
				break;
			case LogLevel.INFO:
				console.info(logMessage);
				break;
			case LogLevel.WARN:
				console.warn(logMessage);
				break;
			case LogLevel.ERROR:
				console.error(logMessage);
				break;
		}
	}
	
	/**
	 * Checks if a log level should be logged
	 * @param level Log level to check
	 * @returns Whether the log level should be logged
	 */
	private shouldLog(level: LogLevel): boolean {
		const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
		const minLevelIndex = levels.indexOf(this.minLevel);
		const levelIndex = levels.indexOf(level);
		
		return levelIndex >= minLevelIndex;
	}
}

/**
 * Default logger instance
 */
export const logger = new ConsoleLogger();