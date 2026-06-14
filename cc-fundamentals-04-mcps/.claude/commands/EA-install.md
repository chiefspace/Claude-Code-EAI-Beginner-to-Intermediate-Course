---
description: Install MCPs to your project or globally
allowed-tools: Read, Write, Edit, Glob, Bash, AskUserQuestion
model: sonnet
argument-hint: [optional: specific MCP name]
---

# Install MCPs

## Purpose

Install Model Context Protocol (MCP) servers to extend Claude Code's capabilities. Choose which MCPs to install and whether to add them at the project level (.mcp.json) or global level (settings.json).

## Variables

SPECIFIC_MCP: $ARGUMENTS

## Instructions

- If a specific MCP is provided, install only that MCP
- Otherwise, present a menu of available MCPs
- Always ask for installation scope (project or global)
- For MCPs requiring API keys, add placeholder values
- Create .mcp.json if it doesn't exist (project-level)
- Backup existing config before modifying

## Available MCPs

### Official MCPs
- `playwright` - Browser automation and screenshots
- `filesystem` - Enhanced file operations with security
- `memory` - Knowledge graph storage
- `git` - Git operations

### EA Course MCPs
- `ea-memory` - Simple memory with tagging
- `ea-prompts` - Prompt library
- `ea-journal` - Daily work journal

### API MCPs (require keys)
- `supabase` - Cloud database
- `notion` - Notion integration
- `slack` - Slack messaging
- `github` - GitHub API

## Workflow

1. Check if SPECIFIC_MCP was provided
   - If yes, validate it's a known MCP and proceed to step 4
   - If no, continue to step 2

2. Ask user which MCPs to install using AskUserQuestion with multiSelect
   - Present categories: Official, EA Course, API Integrations
   - Allow multiple selections

3. Ask user for installation scope
   - Project-level (.mcp.json) - only this project
   - Global (settings.json) - all projects

4. For each selected MCP:
   - Check if already installed (skip if so)
   - Get the configuration from the MCP registry below
   - For API MCPs, include placeholder env variables

5. Apply configuration:
   - Project: Create or update .mcp.json in project root
   - Global: Update ~/.claude/settings.json (Mac/Linux) or %USERPROFILE%\.claude\settings.json (Windows)

6. For EA Course MCPs:
   - Copy the MCP source files to appropriate location
   - Ask if user wants them in project or a central location

## MCP Configurations

```json
{
  "playwright": {
    "command": "npx",
    "args": ["@playwright/mcp@latest"]
  },
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "./src", "./docs"]
  },
  "memory": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-memory"]
  },
  "git": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-git"]
  },
  "supabase": {
    "command": "npx",
    "args": ["-y", "@supabase/mcp-server-supabase@latest"],
    "env": {
      "SUPABASE_URL": "YOUR_SUPABASE_URL",
      "SUPABASE_KEY": "YOUR_SUPABASE_KEY"
    }
  },
  "notion": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-notion"],
    "env": {
      "NOTION_API_KEY": "YOUR_NOTION_KEY"
    }
  },
  "slack": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-slack"],
    "env": {
      "SLACK_BOT_TOKEN": "YOUR_SLACK_TOKEN"
    }
  },
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_TOKEN": "YOUR_GITHUB_TOKEN"
    }
  }
}
```

## Report

After installation:

```
Installed MCPs:
- [MCP name] → [location: project/.mcp.json or global/settings.json]

Next Steps:
- Restart Claude Code to load new MCPs
- For API MCPs, update placeholder keys in [config file]
- Run `/EA-preload-mcps` if startup is slow
```

## Examples

**Install specific MCP:**
```
/EA-install playwright
```

**Interactive selection:**
```
/EA-install
→ Select MCPs: playwright, memory
→ Scope: Project
→ Creates .mcp.json with selected MCPs
```
