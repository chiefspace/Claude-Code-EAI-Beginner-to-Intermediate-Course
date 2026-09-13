---
description: Install Module 09 Validation components to your project
allowed-tools: Bash, Read, Write, Glob, AskUserQuestion
model: sonnet
---

# EA-Install (Module 09: Validation)

Install validation commands, hooks, and configuration to your project.

## Workflow

### Step 1: Ask Installation Scope

Use AskUserQuestion to ask:
- **Question**: "Where should validation components be installed?"
- **Options**:
  - Project only (current directory)
  - Global (~/.claude/)
  - Both project and global

### Step 2: Ask What to Install

Use AskUserQuestion with multiSelect:
- **Question**: "Which components do you want to install?"
- **Options**:
  - Commands (EA-validate, EA-visual-verify, EA-retrospective, EA-apply-learnings)
  - Hooks (auto-test-runner.py)
  - Agent (validated-builder.md)
  - MCP Config (.mcp.json with Playwright)

### Step 3: Check for Conflicts

For each selected component:
1. Check if file already exists at target location
2. If exists, ask: "File already exists. Skip or Overwrite?"

### Step 4: Copy Selected Items

Copy from module source to target location:

| Component | Source | Project Target | Global Target |
|-----------|--------|----------------|---------------|
| Commands | .claude/commands/*.md | .claude/commands/ | ~/.claude/commands/ |
| Hooks | .claude/hooks/validators/*.py | .claude/hooks/validators/ | ~/.claude/hooks/validators/ |
| Agent | .claude/agents/*.md | .claude/agents/ | ~/.claude/agents/ |
| MCP Config | .mcp.json | .mcp.json | N/A (project only) |

### Step 5: Report Installation

```
Installation Complete

Scope: [Project/Global/Both]

Installed:
- [x] Commands: EA-validate, EA-visual-verify, EA-retrospective, EA-apply-learnings
- [x] Hooks: auto-test-runner.py
- [x] Agent: validated-builder.md
- [x] MCP Config: .mcp.json

Location(s):
- Project: .claude/
- Global: ~/.claude/

Next Steps:
1. Run /EA-validate to test your project
2. Use /EA-visual-verify <url> for screenshots
3. Run /EA-retrospective at end of session
```

## Installation Paths

| Scope | Commands | Hooks | Agents |
|-------|----------|-------|--------|
| Project | .claude/commands/ | .claude/hooks/validators/ | .claude/agents/ |
| Global | ~/.claude/commands/ | ~/.claude/hooks/validators/ | ~/.claude/agents/ |

## Notes

- MCP config (.mcp.json) is always project-only
- Creating directories if they don't exist
- Preserving existing files unless user chooses to overwrite
