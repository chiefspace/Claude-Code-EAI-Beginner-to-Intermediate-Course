---
description: Resume work from a previous handoff document
allowed-tools: Read, Glob, Grep
model: sonnet
---

# EA-Pickup (Module 09: Validation)

Resume work from a previous session using a handoff document.

## Arguments

- `$1` (optional): Specific handoff filename or number

## Workflow

### Step 1: Find Handoff Document

If argument provided:
- If filename: Read that specific file
- If number: Find the Nth most recent handoff

If no argument:
- Find the most recent handoff in `specs/handoffs/`

### Step 2: Read Handoff

Parse the handoff document for:
- Session summary
- Validation state (tests, screenshots)
- Current state (completed, in progress, pending)
- Files modified
- Uncommitted changes
- Next steps
- Notes

### Step 3: Check Current State

Verify what has changed since handoff:
1. Run `git status` to see current changes
2. Check if mentioned files still exist
3. Compare validation state

### Step 4: Present Context

```
Session Restored

From: [handoff filename]
Created: [handoff date]
Original Session: [session name]

PREVIOUS STATE:
[Summary from handoff]

VALIDATION STATUS:
- Tests: [status]
- Screenshots: [count] captured

PENDING WORK:
1. [In progress item]
2. [Pending item 1]
3. [Pending item 2]

CURRENT CHANGES:
[Any new uncommitted changes since handoff]

RECOMMENDED NEXT STEPS:
1. [First next step from handoff]
2. [Second next step]

NOTES:
[Any warnings or context from handoff]
```

### Step 5: Offer Actions

Ask if user wants to:
- Continue with pending work
- Run validation to check current state
- Review specific files mentioned in handoff

## Finding Handoffs

Look in `specs/handoffs/` for files matching:
- `handoff-*.md`

Sort by date (from filename) to find most recent.
