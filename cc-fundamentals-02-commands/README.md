# Understanding & Creating /Commands

> Your commands are your toolkit. A consistent template means less thinking, more doing.

## Make It Your Own

After cloning, remove the original remote and create your own GitHub repository:

**Windows (PowerShell)**
```powershell
git remote remove origin
gh repo create cc-fundamentals-02-commands --public --source=. --remote=origin --push
```

**Mac / Linux**
```bash
git remote remove origin
gh repo create cc-fundamentals-02-commands --public --source=. --remote=origin --push
```

> **Prerequisite:** Install the [GitHub CLI](https://cli.github.com/) — `winget install GitHub.cli` (Windows) or `brew install gh` (Mac), then run `gh auth login` once.

---

## Before the Purpose

Every time you find yourself repeating the same instructions to Claude Code, you're wasting keystrokes. Commands let you capture those patterns once and reuse them forever. But here's the thing - if every command looks different, you'll spend more time remembering how each one works than actually using them.

That's why we use a **template pattern**. One structure. Every command. No exceptions.

This module teaches you how to create commands that are:
- Easy to read (for you, months from now)
- Easy to share (others can understand them instantly)
- Easy to modify (consistent structure = predictable changes)

---

## Purpose

Commands are markdown files that live in `.claude/commands/`. When you type `/command-name` in Claude Code, it loads that file as instructions. Think of them as saved prompts you can trigger with a single slash.

**Why templates matter:**
- You don't have to remember 20 different styles
- Anyone reading your command knows exactly where to look for each piece
- Modifications are predictable - change the Workflow section, behavior changes

---

## Variables

Commands can accept input from the user. There are two types:

**Dynamic Variables** - Passed in when the command runs:
```markdown
USER_INPUT: $ARGUMENTS      # Everything after the command name
FIRST_ARG: $1               # First argument only
SECOND_ARG: $2              # Second argument only
```

**Static Variables** - Fixed values defined in the command:
```markdown
OUTPUT_DIR: specs/todo/
MAX_RETRIES: 3
```

---

## Instructions

The Instructions section contains rules and constraints. Written as bullet points:

```markdown
## Instructions

- Always read the file before attempting to edit it
- Never delete files without explicit user confirmation
- If an error occurs, report it and ask for guidance
- Keep output concise - no more than 10 lines unless asked
```

This is where you define guardrails - what the command should and shouldn't do.

---

## Workflow

The Workflow section is the heart of your command. It's a numbered list of steps:

```markdown
## Workflow

1. Parse the user input to understand the request
2. Search for existing files matching the pattern
3. Read each file and extract relevant information
4. Compile findings into a summary
5. Present results to the user
```

Each step should be clear and actionable. For complex steps, you can add sub-bullets:

```markdown
1. Validate the input
   - Check if file path exists
   - Verify file extension is supported
   - Return error if validation fails
```

---

## Examples

Show concrete usage scenarios:

```markdown
## Examples

**Basic usage:**
/my-command "search for all API endpoints"

**With specific file:**
/my-command "find errors" src/api/

**Multiple arguments:**
/my-command "refactor" src/utils.js "extract helper functions"
```

Examples help users understand what inputs are expected and what outputs to anticipate.

---

## Report

Define how the command should respond when complete:

```markdown
## Report

After completing the workflow, output:

Summary: [one-line description of what was done]
Files Modified: [count]
Changes:
- [change 1]
- [change 2]

Next Steps: [suggested follow-up action]
```

A consistent report format means you always know what to expect.

---

## The Template

Every command in this module follows this exact structure. Copy it. Use it. Don't deviate.

See `templates/command-template.md` for the copy-paste version.

```markdown
---
description: What this command does (shown in /help)
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
model: sonnet
argument-hint: [expected input description]
---

# Command Name

## Purpose
What this command accomplishes and when to use it.

## Variables
VARIABLE_NAME: $ARGUMENTS

## Instructions
- Specific guidelines and constraints
- Edge cases to handle

## Workflow
1. First step
2. Second step
3. Third step

## Report
Output format when command completes.
```

---

## Commands Included

| Command | Description |
|---------|-------------|
| `/EA-all-tools` | List all available Claude Code tools |
| `/EA-prime` | Quickly understand any codebase |
| `/EA-parallel-subagents` | Launch multiple agents simultaneously |
| `/EA-plan` | Create implementation specs |
| `/EA-build` | Implement from a plan file |
| `/EA-handoff` | Save session state for later |
| `/EA-pickup` | Resume from a previous handoff |
| `/EA-create-command` | Generate a new command using the template |
| `/EA-install` | Install commands as universal (global) |

---

## Folder Structure

```
02-commands/
├── .claude/
│   └── commands/          # Your /commands live here
├── guides/                # Documentation and explanations
├── templates/             # Copy-paste templates
├── specs/
│   ├── todo/              # Plans waiting to be built
│   ├── done/              # Completed plans
│   └── handoffs/          # Session handoff files
└── README.md
```

---

## Getting Started

1. Clone this repo
2. Run `/EA-install` to optionally add commands to your global toolkit
3. Try `/EA-prime` to see how commands work
4. Create your first custom command with `/EA-create-command`

---

## Quick Reference

**Command location:** `.claude/commands/`
**Trigger format:** `/command-name` or `/command-name "arguments"`
**Template:** Always use the standard template pattern
**Model line:** Include `model: sonnet` or `model: opus` in metadata

---

---

## External Resources

Looking for more commands? Check out this community collection:

- **Community Commands Collection**: https://github.com/wshobson/commands
  - Ready-to-use commands you can clone and add to your projects

---

*Template once, run forever.*
