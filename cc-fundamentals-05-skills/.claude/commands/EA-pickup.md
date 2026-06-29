---
description: Resume from a previous session handoff
allowed-tools: Read, Glob
model: sonnet
---

# Resume from Handoff

## Purpose

Load the most recent handoff document and continue work from where the previous session ended.

## Variables

SPECIFIC_HANDOFF: $ARGUMENTS

## Workflow

1. Find handoff file:
   - If SPECIFIC_HANDOFF provided, use that file
   - Otherwise, find most recent in specs/handoffs/

2. Read the handoff document

3. Parse and present:
   - CONTEXT: What we were working on
   - COMPLETED: What got done previously
   - IN PROGRESS: What needs continuation
   - NEXT STEPS: Suggested actions
   - KEY FILES: Important paths to review
   - BLOCKERS: Any known issues

4. Ask user what they want to focus on:
   - Continue in-progress items
   - Start on next steps
   - Something different

## Report

```
## Session Pickup

**Last Session:** [date from handoff]

### Where We Left Off
[context summary]

### Completed Previously
- [items]

### Still In Progress
- [items]

### Next Steps
1. [from handoff]

Ready to continue. What would you like to focus on?
```

## Instructions

- Keep the summary scannable
- Don't read files unless asked - just report what the handoff says
- Let the user drive what happens next
