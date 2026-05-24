# The Template Pattern

## Why Templates Matter

Imagine opening a command you wrote 3 months ago. Where's the workflow? What arguments does it take? What tools does it need?

With a consistent template, you know exactly where to look. Every time.

## The Problem with Inconsistency

**Command A:**
```markdown
# Do The Thing
Just do the thing with the stuff.
## Steps
1. Do it
```

**Command B:**
```markdown
---
tools: Read, Write
---
## Purpose
This command processes files.
### How It Works
First we read, then we write...
```

**Command C:**
```markdown
# Processor
INPUT: $1
Run the processor on INPUT and output results.
```

Three commands. Three completely different structures. Every time you open one, you have to re-learn how it's organized.

## The Solution: One Template

Every command follows the same structure:

```markdown
---
description: [shown in /help]
allowed-tools: [comma-separated tools]
model: [sonnet or opus]
argument-hint: [input description]
---

# Command Name

## Purpose
## Variables
## Instructions
## Workflow
## Report
```

Now when you open any command:
- Metadata is always at the top
- Purpose tells you what it does
- Variables shows inputs
- Instructions lists constraints
- Workflow has the steps
- Report defines output format

## Benefits

### For You (Future Self)

- **3 months later:** Open command, instantly know where everything is
- **Debugging:** Workflow not working? Check step 3. Clear location.
- **Modifying:** Need to add a step? It goes in Workflow. Always.

### For Others

- **Sharing:** Anyone can read your commands immediately
- **Collaboration:** Team members know the structure
- **Learning:** New users understand by pattern, not memorization

### For Your Brain

- **Less decisions:** No "how should I structure this one?"
- **Faster creation:** Fill in the sections, done
- **Muscle memory:** Template becomes automatic

## The Sections Explained

| Section | Purpose | Required? |
|---------|---------|-----------|
| Metadata | Configuration (tools, model, description) | Yes |
| Purpose | What and why | Yes |
| Variables | Inputs (dynamic and static) | If needed |
| Instructions | Rules and constraints | Recommended |
| Workflow | Step-by-step execution | Yes |
| Report | Output format | Recommended |

## Metadata Deep Dive

The frontmatter (between `---` markers) configures the command:

```yaml
---
description: Creates implementation plans    # Shows in /help listing
allowed-tools: Read, Write, Bash, Glob       # Tools this command can use
model: sonnet                                 # Which model to use
argument-hint: [feature description]          # Hint for user input
---
```

**Why include `model`?**
- `sonnet`: Faster, good for most tasks
- `opus`: Deeper thinking, complex analysis

Specifying the model ensures consistent behavior.

## Template Once, Run Forever

Create the template. Internalize it. Use it for every command.

The 5 minutes you spend learning the pattern saves hours over time.

---

*Consistency beats creativity when it comes to structure.*
