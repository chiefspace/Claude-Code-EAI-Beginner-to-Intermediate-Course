# Claude Code PowerShell Aliases
# Add these to your $PROFILE file
# To find your profile: echo $PROFILE
# To edit: notepad $PROFILE

# Basic launch commands
function cld { claude $args }
function cldo { claude --model opus $args }
function clds { claude --model sonnet $args }
function cldh { claude --model haiku $args }

# Session management
function cldr { claude --resume $args }

# Skip permissions (use carefully!)
# Only use when you understand Claude Code well and trust your environment
function lfg { claude --dangerously-skip-permissions --model opus $args }

# After adding, run: . $PROFILE
# Or restart PowerShell
