# MCPs - Beyond Just Tools

> MCPs extend Claude's capabilities. They're not just API wrappers - they can provide tools, resources, and prompts.

## Make It Your Own

After cloning, remove the original remote and create your own GitHub repository:

**Windows (PowerShell)**
```powershell
git remote remove origin
gh repo create cc-fundamentals-04-mcps --public --source=. --remote=origin --push
```

**Mac / Linux**
```bash
git remote remove origin
gh repo create cc-fundamentals-04-mcps --public --source=. --remote=origin --push
```

> **Prerequisite:** Install the [GitHub CLI](https://cli.github.com/) — `winget install GitHub.cli` (Windows) or `brew install gh` (Mac), then run `gh auth login` once.

---

## Before the Purpose

When most people hear "MCP," they think of API connections - Notion, Slack, Supabase. That's only part of the story.

MCPs (Model Context Protocol) are a **standard way to extend Claude's capabilities**. They run as separate processes on your machine, giving Claude new abilities. And they can provide three types of capabilities:

1. **Tools** - Actions Claude can perform
2. **Resources** - Data Claude can access
3. **Prompts** - Templates Claude can use

This module teaches you:
- What MCPs actually are (beyond the hype)
- How to install and configure them
- How to evaluate MCPs for security
- How to build simple MCPs yourself

---

## Purpose

MCPs let Claude do things it can't do natively. Without MCPs, Claude can read files, run commands, and search code. With MCPs, Claude can:

- Take browser screenshots (Playwright)
- Store persistent memories (Memory, ea-memory)
- Connect to databases (Supabase)
- Access external APIs (Notion, Slack, GitHub)
- Use pre-built prompt templates (ea-prompts)
- Track your daily work (ea-journal)

---

## The Three Capabilities

| Capability | What It Provides | Example MCP |
|------------|-----------------|-------------|
| **Tools** | Actions to perform | Playwright (`screenshot`) |
| **Resources** | Data to access | Filesystem (file contents) |
| **Prompts** | Pre-built templates | ea-prompts (`code-review`) |

Most MCPs provide Tools. The powerful ones provide all three.

---

## What's Included

### MCPs Built for This Course

| MCP | Purpose | Demonstrates |
|-----|---------|--------------|
| `ea-memory` | Simple memory with tagging | Tools capability |
| `ea-prompts` | Prompt library | Tools + Prompts capabilities |
| `ea-journal` | Daily work journal | Tools capability |

Find them in the `mcps/` folder with full source code and installation instructions.

### Guides

| Guide | Description |
|-------|-------------|
| [What is MCP?](guides/what-is-mcp.md) | Plain-language explanation of MCPs |
| [Three Capabilities](guides/three-capabilities.md) | Tools, Resources, and Prompts |
| [MCP Security](guides/mcp-security.md) | Evaluating MCPs before installation |
| [Recommended MCPs](guides/recommended-mcps.md) | Curated list for beginners |

### Templates

| Template | Description |
|----------|-------------|
| [mcp-json-template.json](templates/mcp-json-template.json) | Starter pack (3 essential MCPs) |
| [mcp-json-full.json](templates/mcp-json-full.json) | Full menu with placeholders |

### Commands

| Command | Description |
|---------|-------------|
| `/EA-install` | Install MCPs interactively |
| `/EA-preload-mcps` | Configure lazy loading for faster startup |
| `/EA-prime` | Understand the codebase |
| `/EA-handoff` | Save session state |
| `/EA-pickup` | Resume from handoff |

---

## Quick Start

### 1. Install an MCP

Copy `templates/mcp-json-template.json` to your project root as `.mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

### 2. Restart Claude Code

MCPs load at startup. After adding or changing `.mcp.json`, restart Claude Code.

### 3. Use the MCP

```
"Take a screenshot of localhost:3000"
```

Claude will use the Playwright MCP to capture the screenshot.

---

## Lazy Loading (Recommended)

If startup is slow, enable lazy loading:

**Windows PowerShell:**
```powershell
$env:ENABLE_TOOL_SEARCH = "true"; claude
```

**Mac/Linux:**
```bash
enable_tool_search=true claude
```

This loads MCPs only when needed, not all at startup.

---

## Folder Structure

```
04-mcps/
├── .claude/
│   └── commands/          # EA-* commands
├── mcps/                   # Custom MCPs with source code
│   ├── ea-memory/          # Simple memory system
│   ├── ea-prompts/         # Prompt library
│   └── ea-journal/         # Daily journal
├── guides/                 # Documentation
├── templates/              # .mcp.json templates
├── specs/
│   ├── todo/
│   ├── done/
│   └── handoffs/
├── .mcp.json               # Module's MCP config
└── README.md
```

---

## Key Takeaways

1. **MCPs are plugins** - They extend Claude's capabilities
2. **Three capabilities** - Tools (do), Resources (know), Prompts (how)
3. **Local first** - MCPs run on YOUR machine
4. **Security matters** - Evaluate before installing
5. **Less is more** - Start with 2-3 MCPs, add as needed

---

## Next Steps

1. Read the [What is MCP?](guides/what-is-mcp.md) guide
2. Install one MCP using the template
3. Try the `ea-memory` MCP to store and recall information
4. Explore the [Recommended MCPs](guides/recommended-mcps.md)

---

## Resources

- [Official MCP Servers](https://github.com/modelcontextprotocol/servers)
- [MCP Registry](https://registry.modelcontextprotocol.io/)
- [GitMCP](https://gitmcp.io/) - Turn any repo into an MCP
- [MCP Security Evaluator](https://github.com/JeredBlu/custom-instructions/blob/main/mcpevaluatorv3.md)

---

*MCPs are Claude's plugin system. Use them to extend what's possible.*
