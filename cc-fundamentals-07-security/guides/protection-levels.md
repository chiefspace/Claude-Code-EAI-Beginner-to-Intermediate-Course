# Protection Levels: Block, Ask, Allow

Hooks don't just block everything - you have control over how they respond to dangerous commands.

## The Three Levels

```
┌─────────────────────────────────────────────────────────────────┐
│                     PROTECTION SPECTRUM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   🚫 BLOCK          ⚠️ ASK            ✅ ALLOW                  │
│   ─────────────────────────────────────────────────────────     │
│   Stops execution   Asks for          Lets it run               │
│   immediately       confirmation                                │
│                                                                 │
│   "No way"          "Are you sure?"   "Go ahead"                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## When to Use Each Level

| Level | Use For | Example |
|-------|---------|---------|
| **Block** | Catastrophic, irreversible actions | `rm -rf /`, database drops |
| **Ask** | Dangerous but sometimes needed | `git checkout .`, `terraform destroy` |
| **Allow** | Safe operations | `ls`, `git status`, reading files |

## How It Works in patterns.yaml

### Block (Default)

No `ask` field means the command is blocked outright:

```yaml
- pattern: '\brm\s+-rf\s+/'
  reason: rm -rf on root paths - extremely dangerous
  # No "ask" field = BLOCKED
```

### Ask for Confirmation

Add `ask: true` to prompt the user instead of blocking:

```yaml
- pattern: '\bgit\s+checkout\s+\.'
  reason: discards all unstaged changes
  ask: true  # ← User can approve or deny
```

### Allow (No Pattern)

Commands that don't match any pattern are allowed by default.

## The Confirmation Flow

When `ask: true` triggers, you see:

```
⚠️  Security Hook: Confirmation Required
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Command: git checkout .
Reason:  discards all unstaged changes

This command matches a protected pattern.

[Allow] [Deny] [Allow Once]
```

**Your options:**
- **Allow** - Run the command this time
- **Deny** - Cancel the command
- **Allow Once** - Run it, but ask again next time

## Customizing Your Protection

### Making a Blocked Pattern Ask Instead

Edit `patterns.yaml` to add `ask: true`:

```yaml
# Before: Always blocked
- pattern: '\bgit\s+reset\b.*--hard\b'
  reason: hard reset discards all uncommitted changes

# After: Asks for confirmation
- pattern: '\bgit\s+reset\b.*--hard\b'
  reason: hard reset discards all uncommitted changes
  ask: true  # ← Now prompts instead of blocking
```

### Making an Ask Pattern Block Instead

Remove or set `ask: false`:

```yaml
# Before: Asks for confirmation
- pattern: '\bterraform\s+destroy\b'
  reason: terraform destroy removes all infrastructure
  ask: true

# After: Always blocked
- pattern: '\bterraform\s+destroy\b'
  reason: terraform destroy removes all infrastructure
  # Removed "ask: true" = now blocked
```

## Current Ask Patterns

These patterns in `patterns.yaml` prompt for confirmation by default:

| Pattern | What It Does |
|---------|--------------|
| `git checkout .` | Discards unstaged changes |
| `git branch -D` | Force deletes branch |
| `git stash drop` | Deletes stashed changes |
| `terraform destroy` | Removes infrastructure |
| `docker system prune -a` | Removes Docker resources |

## Best Practices

1. **Start strict** - Block everything, then add `ask: true` for commands you need
2. **Team settings** - Share patterns.yaml so everyone has the same protection
3. **Project-specific** - Put project patterns in `.claude/hooks/` (not global)
4. **Review regularly** - Audit which patterns you've allowed

## You're In Control

Remember: Hooks are guardrails, not prison bars.

- **Too strict?** Add `ask: true` to get confirmation prompts
- **Too loose?** Remove `ask: true` to enforce blocking
- **Need it once?** Use "Allow Once" in the confirmation dialog

The goal is protection without frustration.
