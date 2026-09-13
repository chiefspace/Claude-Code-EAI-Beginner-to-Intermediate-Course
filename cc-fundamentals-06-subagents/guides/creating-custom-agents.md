# Creating Custom Agents

## Agent File Basics

Agents live in `.claude/agents/` as markdown files.

### Minimal Structure

```markdown
---
description: What this agent does
model: sonnet
allowed-tools: Read, Glob, Grep
---

# Agent Name

## Purpose
What this agent accomplishes.

## Instructions
How to complete the task.
```

### Full Structure

```markdown
---
description: One-line description
model: haiku|sonnet|opus
allowed-tools: [tool list]
hooks:
  post_tool_use:
    - matcher: ToolName
      command: validation command
---

# Agent Name

## Purpose
Detailed explanation.

## Input
$ARGUMENTS - Expected input

## Instructions
1. Step one
2. Step two
3. Step three

## Output Format
How results should look.

## Notes
Edge cases, tips.
```

## Frontmatter Options

### `model`
- `haiku` - Fast, cheap, simple tasks
- `sonnet` - Balanced (default)
- `opus` - Complex reasoning

### `allowed-tools`
- `Read, Glob, Grep` - Read-only
- `Read, Write, Edit` - Can modify
- `Bash` - Commands only
- Omit = all tools

### `hooks`
```yaml
hooks:
  post_tool_use:
    - matcher: Write
      command: echo "File written"
```

## Best Practices

### 1. Single Purpose
```
Good: "Reviews code for bugs"
Bad:  "Reviews, tests, and documents"
```

### 2. Clear Instructions
```
Good: "Read file, list functions without docstrings"
Bad:  "Check the code"
```

### 3. Specify Output
Tell agent exactly how to format results.

### 4. Handle Edge Cases
What if no files found? Tests don't exist?

## Example: Lint Agent

```markdown
---
description: Runs linting, summarizes issues
model: haiku
allowed-tools: Bash, Read
---

# Lint Runner

## Purpose
Run linter, provide actionable summary.

## Instructions
1. Detect linter (eslint, ruff, etc.)
2. Run on project or specified file
3. Summarize errors vs warnings
4. List top issues

## Output
## Lint Results
**Tool**: [linter]
### Summary
- Errors: [n]
- Warnings: [n]
### Top Issues
1. [rule]: [count] - [explanation]
```

## Testing Your Agent

1. Create in `.claude/agents/`
2. Use Task tool to invoke
3. Check `/EA-subagent-log`
4. Review results
5. Iterate
