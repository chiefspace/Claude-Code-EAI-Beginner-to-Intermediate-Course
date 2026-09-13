---
description: Install security hooks with interactive options (Global/Project/Both)
allowed-tools: Bash, Read, Write, Glob, AskUserQuestion
argument-hint: (no arguments - interactive)
---

# Install Security Hooks

Interactive installer for security protection hooks. Protects against:
- Dangerous commands (rm -rf, git push --force, DROP TABLE)
- Accessing sensitive files (.env, ~/.ssh/, API keys)
- Accidental credential exposure in command output

## Workflow

### Step 1: Check Current State

First, check if hooks are already installed:

1. Check for global hooks at `~/.claude/hooks/damage-control/`
2. Check for project hooks at `.claude/hooks/damage-control/`
3. Report what's currently installed

### Step 2: Ask Installation Preference

Use AskUserQuestion to determine installation scope:

**Question**: Where should security hooks be installed?

| Option | Description |
|--------|-------------|
| **Global (Recommended)** | Install to ~/.claude/ - protects ALL your projects |
| **Project Only** | Install to .claude/ - protects only this project |
| **Both** | Install to both locations for maximum protection |

### Step 3: Install Based on Selection

#### If Global selected:
1. Create directory: `~/.claude/hooks/damage-control/`
2. Copy hooks from module:
   - `patterns.yaml`
   - `bash-tool-guard.py`
   - `edit-tool-guard.py`
   - `write-tool-guard.py`
   - `bash-output-validator.py`
3. Update `~/.claude/settings.json` with hook configuration
4. Verify files exist

#### If Project selected:
1. Create directory: `.claude/hooks/damage-control/`
2. Copy all hook files
3. Update `.claude/settings.json` with hook configuration
4. Verify files exist

#### If Both selected:
1. Perform Global installation
2. Perform Project installation
3. Note: Both will run - if either blocks, command is blocked

### Step 4: Update settings.json

Add this configuration to the appropriate settings.json:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "uv run \"[PATH]/hooks/damage-control/bash-tool-guard.py\"",
          "timeout": 5000
        }]
      },
      {
        "matcher": "Edit",
        "hooks": [{
          "type": "command",
          "command": "uv run \"[PATH]/hooks/damage-control/edit-tool-guard.py\"",
          "timeout": 5000
        }]
      },
      {
        "matcher": "Write",
        "hooks": [{
          "type": "command",
          "command": "uv run \"[PATH]/hooks/damage-control/write-tool-guard.py\"",
          "timeout": 5000
        }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "uv run \"[PATH]/hooks/damage-control/bash-output-validator.py\"",
          "timeout": 5000
        }]
      }
    ]
  }
}
```

Replace `[PATH]` with:
- Global: Full absolute path like `C:/Users/username/.claude` or `/Users/username/.claude`
- Project: `.claude` (relative path — works on all platforms)

### Step 5: Verify Installation

Run `/EA-test-security` to verify hooks are working correctly.

### Step 6: Report

Output a summary:

```
Security Hooks Installed Successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location: [Global/Project/Both]

Installed hooks:
  ✓ bash-tool-guard.py (blocks dangerous commands)
  ✓ edit-tool-guard.py (protects sensitive files)
  ✓ write-tool-guard.py (protects sensitive files)
  ✓ bash-output-validator.py (detects exposed secrets)

Protection enabled for:
  • ~50 dangerous command patterns
  • Sensitive paths (.env, ~/.ssh/, API keys)
  • Credential exposure detection

Run /EA-test-security to verify everything works.
```

## Error Handling

- If UV is not installed, provide installation instructions
- If settings.json already has hooks, ask before overwriting
- If copy fails, report which file failed and why
