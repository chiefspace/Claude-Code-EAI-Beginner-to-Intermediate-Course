# Skill Structure: Anatomy of SKILL.md

> The SKILL.md file is the brain of your skill. Everything starts here.

---

## The Complete Structure

```
skill-name/
├── SKILL.md              # Entry point (required)
├── scripts/              # Executable code
│   └── my_script.py
├── references/           # Documentation loaded when needed
│   └── api_docs.md
├── assets/               # Files for output
│   └── template.pptx
└── cookbook/             # Workflow recipes
    └── basic-workflow.md
```

---

## SKILL.md Anatomy

### 1. Frontmatter (Required)

```yaml
---
name: skill-name
description: |
  What the skill does and when to use it.
  Include trigger keywords and specific contexts.
  Use when: (1) scenario one, (2) scenario two
tools:
  - Bash
  - Read
  - Write
aliases:
  - shortname
  - alias
---
```

**Required fields:**
- `name` - Skill identifier
- `description` - Trigger mechanism (most important!)

**Optional fields:**
- `tools` - Tools the skill needs
- `aliases` - Alternative invocation names
- `license` - If distributing

### 2. Title and Overview

```markdown
# Skill Name

Brief one-line description.

## Quick Reference

- **Format A**: See [FORMAT_A.md](references/FORMAT_A.md)
- **Format B**: See [FORMAT_B.md](references/FORMAT_B.md)
```

### 3. Pre-Action Context (Optional)

```markdown
## Pre-Action Context

Before starting:
- Recall previous work: `cortex_recall: "topic {project}"`
- Check for patterns: `cortex_recall: "skill pattern"`
```

### 4. Workflow Section

```markdown
## Workflow Pattern

1. **Detect** the request type
2. **Read** appropriate reference files
3. **Execute** using scripts or Claude
4. **Validate** output before returning
5. **Remember** results for future use
```

### 5. Reference Pointers

```markdown
## Reference Files

Load these as needed:
- [API Guide](references/api.md) - For API operations
- [Error Handling](references/errors.md) - When errors occur
- [Best Practices](references/best_practices.md) - For quality
```

### 6. Post-Action Memory (Optional)

```markdown
## Post-Action Memory

Store results: `cortex_remember`
- Content: What was done, key decisions
- Tags: ["skill-name", "{context}"]
- Type: "progress"
```

---

## Progressive Disclosure Pattern

**The Golden Rule:** Only load what you need, when you need it.

```
Level 1: Metadata (Always in context)
├── name: ~5 tokens
└── description: ~50-100 tokens

Level 2: SKILL.md Body (On trigger)
└── ~500-2000 tokens

Level 3: References (As needed)
├── reference1.md: ~1000 tokens
├── reference2.md: ~1000 tokens
└── ...loaded only when relevant
```

**Keep SKILL.md under 500 lines.** If approaching this limit:
- Move detailed content to reference files
- Keep only workflow and navigation in SKILL.md
- Add clear pointers to reference files

---

## Scripts Organization

```
scripts/
├── core_operation.py     # Main functionality
├── validate.py           # Validation logic
├── utils.py              # Shared utilities
└── templates/            # Script templates
    └── template.xml
```

**When to use scripts:**
- Same code written repeatedly
- Deterministic results needed
- Operations are fragile
- Performance matters

---

## References Organization

```
references/
├── getting_started.md    # Quick start guide
├── advanced.md           # Deep dive content
├── troubleshooting.md    # Error recovery
└── domains/              # Domain-specific
    ├── finance.md
    └── sales.md
```

**Best practices:**
- One level deep from SKILL.md
- Table of contents for files >100 lines
- Include grep patterns for long files

---

## Assets Organization

```
assets/
├── templates/
│   ├── starter.pptx
│   └── report.docx
├── images/
│   └── logo.png
└── themes/
    └── brand-colors.json
```

**Assets are NOT loaded into context.** They're files Claude uses in output:
- Templates to copy/modify
- Images to embed
- Fonts and styling resources

---

## Cookbook Organization

```
cookbook/
├── basic-workflow.md     # Simple use case
├── advanced-workflow.md  # Complex use case
└── integration.md        # Third-party integrations
```

**Cookbooks are step-by-step recipes.** Use when:
- Multiple valid approaches exist
- Users have different experience levels
- Workflows vary by context

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Skill folder | `kebab-case` | `video-extractor/` |
| SKILL.md | Always uppercase | `SKILL.md` |
| Scripts | `snake_case.py` | `rotate_pdf.py` |
| References | `kebab-case.md` | `api-guide.md` |
| Assets | `PascalCase` or descriptive | `SlideTemplate.pptx` |

---

## Template Starter

Use this to start any new skill:

```yaml
---
name: my-skill
description: |
  What this skill does. Include specific use cases.
  Use when: (1) first scenario, (2) second scenario
---

# My Skill

Brief description.

## Quick Reference

- **Main workflow**: See instructions below
- **Advanced**: See [ADVANCED.md](references/ADVANCED.md)

## Workflow

1. Parse the request
2. Execute the appropriate action
3. Validate results
4. Return output

## Reference Files

- [API Documentation](references/api.md)
- [Examples](references/examples.md)
```

---

*Well-structured skills are well-behaved skills.*
