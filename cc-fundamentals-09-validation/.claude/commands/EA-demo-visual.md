---
description: Run the complete visual validation demo with Playwright screenshots
allowed-tools: Bash, Read, Task, Glob, ToolSearch
model: sonnet
argument-hint: (no arguments)
---

# EA-Demo-Visual Command

Complete visual validation demo showing self-correcting agent with screenshot verification.

## Workflow

### Step 1: Show the Intentional Bugs

Read and display the buggy code:
```
Read: demo-app/src/counter.js
Read: demo-app/src/style.css
```

Display:
```
Intentional Bugs in Counter Demo App
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🐛 Bug #1 (CSS): Increment button is hidden
   File: demo-app/src/style.css
   Line: .increment { display: none; }
   Fix: Remove the display: none

🐛 Bug #2 (Logic): Counter starts at 10 instead of 0
   File: demo-app/src/counter.js
   Line: this.count = 10;
   Fix: Change to this.count = 0;

These bugs are intentional for teaching visual validation.
Let's watch the agent fix them automatically!
```

### Step 2: Ensure screenshots directory exists

```bash
mkdir -p validation/screenshots
```

### Step 3: Start Vite Dev Server (Background)

Start the dev server in the background:
```bash
cd demo-app && npm run dev
```

Use run_in_background: true

Wait 5 seconds for the server to start:
```bash
sleep 5
```

### Step 4: Load Playwright MCP Tools

Use ToolSearch to load Playwright tools:
```
ToolSearch: "playwright navigate screenshot"
```

### Step 5: Take "Before" Screenshot

Navigate to the app and capture the buggy state:
```
mcp__playwright__browser_navigate:
  url: "http://localhost:5173"

Wait 2 seconds for page to load:
sleep 2

mcp__playwright__browser_screenshot:
  name: "01_before-fix_hidden-button"
  fullPage: true
```

Report: "📸 Before screenshot captured: Increment button is hidden, count starts at 10"

### Step 6: Spawn Agent to Fix Bugs

Use Task tool with subagent_type: "general-purpose" to spawn an agent:

```
Prompt:
The demo-app has two intentional bugs that need fixing:

1. CSS Bug: The increment button is hidden
   File: demo-app/src/style.css
   Find: .increment { display: none; }
   Fix: Remove the "display: none;" line

2. Logic Bug: Counter starts at 10 instead of 0
   File: demo-app/src/counter.js
   Find: this.count = 10;
   Fix: Change to this.count = 0;

Tasks:
1. Fix both bugs by editing the files
2. Run the tests (cd demo-app && npm test) to verify
3. Report what you fixed

Work from the demo-app directory.
```

Wait for the agent to complete.

### Step 7: Take "After" Screenshot

Wait for Vite HMR to refresh (2 seconds):
```bash
sleep 2
```

Capture the fixed state:
```
mcp__playwright__browser_screenshot:
  name: "02_after-fix_button-visible"
  fullPage: true
```

Report: "📸 After screenshot captured: Button visible, count starts at 0"

### Step 8: Close Browser

```
mcp__playwright__browser_close
```

### Step 9: Stop Dev Server

Find and kill the background npm process:
```bash
# On Windows (PowerShell)
Get-Process -Name node | Where-Object {$_.CommandLine -like "*vite*"} | Stop-Process -Force 2>$null

# Fallback for bash
pkill -f "vite" 2>/dev/null || true
```

### Step 10: Show Screenshots

List the captured screenshots:
```bash
ls -lh validation/screenshots/*$(date +%Y-%m-%d)*.png 2>/dev/null || ls -lh validation/screenshots/*.png | tail -2
```

### Step 11: Final Summary

Display the completion report:
```
Demo Complete: Visual Validation Pattern
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What happened:
  1. ✓ Showed two intentional bugs (CSS + logic)
  2. ✓ Started Vite dev server (localhost:5173)
  3. ✓ Captured "before" screenshot → Button hidden
  4. ✓ Agent fixed both bugs automatically
  5. ✓ Captured "after" screenshot → Button visible
  6. ✓ Tests passed (5/5)
  7. ✓ Dev server stopped

Screenshots saved to:
  validation/screenshots/01_*_before-fix.png
  validation/screenshots/02_*_after-fix.png

Key insight:
  Visual validation proves the fix worked. Screenshots create
  an audit trail showing exactly what changed in the UI.

  This pattern is essential for:
  - UI regression testing
  - Visual proof of bug fixes
  - Design review workflows
  - Client demos and approvals

Try it yourself:
  1. Break something in demo-app/src/style.css
  2. Run /EA-visual-verify http://localhost:5173
  3. Fix it
  4. Run /EA-visual-verify again
  5. Compare the screenshots!
```

## Error Handling

- If demo-app not found: "Error: Run /EA-demo-visual-setup first"
- If port 5173 is busy: "Error: Port 5173 is in use. Stop any running Vite servers."
- If Playwright fails: Show the error and suggest checking MCP configuration
- If agent fails: Show the agent's error and offer to retry

## Notes

- Uses Playwright MCP for screenshots (configured in .mcp.json)
- Vite dev server runs on port 5173 (default)
- Screenshots are saved with sequential naming in validation/screenshots/
- The agent uses the validated-builder pattern with feedback loops
