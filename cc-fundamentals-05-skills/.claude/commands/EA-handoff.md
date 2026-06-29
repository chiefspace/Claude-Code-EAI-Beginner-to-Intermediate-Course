---
description: Save session state for resuming later
allowed-tools: Read, Write, Glob
model: sonnet
---

# Session Handoff

## Purpose

Create a handoff document capturing the current session state so you or another agent can resume exactly where you left off.

## Variables

HANDOFF_NOTES: $ARGUMENTS

## Instructions

- Capture all relevant context from the current session
- Include what was accomplished, what's in progress, and next steps
- Save to specs/handoffs/ with timestamp in filename
- Keep it scannable - bullet points over paragraphs

## Workflow

1. Gather session context:
   - What files were modified
   - What skills were installed or created
   - Any errors encountered
   - Decisions made

2. Structure the handoff document:
   ```
   CONTEXT: What we were working on
   COMPLETED: What got done
   IN PROGRESS: What's partially done
   NEXT STEPS: What should happen next
   KEY FILES: Important file paths
   BLOCKERS/NOTES: Issues or context
   ```

3. Save to `specs/handoffs/handoff-YYYYMMDD-HHMMSS.md`

4. If using Omni-Cortex, also store as memory with tags:
   - ["handoff", "session-summary", "skills-module"]

## Report

```
Handoff saved to: specs/handoffs/handoff-[timestamp].md

Summary:
- [what was accomplished]
- [next steps]

Resume with: /EA-pickup
```
