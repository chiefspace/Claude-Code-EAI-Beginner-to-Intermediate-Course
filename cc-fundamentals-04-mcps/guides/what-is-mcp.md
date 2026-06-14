# What is MCP?

> MCPs extend Claude's capabilities beyond conversation. Think of them as plugins.

---

## The Simple Explanation

**MCP** stands for **Model Context Protocol**.

It's a standard way to give Claude new abilities. Without MCPs, Claude can only:
- Read and write files
- Run terminal commands
- Search the codebase

With MCPs, Claude can:
- Take screenshots of your browser
- Store and retrieve memories
- Connect to databases
- Access external APIs
- And much more...

---

## How MCPs Work

```
Your Computer                    Claude Code
     │                               │
     │   ┌──────────────┐            │
     └───│  MCP Server  │────────────┘
         └──────────────┘
         (separate process)
```

MCPs run as **separate processes** on your computer. Claude Code communicates with them using a standard protocol. This means:

1. **MCPs are local** - They run on YOUR machine, not in the cloud
2. **MCPs are sandboxed** - They only do what they're programmed to do
3. **MCPs are optional** - Only install what you need

---

## MCPs vs External APIs

A common misconception: "MCPs are just API wrappers."

**Not true.** While some MCPs DO connect to external services (like Supabase or Notion), many MCPs are purely local:

| MCP Type | What It Does | Example |
|----------|-------------|---------|
| **Local Tool** | Adds new actions Claude can take | Playwright (screenshots) |
| **Memory System** | Stores data locally | ea-memory |
| **Prompt Library** | Provides reusable prompts | ea-prompts |
| **API Integration** | Connects to external services | Supabase, Notion |

---

## Where MCPs Live

MCPs are configured in two places:

### Project-level: `.mcp.json`
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
This MCP only works in this specific project.

### Global: `settings.json`
Location:
- Mac/Linux: `~/.claude/settings.json`
- Windows: `%USERPROFILE%\.claude\settings.json`

```json
{
  "mcpServers": {
    "ea-memory": {
      "command": "uv",
      "args": ["run", "--directory", "/path/to/ea-memory", "python", "server.py"]
    }
  }
}
```
This MCP works in ALL projects.

---

## When to Use MCPs

**Use MCPs when you need:**
- Capabilities Claude doesn't have built-in
- Persistent storage (memories, databases)
- External service connections
- Browser automation
- Custom workflows

**Don't use MCPs when:**
- Built-in tools are sufficient
- You're just doing simple file operations
- You don't need persistence between sessions

---

## The Lazy Loading Trick

Too many MCPs can slow down Claude Code startup. Use lazy loading:

**Windows PowerShell:**
```powershell
$env:ENABLE_TOOL_SEARCH = "true"; claude
```

**Mac/Linux:**
```bash
enable_tool_search=true claude
```

This makes MCPs load only when needed, not at startup.

---

## Next Steps

1. Read about the [Three Capabilities](./three-capabilities.md)
2. Check the [Recommended MCPs](./recommended-mcps.md)
3. Learn about [MCP Security](./mcp-security.md)

---

*MCPs are Claude's plugin system. Use them to extend what's possible.*
