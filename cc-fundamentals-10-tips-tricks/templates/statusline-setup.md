# Custom Status Line Setup for Windows PowerShell

Always see your context usage at a glance with a custom status line.

## What You'll Get

```
[Opus 4.5] ▓▓▓▓▓░░░░░ 38% ~53% (76K/200K) · @ main · D:\Projects\MyApp · 34m (since 11:16 AM) · Jan 25 11:50 AM
```

- **Model name** - Which model you're using
- **Progress bar** - Visual context usage
- **Dual percentage** - Raw message % and estimated total %
- **Token count** - Used/total tokens
- **Git branch** - Current branch
- **Working directory** - Where you are
- **Session timer** - How long you've been working

## Why Two Percentages?

Claude Code's reported usage doesn't include system overhead (tools, settings, MCP configs). This can be 15-25% of your context!

- First % = Raw message tokens only
- Second % (~XX%) = Estimated total including overhead

The second number is more accurate for predicting when you'll hit limits.

## Setup Instructions

### Step 1: Create the Script

Save this to `C:\Users\<YourUsername>\.claude\statusline.ps1`:

```powershell
# Claude Code Status Line - PowerShell Version
# Dual Display: raw message % + estimated total % (with system overhead)

$inputJson = [Console]::In.ReadToEnd()

if ([string]::IsNullOrWhiteSpace($inputJson)) {
    [Console]::Write("[!] No input")
    exit 0
}

try {
    $data = $inputJson | ConvertFrom-Json
} catch {
    [Console]::Write("[!] JSON error")
    exit 0
}

# Parse JSON values
$model = if ($data.model.display_name) { $data.model.display_name } else { "Claude" }
$contextSize = if ($null -ne $data.context_window.context_window_size) { [int]$data.context_window.context_window_size } else { 200000 }

# System overhead estimate (~30K tokens for tools, CLAUDE.md, MCP configs)
$systemOverhead = 30000

# Calculate tokens
$usage = $data.context_window.current_usage
$dataAvailable = $false
$tokensUsed = 0
$rawPercent = 0

if ($null -ne $usage -and $null -ne $usage.input_tokens) {
    $inputTokens = if ($null -ne $usage.input_tokens) { [long]$usage.input_tokens } else { 0 }
    $cacheCreation = if ($null -ne $usage.cache_creation_input_tokens) { [long]$usage.cache_creation_input_tokens } else { 0 }
    $cacheRead = if ($null -ne $usage.cache_read_input_tokens) { [long]$usage.cache_read_input_tokens } else { 0 }
    $tokensUsed = $inputTokens + $cacheCreation + $cacheRead
    $rawPercent = [math]::Round(($tokensUsed / $contextSize) * 100, 1)
    $dataAvailable = $true
} elseif ($null -ne $data.context_window.used_percentage) {
    $rawPercent = [double]$data.context_window.used_percentage
    $tokensUsed = [math]::Floor(($rawPercent / 100) * $contextSize)
    $dataAvailable = $true
}

# Calculate estimated total
$totalTokensEstimate = $tokensUsed + $systemOverhead
$totalPercent = [math]::Min(100, [math]::Round(($totalTokensEstimate / $contextSize) * 100))

$durationMs = if ($null -ne $data.cost.total_duration_ms) { [long]$data.cost.total_duration_ms } else { 0 }
$cwd = if ($data.workspace.current_dir) { $data.workspace.current_dir } elseif ($data.cwd) { $data.cwd } else { "unknown" }

# Format tokens
function Format-Tokens($tokens) {
    if ($tokens -ge 1000) { return "$([math]::Floor($tokens / 1000))K" }
    return "$tokens"
}

$tokensDisplay = Format-Tokens $tokensUsed
$contextSizeDisplay = Format-Tokens $contextSize

# Colors
$esc = [char]27
$reset = "$esc[0m"
$bold = "$esc[1m"
$dim = "$esc[2m"
$purple = "$esc[38;5;135m"
$yellow = "$esc[38;5;220m"
$red = "$esc[38;5;196m"
$green = "$esc[38;5;114m"
$blue = "$esc[38;5;117m"
$cyan = "$esc[38;5;87m"
$white = "$esc[38;5;255m"

# Color based on total usage
$rawInt = [math]::Floor($rawPercent)
$totalInt = [math]::Floor($totalPercent)

if ($totalInt -ge 80) { $barColor = $red }
elseif ($totalInt -ge 60) { $barColor = $yellow }
else { $barColor = $purple }

# Progress bar
$filled = [math]::Min(10, [math]::Floor($totalInt / 10))
$empty = 10 - $filled
$bar = ([string][char]0x2593) * $filled + ([string][char]0x2591) * $empty

# Git branch
$gitBranch = ""
if (Test-Path $cwd -PathType Container) {
    Push-Location $cwd
    try {
        $branch = git branch --show-current 2>$null
        if ($branch) { $gitBranch = $branch.Trim() }
    } catch {}
    Pop-Location
}

# Truncate path
$maxPathLen = 40
if ($cwd.Length -gt $maxPathLen) {
    $pathDisplay = "..." + $cwd.Substring($cwd.Length - $maxPathLen)
} else { $pathDisplay = $cwd }

# Duration
function Format-Duration($ms) {
    $seconds = [math]::Floor($ms / 1000)
    $minutes = [math]::Floor($seconds / 60)
    $hours = [math]::Floor($minutes / 60)
    if ($hours -gt 0) { return "${hours}h $($minutes % 60)m" }
    elseif ($minutes -gt 0) { return "${minutes}m" }
    else { return "${seconds}s" }
}

$durationDisplay = Format-Duration $durationMs
$now = Get-Date
$startTime = $now.AddMilliseconds(-$durationMs)
$startTimeDisplay = $startTime.ToString("h:mm tt")
$currentDatetime = $now.ToString("MMM d h:mm tt")

$sep = " $([char]183) "

# Build output
$output = ""
$output += "${bold}${white}[${model}]${reset}"

if ($dataAvailable) {
    $output += " ${barColor}${bar}${reset}"
    $output += " ${dim}${rawInt}%${reset}"
    $output += " ${barColor}~${totalInt}%${reset}"
    $output += " ${dim}(${tokensDisplay}/${contextSizeDisplay})${reset}"
} else {
    $output += " ${dim}[waiting for first response...]${reset}"
}

if ($gitBranch) { $output += "${sep}${green}@ ${gitBranch}${reset}" }
$output += "${sep}${blue}${pathDisplay}${reset}"
$output += "${sep}${cyan}${durationDisplay} (since ${startTimeDisplay})${reset}"
$output += "${sep}${purple}${currentDatetime}${reset}"

[Console]::Write($output)
```

### Step 2: Configure settings.json

Add to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "powershell -ExecutionPolicy Bypass -File \"C:\\Users\\<YourUsername>\\.claude\\statusline.ps1\"",
    "padding": 0
  }
}
```

**Replace `<YourUsername>` with your actual Windows username.**

### Step 3: Restart Claude Code

Close and reopen Claude Code for changes to take effect.

## Customization

### Adjusting System Overhead

Run `/context` to see your actual overhead, then adjust:

```powershell
$systemOverhead = 30000  # Adjust based on your setup (25000-40000 typical)
```

### Color Thresholds

| Color | Threshold | Meaning |
|-------|-----------|------------|
| Purple | < 60% | Safe |
| Yellow | 60-79% | Caution |
| Red | >= 80% | Consider clearing |

## Alternative: /statusline Command

If you prefer not to set up a custom script, Claude Code has a built-in:

```
/statusline
```

This shows basic status information without the custom formatting.
