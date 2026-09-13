---
description: Install commands globally or to a project
allowed-tools: Read, Write, Edit, Glob, Bash, AskUserQuestion
model: sonnet
argument-hint: [optional: global | project | both]
---

# Install Commands

## Purpose

Install the EA commands from this module to your own projects or globally. Makes these commands available in any project you work on.

## Variables

SCOPE: $ARGUMENTS
SOURCE_DIR: .claude/commands/

## Instructions

- Copy EA-* command files to the target location
- For global: Copy to ~/.claude/commands/
- For project: Copy to [project]/.claude/commands/
- Create directories if they don't exist
- Don't overwrite existing files without confirmation

## Workflow

1. **Determine scope**
   - If SCOPE is provided, use it
   - Otherwise, ask user: global, project, or both?

2. **List available commands**
   - Read all EA-*.md files in current .claude/commands/
   - Display which commands will be installed

3. **Check target locations**
   - For global: ~/.claude/commands/
   - For project: Ask which project or use current directory

4. **Check for conflicts**
   - If files already exist, ask user whether to:
     - Skip existing
     - Overwrite all
     - Choose per file

5. **Copy files**
   - Create directories if needed
   - Copy command files to target

6. **Confirm installation**
   - List installed commands
   - Provide usage instructions

## Report

```
Commands Installed

Location: [global / project path]

Installed:
- EA-prime.md
- EA-handoff.md
- EA-pickup.md
- EA-install.md

Usage:
- Run `/EA-prime` to understand a codebase
- Run `/EA-handoff` before ending a session
- Run `/EA-pickup` to resume from handoff

Note: Restart Claude Code if commands don't appear in /help
```

## Examples

**Install globally:**
```
/EA-install global
```

**Install to current project:**
```
/EA-install project
```

**Install to both:**
```
/EA-install both
```
