# Where Sensitive Files Live - A Guide

This guide shows common locations for sensitive files so you know what to protect.

## Project-Level Secrets

```
your-project/
├── .env                    # Environment variables (GITIGNORE THIS)
├── .env.local              # Local overrides (GITIGNORE THIS)
├── .env.development        # Dev-specific (GITIGNORE THIS)
├── .env.production         # Prod-specific (GITIGNORE THIS)
├── credentials.json        # Google/Firebase creds (GITIGNORE THIS)
├── service-account.json    # Cloud service accounts (GITIGNORE THIS)
├── secrets/                # Any secrets folder (GITIGNORE THIS)
│   ├── api-keys.json
│   └── certificates/
└── config/
    └── production.json     # May contain secrets (CHECK CAREFULLY)
```

## User-Level Secrets (Home Directory)

```
~/ (your home directory)
├── .ssh/                   # SSH keys - NEVER share
│   ├── id_rsa             # Private key
│   ├── id_rsa.pub         # Public key (OK to share)
│   └── config             # SSH config (may have passwords)
├── .aws/                   # AWS credentials
│   ├── credentials        # Access keys
│   └── config             # Region settings
├── .gnupg/                 # GPG keys
├── .npmrc                  # May have npm tokens
├── .pypirc                 # May have PyPI tokens
├── .netrc                  # May have various passwords
└── .gitconfig              # May have tokens (check!)
```

## What to Put in .gitignore

At minimum, always gitignore:
- `.env` and all variants
- `*.pem`, `*.key` (certificates/keys)
- `credentials.json`, `secrets.json`
- `*-adminsdk*.json` (Firebase)
- `service-account*.json` (Google Cloud)

## Security Hooks Protection

The security hooks in this module protect:

| Path Pattern | Protection Level | What It Means |
|--------------|------------------|---------------|
| `.env*` | Zero Access | Can't read, write, or delete |
| `~/.ssh/` | Zero Access | Complete lockout |
| `~/.aws/` | Zero Access | Complete lockout |
| `*.pem`, `*.key` | Zero Access | Complete lockout |
| `package-lock.json` | Read Only | Can read, can't modify |
| `.claude/` | No Delete | Can modify, can't delete |

## Quick Security Checklist

- [ ] `.env` is in `.gitignore`
- [ ] No secrets in `*.example` files
- [ ] Credentials use environment variables, not hardcoded
- [ ] SSH keys have correct permissions (600)
- [ ] No secrets in git history (check with `git log -p`)
- [ ] Production uses different keys than development
