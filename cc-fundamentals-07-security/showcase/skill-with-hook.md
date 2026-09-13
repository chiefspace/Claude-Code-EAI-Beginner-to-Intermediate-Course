# Showcase: Skill with Embedded Hook

See the full implementation at: `.claude/skills/secure-api-call/SKILL.md`

## Summary

This skill demonstrates embedding a post_tool_use hook in a skill definition to validate API responses.

## Key Pattern

```yaml
---
description: Skill description
hooks:
  post_tool_use:
    - matcher: WebFetch
      command: uv run ${CLAUDE_PROJECT_DIR}/.claude/hooks/validators/my-validator.py
---
```

The hook runs after every WebFetch operation performed by this skill.
