# AlkGraph Agent Memory System

## Purpose

The AlkGraph Agent Memory System helps different roles maintain context between tasks by providing a structured way to record and access important information. This system ensures continuity and knowledge retention as different agents work on the project.

## Memory Files

The system includes the following memory files:

- [Architect Memory](architect.md) - For the Architect role
- [Code Memory](code.md) - For the Code role
- [Debug Memory](debug.md) - For the Debug role
- [Orchestrator Memory](orchestrator.md) - For the Orchestrator role

## Automatic Updates

Memory files are automatically updated after each task. Agents should:

1. Add information about decisions made during the task
2. Document changes implemented
3. Update the current state section
4. Add any new references to project documentation

## Information Guidelines

Memory files should include:

1. **Role-specific information** relevant to the role's responsibilities
2. **References to documentation** with links to specific sections
3. **Recent decisions** with rationales and implications
4. **Current state** information about relevant components
5. **Timestamps** for all updates

## Usage Guidelines

At the beginning of each task, agents should:

1. Review the memory file for their role
2. Check recent decisions and current state
3. Refer to linked documentation as needed
4. Consider how the current task relates to previous work
5. Update the memory file after completing the task