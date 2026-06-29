# What Goes Inside a Skill

> Skills are like custom GPTs, but with superpowers.

---

## The Core Components

Every skill has these parts:

```
skill-name/
├── SKILL.md           # Required: Entry point with frontmatter + instructions
├── scripts/           # Optional: Executable code for reliable operations
├── references/        # Optional: Documentation loaded when needed
├── assets/            # Optional: Files used in output (templates, images)
└── cookbook/          # Optional: Step-by-step workflow recipes
```

---

## 1. SKILL.md (Required)

The entry point. Contains:

**Frontmatter (YAML)**
```yaml
---
name: my-skill
description: What it does and when to use it. Include trigger keywords.
tools:
  - Tool1
  - Tool2
---
```

**Body (Markdown)**
- Quick reference
- Workflow patterns
- When to load which reference files
- Instructions for using scripts

---

## 2. Scripts (Optional)

Executable code that does deterministic work. Use when:

- The same code gets written repeatedly
- You need reliability over improvisation
- Operations are fragile and error-prone

**Examples:**
- `rotate_pdf.py` - Rotate PDF pages
- `validate.py` - Validate document structure
- `pack.py` / `unpack.py` - Handle OOXML formats

**Benefits:**
- Token efficient (execute without reading into context)
- Deterministic results
- Tested and reliable

---

## 3. References (Optional)

Documentation loaded only when needed. Use for:

- API documentation
- Database schemas
- Domain-specific knowledge
- Detailed workflow guides
- Company policies

**Examples:**
- `references/mcp_best_practices.md`
- `references/python_mcp_server.md`
- `references/finance.md` (schemas for a BigQuery skill)

**Pro Tip:** If a reference file is long (>100 lines), include a table of contents so Claude can preview the scope.

---

## 4. Assets (Optional)

Files used in output, not loaded into context. Use for:

- Templates (PPTX, DOCX starters)
- Images and icons
- Fonts
- Boilerplate code

**Examples:**
- `assets/logo.png`
- `assets/slide-template.pptx`
- `assets/frontend-template/`

---

## 5. Cookbook (Optional)

Step-by-step recipes for specific workflows. When you have multiple ways to accomplish similar outcomes:

**Examples:**
- `cookbook/tier-rankings.md` - Create tier-based presentations
- `cookbook/curriculum-slides.md` - Educational content
- `cookbook/beginner-extraction.md` - Simple video extraction

---

## Skills vs Custom GPTs

Many people know Custom GPTs. Here's how Skills compare:

| Capability | Custom GPTs | Skills |
|------------|-------------|--------|
| **Custom Instructions** | :white_check_mark: System prompt | :white_check_mark: SKILL.md body |
| **Trigger Keywords** | :white_check_mark: Name/description | :white_check_mark: Description + aliases |
| **Knowledge Files** | :white_check_mark: Upload files | :white_check_mark: references/ folder |
| **Execute Code** | :x: No (Code Interpreter is sandboxed) | :white_check_mark: scripts/ can run anything |
| **File System Access** | :x: No direct access | :white_check_mark: Full access via Claude Code |
| **Create Files** | :x: Download only | :white_check_mark: Write directly to disk |
| **Edit Existing Files** | :x: Cannot | :white_check_mark: Full edit capability |
| **Run Terminal Commands** | :x: No | :white_check_mark: Full Bash/PowerShell |
| **Use External APIs** | :white_check_mark: Actions (limited) | :white_check_mark: MCPs (unlimited) |
| **Progressive Loading** | :x: All context loaded | :white_check_mark: Load as needed |
| **Version Control** | :x: No | :white_check_mark: Git-friendly folders |
| **Share/Package** | :white_check_mark: GPT Store | :white_check_mark: .skill files |
| **Runs Locally** | :x: Cloud only | :white_check_mark: Your machine |

---

## The Superpower Difference

Custom GPTs are **conversational assistants** with knowledge.
Skills are **action-taking agents** with expertise.

**Custom GPT says:** "Here's how to create a PowerPoint presentation..."
**Skill does:** Creates the file, saves it to disk, opens it in your app.

**Custom GPT says:** "Here's the git command to commit..."
**Skill does:** Runs the commit, pushes to remote, reports success.

---

## What NOT to Include

Skills should be lean. Don't add:

- `README.md` - The skill is for Claude, not humans
- `CHANGELOG.md` - Version history belongs in git
- `INSTALLATION_GUIDE.md` - Not needed
- Testing files - Test before packaging, don't ship tests
- User-facing documentation - Skills are agent instructions

---

## Progressive Disclosure in Practice

Keep SKILL.md under 500 lines. Split content:

```markdown
# PDF Processing

## Quick start
Basic usage here.

## Advanced features
- **Form filling**: See [FORMS.md](references/FORMS.md)
- **API reference**: See [REFERENCE.md](references/REFERENCE.md)
```

Claude loads FORMS.md only when needed. Context stays lean.

---

## Building Your First Skill

1. **Start with a command** - Get the workflow working
2. **Identify reusable parts** - Scripts, references, assets
3. **Create the folder structure** - Use the template
4. **Write SKILL.md** - Focus on description and workflow
5. **Add resources** - Scripts for reliability, references for knowledge
6. **Test with real tasks** - Iterate based on actual usage

---

*Skills transform Claude from a chatbot into a capable agent.*
