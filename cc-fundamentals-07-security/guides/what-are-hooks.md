# What Are Hooks?

Hooks are scripts that run automatically before or after Claude Code performs actions. Think of them as guardrails that protect you from accidental damage.

## Why Hooks Matter

Claude Code is powerful - it can execute real commands on your computer. With that power comes risk:

- A misunderstood command could delete important files
- An accidental `git push --force` could overwrite your team's work
- A typo could expose your API keys

Hooks catch these issues before they become problems.

## Hook Types

| Hook Type | When It Runs | What It Can Do |
|-----------|--------------|----------------|
| **PreToolUse** | BEFORE Claude executes a tool | Block the action or ask for confirmation |
| **PostToolUse** | AFTER Claude executes a tool | Warn about issues (can't block) |

### PreToolUse Hooks

These are your gatekeepers. They see what Claude is about to do and can:
- **Allow** - Let the action proceed
- **Block** - Stop the action completely
- **Ask** - Request your confirmation

Example: Before running `rm -rf /`, a PreToolUse hook blocks it and says "BLOCKED: rm with recursive or force flags could delete entire directories"

### PostToolUse Hooks

These are your observers. They see what Claude just did and can:
- **Warn** - Alert you to potential issues
- **Log** - Record activity for later review

Example: After a command runs, a PostToolUse hook scans the output and warns if an API key was accidentally printed.

## How Hooks Work

```
You type: "delete the temp files"
              ↓
Claude decides: Run `rm -rf ./temp/`
              ↓
PreToolUse hook: Checks patterns...
              ↓
   ┌─────────────────────────────────┐
   │  Pattern matched: rm -rf        │
   │  Action: BLOCK                  │
   │  Reason: Recursive delete       │
   └─────────────────────────────────┘
              ↓
Claude receives: "BLOCKED" message
              ↓
Claude tries safer approach: `rm ./temp/*.tmp`
              ↓
PreToolUse hook: No patterns matched → ALLOW
              ↓
Command executes successfully
```

## What Hooks Protect Against

| Category | Examples |
|----------|----------|
| **Destructive commands** | `rm -rf`, `git push --force`, `DROP TABLE` |
| **Sensitive file access** | `.env`, `~/.ssh/`, API key files |
| **Credential exposure** | API keys printed in command output |

## The Key Insight

> Hooks don't replace your judgment - they augment it.

Claude is powerful but doesn't inherently know what's dangerous for YOUR system. Hooks add that knowledge through patterns you define.

## Next Steps

- Learn where to install hooks: [Global vs Project Hooks](global-vs-project-hooks.md)
- Understand protection levels: [Three Protection Tiers](three-protection-tiers.md)
- Install protection: Run `/EA-install-security`
