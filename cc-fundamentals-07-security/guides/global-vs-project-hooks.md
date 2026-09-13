# Global vs Project Hooks

Hooks can be installed at different levels, each with different scope.

## Installation Levels

| Level | Location | Scope | Best For |
|-------|----------|-------|----------|
| **Global** | `~/.claude/` | ALL projects | Universal protection you always want |
| **Project** | `.claude/` | Single project | Project-specific rules |

## Global Hooks

**Location**: `~/.claude/hooks/` and `~/.claude/settings.json`

Global hooks protect every project on your machine. Install here for:
- Protecting your SSH keys (`~/.ssh/`)
- Protecting cloud credentials (`~/.aws/`, `~/.gcp/`)
- Blocking universally dangerous commands (`rm -rf /`)

### Pros
- Set once, protects everything
- Can't accidentally forget protection on new projects

### Cons
- May be too restrictive for some projects
- Can't easily disable for specific projects

## Project Hooks

**Location**: `.claude/hooks/` and `.claude/settings.json` (in your project)

Project hooks only affect the current project. Install here for:
- Project-specific file protection
- Stricter rules for production codebases
- Rules that would be annoying in other projects

### Pros
- Tailored to specific project needs
- Easy to adjust per-project

### Cons
- Must install in each project
- Easy to forget on new projects

## Using Both

You can install hooks at BOTH levels. When you do:

```
Command comes in
       ↓
Global hooks check → ALLOW?
       ↓
Project hooks check → ALLOW?
       ↓
Command executes (only if BOTH allow)
```

**Key rule**: If EITHER level blocks, the command is blocked.

This means you can:
1. Have universal protection at global level
2. Add stricter rules at project level

## Settings Priority

If settings exist at multiple levels, Claude Code merges them:

```
Project Personal    (.claude/settings.local.json)  ← Highest priority
       ↓
Project Level      (.claude/settings.json)
       ↓
Global Level       (~/.claude/settings.json)       ← Lowest priority
```

## Recommendation

**For most users**: Start with Global installation

This gives you baseline protection everywhere. You can always add project-specific rules later.

**For teams**: Use Project installation

Commit `.claude/hooks/` to your repository so all team members get the same protection.

**For maximum security**: Use Both

Global for personal protection, Project for shared team rules.

## Quick Reference

```bash
# Global hooks location
~/.claude/
├── settings.json           # Hook configuration
└── hooks/
    └── damage-control/
        ├── patterns.yaml   # Protection patterns
        └── *.py            # Hook scripts

# Project hooks location
your-project/.claude/
├── settings.json           # Hook configuration
└── hooks/
    └── damage-control/
        ├── patterns.yaml   # Protection patterns
        └── *.py            # Hook scripts
```

## Next Steps

- Install hooks: Run `/EA-install-security`
- Learn about frontmatter hooks: [Hooks in Frontmatter](hooks-in-frontmatter.md)
