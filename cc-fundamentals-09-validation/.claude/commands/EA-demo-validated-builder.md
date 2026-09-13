---
description: Demo the self-correcting validated-builder agent with blocking hooks
allowed-tools: Bash, Read, Task
argument-hint: (no arguments)
---

# Demo: Self-Correcting Agent with Blocking Hooks

This demo shows the validated-builder agent fixing a buggy Node.js project. The agent's hooks create a feedback loop: run tests → BLOCKED → fix bug → run tests → PASS → build → validate → PASS.

## Workflow

### Step 1: Show the Intentional Bug

Read `demo-project/src/string-utils.js` and highlight the `countWords` function. Point out:

```
The Bug in countWords():
━━━━━━━━━━━━━━━━━━━━━━━━

  return str.split(' ').filter(w => w.length > 0).length;
                  ^^^
  Problem: Splits on single space ' ' only.
  Should be: str.split(/\s+/) to handle tabs, newlines, etc.
```

### Step 2: Run Tests to Show Failures

Run the tests directly to demonstrate the 2 failures:

```bash
cd demo-project && npm test
```

Show the output — 11 passed, 2 failed (newlines and tabs tests).

Report: "2 tests fail because countWords splits on ' ' instead of /\\s+/. Now let's see the validated-builder agent fix this."

### Step 3: Clean Up Previous Build Artifacts

```bash
cd demo-project && rm -r dist 2>/dev/null; echo "Clean"
```

This ensures the build validator will check for fresh artifacts.

### Step 4: Spawn validated-builder Agent

Use the Task tool to spawn the `validated-builder` agent with this prompt:

```
The demo-project has failing tests. Your task:
1. Run the tests to see what's failing
2. Fix the bug in the source code
3. Run the tests again to confirm they pass
4. Run the build (npm run build)

Work from the demo-project directory. The project uses Node.js with no dependencies.
```

Wait for it to complete. The expected sequence is:

1. Agent runs `npm test` → PostToolUse hook sees exit code 1 → **BLOCKED** with failure details
2. Agent reads the source, finds the bug in `countWords`
3. Agent fixes `split(' ')` to `split(/\s+/)`
4. Agent runs `npm test` again → PostToolUse hook sees exit code 0 → **PASS**
5. Agent runs `npm run build` → creates `dist/`
6. Agent completes → Stop hook checks for `dist/` → **PASS**

### Step 5: Show the Validator Logs

Read the validator log files to show the audit trail:

Read `.claude/hooks/validators/test-validator.log` and `.claude/hooks/validators/build-validator.log`.

Display the key entries showing BLOCK → PASS sequence.

### Step 6: Final Summary

```
Demo Complete: Self-Correcting Agent Pattern
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What happened:
  1. Agent ran tests         → BLOCKED (2 failures)
  2. Agent read source code  → Found the bug in countWords()
  3. Agent fixed the bug     → split(' ') → split(/\s+/)
  4. Agent ran tests again   → PASSED (13/13)
  5. Agent ran build         → Created dist/
  6. Stop hook validated     → dist/ exists → PASSED

Two hooks working together:
  PostToolUse (test-validator.py):
    - Fires after every Bash command
    - Checks if it was a test command
    - If tests fail → BLOCKS the agent with feedback
    - Agent receives the block message and can retry

  Stop (build-validator.py):
    - Fires when the agent tries to finish
    - Checks for build artifacts (dist/)
    - If missing → BLOCKS and agent must build first

Key insight:
  BLOCKING hooks create feedback loops. The agent can't proceed
  until it satisfies the validator. This is the self-correction
  pattern — the agent automatically fixes its own mistakes because
  the hooks won't let it finish until everything passes.

Audit trail:
  .claude/hooks/validators/test-validator.log
  .claude/hooks/validators/build-validator.log
```
