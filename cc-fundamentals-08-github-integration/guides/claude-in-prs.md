# Claude in PRs

> Automatic code reviews on every pull request.

---

## How It Works

When you open a Pull Request, Claude automatically reviews it:

```
You                          GitHub                        Claude
 │                             │                             │
 │  Open Pull Request          │                             │
 ├────────────────────────────►│                             │
 │                             │  Trigger review workflow    │
 │                             ├────────────────────────────►│
 │                             │                             │
 │                             │  Analyze changes            │
 │                             │◄────────────────────────────┤
 │                             │                             │
 │                             │  Post review comments       │
 │                             │◄────────────────────────────┤
 │                             │                             │
 │  Read review, respond       │                             │
 ◄─────────────────────────────┤                             │
```

---

## What Claude Reviews

Claude analyzes your code for:

| Category | What It Checks |
|----------|----------------|
| **Code Quality** | Readability, naming, structure |
| **Bugs** | Logic errors, edge cases, null checks |
| **Performance** | Inefficient patterns, N+1 queries |
| **Security** | Injection risks, auth issues, secrets |

---

## Review Format

Claude posts a review comment like this:

```
## Code Review

### Summary
This PR adds user authentication with email/password login.

### Code Quality ✅
- Good separation of concerns
- Clear function naming
- Consistent with existing codebase patterns

### Bugs ⚠️
- Line 42: Missing null check for `user.email`
- Line 78: Race condition possible if login called twice

### Performance ✅
- No significant performance concerns

### Security ⚠️
- Line 15: Password logged in development mode
- Line 89: Consider rate limiting login attempts

### Suggestions
1. Add try/catch around database operations
2. Use bcrypt.compare() instead of direct comparison
3. Add input validation for email format

Overall: Approve with suggestions
```

---

## Responding to Reviews

### Ask for Clarification

Comment on the PR:
```
@claude can you explain more about the race condition on line 78?
```

### Request Specific Feedback

```
@claude I'm not sure about my error handling approach.
Can you review the try/catch blocks specifically?
```

### Ask for Fix Suggestions

```
@claude can you show me how to fix the security issue on line 15?
```

### Request Re-review After Changes

After pushing fixes:
```
@claude I've addressed your concerns. Can you review again?
```

---

## Review Triggers

### Automatic Triggers

Claude reviews automatically when:
- A new PR is opened
- New commits are pushed to an existing PR
- PR is re-opened after being closed

### Manual Triggers

Request a review anytime:
```
@claude please review this PR
```

Or request focused review:
```
@claude please do a security-focused review of this PR
```

---

## Review Scope

### What Claude Can See

- All changed files in the PR
- Diff between base and head branch
- PR title and description
- Previous comments in the PR

### What Claude Can't See

- Files not changed in the PR (limited context)
- External dependencies or runtime behavior
- Private package implementations
- Database state or API responses

---

## Configuring Review Behavior

### PR Description Tags

Add tags to your PR description to guide the review:

```
## Description
This PR adds the checkout flow.

## Review Focus
- Security (handling payment info)
- Error handling
- Mobile responsiveness

## Known Issues
- Tests not yet written (will add in follow-up PR)
- Loading states are placeholder
```

Claude will prioritize the areas you mention in "Review Focus" and skip known issues you've already identified.

---

## Review Types

### Standard Review (Default)

Covers all categories equally. Used when no specific focus is requested.

### Security-Focused Review

Request with:
```
@claude please do a security-focused review
```

Claude will dive deeper into:
- Input validation
- Authentication/authorization
- Data exposure risks
- Injection vulnerabilities

### Performance-Focused Review

Request with:
```
@claude please review this for performance
```

Claude will focus on:
- Algorithm efficiency
- Database query patterns
- Memory usage
- Rendering performance (for frontend)

---

## Best Practices

### Write Good PR Descriptions

**Good:**
```
## What
Adds email verification for new user signups

## Why
Prevent spam accounts and ensure valid contact info

## How
- Added verification token generation
- Created email sending service
- Added /verify endpoint
- Updated signup flow to require verification

## Testing
- Manually tested signup → email → verify flow
- Added unit tests for token generation
```

**Less Good:**
```
added email verification
```

### Keep PRs Focused

- One feature or fix per PR
- Smaller PRs get better reviews
- Large PRs may miss issues due to context limits

### Address Feedback

When Claude raises concerns:
1. Fix the issue, or
2. Explain why it's not applicable, or
3. Create a follow-up issue to address later

---

## Common Feedback Types

### Actionable Suggestions

```
Line 42: Consider using Optional chaining:
  Before: user && user.profile && user.profile.name
  After:  user?.profile?.name
```

### Questions

```
Line 78: Is this intentional? The condition seems inverted.
Expected: if (isValid) { proceed }
Found:    if (!isValid) { proceed }
```

### Best Practice Reminders

```
Line 15: Consider extracting this magic number into a named constant.
  const MAX_RETRY_ATTEMPTS = 3;
```

### Security Warnings

```
⚠️ Line 89: User input directly in SQL query.
Use parameterized queries to prevent SQL injection:
  Before: db.query(`SELECT * FROM users WHERE id = ${userId}`)
  After:  db.query('SELECT * FROM users WHERE id = ?', [userId])
```

---

## Integrating Reviews into Workflow

### Recommended Flow

```
1. Create feature branch
2. Implement changes
3. Open PR
4. Claude auto-reviews
5. Address feedback
6. Push fixes
7. Request re-review if needed
8. Merge when approved
```

### Using with Required Reviews

If your repo requires reviews before merging:
- Claude's review can count as one review
- But always have a human review for critical code
- Use Claude for first-pass, human for final approval

---

## Troubleshooting

### Review never appears

1. Check Actions tab for workflow run
2. Verify `.github/workflows/claude-code-review.yml` exists
3. Check workflow has correct trigger events

### Review is generic/unhelpful

Add more context in PR description:
- What the changes do
- Why they're needed
- What areas need focus

### Claude misses obvious issues

- PR might be too large (split into smaller PRs)
- Context might be in unchanged files (mention them)
- Be specific about what to review

---

## Next Steps

1. Open a PR and see automatic review
2. Practice responding to review comments
3. Try different review focus types
4. Set up the full [Mobile Workflow](./mobile-workflow.md)

---

*Every PR gets a first-pass review. Catch issues before they reach main.*
