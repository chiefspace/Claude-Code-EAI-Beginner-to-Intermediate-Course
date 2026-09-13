# Showcase: Agent with Embedded Hook

See the full implementation at: `.claude/agents/secure-file-reader.md`

## Summary

This agent demonstrates embedding a post_tool_use hook in an agent definition to scan file contents for secrets.

## Key Pattern

```yaml
---
description: Agent description
hooks:
  post_tool_use:
    - matcher: Read
      command: uv run ${CLAUDE_PROJECT_DIR}/.claude/hooks/validators/my-validator.py
---
```

The hook runs after every Read operation performed by this agent.
