# Subagent Prompt Examples

## Research (Explore)

### Find Instances
```
Search for all uses of 'localStorage' with file paths and line numbers.
```

### Architecture Overview
```
Explore project structure, show how main modules connect.
```

### Find Patterns
```
Find all API endpoints, list routes, methods, and handlers.
```

## Code Tasks (General-Purpose)

### Review
```
Review src/UserProfile.jsx for bugs, performance, accessibility.
Provide specific suggestions.
```

### Generate Tests
```
Create Jest unit tests for src/utils/validation.js.
Cover edge cases. Write to tests/validation.test.js.
```

### Refactor
```
Refactor src/legacy/data.js to modern JS:
- var → const/let
- Arrow functions
- Destructuring
Keep same functionality.
```

## Documentation

### README
```
Create README.md with:
- Project description
- Installation
- Usage examples
- Scripts
```

### Add Comments
```
Add JSDoc to exported functions in src/api/handlers.js.
Include types and descriptions.
```

## Testing (Bash)

### Run Tests
```
Run authentication tests, summarize failures.
```

### Security Audit
```
Run npm audit, group vulnerabilities by severity.
```

## Multi-Step

### Feature Review
```
For src/features/cart/:
1. List files and purposes
2. Identify data flow
3. Note issues
4. Summarize
```

### Health Check
```
Find:
1. Files without tests
2. Functions > 50 lines
3. Deeply nested callbacks
Report with file paths.
```

## Tips

### Be Specific
```
Bad:  "Check the code"
Good: "Check src/auth.js for SQL injection"
```

### State Output Format
```
"List as table: File, Issue, Severity"
```

### Set Boundaries
```
"Only src/components/, ignore tests"
```

### Provide Context
```
"React 18 project with TypeScript and Redux"
```
