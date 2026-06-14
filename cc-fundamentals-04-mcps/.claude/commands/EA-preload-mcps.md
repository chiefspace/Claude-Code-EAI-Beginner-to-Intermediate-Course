---
description: Configure lazy loading for MCPs to improve startup
allowed-tools: Read, Bash, AskUserQuestion
model: sonnet
argument-hint: [optional: on|off]
---

# Configure MCP Preloading

## Purpose

Configure Claude Code to use lazy loading for MCPs. This makes startup faster by only loading MCPs when they're actually needed, rather than all at once.

## Variables

TOGGLE: $ARGUMENTS

## Background

By default, Claude Code loads all configured MCPs at startup. If you have many MCPs, this can:
- Slow down startup significantly
- Use more memory
- Fill the context window with tool definitions

**Lazy loading** solves this by:
- Loading MCPs only when you use them
- Faster startup times
- Lower memory usage
- Cleaner context window

## Instructions

- If TOGGLE is "on" or "off", apply that setting
- Otherwise, explain the feature and ask what they want
- Show the appropriate command for their operating system
- Windows uses PowerShell syntax
- Mac/Linux uses bash syntax

## Workflow

1. Detect operating system

2. If TOGGLE provided:
   - "on" → Show command to enable lazy loading
   - "off" → Show how to start normally

3. If no TOGGLE:
   - Explain what lazy loading does
   - Ask if they want to enable it
   - Show the appropriate command

4. Provide tips for making it permanent

## Commands

### Enable Lazy Loading

**Windows PowerShell:**
```powershell
$env:ENABLE_TOOL_SEARCH = "true"; claude
```

**Mac/Linux Bash:**
```bash
enable_tool_search=true claude
```

### Normal Startup (Preload All)

**Windows PowerShell:**
```powershell
claude
```

**Mac/Linux Bash:**
```bash
claude
```

## Making It Permanent

### Windows

Add to PowerShell profile (`$PROFILE`):
```powershell
function Start-Claude {
    $env:ENABLE_TOOL_SEARCH = "true"
    claude
}
Set-Alias cc Start-Claude
```

Then use `cc` to start Claude Code with lazy loading.

### Mac/Linux

Add to `~/.bashrc` or `~/.zshrc`:
```bash
alias cc='enable_tool_search=true claude'
```

Then use `cc` to start Claude Code with lazy loading.

## Report

```
Lazy Loading: [ON/OFF]

To start Claude Code with lazy loading:

[Show appropriate command for OS]

To make permanent:
[Show profile setup for OS]
```

## Notes

- Lazy loading is recommended if you have 3+ MCPs configured
- MCPs will load automatically when Claude needs them
- You can still use all MCP features normally
- The only difference is WHEN they load, not IF they load
