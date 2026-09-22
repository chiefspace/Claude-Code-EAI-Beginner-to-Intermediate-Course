---
description: Install Module 10 guides and templates
allowed-tools: Read, Write, Glob, AskUserQuestion, Bash
model: sonnet
---

# EA-install

## Purpose

Install guides and templates from Module 10 (Tips & Tricks) to your system.

## Workflow

1. **Ask Installation Scope**
   Use AskUserQuestion:
   - Question: "Where would you like to install the Module 10 guides?"
   - Options:
     - "Global (~/.claude/docs/)" - Available in all projects
     - "Project (.claude/docs/)" - Only in current project

2. **Ask What to Install**
   Use AskUserQuestion with multiSelect:
   - Question: "Which items would you like to install?"
   - Options:
     - essential-shortcuts.md
     - context-management.md
     - launch-options.md
     - communication-techniques.md
     - organization-tips.md
     - utility-commands.md
     - beyond-coding.md
     - statusline-setup.md (template)
     - powershell-aliases.ps1 (template)

3. **Create Target Directory**
   - Global: Create ~/.claude/docs/ if needed
   - Project: Create .claude/docs/ if needed

4. **Copy Selected Files**
   - Copy each selected file to target location
   - If file exists, ask: Skip or Overwrite?

5. **Report Results**
   List what was installed and where.

## Report

```
Module 10 Installation Complete

Location: [global/project path]
Installed:
- [list of installed files]

Tip: Reference these guides anytime with @~/.claude/docs/[filename]
```
