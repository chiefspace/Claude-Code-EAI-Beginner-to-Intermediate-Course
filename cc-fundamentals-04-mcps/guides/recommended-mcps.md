# Recommended MCPs

> A curated list of useful MCPs for Claude Code beginners.

---

## Quick Start Pack

These four MCPs cover most common needs:

| MCP | What It Does | Difficulty |
|-----|-------------|------------|
| **Playwright** | Browser automation, screenshots | Easy |
| **Filesystem** | Enhanced file operations | Easy |
| **Memory** | Knowledge graph storage | Easy |
| **Supabase** | Cloud database | Medium |

---

## 1. Playwright

**Purpose:** Browser automation and visual verification.

**Why use it:**
- Take screenshots of web pages
- Automate browser interactions
- Visual verification of UI changes

**Installation:**
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

**Example usage:**
```
"Take a screenshot of localhost:3000"
"Click the login button and show me what happens"
```

---

## 2. Filesystem (Official)

**Purpose:** Enhanced file operations with security.

**Why use it:**
- Read files with better access control
- Write files with confirmation
- Configure allowed directories

**Installation:**
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/directory"
      ]
    }
  }
}
```

**Note:** Only directories you specify are accessible.

---

## 3. Memory (Official)

**Purpose:** Knowledge graph for persistent storage.

**Why use it:**
- Store information between sessions
- Create relationships between concepts
- Build a project knowledge base

**Installation:**
```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

**Example usage:**
```
"Remember that the database is PostgreSQL on port 5432"
"What do you know about the database setup?"
```

---

## 4. Supabase

**Purpose:** Cloud database with auth and storage.

**Why use it:**
- Persistent cloud storage
- Authentication built-in
- Real-time subscriptions

**Installation:**
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest"],
      "env": {
        "SUPABASE_URL": "YOUR_SUPABASE_URL",
        "SUPABASE_KEY": "YOUR_SUPABASE_KEY"
      }
    }
  }
}
```

**Note:** Requires a [Supabase](https://supabase.com) account (free tier available).

---

## EA Course MCPs

These MCPs are included in this module:

| MCP | Purpose | Capability Demo |
|-----|---------|-----------------|
| **ea-memory** | Simple memory with tagging | Tools |
| **ea-prompts** | Prompt library | Tools + Prompts |
| **ea-journal** | Daily work journal | Tools |

See the `mcps/` folder for installation instructions.

---

## Discovery Resources

**Official Registry:**
- [MCP Registry](https://registry.modelcontextprotocol.io/) - 5000+ MCPs

**Curated Lists:**
- [Official Reference Servers](https://github.com/modelcontextprotocol/servers)
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)

**Quick Access:**
- [GitMCP](https://gitmcp.io/) - Turn any GitHub repo into an MCP endpoint
- [Metorial](https://github.com/metorial/metorial) - MCP integration platform

---

## By Use Case

### Visual/UI Work
- Playwright (screenshots, automation)
- Puppeteer (alternative browser control)

### Data Storage
- Memory (official, knowledge graph)
- Supabase (cloud database)
- SQLite (local database)
- ea-memory (simple, beginner-friendly)

### API Integrations
- Notion (documents, databases)
- Slack (messaging)
- GitHub (repos, issues, PRs)

### Development
- Git (version control operations)
- Docker (container management)
- AWS (cloud services)

---

## Installation Tips

### Project vs Global

**Project-level (`.mcp.json`):**
- Use when MCP is specific to one project
- Easier to share with team
- Doesn't affect other projects

**Global (`settings.json`):**
- Use when you want MCP everywhere
- Memory systems often work best here
- Personal productivity tools

### Lazy Loading

If startup is slow, enable lazy loading:

**Windows:**
```powershell
$env:ENABLE_TOOL_SEARCH = "true"; claude
```

**Mac/Linux:**
```bash
enable_tool_search=true claude
```

---

## Don't Overdo It

**Quality over quantity.** Too many MCPs:
- Slow down startup
- Increase context usage
- Create confusion

Start with 2-3 MCPs. Add more only when needed.

---

*Start simple. Add as you grow.*
