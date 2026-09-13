# Hooks in Frontmatter

Starting with Claude Code 2.1+, you can embed hooks directly inside commands, agents, and skills. This gives you targeted protection for specific workflows.

## What's Different?

Traditional hooks (in settings.json):
- Run for ALL commands/agents
- Global or project-wide scope
- Great for universal protection

Frontmatter hooks:
- Run only for THAT specific command/agent/skill
- Embedded in the markdown file itself
- Great for specialized validation

## When to Use Frontmatter Hooks

| Use Case | Example |
|----------|---------|
| Validate specific output format | CSV command validates CSV structure |
| Protect sensitive operations | API command checks for leaked secrets |
| Enforce project standards | Build command runs linter |

## Syntax

Hooks go in the YAML frontmatter (between `---` markers):

```yaml
---
description: My command description
hooks:
  post_tool_use:
    - matcher: Read|Write
      command: uv run ${CLAUDE_PROJECT_DIR}/.claude/hooks/validators/my-validator.py
  pre_tool_use:
    - matcher: Bash
      command: uv run ${CLAUDE_PROJECT_DIR}/.claude/hooks/validators/my-guard.py
---

# Command content here...
```

## Hook Types in Frontmatter

### pre_tool_use
Runs BEFORE the tool executes. Can block or ask for confirmation.

```yaml
hooks:
  pre_tool_use:
    - matcher: Bash
      command: python my-guard.py
```

### post_tool_use
Runs AFTER the tool executes. Can warn but not block.

```yaml
hooks:
  post_tool_use:
    - matcher: Edit|Write
      command: python my-validator.py
```

### Stop
Runs when the command/agent finishes. Useful for final validation.

```yaml
hooks:
  Stop:
    - hooks:
        - type: command
          command: python final-check.py
```

## Matcher Patterns

The `matcher` field specifies which tools trigger the hook:

| Pattern | Matches |
|---------|---------|
| `Bash` | Bash tool only |
| `Read` | Read tool only |
| `Edit\|Write` | Edit OR Write tools |
| `Read\|Write\|Edit` | Any file operation |

## Environment Variables

Use these in your hook commands:

| Variable | Value |
|----------|-------|
| `${CLAUDE_PROJECT_DIR}` | Path to current project |

## Example: Command with Validation Hook

```yaml
---
description: Safe file processor - validates output format
hooks:
  post_tool_use:
    - matcher: Write
      command: uv run ${CLAUDE_PROJECT_DIR}/.claude/hooks/validators/format-validator.py
---

# Safe File Processor

Process files with automatic format validation.
```

## Example: Agent with Security Hook

```yaml
---
description: Secure file reader - scans for secrets in output
hooks:
  post_tool_use:
    - matcher: Read
      command: uv run ${CLAUDE_PROJECT_DIR}/.claude/hooks/validators/secret-scanner.py
---

# Secure File Reader Agent

Reads files and warns if secrets are detected in content.
```

## Comparison: Settings vs Frontmatter Hooks

| Aspect | Settings Hooks | Frontmatter Hooks |
|--------|---------------|-------------------|
| Scope | All commands/agents | Single command/agent |
| Location | settings.json | In the .md file |
| Maintenance | One place to update | Update each file |
| Best for | Universal protection | Specialized validation |

## When NOT to Use Frontmatter Hooks

- Universal security (use settings.json instead)
- Blocking dangerous commands (use PreToolUse in settings)
- Team-wide rules (put in project settings.json)

## Next Steps

- See examples: [Showcase Examples](../showcase/)
- Install universal protection: Run `/EA-install-security`
