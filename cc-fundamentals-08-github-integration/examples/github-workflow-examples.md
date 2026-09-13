# GitHub Workflow Examples

> Real-world examples of using @claude in issues and PRs.

---

## Issue Examples

### Example 1: Simple Bug Fix

**Issue Title:** Fix: Button text color unreadable in dark mode

**Issue Body:**
```
The "Submit" button on the contact form has dark text on a dark
background when dark mode is enabled.

Location: src/components/ContactForm.tsx

Expected: White text on dark button
Current: Dark gray text on dark button
```

**Comment:**
```
@claude please fix this. The button uses Tailwind classes.
```

**Claude's Response:**
```
I'll fix the button text color for dark mode.

Plan:
- [ ] Find the Submit button in ContactForm.tsx
- [ ] Add dark mode text color class
- [ ] Verify other buttons don't have same issue

Starting...
```

---

### Example 2: New Feature

**Issue Title:** Add "Remember me" checkbox to login form

**Issue Body:**
```
## Feature Request

Add a "Remember me" checkbox to the login form that:
- Keeps the user logged in for 30 days when checked
- Default: unchecked
- Stores preference in localStorage

## Location
src/pages/Login.tsx

## Acceptance Criteria
- [ ] Checkbox visible below password field
- [ ] Label: "Remember me for 30 days"
- [ ] Checked state extends session cookie duration
- [ ] Unchecked state uses default session (24 hours)
```

**Comment:**
```
@claude please implement this. We're using NextAuth for authentication.
The session configuration is in src/lib/auth.ts
```

---

### Example 3: Refactoring Request

**Issue Title:** Refactor: Extract API calls into custom hooks

**Issue Body:**
```
## Current State
API calls are scattered throughout components:
- src/components/UserList.tsx (fetch users)
- src/components/ProductGrid.tsx (fetch products)
- src/components/OrderHistory.tsx (fetch orders)

## Goal
Create custom hooks:
- useUsers() - returns { users, loading, error, refetch }
- useProducts() - returns { products, loading, error, refetch }
- useOrders() - returns { orders, loading, error, refetch }

## Location for hooks
src/hooks/

## Requirements
- Use React Query or SWR pattern
- Include error handling
- Include loading states
- Original components should use the new hooks
```

**Comment:**
```
@claude please refactor these. We're already using React Query
(see src/lib/queryClient.ts). Follow the patterns there.
```

---

### Example 4: Documentation Update

**Issue Title:** Update README with deployment instructions

**Issue Body:**
```
The README is missing deployment instructions.

Add a section after "Development Setup" with:
1. How to build for production (npm run build)
2. Environment variables needed for production
3. Recommended hosting platforms (Vercel, Railway)
4. Link to our deployment guide in /docs

Keep it concise - link to detailed docs where possible.
```

**Comment:**
```
@claude please update the README. Check the existing style and match it.
```

---

### Example 5: Test Coverage

**Issue Title:** Add unit tests for auth utility functions

**Issue Body:**
```
## Files to Test
src/lib/auth-utils.ts contains:
- validateEmail(email)
- validatePassword(password)
- hashPassword(password)
- generateToken(userId)

## Requirements
- Use Jest (already configured)
- Test file: src/lib/__tests__/auth-utils.test.ts
- Cover edge cases (empty strings, invalid formats)
- Aim for 100% coverage on these functions
```

**Comment:**
```
@claude please write these tests. Run npm test to verify they pass.
```

---

## PR Interaction Examples

### Example 6: Requesting Clarification

**Claude's Review:**
```
Line 45: This function has O(n²) complexity. Consider using a Map
for O(n) lookup.
```

**Your Response:**
```
@claude the array is always <10 items. Is the optimization still worth it?
```

**Claude's Follow-up:**
```
For arrays under 10 items, the performance difference is negligible.
The current approach is fine - readability matters more here.
I'll update my review to mark this as informational only.
```

---

### Example 7: Asking for Code Examples

**Claude's Review:**
```
Line 89: Consider adding error boundaries around this component
to prevent full-page crashes.
```

**Your Response:**
```
@claude can you show me how to add an error boundary here?
```

**Claude's Follow-up:**
```
Here's how to add an error boundary:

1. Create src/components/ErrorBoundary.tsx:
[code block with ErrorBoundary component]

2. Wrap the component in Dashboard.tsx:
[code block showing usage]

Would you like me to implement this in the PR?
```

---

### Example 8: Requesting Changes

**Initial PR from Claude:**
```
Added dark mode toggle to settings.
- New file: DarkModeToggle.tsx
- Modified: Settings.tsx
```

**Your Response:**
```
@claude this looks good but:
1. The toggle should be in the "Display" section, not "General"
2. Add a label that says "Enable dark mode"
3. The toggle animation is too slow - make it 150ms instead of 300ms
```

**Claude's Response:**
```
I'll make those changes:
- [x] Move toggle to Display section
- [x] Add "Enable dark mode" label
- [x] Change animation duration to 150ms

Pushing updated commits now...
```

---

## Advanced Patterns

### Example 9: Multi-Step Implementation

**Issue Title:** Add comment system to blog posts

**Issue Body:**
```
## Phase 1: Data Model
- Add Comment model to schema
- Create API endpoints: GET /comments, POST /comment

## Phase 2: UI Components
- CommentList component
- CommentForm component
- Single Comment component with reply button

## Phase 3: Integration
- Add comment section to BlogPost page
- Connect to API

Please implement phase by phase and check in after each.
```

**Comments:**
```
@claude please start with Phase 1
```

After Phase 1:
```
@claude Phase 1 looks good. Please continue with Phase 2.
```

After Phase 2:
```
@claude before Phase 3, can you add loading skeletons to CommentList?
```

---

### Example 10: Asking for Options

**Issue Title:** Improve search performance

**Issue Body:**
```
Search is slow on the products page when we have >1000 products.
Currently using filter() on the full array client-side.
```

**Comment:**
```
@claude can you propose 2-3 different solutions before implementing?
Consider: server-side search, debouncing, virtual list, etc.
```

**Claude's Response:**
```
Here are three options:

**Option 1: Server-side Search (Recommended)**
- Move filtering to API
- Pros: Handles any data size, reduces client memory
- Cons: Requires API changes, adds latency

**Option 2: Debounced Client Search**
- Add 300ms debounce to search input
- Pros: Quick to implement, no API changes
- Cons: Still slow with very large datasets

**Option 3: Web Worker Search**
- Offload search to background thread
- Pros: Keeps UI responsive
- Cons: More complex, still loads all data

Which approach would you like me to implement?
```

---

### Example 11: Handling Errors

**Claude's Comment:**
```
I encountered an issue:

The test `auth.test.ts` is failing with:
"Cannot find module '../lib/auth-utils'"

It looks like the import path changed. Should I:
1. Update the test import path
2. Move auth-utils.ts back to the original location
3. Something else?
```

**Your Response:**
```
@claude please update the test import path. We moved auth-utils.ts
to src/utils/auth-utils.ts last week.
```

---

## Quick Reference

### Common @claude Commands

| Command | Use When |
|---------|----------|
| `@claude please implement this` | Standard implementation request |
| `@claude can you create a plan first?` | Want to review approach before coding |
| `@claude please review and fix any issues` | Want Claude to self-review |
| `@claude looks good, please proceed` | Approving a plan |
| `@claude please try a different approach` | Current solution isn't working |
| `@claude can you explain your approach?` | Need clarification |
| `@claude please stop and wait` | Pause work for discussion |

### Issue Template

```
## What
[One sentence describing the task]

## Why
[Business reason or user benefit]

## Where
[File paths or component names]

## Requirements
- [ ] Requirement 1
- [ ] Requirement 2

## Additional Context
[Anything else Claude should know]
```

---

*Use these examples as templates. Adapt them to your projects and workflows.*
