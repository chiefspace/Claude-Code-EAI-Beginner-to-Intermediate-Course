# Claude in Issues

> Create an issue, tag @claude, and let it work while you do other things.

---

## How It Works

```
You                          GitHub                        Claude
 │                             │                             │
 │  Create issue               │                             │
 ├────────────────────────────►│                             │
 │                             │                             │
 │  Comment: @claude           │                             │
 ├────────────────────────────►│                             │
 │                             │  Trigger workflow           │
 │                             ├────────────────────────────►│
 │                             │                             │
 │                             │  Read issue, create plan    │
 │                             │◄────────────────────────────┤
 │                             │                             │
 │                             │  Work through steps         │
 │                             │◄────────────────────────────┤
 │                             │                             │
 │                             │  Commit code                │
 │                             │◄────────────────────────────┤
 │                             │                             │
 │                             │  Post completion + PR link  │
 │                             │◄────────────────────────────┤
 │                             │                             │
 │  Review and merge           │                             │
 ◄─────────────────────────────┤                             │
```

---

## Creating Effective Issues

### Good Issue Format

```
Title: Add dark mode toggle to settings page

Description:
Create a toggle switch in the settings page that allows users
to switch between light and dark mode.

Requirements:
- Toggle should be in the Display section
- Should persist user preference in localStorage
- Should apply immediately without page refresh

Acceptance Criteria:
- [ ] Toggle visible in settings
- [ ] Clicking toggle switches theme
- [ ] Preference persists after refresh
```

### Why This Works

| Element | Purpose |
|---------|---------|
| Clear title | Claude knows what to build |
| Description | Context for the feature |
| Requirements | Specific constraints |
| Acceptance criteria | Definition of done |

---

## Triggering Claude

### Basic Trigger

Comment on the issue:
```
@claude please implement this
```

### With Additional Context

```
@claude please implement this

Notes:
- We're using Tailwind CSS for styling
- The settings page is at src/pages/Settings.tsx
- Use the existing Toggle component from src/components/ui/Toggle.tsx
```

### Asking for a Plan First

```
@claude can you create a plan for this before implementing?
```

Claude will post a plan in the comments. Review it, then reply:
```
@claude looks good, please proceed
```

---

## What Claude Does

### 1. Creates a Todo List

Claude first posts a comment with its plan:
```
I'll work on this issue. Here's my plan:

- [ ] Create dark mode CSS variables
- [ ] Add Toggle component to Settings page
- [ ] Implement localStorage persistence
- [ ] Add theme switching logic
- [ ] Test the implementation

Starting now...
```

### 2. Works Through Each Step

Claude updates the checkboxes as it completes each task:
```
- [x] Create dark mode CSS variables
- [x] Add Toggle component to Settings page
- [ ] Implement localStorage persistence
- [ ] Add theme switching logic
- [ ] Test the implementation

Progress: Added CSS variables and Toggle component...
```

### 3. Commits Code

Each logical change gets a commit. You can see them in the issue timeline.

### 4. Reports Completion

When done, Claude posts:
```
✅ Implementation complete!

Changes made:
- Added dark mode CSS variables to globals.css
- Created DarkModeToggle component
- Added toggle to Settings page
- Implemented localStorage persistence

To create a pull request: [Click here to create PR](link)

Let me know if you'd like any changes!
```

---

## Following Up

### Request Changes

```
@claude the toggle should be bigger. Can you increase the size?
```

### Ask Questions

```
@claude why did you use CSS variables instead of a class toggle?
```

### Request Review

```
@claude can you review the changes you made and make sure there are no bugs?
```

---

## Best Practices

### Be Specific

**Good:**
```
Add a logout button in the top-right corner of the header that
calls the /api/auth/logout endpoint and redirects to /login
```

**Less Good:**
```
add logout button
```

### Provide Context

**Good:**
```
@claude please implement this

Context:
- Using Next.js 14 with App Router
- Auth state managed by AuthContext in src/context/AuthContext.tsx
- API calls should use the fetchWithAuth helper
```

**Less Good:**
```
@claude do it
```

### Set Clear Acceptance Criteria

**Good:**
```
Acceptance Criteria:
- [ ] Button visible on all authenticated pages
- [ ] Clicking button clears session
- [ ] Redirects to login page
- [ ] Shows loading state during logout
```

**Less Good:**
```
make it work
```

---

## Common Patterns

### Bug Fix

```
Title: Fix: Login button unresponsive on mobile

Description:
The login button on the homepage doesn't respond to taps on
mobile devices (iOS Safari, Chrome Android).

Steps to Reproduce:
1. Open site on mobile browser
2. Tap the login button
3. Nothing happens

Expected: Should navigate to /login
```

### Feature Request

```
Title: Add email notifications for new comments

Description:
Users should receive email notifications when someone comments
on their posts.

Requirements:
- Configurable in user settings (on/off)
- Maximum 1 email per hour (digest mode)
- Include unsubscribe link
```

### Refactoring

```
Title: Refactor: Extract form validation into reusable hook

Description:
Currently form validation is duplicated across LoginForm,
SignupForm, and ContactForm.

Goal:
- Create useFormValidation hook
- Migrate existing forms to use it
- No functionality changes (just code organization)
```

---

## Limitations

### What Claude Can Do

- Read and modify code in the repository
- Create new files
- Make commits
- Understand project context
- Follow coding patterns in the codebase

### What Claude Can't Do

- Access external services (databases, APIs) during work
- Run tests (no runtime environment)
- Deploy code
- Access private npm packages
- Make changes outside the repository

---

## Troubleshooting

### Claude doesn't respond

1. Check Actions tab - did workflow trigger?
2. Verify `@claude` is spelled correctly (not `@Claude`)
3. Check workflow file exists at `.github/workflows/claude-code.yml`

### Claude misunderstands the task

Add more context:
```
@claude I think there was a misunderstanding.

What I meant was: [clearer explanation]

Please try again with this approach: [specific guidance]
```

### Claude gets stuck

```
@claude please stop the current approach and try a different solution.

Alternative approach: [describe alternative]
```

---

## Next Steps

1. Try creating an issue with `@claude`
2. Review [Claude in PRs](./claude-in-prs.md)
3. Set up the full [Mobile Workflow](./mobile-workflow.md)

---

*Create issues, tag Claude, review the results. That's the workflow.*
