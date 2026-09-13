# What to Do When You Expose an API Key

If you accidentally expose an API key, don't panic - but act quickly. This guide walks you through the response.

## Immediate Actions (Do These NOW)

### Step 1: Identify What Was Exposed

Check the security alert message. It will tell you:
- Type of credential (Anthropic key, GitHub token, etc.)
- Confidence level (high = definitely a key, medium = possibly)

### Step 2: Rotate the Key Immediately

Go to the provider's dashboard and generate a NEW key:

| Provider | Rotation URL |
|----------|-------------|
| Anthropic | console.anthropic.com/settings/keys |
| OpenAI | platform.openai.com/api-keys |
| GitHub | github.com/settings/tokens |
| AWS | console.aws.amazon.com/iam |
| Stripe | dashboard.stripe.com/apikeys |
| Google Cloud | console.cloud.google.com/apis/credentials |

### Step 3: Update Your Applications

Replace the old key with the new one:
1. Update your `.env` file with the new key
2. Update any deployment environments (Vercel, Heroku, etc.)
3. Restart your applications to pick up the new key

### Step 4: Revoke the Old Key

Go back to the provider dashboard and DELETE the exposed key. This prevents anyone who saw it from using it.

## Check for Git Exposure

If the key might have been committed to git:

```bash
# Search git history for the key pattern
git log -p | grep -i "api_key\|secret\|token"

# Check if .env was ever committed
git log --all --full-history -- .env
```

If you find exposed keys in git history, the key is potentially compromised even if you've since removed it. Someone could check out an old commit.

### Cleaning Git History (Advanced)

If a key was committed to git, consider using:
- `git filter-branch` (complex, affects all history)
- BFG Repo-Cleaner (easier alternative)

**Warning**: This rewrites history and can cause issues for collaborators.

## Assess the Damage

Ask yourself:
- How long was the key exposed?
- Who might have seen it? (just you, your team, public?)
- Was it committed to a public repository?

If committed to a public repo:
- The key should be considered fully compromised
- Rotate immediately
- Check provider logs for unauthorized usage
- Consider it may have been scraped by bots

## Prevention Best Practices

### Always Use Environment Variables

```bash
# Bad - hardcoded key
API_KEY = "sk-abc123..."

# Good - from environment
API_KEY = os.environ.get("API_KEY")
```

### Always Have .env in .gitignore

```gitignore
# .gitignore
.env
.env.*
!.env.example
```

### Use .env.example for Templates

Create a `.env.example` showing what variables are needed WITHOUT real values:

```bash
# .env.example (safe to commit)
ANTHROPIC_API_KEY=your-key-here
DATABASE_URL=postgresql://user:pass@host/db
```

### Check Before Committing

```bash
# Before git commit, check for secrets
git diff --cached | grep -i "api_key\|secret\|password\|token"
```

### Use the Security Hooks

The `bash-output-validator.py` hook automatically scans command output for exposed secrets and warns you immediately.

## Provider-Specific Notes

### Anthropic API Keys
- Start with `sk-ant-`
- Rotate at: console.anthropic.com/settings/keys
- Check usage at: console.anthropic.com/settings/usage

### OpenAI API Keys
- Start with `sk-`
- Rotate at: platform.openai.com/api-keys
- Check usage at: platform.openai.com/usage

### GitHub Tokens
- Personal: start with `ghp_`
- OAuth: start with `gho_`
- Rotate at: github.com/settings/tokens
- GitHub may automatically revoke exposed tokens

### AWS Credentials
- Access Key ID: starts with `AKIA`
- Rotate at: console.aws.amazon.com/iam
- Use IAM best practices (least privilege)

## Summary Checklist

When a key is exposed:

- [ ] Identify the exposed credential type
- [ ] Generate a new key at the provider dashboard
- [ ] Update all applications using the key
- [ ] Revoke/delete the old key
- [ ] Check git history for exposure
- [ ] Review provider logs for unauthorized usage
- [ ] Add prevention measures (.gitignore, env vars)
