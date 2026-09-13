# Module 07: Security Essentials

Protect yourself when using AI agents that can execute real commands.

## Make It Your Own

After cloning, remove the original remote and create your own GitHub repository:

**Windows (PowerShell)**
```powershell
git remote remove origin
gh repo create cc-fundamentals-07-security --public --source=. --remote=origin --push
```

**Mac / Linux**
```bash
git remote remove origin
gh repo create cc-fundamentals-07-security --public --source=. --remote=origin --push
```

> **Prerequisite:** Install the [GitHub CLI](https://cli.github.com/) — `winget install GitHub.cli` (Windows) or `brew install gh` (Mac), then run `gh auth login` once.

---

## What You'll Learn

- What hooks are and how they protect you
- The three protection tiers (Zero Access, Read Only, No Delete)
- How to install security hooks (Global, Project, or Both)
- How to detect accidentally exposed credentials
- How to embed hooks in commands, agents, and skills

## Quick Start

1. **Install protection**: Run `/EA-install-security`
2. **Test it works**: Run `/EA-test-security`
3. **Read the guides**: Start with [What Are Hooks?](guides/what-are-hooks.md)

## Module Contents

```
07-security/
├── .claude/
│   ├── commands/           # Install and test commands
│   ├── hooks/              # Security hook scripts
│   ├── agents/             # Showcase: agent with hook
│   └── skills/
│       ├── secure-api-call/    # Showcase: skill with hook
│       └── security-audit/     # Security audit skill
│           ├── SKILL.md            # Decision tree entry point
│           └── references/         # Audit workflows
│               ├── quick-secrets-check.md
│               ├── pre-deploy-check.md
│               └── auth-check.md
├── guides/                 # Concept explanations
├── templates/              # Configuration templates
├── examples/               # .env and .gitignore examples
├── showcase/               # Frontmatter hook examples
└── resources.md            # External links
```

## Guides

| Guide | Description |
|-------|-------------|
| [What Are Hooks?](guides/what-are-hooks.md) | Introduction to hooks |
| [Global vs Project Hooks](guides/global-vs-project-hooks.md) | Where to install hooks |
| [Hooks in Frontmatter](guides/hooks-in-frontmatter.md) | Embedding hooks in commands/agents |
| [Three Protection Tiers](guides/three-protection-tiers.md) | Zero Access, Read Only, No Delete |
| [Credential Exposure Response](guides/credential-exposure-response.md) | What to do when keys are exposed |

## Commands

| Command | Purpose |
|---------|---------|
| `/EA-install-security` | Interactive security hook installer |
| `/EA-test-security` | Verify hooks are working |

## Key Concepts

### Hook Types
- **PreToolUse**: Runs BEFORE actions (can block)
- **PostToolUse**: Runs AFTER actions (can warn)

### Protection Tiers
- **Zero Access**: Complete lockout (.env, ~/.ssh/)
- **Read Only**: Read but no modify (lock files, system configs)
- **No Delete**: Modify but no delete (README, .git/)

### Hook Locations
- **Global**: `~/.claude/` - All projects
- **Project**: `.claude/` - This project only
- **Frontmatter**: Inside command/agent/skill files

## Security Auditing

In addition to the protective hooks, this module includes a **security audit skill** for checking your app before deployment.

### Using the Skill

Trigger with natural language:
- "Check my app for security issues"
- "Run a security audit"
- "Is my app secure?"

Or invoke directly: The skill will ask what you want to check.

### Available Checks

| Check | What It Does |
|-------|--------------|
| **Quick Secrets Check** | Find exposed API keys, hardcoded secrets, missing .gitignore |
| **Pre-Deploy Check** | Dependency vulnerabilities, security headers, HTTPS, error handling |
| **Auth Check** | Verify routes are protected, check for data leakage between users |
| **Full Audit** | Run all three checks |

### Example Output

```
Security Check: Quick Secrets Check
══════════════════════════════════════

✓ PASSED: .env is in .gitignore
✗ ISSUE:  Hardcoded secret in src/api.js:12
          Found: const apiKey = "sk-ant-..."
          Move this to .env and use process.env.ANTHROPIC_API_KEY
✓ PASSED: No browser-exposed secrets found

Summary: 2 passed, 1 issue found
```

## Prerequisites

- Claude Code installed
- UV (Python runner) - Install: `curl -LsSf https://astral.sh/uv/install.sh | sh`

## Next Steps

After completing this module:
- Module 08: GitHub Integration
- Module 09: Validation & Visual Verification
