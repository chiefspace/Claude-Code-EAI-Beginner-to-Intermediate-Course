# How Skills Enhance MCPs

> MCPs give Claude tools. Skills teach Claude how to use them like an expert.

---

## The Problem with MCPs Alone

You install an MCP. Claude now has access to new tools. But here's what's missing:

- **No workflow guidance** - Claude knows the tools exist, but not the optimal sequence
- **No best practices** - Each use is figured out from scratch
- **No domain knowledge** - Generic tool descriptions, no context about YOUR use case
- **No error recovery** - When things go wrong, Claude improvises

MCPs are **tools in a toolbox**. Skills are **the craftsman's training manual**.

---

## MCP Only vs MCP + Skill

| Capability | MCP Only | MCP + Skill |
|------------|----------|-------------|
| **Tool Access** | :white_check_mark: Has the tools | :white_check_mark: Has the tools |
| **Tool Discovery** | :white_check_mark: Can list tools | :white_check_mark: Can list tools |
| **Optimal Workflow** | :x: Figures it out each time | :white_check_mark: Follows proven patterns |
| **Error Handling** | :x: Generic error messages | :white_check_mark: Actionable recovery steps |
| **Domain Context** | :x: Generic tool descriptions | :white_check_mark: Your specific use cases |
| **Quality Standards** | :x: Variable quality | :white_check_mark: Consistent output format |
| **Reusable Patterns** | :x: Reinvents each session | :white_check_mark: Remembers what works |
| **Scripts for Reliability** | :x: Code written fresh each time | :white_check_mark: Tested, reliable scripts |

---

## Real Example: File Creation

### MCP Only (Filesystem MCP)

Claude can read and write files. But when you say "create a PowerPoint presentation":

1. Claude writes the file from scratch
2. No knowledge of PPTX internals
3. Output quality varies
4. Same mistakes repeated

### MCP + Skill (File Factory Skill)

The skill provides:

1. **Workflow guidance** - Which format to use for which request
2. **Scripts** - `pack.py`, `unpack.py`, `validate.py` for reliable PPTX creation
3. **Templates** - Proven structures for different document types
4. **Theme presets** - Consistent styling (arctic-frost, tech-innovation, etc.)
5. **Cookbooks** - Step-by-step recipes for tier-rankings, curriculum-slides

**Result:** Consistent, professional output every time.

---

## The Enhancement Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                        SKILL                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Workflow Guidance: "Use this sequence of tools"      │    │
│  │ Best Practices: "Always validate before saving"      │    │
│  │ Error Recovery: "If X fails, try Y"                  │    │
│  │ Scripts: Reliable code for complex operations        │    │
│  │ References: Domain knowledge loaded when needed      │    │
│  └─────────────────────────────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                      MCP                             │    │
│  │                                                      │    │
│  │    Tool 1    Tool 2    Tool 3    Tool 4             │    │
│  │      │         │         │         │                │    │
│  │      ▼         ▼         ▼         ▼                │    │
│  │   [External Service / System / API]                 │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## When to Pair Skills with MCPs

| Scenario | MCP Alone | Add a Skill |
|----------|-----------|-------------|
| Simple file read/write | :white_check_mark: Sufficient | :x: Overkill |
| Complex document creation | :x: Inconsistent | :white_check_mark: Essential |
| One-off API call | :white_check_mark: Works fine | :x: Unnecessary |
| Repeated workflow with same API | :x: Reinvents each time | :white_check_mark: Adds value |
| Debugging/exploration | :white_check_mark: Direct tool use | :x: Too rigid |
| Production-quality output | :x: Variable | :white_check_mark: Consistent |

---

## Building Skills for Your MCPs

When you find yourself:
- Explaining the same workflow repeatedly
- Writing the same code patterns
- Fixing the same errors
- Wishing Claude "just knew" how to use the tool better

**That's when you build a skill.**

The skill captures:
1. **What you learned** - Optimal tool sequences
2. **What works** - Tested scripts and patterns
3. **What to avoid** - Common pitfalls and how to recover

---

## Key Takeaway

MCPs give Claude **access** to capabilities.
Skills give Claude **expertise** in using them.

Together, they transform Claude from a tool user into a domain expert.

---

*Tools are only as good as the hands that wield them.*
