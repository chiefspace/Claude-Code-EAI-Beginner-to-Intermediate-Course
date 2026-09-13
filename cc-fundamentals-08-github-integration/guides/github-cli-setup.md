# GitHub CLI Setup

> The GitHub CLI (`gh`) is required before you can use `/install-github-app`.

---

## What is GitHub CLI?

GitHub CLI is a command-line tool that lets you interact with GitHub from your terminal. It's used to:
- Authenticate with GitHub
- Create and manage repositories
- Work with issues and PRs
- And more...

Claude Code uses it to set up the GitHub integration.

---

## Installation

### Windows

**Using winget (Recommended):**
```powershell
winget install GitHub.cli
```

**Using Chocolatey:**
```powershell
choco install gh
```

**Using Scoop:**
```powershell
scoop install gh
```

### Mac

**Using Homebrew:**
```bash
brew install gh
```

### Linux

**Ubuntu/Debian:**
```bash
sudo apt install gh
```

**Fedora:**
```bash
sudo dnf install gh
```

**Other distributions:** See [cli.github.com](https://cli.github.com/) for more options.

---

## Verify Installation

After installing, verify it works:

```bash
gh --version
```

You should see output like:
```
gh version 2.x.x (2024-xx-xx)
```

---

## Authentication

### Step 1: Start Login

```bash
gh auth login
```

### Step 2: Select GitHub.com

```
? What account do you want to log into?
> GitHub.com
  GitHub Enterprise Server
```

Select **GitHub.com** (unless you use Enterprise).

### Step 3: Select HTTPS

```
? What is your preferred protocol for Git operations?
> HTTPS
  SSH
```

Select **HTTPS** for simplicity.

### Step 4: Authenticate with Browser

```
? How would you like to authenticate GitHub CLI?
> Login with a web browser
  Paste an authentication token
```

Select **Login with a web browser**.

### Step 5: Copy the Code

```
! First copy your one-time code: XXXX-XXXX
Press Enter to open github.com in your browser...
```

1. Copy the code shown (e.g., `ABCD-1234`)
2. Press Enter
3. Your browser opens automatically

### Step 6: Authorize in Browser

1. Paste the code when prompted
2. Click **Authorize github**
3. You may need to enter your GitHub password

### Step 7: Confirm Success

Back in your terminal, you should see:
```
✓ Authentication complete.
- gh config set -h github.com git_protocol https
✓ Configured git protocol
✓ Logged in as your-username
```

---

## Verify Authentication

Check your authentication status:

```bash
gh auth status
```

You should see:
```
github.com
  ✓ Logged in to github.com as your-username
  ✓ Git operations for github.com configured to use https protocol.
  ✓ Token: gho_************************************
```

---

## Common Issues

### "gh: command not found"

The CLI isn't in your PATH. Try:
- Restart your terminal
- On Windows: Restart PowerShell or add to PATH manually
- On Mac: Run `brew link gh`

### "Authentication failed"

Try logging out and back in:
```bash
gh auth logout
gh auth login
```

### "Browser didn't open"

Manually go to: https://github.com/login/device

Enter the code shown in your terminal.

---

## Next Steps

Once authenticated, you can:
1. Proceed to [Install GitHub App](./install-github-app.md)
2. Or create a repo: `gh repo create my-project --public --clone`

---

*GitHub CLI is your gateway to working with GitHub from the terminal.*
