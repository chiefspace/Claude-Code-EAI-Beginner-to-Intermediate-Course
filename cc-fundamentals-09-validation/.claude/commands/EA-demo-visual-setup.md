---
description: Install dependencies for the visual validation demo app
allowed-tools: Bash, Read
model: sonnet
argument-hint: (no arguments)
---

# EA-Demo-Visual-Setup Command

One-time setup command to install dependencies for the counter demo app.

## Workflow

### Step 1: Check if demo-app exists

Verify that the demo-app directory exists:
```bash
ls demo-app/package.json
```

If it doesn't exist, report an error: "Error: demo-app directory not found. Are you in the 09-validation module directory?"

### Step 2: Install dependencies

Run npm install in the demo-app directory:
```bash
cd demo-app && npm install
```

### Step 3: Verify installation

Check that node_modules was created:
```bash
ls demo-app/node_modules/vite
```

### Step 4: Success message

Report success:
```
✓ Demo app setup complete!

Dependencies installed:
  - Vite (dev server)

Next steps:
  1. Run /EA-demo-visual to see the visual validation demo
  2. The demo will:
     - Show intentional bugs in the counter app
     - Start dev server on localhost:5173
     - Take "before" screenshot
     - Fix the bugs automatically
     - Take "after" screenshot
     - Validate with tests

Ready to go! Run /EA-demo-visual when you're ready.
```

## Error Handling

- If npm is not installed: "Error: npm not found. Please install Node.js first."
- If npm install fails: Show the error and suggest checking npm logs
