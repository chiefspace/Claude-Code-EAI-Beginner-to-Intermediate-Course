# Command Sections Breakdown

A detailed look at each section of the command template and how to use it effectively.

---

## Metadata (Frontmatter)

The YAML block at the top of every command:

```yaml
---
description: What this command does (shown in /help)
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
model: sonnet
argument-hint: [expected input description]
---
```

### Fields

| Field | Purpose | Example |
|-------|---------|---------|
| `description` | Short summary shown in help | "Create implementation plans" |
| `allowed-tools` | Tools the command can use | "Read, Write, Bash, Glob" |
| `model` | AI model to use | "sonnet" or "opus" |
| `argument-hint` | Hint for expected input | "[feature to build]" |

### Model Selection Guide

- **sonnet**: Default choice. Fast, capable, handles most tasks.
- **opus**: Use for complex reasoning, multi-step analysis, or when you need deeper thinking.

---

## Title

The main heading. Use a clear, action-oriented name:

```markdown
# Quick Plan
```

Good titles:
- Quick Plan
- Build From Spec
- Parallel Search
- Session Handoff

Avoid:
- "My Command"
- "Thing Doer"
- Overly long names

---

## Purpose

One or two sentences explaining what the command does and when to use it:

```markdown
## Purpose

Create a detailed implementation plan based on user requirements. Saves the plan to `specs/todo/` for later building with `/build`.
```

**Tips:**
- Start with an action verb
- Mention output location if applicable
- Reference other commands if they work together

---

## Variables

Define inputs the command accepts:

```markdown
## Variables

USER_PROMPT: $ARGUMENTS
OUTPUT_DIR: specs/todo/
MAX_FILES: 10
```

### Dynamic Variables (User Input)

| Syntax | Meaning |
|--------|---------|
| `$ARGUMENTS` | Everything after the command name |
| `$1` | First argument only |
| `$2` | Second argument only |
| `$3`, `$4`, etc. | Additional arguments |

### Static Variables (Fixed Values)

Define constants used throughout the command:

```markdown
OUTPUT_DIR: specs/todo/
CONFIG_FILE: .claude/settings.json
DEFAULT_MODEL: sonnet
```

### Usage in Command

Reference variables by name in your workflow:

```markdown
## Workflow

1. Parse the USER_PROMPT to understand requirements
2. Save output to OUTPUT_DIR with descriptive filename
```

---

## Instructions

Bullet-pointed rules and constraints:

```markdown
## Instructions

- Always read files before attempting to edit them
- Never delete files without explicit user confirmation
- Keep summaries under 100 words unless asked for detail
- If an error occurs, report it clearly and suggest next steps
```

### What Goes Here

- **Guardrails**: What the command should NOT do
- **Requirements**: What must always happen
- **Edge cases**: How to handle unusual situations
- **Quality standards**: Output expectations

### Examples

```markdown
## Instructions

- Search only in the current project directory
- Exclude node_modules and .git folders
- If no matches found, suggest alternative search terms
- Limit results to 20 items maximum
```

---

## Workflow

Numbered steps for execution:

```markdown
## Workflow

1. Parse user input to understand the request
2. Search for relevant files using Glob
3. Read each file and extract key information
4. Compile findings into structured summary
5. Present results in the Report format
```

### Writing Good Steps

**Be specific:**
```markdown
# Good
1. Run `git status` to check for uncommitted changes

# Vague
1. Check git
```

**Include sub-steps for complex operations:**
```markdown
1. Validate the input
   - Check if path exists
   - Verify file extension is .md
   - Return error if validation fails
```

**Reference tools when relevant:**
```markdown
1. Use Glob to find all TypeScript files in src/
2. Use Read to examine each file's contents
3. Use Grep to search for specific patterns
```

---

## Report

Define the output format:

```markdown
## Report

After completing the workflow, output:

```
Plan Created

File: specs/todo/feature-name.md
Topic: [brief description]
Phases: [count]

Key Components:
- [component 1]
- [component 2]

Next: Run `/build specs/todo/feature-name.md` to implement
```
```

### Report Tips

- Use consistent formatting (users learn what to expect)
- Include actionable next steps
- Show file paths for created/modified files
- Keep it concise but complete

---

## Optional Sections

These sections are sometimes useful but not always required:

### Examples

```markdown
## Examples

**Basic usage:**
/my-command "search for API endpoints"

**With path:**
/my-command "find errors" src/api/
```

### Relevant Files

```markdown
## Relevant Files

- `specs/todo/` - Where plans are created
- `specs/done/` - Where completed plans are moved
- `.claude/settings.json` - Configuration file
```

### Notes

```markdown
## Notes

- This command pairs with `/build` for the full workflow
- Handoffs are numbered sequentially for easy tracking
- Use `/pickup` to resume from a handoff
```

---

## Putting It All Together

A complete command example:

```markdown
---
description: Search the codebase for patterns
allowed-tools: Glob, Grep, Read
model: sonnet
argument-hint: [search pattern]
---

# Code Search

## Purpose

Search the codebase for files and content matching a pattern. Returns a summary of matches with file locations.

## Variables

SEARCH_PATTERN: $ARGUMENTS
MAX_RESULTS: 20

## Instructions

- Exclude node_modules, .git, and build directories
- If no matches found, suggest alternative patterns
- Show context around matches (2 lines before/after)

## Workflow

1. Parse SEARCH_PATTERN to determine search type (filename vs content)
2. Use Glob for filename patterns, Grep for content patterns
3. Collect up to MAX_RESULTS matches
4. Read relevant portions of matching files
5. Compile results with file paths and context

## Report

Search Complete

Pattern: [search pattern]
Matches: [count]

Results:
- path/to/file.ts:42 - [matching line preview]
- path/to/other.ts:18 - [matching line preview]

[If no matches: "No matches found. Try: [alternative suggestion]"]
```

---

*Master the sections, master the template.*
