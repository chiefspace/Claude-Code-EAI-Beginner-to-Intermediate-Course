# Mobile Workflow

> Start tasks from your phone. Review and merge when you're ready.

---

## The Complete Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        MOBILE PHASE                              │
│                    (Phone / Tablet)                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 1: Open GitHub (app or mobile.github.com)                 │
│                                                                  │
│  Step 2: Navigate to your repo                                  │
│                                                                  │
│  Step 3: Create new issue                                       │
│          - Title: "Add user profile page"                       │
│          - Description: Clear requirements                      │
│                                                                  │
│  Step 4: Comment on the issue                                   │
│          "@claude please implement this"                        │
│                                                                  │
│  Step 5: Close phone, go about your day                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ (Minutes to hours later)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       CLAUDE PHASE                               │
│                  (Runs automatically)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  • Reads the issue description                                  │
│  • Creates a plan (posts as comment)                            │
│  • Implements each step                                         │
│  • Makes commits                                                │
│  • Posts progress updates                                       │
│  • Provides link to create PR                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ (When you're ready)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       REVIEW PHASE                               │
│                (Phone or Desktop)                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 6: Open the issue (notification or manual)                │
│                                                                  │
│  Step 7: Review Claude's work in comments                       │
│          - See what was done                                    │
│          - Check the commits                                    │
│                                                                  │
│  Step 8: Click the PR link Claude provided                      │
│                                                                  │
│  Step 9: Review the PR                                          │
│          - Look at the diff                                     │
│          - Read Claude's review (if another reviewer)           │
│                                                                  │
│  Step 10: Merge when satisfied                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Setting Up Mobile Access

### Option 1: GitHub Mobile App (Recommended)

1. Download from App Store (iOS) or Play Store (Android)
2. Sign in with your GitHub account
3. Enable notifications for your repos

**Benefits:**
- Push notifications when Claude comments
- Quick access to issues and PRs
- Easy to comment and merge

### Option 2: Mobile Browser

1. Go to github.com on your phone
2. Sign in
3. Bookmark your repo for quick access

**Benefits:**
- No app needed
- Works on any device
- Full GitHub features available

---

## Creating Effective Mobile Issues

When typing on a phone, keep it concise but clear:

### Quick Format

```
Title: Add dark mode toggle

What: Toggle switch in settings that switches between light/dark theme

Where: Settings page, Display section

Details:
- Save preference to localStorage
- Apply immediately (no refresh)
```

### Even Quicker

For simple tasks, the title alone can work:

```
Title: Fix typo on homepage - "recieve" should be "receive"
```

Then comment: `@claude please fix this`

---

## Real-World Mobile Scenarios

### Scenario 1: Quick Bug Fix While Commuting

**On the train, you remember a bug:**

1. Open GitHub app
2. Create issue: "Fix: Login button disabled state not showing"
3. Comment: `@claude this should show a spinner when clicked`
4. Put phone away

**2 hours later:**
- Open notification from Claude
- Review the fix
- Merge from phone or wait for desktop

### Scenario 2: Weekend Feature Idea

**Saturday morning, you have an idea:**

1. Create issue with full details:
```
Title: Add search to product list

Search bar at top of product list that filters products
in real-time as user types.

Requirements:
- Filter by name and description
- Case-insensitive
- Show "no results" message when empty
- Debounce input (300ms)
```
2. Comment: `@claude please implement this`
3. Enjoy your weekend

**Monday morning:**
- Review Claude's implementation
- Request changes if needed
- Merge when ready

### Scenario 3: Quick Brainstorm to Code

**At lunch, thinking about improvements:**

1. Create multiple issues quickly:
   - "Add loading skeletons to dashboard"
   - "Add error boundary to profile page"
   - "Add retry button to failed API calls"

2. Tag Claude on each: `@claude please implement`

3. Return to multiple completed features

---

## Notification Setup

### GitHub Mobile App

1. Settings → Notifications
2. Enable for:
   - Issue comments (see Claude's updates)
   - Pull requests (see when PR is ready)
   - CI/Actions (see if workflows complete)

### Email Notifications

1. GitHub.com → Settings → Notifications
2. Enable email for "Participating" conversations
3. You'll get emails when Claude comments on issues you created

---

## Tips for Mobile Workflow

### Keep Issues Atomic

One task per issue. Instead of:
```
Add user dashboard with charts, settings, and notifications
```

Create three issues:
```
1. Add user dashboard layout
2. Add charts to user dashboard
3. Add notification preferences to settings
```

### Use Issue Templates

If you create similar issues often, use GitHub issue templates. Create once on desktop, use from mobile.

### Leverage Labels

Add labels from mobile to help Claude understand priority:
- `bug` - Something broken
- `feature` - New functionality
- `urgent` - High priority
- `good-first-issue` - Simple task

### Quick Comments

Stock phrases for mobile:
- `@claude please implement this`
- `@claude can you create a plan first?`
- `@claude please review and fix any issues`
- `@claude looks good, please proceed`

---

## Review From Mobile

### Quick Review Checklist

1. **Read Claude's summary** - What was done?
2. **Check the diff** - Any obvious issues?
3. **Look at file count** - Too many files changed?
4. **Read any warnings** - Security or performance concerns?

### When to Wait for Desktop

- Large PRs (10+ files changed)
- Complex logic that needs careful reading
- Security-sensitive changes
- Unfamiliar code areas

### Safe to Merge from Mobile

- Small bug fixes
- Simple features
- Documentation updates
- Style changes

---

## The Async Advantage

### Traditional Workflow
```
Sit at computer → Think → Code → Test → Commit → Push → PR → Review → Merge
```
**Requires:** Dedicated coding time

### Mobile + Claude Workflow
```
Think (anywhere) → Create issue → @claude → [wait] → Review → Merge
```
**Requires:** Brief moments + final review

### Time Savings

| Task | Traditional | Mobile + Claude |
|------|-------------|-----------------|
| Simple bug fix | 30-60 min | 5 min + review |
| New component | 1-2 hours | 10 min + review |
| Refactoring | 2-4 hours | 15 min + review |

You reclaim coding time by offloading implementation to Claude.

---

## Limitations

### What Works Well on Mobile

- Creating issues
- Tagging Claude
- Quick reviews
- Merging simple PRs
- Following progress

### What's Better on Desktop

- Detailed code review
- Testing the changes locally
- Complex merge conflicts
- Debugging issues
- Writing detailed requirements

---

## Example: Full Mobile Session

**7:00 AM - On phone during coffee**

Create issue:
```
Title: Add export to CSV button on reports page

Add a button that exports the current report data to a CSV file.
Place it next to the existing "Print" button.
```

Comment: `@claude please implement this`

**7:02 AM - Put phone down**

Get ready for the day.

**12:00 PM - Lunch break notification**

Open GitHub app. See Claude's comment:
```
✅ Implementation complete!

Changes:
- Added exportToCSV utility function
- Added "Export CSV" button to ReportsPage
- Includes all visible columns in export

PR ready: [Create Pull Request]
```

Click the link, quick review of the diff. Looks good.

**12:05 PM - Merge**

Tap "Merge pull request" → "Confirm merge"

Done. New feature shipped during lunch.

---

## Next Steps

1. Install GitHub mobile app
2. Create a test issue from your phone
3. Tag `@claude` and watch it work
4. Practice reviewing and merging from mobile
5. Find tasks in your daily life to offload to this workflow

---

*Your phone becomes a coding command center. Claude does the typing.*
