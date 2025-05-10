/**
 * AlkGraph - A graph-based library for interfacing with AI Agents
 * @module alkgraph
 * 
 * This is the main entry point for the AlkGraph library.
 * It exports all public modules and components.
 */

// Export types
export * from './types';

// Export errors
export * from './errors';

// Export utilities
export * from './utils';

// Export graph components
export * from './graph';

// Export storage components
export * from './storage';

// Export event components
export * from './events';

// Export concurrency components
export * from './concurrency';

// Export versioning components
export * from './versioning';

// Export memory components
export * from './memory';

// Version information
export const VERSION = '0.1.0';