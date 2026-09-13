# Showcase: Command with Embedded Hook

This example shows a command that validates its own output using a frontmatter hook.

## The Command

**File**: `.claude/commands/safe-csv-writer.md`

```yaml
---
description: Write CSV files with automatic format validation
hooks:
  post_tool_use:
    - matcher: Write
      command: python ${CLAUDE_PROJECT_DIR}/.claude/hooks/validators/csv-validator.py
---

# Safe CSV Writer

Write CSV files with built-in validation. After any Write operation, the hook automatically validates the CSV format.

## Purpose

Ensure all CSV files written by this command:
- Have valid headers
- Have consistent column counts
- Use proper formatting

## Usage

```
/safe-csv-writer Create a CSV file with user data
```

## How It Works

1. Claude writes the CSV file
2. The post_tool_use hook triggers
3. csv-validator.py checks the file
4. If invalid, Claude sees the error and fixes it
5. Repeat until valid

## The Validator

The hook script (csv-validator.py) checks:
- File exists and is readable
- Valid CSV structure
- Consistent row lengths

This ensures clean data without manual verification.
```

## Key Points

- Hook is defined IN the command file (frontmatter)
- Only triggers for THIS command, not globally
- Uses `post_tool_use` to validate AFTER writing
- `matcher: Write` means it only runs on Write operations
