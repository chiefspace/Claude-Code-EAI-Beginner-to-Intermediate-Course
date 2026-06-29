# Skills - Reusable Capabilities

> Skills transform Claude from a chatbot into a domain expert.

---

## Make It Your Own

After cloning, remove the original remote and create your own GitHub repository:

**Windows (PowerShell)**
```powershell
git remote remove origin
gh repo create cc-fundamentals-05-skills --public --source=. --remote=origin --push
```

**Mac / Linux**
```bash
git remote remove origin
gh repo create cc-fundamentals-05-skills --public --source=. --remote=origin --push
```

> **Prerequisite:** Install the [GitHub CLI](https://cli.github.com/) — `winget install GitHub.cli` (Windows) or `brew install gh` (Mac), then run `gh auth login` once.

---

## Before We Start

Commands are single-file instructions. Skills are complete capability packages with scripts, references, and workflows. If commands are recipe cards, skills are entire cookbooks.

This module teaches you:
- The difference between skills and commands
- How skills enhance MCPs
- What goes inside a skill
- How to create your own skills

---

## What's a Skill?

A skill is a folder containing:

```
skill-name/
├── SKILL.md           # Entry point (required)
├── scripts/           # Executable code (optional)
├── references/        # Documentation loaded when needed (optional)
├── assets/            # Templates, images, files for output (optional)
└── cookbook/          # Step-by-step recipes (optional)
```

Skills trigger automatically when Claude recognizes keywords in your request, or you can invoke them directly with `/skill-name`.

---

## Included Skills

This module includes 5 production-ready skills:

| Skill | Description |
|-------|-------------|
| **file-factory** | Create professional documents (PPTX, DOCX, XLSX, PDF) with themes and templates |
| **video-transcript-extractor** | Extract workflows, golden nuggets, commands from video transcripts |
| **time-travel** | Git checkpoint and recovery system for safe rollbacks |
| **mcp-builder** | Guide for creating high-quality MCP servers |
| **skill-creator** | Guide for creating new skills following best practices |

---

## Showcase

Check out `showcase/file-factory-output/` to see what the File Factory skill can produce:

- **ebooks/** - Professional PDF ebooks with themed covers
- **excel/** - Complex spreadsheets with dashboards and analytics
- **presentations/** - PowerPoint decks with modern designs
- **word/** - Formatted Word documents

These files were all created by Claude using the File Factory skill.

---

## Guides

| Guide | Topic |
|-------|-------|
| [skills-vs-commands.md](guides/skills-vs-commands.md) | When to use skills vs commands |
| [skills-enhance-mcps.md](guides/skills-enhance-mcps.md) | How skills supercharge MCPs |
| [how-skills-trigger.md](guides/how-skills-trigger.md) | Understanding skill activation |
| [what-goes-in-a-skill.md](guides/what-goes-in-a-skill.md) | Components of a skill + Custom GPT comparison |
| [skill-structure.md](guides/skill-structure.md) | SKILL.md anatomy and folder organization |

---

## Commands

| Command | Description |
|---------|-------------|
| `/EA-install` | Install skills to project or global folder |
| `/EA-prime` | Get a quick overview of this module |
| `/EA-create-skill` | Generate a new skill with proper structure |
| `/EA-handoff` | Save session state for resuming later |
| `/EA-pickup` | Resume from a previous handoff |

---

## External Resources

There are **21,000+ skills** available from the community. See [resources.md](resources.md) for links to:

- Skills.sh (20,000+ skills)
- Anthropic Claude Cookbooks (official)
- Awesome Claude Skills
- Skills Directory
- Mark's N8n Powerhouse

---

## Folder Structure

```
05-skills/
├── .claude/
│   └── commands/           # EA-* commands
├── skills/                 # 5 included skills
│   ├── file-factory/
│   ├── video-transcript-extractor/
│   ├── time-travel/
│   ├── mcp-builder/
│   └── skill-creator/
├── guides/                 # 5 documentation guides
├── templates/
│   └── skill-template/     # Starter template
├── showcase/
│   └── file-factory-output/  # Example files (63 files)
├── resources.md            # External skill sources
├── specs/
│   ├── todo/
│   ├── done/
│   └── handoffs/
└── README.md
```

---

## Getting Started

1. **Explore** - Run `/EA-prime` to see what's available
2. **Read** - Check the guides for understanding
3. **Browse** - Look at showcase/ for examples
4. **Install** - Run `/EA-install` to add skills globally
5. **Create** - Run `/EA-create-skill` to make your own

---

## Quick Comparison

| Aspect | Commands | Skills |
|--------|----------|--------|
| Structure | Single `.md` file | Folder with multiple files |
| Location | `.claude/commands/` | `.claude/skills/` |
| Trigger | `/command-name` | Keywords or `/skill-name` |
| Complexity | One workflow | Multiple related workflows |
| Best for | Quick automation | Domain expertise |

---

## Key Takeaway

Skills are how you teach Claude specialized knowledge that no model can fully possess out of the box. They combine:

- **Workflow guidance** - How to approach problems
- **Scripts** - Reliable code for complex operations
- **References** - Domain knowledge loaded when needed
- **Assets** - Templates and files for output

When you find yourself explaining the same workflow repeatedly, it's time to create a skill.

---

*Skills transform generic intelligence into specialized expertise.*
