# Spec Sheet: Slash Commands vs Hooks vs Plugins vs Skills vs MCPs

> Five different extension points in Claude Code, five different jobs. This sheet explains what each one is, how it's triggered, and when to reach for it.

---

## The One-Line Version

| Feature | What It Is | Triggered By |
|---------|-----------|--------------|
| **Slash Command** | A saved prompt in a single markdown file | You, typing `/command-name` |
| **Hook** | A shell command that runs automatically on a lifecycle event | Claude Code itself (deterministic, no LLM involved) |
| **Plugin** | A packaged bundle of commands, agents, hooks, and/or MCP servers | Installed once, then its contents trigger normally |
| **Skill** | A folder of instructions + scripts + references Claude loads on demand | Claude, recognizing keywords (or you, via `/skill-name`) |
| **MCP Server** | An external process that exposes new tools/data/prompts over a protocol | Always available to Claude once connected, like any other tool |

---

## Slash Commands

**What it is:** A single `.md` file living in `.claude/commands/` (project) or `~/.claude/commands/` (personal, global). When you type `/command-name`, Claude Code loads that file's contents as an instruction and runs it.

**Key traits:**
- One file, one workflow
- Explicit, manual trigger — nothing happens until you type the slash
- Supports frontmatter (`description`, `allowed-tools`, `model`, `argument-hint`)
- Supports arguments: `$ARGUMENTS`, `$1`, `$2`, etc.
- Cheapest to build — write it in minutes

**Best for:** Repetitive single-task prompts you'd otherwise retype — `/commit`, `/prime`, `/plan`.

See [cc-fundamentals-02-commands](cc-fundamentals-02-commands/README.md) for the full template and workflow pattern.

---

## Hooks

**What it is:** Shell commands configured in `settings.json` that Claude Code executes automatically at specific points in its lifecycle — no LLM reasoning involved, no explicit user trigger. They are deterministic code, not instructions Claude interprets.

**Key traits:**
- Fire on events: `PreToolUse`, `PostToolUse`, `UserPromptSubmit`, `Notification`, `Stop`, `SubagentStop`, `SessionStart`, `SessionEnd`, `PreCompact`
- `PreToolUse` hooks can **block** an action before it runs (e.g., stop `rm -rf`)
- `PostToolUse` hooks can only **observe and warn** after the fact — they can't undo
- Run outside the model's judgment — they enforce rules every time, with no chance of the LLM "forgetting"
- Configured at the user level (`~/.claude/settings.json`) or project level (`.claude/settings.json`)

**Best for:** Guardrails and automation that must never be skipped — blocking destructive commands, catching leaked credentials, auto-formatting on file save.

See [cc-fundamentals-07-security/guides/what-are-hooks.md](cc-fundamentals-07-security/guides/what-are-hooks.md) for hook types and examples.

---

## Plugins

**What it is:** A distribution/packaging mechanism, not a new capability type. A plugin is a bundle that can contain any combination of commands, subagents, hooks, and MCP server configs, described by a manifest and installed from a marketplace (`/plugin marketplace add`, `/plugin install`).

**Key traits:**
- Doesn't do anything new by itself — it's a container for the four other building blocks
- Lets you install/share/version a whole toolkit in one step instead of copying individual files
- Good analogy: if a command is a single recipe card, a plugin is the box of recipe cards someone else already organized for you
- Enabled/disabled as a unit, independent of any single project

**Best for:** Sharing a complete, reusable toolkit (commands + hooks + MCP config together) across teams or repos, or installing someone else's pre-built toolkit in one command.

---

## Skills

**What it is:** A folder containing a `SKILL.md` entry point plus optional `scripts/`, `references/`, and `assets/`. Unlike commands, skills are discovered **automatically** — Claude scans skill descriptions and loads the full skill only when your request matches (progressive disclosure), though you can also invoke one directly with `/skill-name`.

**Key traits:**
- Folder, not a single file — can bundle executable scripts and reference docs
- Two trigger paths: automatic (keyword match) or explicit (`/skill-name`)
- Reference docs load only when needed, keeping the base context window small
- Can contain deterministic scripts (e.g., a Python file) for work that shouldn't depend on LLM accuracy

**Best for:** Domain expertise with multiple related workflows — generating documents in several formats, building MCP servers, running a security audit.

See [cc-fundamentals-05-skills](cc-fundamentals-05-skills/README.md), especially [guides/skills-vs-commands.md](cc-fundamentals-05-skills/guides/skills-vs-commands.md).

---

## MCP Servers (Model Context Protocol)

**What it is:** An external process — local or remote, written in any language — that speaks the Model Context Protocol to expose new capabilities to Claude. Configured in `.mcp.json` or via `claude mcp add`, and reconnected each session.

**Key traits:**
- Runs as a **separate process**, not markdown Claude interprets — this is the key difference from commands/skills
- Can expose three kinds of capability: **Tools** (actions), **Resources** (data), **Prompts** (templates)
- Gives Claude abilities it has no native way to gain — database access, browser automation, third-party APIs (Notion, Slack, GitHub, etc.)
- Once connected, its tools are simply available to Claude like any built-in tool — no explicit trigger needed
- Carries the most security surface of the five, since it's arbitrary code running outside the sandboxed conversation

**Best for:** Connecting Claude to systems and data that live outside your filesystem and shell — a database, a SaaS API, a browser.

See [cc-fundamentals-04-mcps](cc-fundamentals-04-mcps/README.md) and its [What is MCP?](cc-fundamentals-04-mcps/guides/what-is-mcp.md) guide.

---

## Side-by-Side Comparison

| Aspect | Slash Command | Hook | Plugin | Skill | MCP Server |
|--------|--------------|------|--------|-------|-------------|
| **Structure** | Single `.md` file | Config entry + shell command | Manifest + bundled components | Folder (`SKILL.md` + extras) | External process |
| **Location** | `.claude/commands/` | `settings.json` | Installed via marketplace | `.claude/skills/` | `.mcp.json` |
| **Trigger** | `/command-name` (manual) | Lifecycle event (automatic) | N/A — its contents trigger normally | Keyword match or `/skill-name` | Always available once connected |
| **Executed by** | Claude (LLM reads instructions) | Your shell/OS (no LLM) | Depends on bundled contents | Claude (+ optional scripts) | A separate program |
| **New capability?** | No — just a saved prompt | No — enforces/observes | No — packages existing types | No — packages instructions/scripts | **Yes** — genuinely new tools/data |
| **Best for** | Quick repeatable prompts | Guardrails, automation | Sharing a toolkit as one unit | Domain expertise, multi-step work | External systems/APIs |

---

## Decision Tree

```
Do you need Claude to reach an external system (DB, API, browser)?
├── YES → MCP Server
└── NO → Does the behavior need to happen automatically,
         with no chance of being skipped or forgotten?
    ├── YES → Hook
    └── NO → Is this a single, one-shot instruction you'll reuse as-is?
        ├── YES → Slash Command
        └── NO → Does it need multiple workflows, scripts, or reference docs?
            ├── YES → Skill
            └── NO → Are you packaging several of the above to share/install as one thing?
                ├── YES → Plugin
                └── NO → Start with a Slash Command
```

---

## Key Takeaway

These five pieces aren't competing options — they stack:

- **MCP servers** give Claude new capabilities it doesn't have natively.
- **Skills** package expertise around using those capabilities (and anything else).
- **Slash commands** give you a fast, explicit way to trigger a specific workflow.
- **Hooks** make sure certain things always (or never) happen, regardless of what Claude decides.
- **Plugins** bundle any mix of the above so they can be installed and shared as one unit.

Reach for the smallest tool that solves the problem: a command for a single reusable prompt, a skill when that grows into multiple workflows, a hook when it must be enforced rather than requested, an MCP server when the capability doesn't exist yet, and a plugin when you're ready to package and share the result.

---

*One extension model per job. Match the tool to the job, not the other way around.*
