# Demo Files - FAKE Credentials

All files in this directory contain **intentionally fake** credentials for demonstrating the secret detection hook.

**No real secrets are present.** Every key, token, and password is fabricated.

## Files

| File | What it demonstrates |
|------|---------------------|
| `fake-config.json` | Config file with 6 types of embedded API keys |
| `fake-env-backup.txt` | Accidental .env backup with tokens and passwords |
| `fake-private-key.txt` | Private key file (header triggers detection) |
| `safe-config.json` | Clean config with NO secrets (contrast/control) |

## Purpose

These files are used by `/EA-demo-secret-scan` to show how the `secure-file-reader` agent's PostToolUse hook detects secrets in file content and displays SECURITY ALERT warnings.
