#!/usr/bin/env python3
"""Claude Code Status Line - Python Version
Dual Display: raw message % + estimated total % (with system overhead)
"""

import json
import math
import os
import subprocess
import sys
from datetime import datetime, timedelta

SYSTEM_OVERHEAD = 30000  # tools, CLAUDE.md, MCP configs
MAX_PATH_LEN = 40


def ps_round(value, digits=0):
    """PowerShell [math]::Round uses banker's rounding, same as Python round()."""
    return round(value, digits) if digits else round(value)


def format_tokens(tokens):
    if tokens >= 1000:
        return f"{math.floor(tokens / 1000)}K"
    return str(tokens)


def format_duration(ms):
    seconds = math.floor(ms / 1000)
    minutes = math.floor(seconds / 60)
    hours = math.floor(minutes / 60)
    if hours > 0:
        return f"{hours}h {minutes % 60}m"
    if minutes > 0:
        return f"{minutes}m"
    return f"{seconds}s"


def format_time(dt):
    hour = dt.hour % 12 or 12
    return f"{hour}:{dt.minute:02d} {'AM' if dt.hour < 12 else 'PM'}"


def git_branch(cwd):
    if not os.path.isdir(cwd):
        return ""
    try:
        result = subprocess.run(
            ["git", "branch", "--show-current"],
            cwd=cwd,
            capture_output=True,
            text=True,
            timeout=2,
        )
        if result.returncode == 0:
            return result.stdout.strip()
    except (OSError, subprocess.SubprocessError):
        pass
    return ""


def main():
    input_json = sys.stdin.read()

    if not input_json.strip():
        sys.stdout.write("[!] No input")
        return 0

    try:
        data = json.loads(input_json)
    except ValueError:
        sys.stdout.write("[!] JSON error")
        return 0

    model = data.get("model", {}).get("display_name") or "Claude"
    context_window = data.get("context_window") or {}
    context_size = context_window.get("context_window_size")
    context_size = int(context_size) if context_size is not None else 200000

    usage = context_window.get("current_usage") or {}
    data_available = False
    tokens_used = 0
    raw_percent = 0

    if usage.get("input_tokens") is not None:
        tokens_used = (
            int(usage.get("input_tokens") or 0)
            + int(usage.get("cache_creation_input_tokens") or 0)
            + int(usage.get("cache_read_input_tokens") or 0)
        )
        raw_percent = ps_round((tokens_used / context_size) * 100, 1)
        data_available = True
    elif context_window.get("used_percentage") is not None:
        raw_percent = float(context_window["used_percentage"])
        tokens_used = math.floor((raw_percent / 100) * context_size)
        data_available = True

    total_tokens_estimate = tokens_used + SYSTEM_OVERHEAD
    total_percent = min(100, ps_round((total_tokens_estimate / context_size) * 100))

    duration_ms = int((data.get("cost") or {}).get("total_duration_ms") or 0)
    cwd = (data.get("workspace") or {}).get("current_dir") or data.get("cwd") or "unknown"

    tokens_display = format_tokens(tokens_used)
    context_size_display = format_tokens(context_size)

    esc = "\x1b"
    reset = f"{esc}[0m"
    bold = f"{esc}[1m"
    dim = f"{esc}[2m"
    purple = f"{esc}[38;5;135m"
    yellow = f"{esc}[38;5;220m"
    red = f"{esc}[38;5;196m"
    green = f"{esc}[38;5;114m"
    blue = f"{esc}[38;5;117m"
    cyan = f"{esc}[38;5;87m"
    white = f"{esc}[38;5;255m"

    raw_int = math.floor(raw_percent)
    total_int = math.floor(total_percent)

    if total_int >= 80:
        bar_color = red
    elif total_int >= 60:
        bar_color = yellow
    else:
        bar_color = purple

    filled = min(10, math.floor(total_int / 10))
    bar = "▓" * filled + "░" * (10 - filled)

    branch = git_branch(cwd)

    if len(cwd) > MAX_PATH_LEN:
        path_display = "..." + cwd[-MAX_PATH_LEN:]
    else:
        path_display = cwd

    duration_display = format_duration(duration_ms)
    now = datetime.now()
    start_time = now - timedelta(milliseconds=duration_ms)
    start_time_display = format_time(start_time)
    current_datetime = f"{now.strftime('%b')} {now.day} {format_time(now)}"

    sep = " · "

    output = f"{bold}{white}[{model}]{reset}"

    if data_available:
        output += f" {bar_color}{bar}{reset}"
        output += f" {dim}{raw_int}%{reset}"
        output += f" {bar_color}~{total_int}%{reset}"
        output += f" {dim}({tokens_display}/{context_size_display}){reset}"
    else:
        output += f" {dim}[waiting for first response...]{reset}"

    if branch:
        output += f"{sep}{green}@ {branch}{reset}"
    output += f"{sep}{blue}{path_display}{reset}"
    output += f"{sep}{cyan}{duration_display} (since {start_time_display}){reset}"
    output += f"{sep}{purple}{current_datetime}{reset}"

    sys.stdout.write(output)
    return 0


if __name__ == "__main__":
    sys.exit(main())
