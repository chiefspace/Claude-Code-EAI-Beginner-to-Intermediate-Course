# The Three MCP Capabilities

> MCPs aren't just about tools. They can provide resources and prompts too.

---

## Overview

Every MCP can provide up to three types of capabilities:

| Capability | What It Provides | How Claude Uses It |
|------------|-----------------|-------------------|
| **Tools** | Actions to perform | Claude calls them to DO things |
| **Resources** | Data to access | Claude reads them for CONTEXT |
| **Prompts** | Pre-built instructions | Claude uses them as TEMPLATES |

Most people only know about Tools. That's missing 2/3 of what MCPs can do.

---

## 1. Tools

**What they are:** Functions Claude can execute to perform actions.

**Examples:**
- `ea_remember` - Store a memory
- `screenshot` - Take a browser screenshot
- `query_database` - Run a SQL query

**How to use them:**
Claude automatically discovers tools and uses them when appropriate. You can also ask directly:
```
"Use the ea_remember tool to save this solution"
```

**In the EA MCPs:**
- `ea-memory`: remember, recall, list, forget
- `ea-journal`: log, today, review, summary
- `ea-prompts`: add_prompt, list_prompts, remove_prompt

---

## 2. Resources

**What they are:** Data or content that Claude can read and reference.

**Examples:**
- Database records
- File contents with special access
- Configuration values
- Real-time data feeds

**How to use them:**
Resources are typically accessed automatically when relevant. They provide context Claude can reference.

```
"What does the project configuration say about the API?"
(Claude reads the config resource)
```

**Why it matters:**
Resources give Claude access to dynamic, up-to-date information without you having to copy-paste it into the conversation.

---

## 3. Prompts

**What they are:** Pre-built prompt templates that standardize how Claude approaches tasks.

**Examples:**
- `code-review` - A template for reviewing code
- `explain-code` - A template for explaining code
- `debug` - A template for debugging issues

**How to use them:**
Use `/prompt` followed by the prompt name:
```
/prompt code-review
```

Or reference them in conversation:
```
"Use the code-review prompt on this file"
```

**In the EA Prompts MCP:**
- `code_review` - Review code for issues
- `explain_code` - Explain code in plain English
- `write_tests` - Generate test cases
- `refactor` - Suggest improvements
- `debug` - Help debug errors

---

## Combining Capabilities

The most powerful MCPs combine all three:

```
                    ┌─────────────────┐
                    │    Your MCP     │
                    └─────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼────┐      ┌─────▼─────┐     ┌─────▼─────┐
    │  Tools  │      │ Resources │     │  Prompts  │
    │ (DO)    │      │ (KNOW)    │     │ (HOW)     │
    └─────────┘      └───────────┘     └───────────┘
```

For example, a "project manager" MCP could:
- **Tools:** Create tasks, update status, assign people
- **Resources:** Expose the task list, team members, deadlines
- **Prompts:** Templates for sprint planning, standup notes, retrospectives

---

## Why This Matters for Beginners

Understanding the three capabilities helps you:

1. **Choose better MCPs** - Look for MCPs that provide what you need
2. **Build smarter MCPs** - When you create your own, use all three
3. **Use Claude more effectively** - Know what's possible

---

## Practice

Try the EA MCPs in this module:

1. **ea-memory** (Tools)
   - Store a memory: "Remember that the API key is in .env"
   - Search: "What did I store about APIs?"

2. **ea-prompts** (Tools + Prompts)
   - List available prompts: `ea_list_prompts()`
   - Use a prompt: `/prompt code-review`

3. **ea-journal** (Tools)
   - Log work: `ea_log("Fixed the login bug", entry_type="work")`
   - Review: `ea_today()`

---

*Tools do. Resources inform. Prompts guide. Together, they're powerful.*
