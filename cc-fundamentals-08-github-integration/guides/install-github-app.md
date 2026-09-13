# Install GitHub App

> Step-by-step walkthrough of the `/install-github-app` command.

---

## Prerequisites

Before running this command, ensure you have:

- [ ] GitHub CLI installed (`gh --version` works)
- [ ] GitHub CLI authenticated (`gh auth status` shows logged in)
- [ ] You are the **admin** of the repository
- [ ] Active Claude subscription (Pro or Max)

---

## The Process Overview

```
┌────────────────────────────────────────────────────────────┐
│ /install-github-app                                        │
├────────────────────────────────────────────────────────────┤
│ 1. Choose repository                                       │
│ 2. Install Claude GitHub App (browser)                     │
│ 3. Select workflows (Issues, PR Review)                    │
│ 4. Create authentication token                             │
│ 5. Claude creates setup PR                                 │
│ 6. You merge the PR                                        │
│ 7. Done! @claude now works                                 │
└────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Walkthrough

### Step 1: Run the Command

In Claude Code, type:

```
/install-github-app
```

### Step 2: Choose Repository

Claude asks which repository to use:

```
Which repository do you want to install the GitHub App on?
> [current repo name] (Recommended)
  Enter a different repository
```

Select the current repo (or enter a different one if needed).

### Step 3: Install the GitHub App

Your browser opens to the Claude GitHub App installation page.

1. Click **Install**
2. Choose which repositories:
   - **All repositories** - Claude can work on any repo
   - **Only select repositories** - Choose specific repos (recommended for testing)
3. Click **Install**
4. Return to your terminal
5. Press Enter to continue

### Step 4: Select Workflows

Claude asks which workflows to install:

```
Which workflows would you like to install?
> [x] Claude Code (works on issues when @claude is mentioned)
> [x] Claude Code Review (auto-reviews PRs)
```

**Recommendation**: Select both for the full experience.

### Step 5: Create Authentication Token

```
How would you like to authenticate the GitHub Action?
> Create a long-lived token with your Claude subscription (Recommended)
  Use an existing API key
```

Select **Create a long-lived token**.

Your browser opens to authenticate with Anthropic:
1. Sign in with your Claude account
2. Authorize the token creation
3. Return to terminal

### Step 6: Claude Creates the Setup PR

Claude automatically:
1. Creates a new branch
2. Adds workflow files to `.github/workflows/`
3. Opens a Pull Request

You'll see:
```
✓ Created PR #1: Add Claude GitHub workflows
  https://github.com/your-username/your-repo/pull/1
```

### Step 7: Merge the PR

1. Go to the PR link
2. Review the changes (just workflow files)
3. Click **Merge pull request**
4. Click **Confirm merge**

Done! The GitHub integration is now active.

---

## What Gets Created

The setup PR adds these files:

```
.github/
└── workflows/
    ├── claude-code.yml         # Handles @claude in issues
    └── claude-code-review.yml  # Auto-reviews PRs
```

These are standard GitHub Actions that trigger Claude when needed.

---

## Testing the Integration

### Test @claude in Issues

1. Go to your repo's Issues tab
2. Click **New issue**
3. Title: "Test: Add a hello world function"
4. Description: "Create a simple hello world function in any language"
5. Click **Submit new issue**
6. Add a comment: `@claude please implement this`
7. Watch the issue comments for Claude's response

### Test PR Review

1. Create a simple change on a new branch
2. Open a Pull Request
3. Claude automatically reviews within a few minutes
4. Check the PR comments for the review

---

## The Workflow Files Explained

### claude-code.yml

Triggers when:
- An issue is opened
- A comment mentions `@claude`

What it does:
- Checks out the code
- Runs Claude Code with the issue context
- Claude works on the issue
- Commits are pushed
- Claude comments with progress and PR link

### claude-code-review.yml

Triggers when:
- A new PR is opened
- PR is updated with new commits

What it does:
- Checks out the PR code
- Runs Claude Code in review mode
- Posts review with:
  - Code quality assessment
  - Bug detection
  - Performance notes
  - Security concerns

---

## Troubleshooting

### "You must be a repository admin"

You can't install on repos you don't own. Options:
1. Fork the repo (makes you admin of the fork)
2. Ask the owner to add you as admin
3. Use the Clone → Own workflow

### "GitHub App installation failed"

1. Check you're logged into the correct GitHub account
2. Try a different browser
3. Clear browser cache and try again

### "@claude doesn't respond"

1. Check Actions tab - did the workflow run?
2. If failed, click the run to see error details
3. Verify the workflow files exist in `.github/workflows/`
4. Make sure you merged the setup PR

### "Authentication token expired"

Run `/install-github-app` again to create a new token.

---

## Security Notes

- The GitHub App only has access to repos you explicitly allow
- Claude commits under its own identity
- You control what gets merged
- Workflow tokens are stored as GitHub Secrets
- Never share your workflow files' secret values

---

## Next Steps

1. Try [Claude in Issues](./claude-in-issues.md) for your first task
2. Review [Claude in PRs](./claude-in-prs.md) for code reviews
3. Set up the [Mobile Workflow](./mobile-workflow.md)

---

*Once set up, you can work from anywhere GitHub is accessible.*
