---
description: Install skills to your project or globally
allowed-tools: Read, Write, Edit, Glob, Bash, AskUserQuestion
model: sonnet
argument-hint: [optional: specific skill name or "all"]
---

# Install Skills

## Purpose

Install skills from this module to your project's `.claude/skills/` folder or to the global `~/.claude/skills/` folder. Skills extend Claude Code with specialized capabilities.

## Variables

SPECIFIC_SKILL: $ARGUMENTS

## Instructions

- If a specific skill name is provided, install only that skill
- If "all" is provided, install all skills from this module
- Otherwise, present a menu of available skills
- Always ask for installation scope (project or global)
- Never overwrite existing skills without confirmation

## Available Skills

| Skill | Description |
|-------|-------------|
| `file-factory` | Document creation (PPTX, DOCX, XLSX, PDF) with themes |
| `video-transcript-extractor` | Extract workflows, golden nuggets from video transcripts |
| `time-travel` | Git checkpoint and recovery for rollback |
| `mcp-builder` | Guide for creating MCP servers |
| `skill-creator` | Guide for creating new skills |

## Workflow

1. Check if SPECIFIC_SKILL was provided
   - If "all", select all skills
   - If specific name, validate it exists and proceed to step 3
   - If empty, continue to step 2

2. Ask user which skills to install using AskUserQuestion with multiSelect
   - Present all available skills with descriptions
   - Allow multiple selections

3. Ask user for installation scope
   - Project-level (.claude/skills/) - only this project
   - Global (~/.claude/skills/) - all projects

4. For each selected skill:
   - Check if already installed at target location
   - If exists, ask to overwrite or skip
   - Copy skill folder to target location

5. Verify installation:
   - Check SKILL.md exists in target
   - Report success or any errors

## Report

After installation:

```
Installed Skills:
- [skill name] → [location]

Skills provide these capabilities:
- [brief capability list]

Next Steps:
- Trigger skills with keywords in your prompts
- Or invoke directly with /skill-name
- See guides/ for usage documentation
```

## Examples

**Install specific skill:**
```
/EA-install file-factory
```

**Install all skills:**
```
/EA-install all
```

**Interactive selection:**
```
/EA-install
→ Select skills: file-factory, time-travel
→ Scope: Global
→ Copies to ~/.claude/skills/
```
