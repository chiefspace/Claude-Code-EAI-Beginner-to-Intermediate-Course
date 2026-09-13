# When to Use Subagents

## The Core Principle

> "One agent, one prompt, one purpose"

Subagents are separate instances that don't share your main conversation's context.

## When TO Use Subagents

### 1. Research While You Continue
```
"Search the codebase for all API endpoints and list them"
```
Continue working while subagent researches.

### 2. Parallel Independent Tasks
- Run tests in one subagent
- Generate docs in another
- Review code in a third

### 3. Keep Main Context Clean
```
"Read all 50 config files and summarize logging settings"
```
Subagent digests and returns summary.

### 4. Specialized Focused Work
```
"Review this auth module for security issues"
```

## When NOT to Use Subagents

### 1. Quick Questions
Just ask directly - subagent overhead isn't worth it.

### 2. Tasks Requiring Your Context
Subagents don't know your conversation.
```
Bad:  "Fix the bug we discussed"
Good: "Fix null pointer in src/auth.js line 42"
```

### 3. Interactive Work
Subagents can't ask follow-up questions.

## The Visibility Tradeoff

**You see**: Summary result
**You don't see**: Step-by-step reasoning

### Mitigation
1. Be specific in instructions
2. Check `/EA-subagent-log`
3. Verify outputs
4. Start with simple tasks

## Subagent Types

| Type | Best For | Tools |
|------|----------|-------|
| Explore | Searching, finding patterns | Read, Glob, Grep |
| General-purpose | Multi-step tasks | All tools |
| Bash | Terminal operations | Bash only |

## Quick Decision Guide

```
Need codebase info? → Explore
Multiple tools needed? → General-purpose
Just commands? → Bash
Simple question? → Don't use subagent
```
