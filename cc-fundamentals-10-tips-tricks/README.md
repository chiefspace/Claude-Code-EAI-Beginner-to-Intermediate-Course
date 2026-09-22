# Module 10: Tips, Tricks & Putting It All Together

## Make It Your Own

After cloning, remove the original remote and create your own GitHub repository:

**Windows (PowerShell)**
```powershell
git remote remove origin
gh repo create cc-fundamentals-10-tips-tricks --public --source=. --remote=origin --push
```

**Mac / Linux**
```bash
git remote remove origin
gh repo create cc-fundamentals-10-tips-tricks --public --source=. --remote=origin --push
```

> **Prerequisite:** Install the [GitHub CLI](https://cli.github.com/) — `winget install GitHub.cli` (Windows) or `brew install gh` (Mac), then run `gh auth login` once.

---

The final instructional module of the Claude Code Fundamentals course. This module consolidates tips, tricks, and best practices to help you become more efficient with Claude Code.

## What You'll Learn

- **Keyboard shortcuts** that save time
- **Context management** techniques
- **CLI aliases** for faster launches
- **Communication patterns** for better results
- **Organization tips** for productive workflows
- **Beyond coding** - using Claude Code for more than code

## Module Contents

```
10-tips-tricks/
├── .claude/
│   └── commands/
│       ├── EA-install.md      # Install guides
│       ├── EA-prime.md        # Understand module
│       ├── EA-handoff.md      # Save session
│       └── EA-pickup.md       # Resume session
├── guides/
│   ├── essential-shortcuts.md
│   ├── context-management.md
│   ├── launch-options.md
│   ├── communication-techniques.md
│   ├── organization-tips.md
│   ├── utility-commands.md
│   └── beyond-coding.md
├── templates/
│   ├── statusline-setup.md    # Custom status line guide
│   └── powershell-aliases.ps1 # Shell alias template
├── resources.md
└── README.md
```

## Quick Start

1. **Browse the guides** in the `guides/` folder
2. **Set up CLI aliases** from `templates/powershell-aliases.ps1`
3. **Configure your statusline** using `templates/statusline-setup.md`
4. **Install guides** using `/EA-install` for easy reference

## Key Takeaways

### Shortcuts to Remember

| Shortcut | Action |
|----------|--------|
| `Esc Esc` | Rewind |
| `Ctrl+R` | Search history |
| `Ctrl+S` | Stash prompt |
| `@file` | Quick context |

### Context Management

- Check `/context` regularly
- Use `/clear + /prime` instead of `/compact`
- Fresh instances for each workflow phase

### Quick Launch

Set up aliases for common commands:
```powershell
function lfg { claude --dangerously-skip-permissions --model opus $args }
```

## Related Modules

- **Module 3**: Core Workflow (specs system, handoff/pickup)
- **Module 7**: Security (safe practices)
- **Module 9**: Validation (screenshots, testing)

## Installation

Run `/EA-install` to copy guides to your global or project `.claude/docs/` folder.
