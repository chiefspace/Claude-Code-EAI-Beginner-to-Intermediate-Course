# Understanding the Subagent Activity Log

## What Gets Logged

| Field | Description |
|-------|-------------|
| timestamp | When subagent finished |
| task | What it was asked (100 chars) |
| status | completed or error |
| duration_seconds | How long |
| result_preview | First 150 chars of result |
| error | Error message if failed |

## Log Location

```
project/logs/subagent-activity.json
```

## Viewing the Log

```
/EA-subagent-log           # View all
/EA-subagent-log last 5    # Last 5 entries
/EA-subagent-log clear     # Clear log
/EA-subagent-log search test  # Find entries
```

Or read JSON directly:
```json
[
  {
    "timestamp": "2026-01-25T14:30:22",
    "task": "Search for API endpoints",
    "status": "completed",
    "duration_seconds": 3.2,
    "result_preview": "Found 12 endpoints..."
  }
]
```

## What to Look For

### Success
```json
{"status": "completed", "duration_seconds": 2.5}
```

### Failure
```json
{"status": "error", "error": "File not found"}
```

### Long Tasks
If `duration_seconds` > 30, consider:
- Break into smaller tasks
- Use faster model (haiku)
- Be more specific

## Maintenance

- Auto-prunes to 100 entries
- Use `clear` to reset
- Add to `.gitignore`:
  ```
  logs/subagent-activity.json
  ```

## Troubleshooting

**No activity logged?**
- Check hook in settings.json
- Verify logs/ directory exists

**Missing fields?**
- Some fields depend on Claude's data
- Duration may be null

**Corrupted log?**
- Delete file, it recreates on next run
