---
name: my-skill
description: |
  Brief description of what this skill does.
  Use when: (1) first scenario, (2) second scenario, (3) third scenario.
  Trigger keywords: keyword1, keyword2, keyword3
---

# My Skill

One-line description of the skill's purpose.

## Quick Reference

- **Main feature**: Instructions below
- **Advanced feature**: See [ADVANCED.md](references/ADVANCED.md) when needed

## Pre-Action Context

Before starting:
- Check for existing patterns: Search relevant context
- Recall previous work on similar tasks

## Workflow

1. **Parse** the user request to understand intent
2. **Validate** inputs meet requirements
3. **Execute** the main operation
4. **Verify** output quality
5. **Return** results to user

## Instructions

- Always validate inputs before processing
- Handle errors gracefully with actionable messages
- Keep output concise unless user requests detail

## Scripts

Available scripts in `scripts/` folder:
- `example_script.py` - Description of what it does

Usage:
```bash
python scripts/example_script.py --input file.txt --output result.txt
```

## Reference Files

Load these as needed:
- [Getting Started](references/getting-started.md) - Basic usage
- [Advanced](references/advanced.md) - Complex scenarios
- [Troubleshooting](references/troubleshooting.md) - Error recovery

## Examples

**Basic usage:**
```
/my-skill "do something simple"
```

**With options:**
```
/my-skill "do something" --format json
```

## Post-Action Memory

After completing work, store results:
- Content: What was accomplished, key decisions made
- Tags: ["my-skill", "{context}"]
- Type: "progress"
