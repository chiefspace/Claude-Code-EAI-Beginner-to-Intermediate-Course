# The Three Protection Tiers

Security hooks protect files at three different levels. Understanding these helps you configure the right protection.

## Overview

| Tier | Protection Level | Can Read? | Can Modify? | Can Delete? |
|------|-----------------|-----------|-------------|-------------|
| **Zero Access** | Complete lockout | No | No | No |
| **Read Only** | Read but no changes | Yes | No | No |
| **No Delete** | Modify but preserve | Yes | Yes | No |

## Tier 1: Zero Access Paths

**The vault.** These files are completely off-limits.

Claude CANNOT:
- Read the contents
- Write to the file
- Edit the file
- Delete the file

### What belongs here:
- Environment files (`.env`, `.env.local`)
- SSH keys (`~/.ssh/`)
- Cloud credentials (`~/.aws/`, `~/.gcp/`)
- Private keys (`*.pem`, `*.key`)
- Service account files

### Example configuration:
```yaml
zeroAccessPaths:
  - ".env"
  - ".env.*"
  - "~/.ssh/"
  - "~/.aws/"
  - "*.pem"
  - "credentials.json"
```

### Why so strict?
These files contain secrets that could:
- Give access to your servers (SSH keys)
- Incur charges on your cloud account (AWS credentials)
- Expose your API keys (environment files)

Even READING these files is blocked because the content could accidentally appear in Claude's output.

## Tier 2: Read Only Paths

**The reference library.** These files can be read but not changed.

Claude CAN:
- Read the contents
- Reference information from them

Claude CANNOT:
- Modify the file
- Delete the file

### What belongs here:
- System configuration (`/etc/`)
- Shell profiles (`~/.bashrc`, `~/.zshrc`)
- Lock files (`package-lock.json`, `yarn.lock`)

### Example configuration:
```yaml
readOnlyPaths:
  - "/etc/"
  - "~/.bashrc"
  - "~/.zshrc"
  - "package-lock.json"
  - "*.lock"
```

### Why read-only?
- **System files**: Modifying `/etc/` could break your system
- **Shell profiles**: Changes could affect all terminal sessions
- **Lock files**: Should only be modified by package managers

## Tier 3: No Delete Paths

**The archives.** These files can be modified but never deleted.

Claude CAN:
- Read the contents
- Modify the file

Claude CANNOT:
- Delete the file

### What belongs here:
- Project documentation (`README.md`, `LICENSE`)
- Git repository (`.git/`)
- Claude configuration (`.claude/`)
- Changelog files

### Example configuration:
```yaml
noDeletePaths:
  - ".claude/"
  - ".git/"
  - "README.md"
  - "LICENSE"
  - "CHANGELOG.md"
```

### Why no-delete?
These files are important for:
- Legal compliance (LICENSE)
- Project understanding (README)
- Version control (`.git/`)
- Claude's own configuration (`.claude/`)

Modification is fine (updating docs is good), but deletion would be harmful.

## Visual Summary

```
┌─────────────────────────────────────────────────────────┐
│                    ZERO ACCESS                          │
│  .env, ~/.ssh/, *.pem, credentials.json                 │
│  ═══════════════════════════════════════                │
│  BLOCKED: Read, Write, Edit, Delete                     │
└─────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────┐
│                    READ ONLY                            │
│  /etc/, ~/.bashrc, *.lock files                         │
│  ═══════════════════════════════════════                │
│  ALLOWED: Read                                          │
│  BLOCKED: Write, Edit, Delete                           │
└─────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────┐
│                    NO DELETE                            │
│  .git/, .claude/, README.md, LICENSE                    │
│  ═══════════════════════════════════════                │
│  ALLOWED: Read, Write, Edit                             │
│  BLOCKED: Delete                                        │
└─────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────┐
│                    NORMAL FILES                         │
│  Everything else                                        │
│  ═══════════════════════════════════════                │
│  ALLOWED: Read, Write, Edit, Delete                     │
└─────────────────────────────────────────────────────────┘
```

## Choosing the Right Tier

| If the file contains... | Use tier... |
|------------------------|-------------|
| API keys, passwords, tokens | Zero Access |
| System configuration | Read Only |
| Important but editable docs | No Delete |
| Regular project files | No protection needed |

## Customizing Protection

Edit `patterns.yaml` to adjust which files fall into each tier:

```yaml
# Add a file to zero access
zeroAccessPaths:
  - "my-secret-file.json"

# Add a file to read only
readOnlyPaths:
  - "important-config.yaml"

# Add a file to no-delete
noDeletePaths:
  - "critical-data.json"
```

## Next Steps

- See your current patterns: Check `.claude/hooks/damage-control/patterns.yaml`
- Install protection: Run `/EA-install-security`
