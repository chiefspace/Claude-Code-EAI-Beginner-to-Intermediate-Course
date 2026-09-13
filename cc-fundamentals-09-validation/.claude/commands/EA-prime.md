---
description: Get oriented with Module 09 Validation & Visual Verification
allowed-tools: Read, Glob, Grep
model: sonnet
---

# EA-Prime (Module 09: Validation)

Get a quick understanding of this module's validation and visual verification capabilities.

## Workflow

### Step 1: Read Core Files

Read these files to understand the module:
1. `README.md` - Module overview
2. `resources.md` - External resources and references

### Step 2: Scan Commands

List and briefly describe available commands:
- `.claude/commands/EA-validate.md`
- `.claude/commands/EA-visual-verify.md`
- `.claude/commands/EA-retrospective.md`
- `.claude/commands/EA-apply-learnings.md`

### Step 3: Check Infrastructure

Identify available infrastructure:
- Hooks in `.claude/hooks/validators/`
- Agents in `.claude/agents/`
- MCP configuration in `.mcp.json`

### Step 4: List Guides

Enumerate documentation guides in `guides/`:
- validation-workflow.md
- visual-verification.md
- test-frameworks.md
- retrospective-pattern.md
- trusting-your-agents.md

## Output Format

```
Module 09: Validation & Visual Verification

PURPOSE: [One-line description]

COMMANDS:
- /EA-validate: [description]
- /EA-visual-verify: [description]
- /EA-retrospective: [description]
- /EA-apply-learnings: [description]

INFRASTRUCTURE:
- Hook: auto-test-runner.py
- Agent: validated-builder.md
- MCP: Playwright configured

GUIDES: [count] documentation files

KEY CONCEPTS:
- Validation workflow
- Visual verification with screenshots
- Retrospective pattern for learning
- Trusting agents through hooks

QUICK START:
1. /EA-validate - Run tests
2. /EA-visual-verify <url> - Capture screenshots
3. /EA-retrospective - End of session analysis
```
