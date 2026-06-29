# Skills vs Commands: Understanding the Difference

> Commands are quick instructions. Skills are complete capabilities.

---

## The Simple Answer

**Commands** = Single markdown files with instructions for one task
**Skills** = Folder packages with multiple files for complex, multi-step capabilities

Think of it this way:
- A **command** is like a single recipe card
- A **skill** is like an entire cookbook with recipes, techniques, and reference materials

---

## Side-by-Side Comparison

| Aspect | Commands | Skills |
|--------|----------|--------|
| **Structure** | Single `.md` file | Folder with `SKILL.md` + supporting files |
| **Location** | `.claude/commands/` | `.claude/skills/skill-name/` |
| **Trigger** | `/command-name` | Keywords or `/skill-name` |
| **Complexity** | One workflow | Multiple related workflows |
| **Files** | 1 file | Unlimited (scripts, references, assets) |
| **Scope** | Focused task | Domain expertise |
| **Sharing** | Copy the file | Package as `.skill` file |

---

## When to Use Commands

Use commands when you need:

- **A single, repeatable workflow** - Like `/plan` or `/build`
- **Quick shortcuts** - Trigger common actions with a slash
- **Simple automation** - One task, start to finish
- **Fast creation** - Write it in minutes, use it forever

**Examples:**
- `/commit` - Generate a git commit
- `/prime` - Understand a codebase quickly
- `/plan` - Create a spec file
- `/handoff` - Save session state

---

## When to Use Skills

Use skills when you need:

- **Multiple related workflows** - Different routes to similar outcomes
- **Scripts and code** - Executable files that do deterministic work
- **Reference materials** - Documentation loaded only when needed
- **Assets and templates** - Files used in the output
- **Domain expertise** - Specialized knowledge for a specific area

**Examples:**
- `file-factory` - Create documents in multiple formats (PPTX, DOCX, XLSX, PDF)
- `mcp-builder` - Build MCP servers with best practices
- `time-travel` - Git checkpoint and recovery system
- `skill-creator` - Guide for creating new skills

---

## The Decision Tree

```
Do you need just ONE workflow?
├── YES → Use a Command
└── NO → Does it need scripts, references, or assets?
    ├── YES → Use a Skill
    └── NO → Does it have multiple related workflows?
        ├── YES → Use a Skill
        └── NO → Start with a Command, upgrade to Skill later if needed
```

---

## Upgrading a Command to a Skill

Sometimes you start with a command and realize it needs more. Here's how they evolve:

**Stage 1: Command**
```
.claude/commands/pdf-tools.md
```
One file, basic PDF operations.

**Stage 2: Skill**
```
.claude/skills/pdf-tools/
├── SKILL.md
├── scripts/
│   └── rotate_pdf.py
└── references/
    └── forms.md
```
Multiple capabilities, scripts for reliability, reference docs for complex tasks.

---

## Key Takeaway

- **Commands** are for repetitive single-task automation
- **Skills** are for domain expertise with multiple workflows

Start with commands. Graduate to skills when complexity demands it.

---

*Simple tasks deserve simple tools. Complex capabilities deserve complete packages.*
