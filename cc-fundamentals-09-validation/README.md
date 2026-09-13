# Module 09: Validation & Visual Verification

Learn how to validate your work and build trust in your agents.

## Make It Your Own

After cloning, remove the original remote and create your own GitHub repository:

**Windows (PowerShell)**
```powershell
git remote remove origin
gh repo create cc-fundamentals-09-validation --public --source=. --remote=origin --push
```

**Mac / Linux**
```bash
git remote remove origin
gh repo create cc-fundamentals-09-validation --public --source=. --remote=origin --push
```

> **Prerequisite:** Install the [GitHub CLI](https://cli.github.com/) — `winget install GitHub.cli` (Windows) or `brew install gh` (Mac), then run `gh auth login` once.

---

## What You'll Learn

- Running tests across different frameworks (npm, pytest, bun, vitest)
- Capturing screenshots for visual verification
- Creating retrospectives to learn from sessions
- Applying learnings to improve your workflow
- Using hooks for automatic validation

## Quick Start

### Demo: Visual Validation with Playwright
See the complete visual validation workflow in action:
```
/EA-demo-visual-setup     # One-time: install demo app
/EA-demo-visual           # Run the visual validation demo
```

### Standard Validation Workflow
1. Run `/EA-install` to install validation components
2. Use `/EA-validate` to run tests
3. Use `/EA-visual-verify <url>` to capture screenshots
4. Use `/EA-retrospective` at end of session
5. Use `/EA-apply-learnings` to apply improvements

## Commands

| Command | Purpose |
|---------|---------|
| `/EA-demo-visual-setup` | Install visual demo app (one-time) |
| `/EA-demo-visual` | Run complete visual validation demo |
| `/EA-screenshot-compare` | Quick screenshot utility |
| `/EA-validate` | Run tests and checks |
| `/EA-visual-verify` | Capture screenshots |
| `/EA-retrospective` | Session analysis |
| `/EA-apply-learnings` | Apply improvements |

## Files Structure

```
09-validation/
├── .claude/
│   ├── commands/          # All EA-* commands
│   ├── hooks/validators/  # Auto-test-runner hook
│   └── agents/            # Validated builder agent
├── demo-project/          # Test-driven demo (Node.js library)
├── demo-app/              # Visual validation demo (Vite app)
├── guides/                # Documentation
├── validation/screenshots/ # Screenshot storage
├── docs/retrospectives/   # Session retrospectives
└── .mcp.json              # Playwright MCP
```

## Key Concepts

### The Validation Workflow
Build → **Validate** → Review → Release

### Visual Verification
Screenshots prove your work. Use Playwright to capture UI states.

### The Retrospective Pattern
Learn from each session. Apply learnings to improve.

### Trusting Your Agents
Hooks validate automatically. Less babysitting, more confidence.

## See Also

- Module 03: Core Workflow (Plan → Build → Validate → Review → Release)
- Module 07: Security Hooks (hooks-in-frontmatter pattern)
