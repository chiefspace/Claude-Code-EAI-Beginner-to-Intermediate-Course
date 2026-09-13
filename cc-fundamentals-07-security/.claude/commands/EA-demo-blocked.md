---
description: Educational demo showing security hooks blocking a dangerous command
allowed-tools: Bash, Read
argument-hint: (no arguments)
---

# Security Demo: Watch a Dangerous Command Get Blocked

This command demonstrates the security hooks in action by attempting a dangerous operation and showing how it gets blocked.

## What This Demo Shows

You'll see what happens when Claude tries to run a command that matches a dangerous pattern in `patterns.yaml`. The PreToolUse hook intercepts the command BEFORE it executes and blocks it.

## Workflow

### Step 1: Create a Safe Demo Target

First, create a harmless test folder that we'll attempt to delete:

```bash
mkdir demo-security-test
echo "This is a test file for the security demo" > demo-security-test/test-file.txt
```

Report: "Created `demo-security-test/` folder with a test file."

### Step 2: Attempt a Dangerous Command (This Will Be BLOCKED)

Now attempt to delete the folder using `rm -rf`:

```bash
rm -rf demo-security-test/
```

**Expected Result:** This command should be **BLOCKED** by the `bash-tool-guard.py` PreToolUse hook.

The hook detects the pattern: `\brm\s+(-[^\s]*)*-[rRf]`

You should see an error message like:
```
BLOCKED: rm with recursive or force flags - could delete entire directories
```

### Step 3: Show the Safe Alternative

Now delete the folder safely using `rmdir` (only works on empty folders) or single-file `rm`:

```bash
rm demo-security-test/test-file.txt
rmdir demo-security-test
```

This approach is allowed because:
- `rm` without `-rf` flags only deletes single files
- `rmdir` only works on empty directories (no recursive deletion)

### Step 4: Final Report

```
Security Hook Demo Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Created test folder:     demo-security-test/
2. Attempted rm -rf:        BLOCKED by PreToolUse hook ✓
3. Used safe deletion:      ALLOWED ✓

This demonstrates how hooks protect you from accidentally running
destructive commands - even when Claude suggests them.

The pattern that triggered the block:
  Pattern: \brm\s+(-[^\s]*)*-[rRf]
  Reason:  rm with recursive or force flags - could delete entire directories
```

## What You Learned

1. **PreToolUse hooks** run BEFORE commands execute
2. **Pattern matching** catches dangerous flags like `-rf`
3. **Blocking returns an error** that Claude can see and respond to
4. **Safe alternatives exist** - you don't need `-rf` for simple deletions

## Note

If the `rm -rf` command was NOT blocked, it means:
- Security hooks are not installed (run `/EA-install-security`)
- Or hooks are not configured in `settings.json`

Run `/EA-test-security` to verify your security setup.
