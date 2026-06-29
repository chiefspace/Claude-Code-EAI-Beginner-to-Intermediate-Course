# How Skills Get Triggered

> Skills activate automatically when Claude recognizes the right context.

---

## The Two-Level System

Skills use **progressive disclosure** to stay efficient:

1. **Level 1: Metadata Always Loaded** - Name and description are always in context (~100 words)
2. **Level 2: Body Loaded on Trigger** - Full instructions load only when the skill activates

This means Claude sees skill names and descriptions at all times, but only loads the full skill content when it's actually needed.

---

## Trigger Methods

### 1. Keyword Triggers (Automatic)

Claude matches your request against skill descriptions. When keywords align, the skill activates.

**Example: File Factory Skill**
```yaml
description: "Unified skill for professional document creation...
Use when creating or editing: presentations, slides, decks, pptx,
spreadsheets, excel, xlsx, documents, word, docx, pdfs, reports..."
```

When you say:
- "Create a PowerPoint presentation" → Triggers
- "Make me an Excel spreadsheet" → Triggers
- "Generate a PDF report" → Triggers

### 2. Explicit Invocation

You can directly call a skill with its name:

```
/file-factory
```

This loads the skill regardless of keyword matching.

### 3. Tool-Based Triggers

Some skills specify required tools in their frontmatter:

```yaml
tools:
  - mcp__omni-cortex__cortex_remember
  - mcp__omni-cortex__cortex_recall
```

When Claude uses these tools, the skill may activate to provide guidance.

---

## What Makes Good Trigger Keywords

The skill description is the **primary trigger mechanism**. Include:

1. **What it does** - Core functionality
2. **When to use it** - Specific contexts and scenarios
3. **Synonyms** - Different ways users might ask

**Good Example:**
```yaml
description: |
  Extract structured content from video transcripts including workflows,
  golden nuggets, commands, and code examples. Use when working with
  video transcripts, extracting video content, finding golden nuggets,
  or analyzing tutorial videos.
```

This triggers on: "video", "transcript", "extract", "golden nuggets", "tutorial"

**Bad Example:**
```yaml
description: "A helpful skill for processing things."
```

Too vague. Won't reliably trigger.

---

## The Trigger Flow

```
User Request
     │
     ▼
┌─────────────────────────────────┐
│  Claude scans skill descriptions │
│  (always in context)             │
└─────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│  Keywords match?                 │
│  ├── YES → Load SKILL.md body   │
│  └── NO → No skill activated    │
└─────────────────────────────────┘
     │
     ▼ (if triggered)
┌─────────────────────────────────┐
│  Follow skill instructions       │
│  Load references as needed       │
│  Execute scripts if required     │
└─────────────────────────────────┘
```

---

## Multiple Skills, Same Request

What if multiple skills could trigger?

Claude prioritizes based on:
1. **Specificity** - More specific descriptions win
2. **Relevance** - Better keyword match scores higher
3. **Context** - Recent conversation history matters

If you're working with n8n and ask about workflows, an n8n-specific skill triggers over a generic workflow skill.

---

## Skill Aliases

Some skills define aliases for common trigger words:

```yaml
name: time-travel
aliases:
  - undo
  - rollback
```

Now `/undo` and `/rollback` both invoke the time-travel skill.

---

## Tips for Reliable Triggering

1. **Be explicit in descriptions** - List all trigger scenarios
2. **Include synonyms** - "presentation" AND "slides" AND "deck" AND "pptx"
3. **Specify contexts** - "Use when..." is powerful
4. **Test with variations** - Try different phrasings

---

## Debugging Triggers

If a skill isn't activating when expected:

1. Check the description - Is your keyword included?
2. Try explicit invocation - `/skill-name`
3. Check for conflicts - Another skill might be triggering instead
4. Review frontmatter - Ensure valid YAML format

---

*Skills that describe themselves well, trigger themselves well.*
