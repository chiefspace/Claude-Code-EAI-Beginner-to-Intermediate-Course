---
description: Demo the SubagentStop hook by spawning 3 agents and viewing the activity log
allowed-tools: Bash, Read, Write, Task
argument-hint: (no arguments)
---

# Demo: Subagent Hooks in Action

This demo spawns three agents against the demo fixture files and then shows how the SubagentStop hook automatically logged every completion.

## Workflow

### Step 1: Clear the Activity Log

Write `[]` to `logs/subagent-activity.json` so we start fresh.

Report: "Cleared subagent activity log."

### Step 2: Spawn code-reviewer Agent

Use the Task tool to spawn the `code-reviewer` agent with this prompt:

```
Review the file demo/calculator.py. Identify all code quality issues including unused imports, poor naming, missing docstrings, hardcoded secrets, and potential bugs.
```

Wait for it to complete. Display its output to the user.

Report: "Code review complete. The SubagentStop hook logged this automatically."

### Step 3: Spawn doc-generator Agent

Use the Task tool to spawn the `doc-generator` agent with this prompt:

```
Generate documentation for demo/calculator.py. Document all functions with their parameters, return values, and example usage.
```

Wait for it to complete. Display its output to the user.

Report: "Documentation generation complete. Hook logged this too."

### Step 4: Spawn test-runner Agent

Use the Task tool to spawn the `test-runner` agent with this prompt:

```
Run the tests in demo/test_calculator.py using pytest and summarize the results.
```

Wait for it to complete. Display its output to the user.

Report: "Test run complete. Third hook entry logged."

### Step 5: Show the Activity Log

Read `logs/subagent-activity.json` and display it as a formatted table showing all 3 entries.

### Step 6: Final Summary

```
Demo Complete: SubagentStop Hook
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What happened:
  1. code-reviewer analyzed demo/calculator.py → found issues
  2. doc-generator documented demo/calculator.py → generated docs
  3. test-runner ran demo/test_calculator.py    → all tests passed

What the hook did:
  The SubagentStop hook in .claude/hooks/subagent-logger.py fired
  after EACH agent completed and logged the event to
  logs/subagent-activity.json — completely transparently.

Key insight:
  You never called the logger. The hook runs automatically whenever
  ANY subagent finishes. This is observational hooking — the agents
  don't know they're being logged.

Try it yourself:
  /EA-subagent-log last 3    — view the 3 entries just created
```
