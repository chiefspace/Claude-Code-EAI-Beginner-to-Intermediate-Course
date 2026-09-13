---
description: Create a handoff document for session continuity
allowed-tools: Read, Write, Glob, Grep
model: sonnet
---

# EA-Handoff (Module 09: Validation)

Create a handoff document to preserve context for the next session.

## Arguments

- `$1` (optional): Session name/description

## Workflow

### Step 1: Analyze Current State

Gather information about the current session:
1. Check `validation/validation-log.md` for recent validations
2. Check `docs/retrospectives/` for recent retrospectives
3. Look for uncommitted changes with `git status`
4. Identify any failing tests or pending issues

### Step 2: Determine Handoff Filename

Format: `handoff-YYYY-MM-DD-NNN-[session-name].md`

- Date: Current date
- Number: Sequential for the day (001, 002...)
- Session name: From argument or "session"

### Step 3: Create Handoff Document

Write to `specs/handoffs/[filename]`:

```markdown
# Handoff: [Session Name]

**Date**: [YYYY-MM-DD HH:MM]
**Module**: 09-validation

## Session Summary

[Brief description of what was worked on]

## Validation State

### Tests
- Status: [Passing/Failing/Not Run]
- Last run: [timestamp if available]
- Issues: [any failing tests]

### Visual Verification
- Screenshots captured: [count]
- Last capture: [filename if recent]

## Current State

### Completed
- [x] [Completed item 1]
- [x] [Completed item 2]

### In Progress
- [ ] [In progress item]

### Pending
- [ ] [Pending item]

## Files Modified

[List of recently modified files]

## Uncommitted Changes

[Output of git status if any]

## Next Steps

1. [First thing to do next session]
2. [Second thing]
3. [Third thing]

## Notes

[Any important context or warnings for next session]
```

### Step 4: Report

```
Handoff Created

File: specs/handoffs/[filename]
Session: [session name]
Date: [date]

Summary:
- Validations: [count]
- Screenshots: [count]
- Uncommitted files: [count]

Next session: Run /EA-pickup to restore context
```

## Directory

Ensure `specs/handoffs/` exists before writing.
