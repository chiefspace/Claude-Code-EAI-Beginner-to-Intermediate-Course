---
description: Install Module 06 Subagents components to your project or globally
allowed-tools: Read, Write, Edit, Glob, Bash, AskUserQuestion
model: sonnet
argument-hint: [optional: specific component name or "all"]
---

# EA-Install (Module 06: Subagents)

Install subagent definitions, commands, hooks, and settings to your project.

## Components Available

| Component | File | Description |
|-----------|------|-------------|
| `code-reviewer` | Agent | Reviews code with beginner-friendly feedback |
| `doc-generator` | Agent | Generates clear documentation from code |
| `test-runner` | Agent | Detects test framework, runs tests, summarizes results |
| `EA-subagent-log` | Command | View, search, or clear the subagent activity log |
| `subagent-logger` | Hook | Logs subagent completion events to JSON |
| `settings` | Config | Hook configuration for SubagentStop event |

## Variables

SPECIFIC_COMPONENT: $ARGUMENTS

## Workflow

### Step 1: Parse Arguments

- If "all" is provided, select all components
- If a specific component name is provided, validate it exists and skip to Step 3
- If empty, continue to Step 2

### Step 2: Ask What to Install

Use AskUserQuestion with multiSelect:
- **Question**: "Which subagent components do you want to install?"
- **Options**:
  - Agents (code-reviewer, doc-generator, test-runner)
  - Command (EA-subagent-log)
  - Hook (subagent-logger.py + settings.json hook config)
  - All of the above

### Step 3: Ask Installation Scope

Use AskUserQuestion to ask:
- **Question**: "Where should components be installed?"
- **Options**:
  - Project only (current directory `.claude/`)
  - Global (`~/.claude/`)
  - Both project and global

### Step 4: Check for Conflicts

For each selected component:
1. Check if file already exists at target location
2. If exists, ask: "File already exists. Skip or Overwrite?"

### Step 5: Copy Selected Items

Read each source file from **this module's directory** and Write to target location.

**Source location**: The directory where this command file lives (use Glob to find the module root by looking for this command at `.claude/commands/EA-install.md` relative to project root)

| Component | Source | Project Target | Global Target |
|-----------|--------|----------------|---------------|
| Agents | `.claude/agents/*.md` | `.claude/agents/` | `~/.claude/agents/` |
| Command | `.claude/commands/EA-subagent-log.md` | `.claude/commands/` | `~/.claude/commands/` |
| Hook | `.claude/hooks/subagent-logger.py` | `.claude/hooks/` | `~/.claude/hooks/` |
| Settings | `.claude/settings.json` (hooks section) | `.claude/settings.json` | N/A |

**Important**: When installing settings (hook config):
- Read the target's existing `.claude/settings.json` if it exists
- Merge the SubagentStop hook into the existing hooks object
- Do not overwrite other existing settings
- Settings are project-only (not global)

### Step 6: Create logs directory

If hooks were installed, ensure a `logs/` directory exists in the project root for the subagent activity log.

### Step 7: Report Installation

```
## Installation Complete

**Scope**: [Project/Global/Both]

### Installed
- [x] Agent: code-reviewer → [location]
- [x] Agent: doc-generator → [location]
- [x] Agent: test-runner → [location]
- [x] Command: EA-subagent-log → [location]
- [x] Hook: subagent-logger.py → [location]
- [x] Settings: SubagentStop hook → [location]

### Skipped (already exist)
- [component name]

### Next Steps
1. Agents are now available - spawn them with the Task tool
2. View agent list with `/agents`
3. After agents run, check the log with `/EA-subagent-log`
4. See `guides/` folder for documentation on creating custom agents
```

## Examples

**Install everything:**
```
/EA-install all
```

**Install only agents:**
```
/EA-install agents
```

**Interactive selection:**
```
/EA-install
→ Select: Agents, Command, Hook
→ Scope: Project
→ Copies to .claude/
```
