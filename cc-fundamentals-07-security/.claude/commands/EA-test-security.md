---
description: Test that security hooks are working correctly
allowed-tools: Bash, Read, Glob
argument-hint: (no arguments)
---

# Test Security Hooks

Verifies that security hooks are installed and functioning.

## Workflow

### Step 1: Check Hook Files Exist

Check for hook files in both locations:

**Global** (`~/.claude/hooks/damage-control/`):
- [ ] patterns.yaml
- [ ] bash-tool-guard.py
- [ ] edit-tool-guard.py
- [ ] write-tool-guard.py
- [ ] bash-output-validator.py

**Project** (`.claude/hooks/damage-control/`):
- [ ] patterns.yaml
- [ ] bash-tool-guard.py
- [ ] edit-tool-guard.py
- [ ] write-tool-guard.py
- [ ] bash-output-validator.py

### Step 2: Check settings.json Configuration

Verify hooks are registered in settings.json:

**Global** (`~/.claude/settings.json`):
- [ ] Has PreToolUse hooks for Bash, Edit, Write
- [ ] Has PostToolUse hook for Bash

**Project** (`.claude/settings.json`):
- [ ] Has PreToolUse hooks for Bash, Edit, Write
- [ ] Has PostToolUse hook for Bash

### Step 3: Test Hook Functionality

Run test commands to verify hooks trigger:

**Test 1 - Dangerous Command Block**:
Try to run: `echo "testing rm -rf /" | cat`
Expected: Should NOT be blocked (it's just echo/cat)

**Test 2 - Pattern Recognition**:
Read the patterns.yaml and confirm it has:
- bashToolPatterns section
- zeroAccessPaths section
- readOnlyPaths section

### Step 4: Report Results

```
Security Hook Test Results
━━━━━━━━━━━━━━━━━━━━━━━━━━

Hook Files:
  Global:  [✓ Installed / ✗ Not Found]
  Project: [✓ Installed / ✗ Not Found]

Settings Configuration:
  Global:  [✓ Configured / ✗ Not Configured]
  Project: [✓ Configured / ✗ Not Configured]

Pattern Coverage:
  • Dangerous commands: X patterns
  • Zero-access paths: X paths
  • Read-only paths: X paths
  • No-delete paths: X paths

Status: [PROTECTED / PARTIALLY PROTECTED / NOT PROTECTED]

[If not protected, provide remediation steps]
```

## Notes

- This command only CHECKS status, it doesn't modify anything
- If hooks are not installed, recommend running /EA-install-security
- If partially configured, explain what's missing
