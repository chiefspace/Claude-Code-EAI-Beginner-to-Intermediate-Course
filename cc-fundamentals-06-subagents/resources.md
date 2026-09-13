# Module 06: Resources

## Official Docs
- [Claude Code Task Tool](https://docs.anthropic.com/en/docs/claude-code/task-tool)
- [Claude Code Hooks](https://docs.anthropic.com/en/docs/claude-code/hooks)

## Subagent Types

| Type | Use Case | Tools |
|------|----------|-------|
| Explore | Searching | Read, Glob, Grep |
| General-purpose | Complex tasks | All |
| Bash | Commands | Bash |

## Hook Events

| Event | When | Use |
|-------|------|-----|
| SubagentStop | Completion | Log activity |
| PreToolUse | Before tool | Validation |
| PostToolUse | After tool | Output check |

## Related Modules
- Module 02: Commands
- Module 05: Skills
- Module 07: Security
