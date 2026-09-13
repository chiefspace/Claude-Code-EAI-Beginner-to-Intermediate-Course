# Dangerous Commands Reference

This guide explains common dangerous terminal commands, what they mean, and how to recognize them.

## `rm` - Remove Command

`rm` stands for "remove" - it deletes files and directories.

### The Flags

| Flag | Meaning | What it does |
|------|---------|--------------|
| `-r` or `-R` | Recursive | Deletes directories and everything inside them (subdirectories, files, etc.) |
| `-f` | Force | Skips confirmation prompts, ignores non-existent files, never asks "are you sure?" |

### Combinations from Safe to Dangerous

```bash
# SAFER (still deletes, but limited)
rm file.txt           # Deletes single file, may prompt for confirmation
rm -i file.txt        # Interactive - asks before each deletion

# MODERATE RISK
rm -r folder/         # Recursive - deletes folder and contents, may prompt
rm -f file.txt        # Force - no confirmation, but single file only

# DANGEROUS
rm -rf folder/        # Recursive + Force - deletes everything, no questions asked
rm -rf *              # Deletes everything in current directory
rm -rf .              # Attempts to delete current directory and contents

# CATASTROPHIC (never run these)
rm -rf /              # Tries to delete entire filesystem
rm -rf /*             # Same effect - wipes everything
rm -rf ~              # Deletes your entire home directory
rm -rf ./*            # Deletes everything in current directory
```

### Why `-rf` is Dangerous

The combination is dangerous because:

1. `-r` means it won't stop at a directory - it goes inside and deletes everything
2. `-f` means it won't ask "are you sure?" - it just does it
3. **No undo** - unlike the Recycle Bin/Trash, `rm` permanently deletes

## Other Dangerous Commands to Watch For

### Destructive Git Commands

```bash
git reset --hard      # Discards all uncommitted changes permanently
git clean -fd         # Deletes untracked files and directories
git push --force      # Overwrites remote history (can lose others' work)
git checkout .        # Discards all local file changes
git restore .         # Same as above
```

### Other Dangerous Patterns

```bash
> file.txt            # Truncates file to zero bytes (empties it)
dd if=/dev/zero of=   # Can overwrite disks/files with zeros
chmod -R 777          # Makes everything world-writable (security risk)
```

## What's Safe

```bash
rm -i file.txt        # -i = interactive, asks first
ls                    # Just lists files, changes nothing
cat file.txt          # Just reads/displays, changes nothing
git status            # Just shows status, changes nothing
git diff              # Just shows differences, changes nothing
```

## Quick Reference Card

| See this? | Risk Level | Why |
|-----------|------------|-----|
| `rm file.txt` | Low | Single file, may prompt |
| `rm -r` | Medium | Recursive but may prompt |
| `rm -f` | Medium | Force but single file |
| `rm -rf` | **HIGH** | No prompts, recursive |
| `rm -rf /` or `/*` | **CATASTROPHIC** | System destruction |
| `--force`, `--hard` | Caution | Usually means "no undo" |

## Best Practice

When Claude Code shows you a command with `rm -rf`, **always verify the path is correct** before approving.

