---
description: Demo the secret detection hook by reading files with fake credentials
allowed-tools: Task, Read
argument-hint: (no arguments)
---

# Demo: Secret Detection Hooks in Action

This demo uses the `secure-file-reader` agent to read files containing fake credentials. The PostToolUse hook scans every Read operation and fires SECURITY ALERT warnings when secrets are detected.

## Important

All credentials in the demo files are **completely fake**. No real secrets are exposed.

## Workflow

### Step 1: Explain What Will Happen

```
Secret Detection Demo
━━━━━━━━━━━━━━━━━━━━━

We'll read 4 files using the secure-file-reader agent.
Its PostToolUse hook scans every Read output for secret patterns.

Watch the terminal for SECURITY ALERT banners in stderr.
```

### Step 2: Read fake-config.json (Triggers Alert)

Use the Task tool to spawn the `secure-file-reader` agent with this prompt:

```
Read the file demo/fake-config.json and summarize its contents.
```

Wait for completion. The hook should detect multiple secret patterns (Anthropic key, OpenAI key, GitHub token, AWS key, Stripe key, Bearer token).

Report what the agent found and note: "Check your terminal — the SECURITY ALERT banner appeared in stderr with rotation links for each detected secret type."

### Step 3: Read fake-env-backup.txt (Triggers Alert)

Use the Task tool to spawn the `secure-file-reader` agent with this prompt:

```
Read the file demo/fake-env-backup.txt and summarize its contents.
```

Wait for completion. The hook should detect Anthropic key, OpenAI key, GitHub token, AWS key, and hardcoded password patterns.

Report what was found.

### Step 4: Read fake-private-key.txt (Triggers Alert)

Use the Task tool to spawn the `secure-file-reader` agent with this prompt:

```
Read the file demo/fake-private-key.txt and summarize its contents.
```

Wait for completion. The hook should detect the private key header pattern.

Report what was found.

### Step 5: Read safe-config.json (No Alert)

Use the Task tool to spawn the `secure-file-reader` agent with this prompt:

```
Read the file demo/safe-config.json and summarize its contents.
```

Wait for completion. This file has NO secrets — the hook should NOT fire any alert.

Report: "No SECURITY ALERT for this file — it's clean. This shows the hook only fires when actual secret patterns are detected."

### Step 6: Final Summary

```
Demo Complete: Secret Detection Hook
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files scanned:
  1. fake-config.json     → ALERT (6 secret types detected)
  2. fake-env-backup.txt  → ALERT (5 secret types detected)
  3. fake-private-key.txt → ALERT (private key detected)
  4. safe-config.json     → CLEAN (no secrets)

How it works:
  The secure-file-reader agent has a PostToolUse hook on "Read".
  After every file read, bash-output-validator.py scans the content
  against 12+ regex patterns for known secret formats.

  When secrets are found:
    - A SECURITY ALERT banner prints to stderr
    - Rotation links are provided for each secret type
    - The hook is OBSERVATIONAL (exit 0) — it warns but doesn't block

Key insight:
  The agent never needs to know about secret detection. The hook
  runs automatically on every Read operation. This is defense-in-depth:
  even if you forget to check for secrets, the hook catches them.

Bug fix note:
  The original bash-output-validator.py only handled Bash tool output.
  We fixed it to also extract content from Read tool output — showing
  how hooks can be extended to cover new tool types.
```
