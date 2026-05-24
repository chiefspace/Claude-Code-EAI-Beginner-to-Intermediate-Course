# What Are /Commands?

## The Basics

Commands are markdown files that live in the `.claude/commands/` folder of your project. When you type `/command-name` in Claude Code, it reads that file and uses it as instructions.

Think of commands as **saved prompts** you can trigger instantly.

## Where Commands Live

```
your-project/
└── .claude/
    └── commands/
        ├── my-command.md
        ├── another-command.md
        └── subfolder/
            └── nested-command.md
```

- **Project commands:** `.claude/commands/` in your project folder
- **Universal commands:** `~/.claude/commands/` (available everywhere)

## How to Trigger Commands

Type a forward slash followed by the command name:

```
/my-command
```

With arguments:

```
/my-command "some input here"
```

Multiple arguments:

```
/my-command "first arg" "second arg"
```

## Why Use Commands?

**Without commands:**
```
Every time you want to create a plan, you type out:
"Please analyze this request, think through the implementation,
create a detailed spec with phases, save it to specs/todo/..."
```

**With commands:**
```
/quick-plan "add user authentication"
```

Same result. Fraction of the effort.

## Command Naming

- Use lowercase with hyphens: `my-command.md`
- The filename (minus .md) becomes the trigger: `/my-command`
- Keep names short but descriptive
- Nested folders work too: `experts/database.md` → `/experts/database`

## Project vs Universal Commands

| Type | Location | Availability |
|------|----------|--------------|
| Project | `.claude/commands/` | Only in that project |
| Universal | `~/.claude/commands/` | Every project |

**When to use project commands:**
- Project-specific workflows
- Team-shared processes
- Commands that reference project files

**When to use universal commands:**
- Personal productivity tools
- Commands you use everywhere
- General-purpose utilities

## Viewing Available Commands

Type `/` and pause - Claude Code will show available commands.

Or check the folders directly:
- Project: `.claude/commands/`
- Universal: `~/.claude/commands/`

## Next Steps

- See `template-pattern.md` for why consistent structure matters
- See `command-sections.md` for breakdown of each section
- Copy `templates/command-template.md` to create your first command
