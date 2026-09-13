# Module 06: Subagents

Learn when and how to delegate work to specialized subagents.

## Make It Your Own

After cloning, remove the original remote and create your own GitHub repository:

**Windows (PowerShell)**
```powershell
git remote remove origin
gh repo create cc-fundamentals-06-subagents --public --source=. --remote=origin --push
```

**Mac / Linux**
```bash
git remote remove origin
gh repo create cc-fundamentals-06-subagents --public --source=. --remote=origin --push
```

> **Prerequisite:** Install the [GitHub CLI](https://cli.github.com/) — `winget install GitHub.cli` (Windows) or `brew install gh` (Mac), then run `gh auth login` once.

---

## What You'll Learn

- "One agent, one prompt, one purpose"
- When to use vs work directly
- Create custom agents
- Track subagent activity

## Contents

### Agents (`.claude/agents/`)
- **code-reviewer.md** - Beginner-friendly review
- **test-runner.md** - Any framework
- **doc-generator.md** - Docs from code

### Commands
- **EA-subagent-log** - View activity

### Hooks
- **subagent-logger.py** - Logs completions

### Guides
- when-to-use-subagents.md
- creating-custom-agents.md
- understanding-the-log.md

### Examples
- subagent-prompts.md

## Quick Start

1. Copy agents to `.claude/agents/`
2. Copy hook to `.claude/hooks/`
3. Add hook to settings.json
4. Use agents via Task tool

## Setup

Add to `.claude/settings.json`:
```json
{
  "hooks": {
    "SubagentStop": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": "python .claude/hooks/subagent-logger.py"
      }]
    }]
  }
}
```

## Using Agents

### Code Review
```
Task tool → subagent_type: code-reviewer
Prompt: Review src/Form.jsx
```

### Run Tests
```
Task tool → subagent_type: test-runner
Prompt: Run all tests
```

### Generate Docs
```
Task tool → subagent_type: doc-generator
Prompt: Document utils/helpers.js
```

## View Activity

```
/EA-subagent-log
```

## Key Concepts

- **Context Isolation**: Subagents don't see your conversation
- **Visibility Tradeoff**: You see results, not steps
- **Specialization**: Focused agents work better

## Next
- Module 07: Security
- Module 08: GitHub Integration
