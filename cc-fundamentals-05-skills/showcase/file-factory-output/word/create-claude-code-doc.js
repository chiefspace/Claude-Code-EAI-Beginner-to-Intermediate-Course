const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, LevelFormat,
        BorderStyle, WidthType, ShadingType, PageNumber,
        PageBreak } = require('docx');
const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════════════════
// CLAUDE CODE MASTERY - 10X EXTREME WORD DOCUMENT
// Complete guide to Anthropic's AI-powered coding assistant
// ═══════════════════════════════════════════════════════════════════════════════

// Anthropic/Claude Color Palette
const C = {
    claudeOrange: "D97706",     // Claude's signature orange
    anthropicBrown: "78350F",   // Anthropic brown
    warmCream: "FEF3C7",        // Warm cream
    deepPurple: "6B21A8",       // Deep purple
    teal: "0D9488",             // Teal accent
    slate: "334155",            // Slate gray
    darkBg: "1C1917",           // Dark background
    lightBg: "FAFAF9",          // Light background
    codeGreen: "22C55E",        // Code green
    errorRed: "EF4444",         // Error red
    warningYellow: "EAB308",    // Warning yellow
    linkBlue: "3B82F6",         // Link blue
    terminalGreen: "4ADE80",    // Terminal green
    white: "FFFFFF",
};

const border = (color = "E5E7EB", size = 1) => ({ style: BorderStyle.SINGLE, size, color });
const cellB = { top: border(), bottom: border(), left: border(), right: border() };
const thickB = (c) => ({ top: border(c, 3), bottom: border(c, 3), left: border(c, 3), right: border(c, 3) });
const glowB = (c) => ({ top: border(c, 4), bottom: border(c, 4), left: border(c, 4), right: border(c, 4) });

// Load images
const codingTerminal = fs.readFileSync('./images/coding-terminal.jpg');
const codeScreen = fs.readFileSync('./images/code-screen.jpg');
const developer = fs.readFileSync('./images/developer.jpg');
const aiNetwork = fs.readFileSync('./images/ai-network.jpg');

const doc = new Document({
    styles: {
        default: { document: { run: { font: "Segoe UI", size: 20 } } },
        paragraphStyles: [
            { id: "ClaudeTitle", name: "Claude Title", basedOn: "Normal",
              run: { size: 72, bold: true, color: C.claudeOrange, font: "Arial Black" },
              paragraph: { spacing: { before: 0, after: 0 }, alignment: AlignmentType.CENTER } },
            { id: "TerminalText", name: "Terminal Text", basedOn: "Normal",
              run: { size: 18, color: C.terminalGreen, font: "Consolas" },
              paragraph: { spacing: { before: 20, after: 20 } } },
            { id: "CodeBlock", name: "Code Block", basedOn: "Normal",
              run: { size: 16, color: C.codeGreen, font: "Courier New" },
              paragraph: { spacing: { before: 50, after: 50 } } },
        ]
    },
    numbering: {
        config: [
            { reference: "terminal-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "$", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 400, hanging: 200 } } } }] },
            { reference: "feature-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "◆", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 400, hanging: 200 } } } }] },
            { reference: "step-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 400, hanging: 200 } }, run: { bold: true, color: C.claudeOrange } } }] },
            { reference: "check-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "✓", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 400, hanging: 200 } } } }] },
            { reference: "arrow-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "→", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 400, hanging: 200 } } } }] },
            { reference: "star-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "★", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 400, hanging: 200 } } } }] },
        ]
    },
    sections: [{
        properties: { page: { margin: { top: 400, right: 400, bottom: 400, left: 400 } } },
        headers: {
            default: new Header({
                children: [new Paragraph({
                    alignment: AlignmentType.CENTER,
                    shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                    children: [
                        new TextRun({ text: "◈ ", color: C.claudeOrange, size: 16 }),
                        new TextRun({ text: "CLAUDE CODE MASTERY GUIDE", bold: true, size: 16, color: C.claudeOrange }),
                        new TextRun({ text: " ◈ ", color: C.teal, size: 16 }),
                        new TextRun({ text: "BY ANTHROPIC", size: 16, color: C.warmCream }),
                        new TextRun({ text: " ◈", color: C.claudeOrange, size: 16 }),
                    ]
                })]
            })
        },
        footers: {
            default: new Footer({
                children: [new Paragraph({
                    alignment: AlignmentType.CENTER,
                    shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                    children: [
                        new TextRun({ text: "[ Page ", size: 14, color: C.warmCream }),
                        new TextRun({ children: [PageNumber.CURRENT], size: 14, bold: true, color: C.claudeOrange }),
                        new TextRun({ text: " / ", size: 14, color: C.warmCream }),
                        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 14, bold: true, color: C.teal }),
                        new TextRun({ text: " ]  ◆  claude.ai/code", size: 14, color: C.warmCream }),
                    ]
                })]
            })
        },
        children: [
            // ═══════════════════════════════════════════════════════════════════
            // PAGE 1: TITLE + OVERVIEW - PACKED
            // ═══════════════════════════════════════════════════════════════════

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.claudeOrange), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER,
                            children: [new TextRun({ text: "◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈", size: 16, color: C.claudeOrange })] })]
                    })
                ]})]
            }),

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.claudeOrange), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 },
                                children: [new TextRun({ text: "CLAUDE CODE", size: 80, bold: true, color: C.claudeOrange, font: "Impact" })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER,
                                children: [new TextRun({ text: "MASTERY GUIDE", size: 56, bold: true, color: C.warmCream, font: "Impact" })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
                                children: [
                                    new TextRun({ text: "━━━ ", color: C.teal }),
                                    new TextRun({ text: "ANTHROPIC'S AI-POWERED CODING ASSISTANT", size: 22, color: C.teal }),
                                    new TextRun({ text: " ━━━", color: C.teal })
                                ] })
                        ]
                    })
                ]})]
            }),

            // Quick stats
            new Table({
                columnWidths: [2040, 2040, 2040, 2040, 2040],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: C.anthropicBrown, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "⌨️", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CLI-FIRST", bold: true, size: 18, color: C.warmCream })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Terminal Native", size: 12, color: C.white })] })
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: C.anthropicBrown, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🤖", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AGENTIC", bold: true, size: 18, color: C.warmCream })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Autonomous Tasks", size: 12, color: C.white })] })
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: C.anthropicBrown, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🔧", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MCP", bold: true, size: 18, color: C.warmCream })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tool Integration", size: 12, color: C.white })] })
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: C.anthropicBrown, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "📁", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "FULL ACCESS", bold: true, size: 18, color: C.warmCream })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Read/Write/Execute", size: 12, color: C.white })] })
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: C.anthropicBrown, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🧠", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "OPUS 4", bold: true, size: 18, color: C.warmCream })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Latest Model", size: 12, color: C.white })] })
                        ] }),
                ]})]
            }),

            // Two column: Image + What is Claude Code
            new Table({
                columnWidths: [4500, 5700],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.teal), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: codingTerminal, transformation: { width: 260, height: 170 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 },
                                children: [new TextRun({ text: "Terminal-first AI coding experience", size: 14, italics: true, color: C.warmCream })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.claudeOrange), shading: { fill: "1A1A1A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "⚡ WHAT IS CLAUDE CODE?", bold: true, size: 22, color: C.claudeOrange })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "AI assistant that lives in your terminal", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Understands your entire codebase context", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Reads, writes, and executes code autonomously", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Runs shell commands, git operations, builds", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Integrates with MCP servers for extended tools", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Supports hooks for custom workflows", size: 14, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // Installation & Quick Start
            new Table({
                columnWidths: [5100, 5100],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: "0D1117", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "📦 INSTALLATION", bold: true, size: 20, color: C.codeGreen })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR }, spacing: { before: 50 },
                                children: [new TextRun({ text: "# Install via npm (recommended)", size: 14, color: C.terminalGreen, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "npm install -g @anthropic-ai/claude-code", size: 14, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR }, spacing: { before: 50 },
                                children: [new TextRun({ text: "# Or via Homebrew (macOS)", size: 14, color: C.terminalGreen, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "brew install claude-code", size: 14, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR }, spacing: { before: 50 },
                                children: [new TextRun({ text: "# Verify installation", size: 14, color: C.terminalGreen, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "claude --version", size: 14, color: C.white, font: "Consolas" })] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "0D1117", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🚀 QUICK START", bold: true, size: 20, color: C.claudeOrange })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR }, spacing: { before: 50 },
                                children: [new TextRun({ text: "# Start Claude Code in current directory", size: 14, color: C.terminalGreen, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "claude", size: 14, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR }, spacing: { before: 50 },
                                children: [new TextRun({ text: "# Start with a specific prompt", size: 14, color: C.terminalGreen, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "claude \"fix the bug in auth.ts\"", size: 14, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR }, spacing: { before: 50 },
                                children: [new TextRun({ text: "# Resume previous session", size: 14, color: C.terminalGreen, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "claude --continue", size: 14, color: C.white, font: "Consolas" })] }),
                        ] }),
                ]})]
            }),

            // Core capabilities grid
            new Table({
                columnWidths: [3400, 3400, 3400],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.codeGreen), shading: { fill: "0A150A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "📄 FILE OPERATIONS", bold: true, size: 18, color: C.codeGreen })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Read any file in codebase", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Write new files from scratch", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Edit existing files precisely", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Glob search for patterns", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Grep for code content", size: 14, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.claudeOrange), shading: { fill: "150A05", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "⚙️ SHELL COMMANDS", bold: true, size: 18, color: C.claudeOrange })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Run any bash command", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Git operations (commit, push)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Build & test projects", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Install dependencies", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Background processes", size: 14, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.teal), shading: { fill: "0A1510", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🌐 WEB & TOOLS", bold: true, size: 18, color: C.teal })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "WebFetch for URLs", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "WebSearch for queries", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "MCP server integration", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Browser automation", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "API interactions", size: 14, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 2: SLASH COMMANDS - COMPREHENSIVE
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.deepPurple), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 50 },
                            children: [
                                new TextRun({ text: "⌨️ ", size: 28 }),
                                new TextRun({ text: "SLASH COMMANDS & KEYBOARD SHORTCUTS", size: 28, bold: true, color: C.deepPurple }),
                                new TextRun({ text: " ⌨️", size: 28 })
                            ] })]
                    })
                ]})]
            }),

            // Built-in commands table
            new Table({
                columnWidths: [2200, 4000, 4000],
                rows: [
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "COMMAND", bold: true, color: C.claudeOrange, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "DESCRIPTION", bold: true, color: C.claudeOrange, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "EXAMPLE", bold: true, color: C.claudeOrange, size: 16 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1A1A1A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/help", bold: true, color: C.codeGreen, font: "Consolas" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Show all available commands and usage", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "161B22", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/help", size: 14, font: "Consolas", color: C.terminalGreen })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1A1A1A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/clear", bold: true, color: C.codeGreen, font: "Consolas" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Clear conversation history and context", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "161B22", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/clear", size: 14, font: "Consolas", color: C.terminalGreen })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1A1A1A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/compact", bold: true, color: C.codeGreen, font: "Consolas" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Summarize conversation to save context", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "161B22", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/compact", size: 14, font: "Consolas", color: C.terminalGreen })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1A1A1A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/config", bold: true, color: C.codeGreen, font: "Consolas" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Open configuration settings", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "161B22", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/config", size: 14, font: "Consolas", color: C.terminalGreen })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1A1A1A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/cost", bold: true, color: C.codeGreen, font: "Consolas" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Show token usage and estimated costs", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "161B22", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/cost", size: 14, font: "Consolas", color: C.terminalGreen })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1A1A1A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/doctor", bold: true, color: C.codeGreen, font: "Consolas" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Run diagnostics and health checks", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "161B22", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/doctor", size: 14, font: "Consolas", color: C.terminalGreen })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1A1A1A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/init", bold: true, color: C.codeGreen, font: "Consolas" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Initialize CLAUDE.md for your project", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "161B22", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/init", size: 14, font: "Consolas", color: C.terminalGreen })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1A1A1A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/model", bold: true, color: C.codeGreen, font: "Consolas" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Switch between Claude models (opus, sonnet, haiku)", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "161B22", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/model opus", size: 14, font: "Consolas", color: C.terminalGreen })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1A1A1A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/permissions", bold: true, color: C.codeGreen, font: "Consolas" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "View/modify tool permissions", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "161B22", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/permissions", size: 14, font: "Consolas", color: C.terminalGreen })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1A1A1A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/review", bold: true, color: C.codeGreen, font: "Consolas" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Review code changes before applying", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "161B22", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "/review", size: 14, font: "Consolas", color: C.terminalGreen })] })] }),
                    ]}),
                ]
            }),

            // Keyboard shortcuts
            new Table({
                columnWidths: [5100, 5100],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.teal), shading: { fill: "0A1510", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "⌨️ KEYBOARD SHORTCUTS", bold: true, size: 20, color: C.teal })] }),
                            new Paragraph({ children: [
                                new TextRun({ text: "Ctrl+C", bold: true, color: C.warningYellow, font: "Consolas", size: 14 }),
                                new TextRun({ text: " - Cancel current operation", size: 14, color: C.white })
                            ] }),
                            new Paragraph({ children: [
                                new TextRun({ text: "Ctrl+D", bold: true, color: C.warningYellow, font: "Consolas", size: 14 }),
                                new TextRun({ text: " - Exit Claude Code", size: 14, color: C.white })
                            ] }),
                            new Paragraph({ children: [
                                new TextRun({ text: "Escape", bold: true, color: C.warningYellow, font: "Consolas", size: 14 }),
                                new TextRun({ text: " - Cancel multi-line input", size: 14, color: C.white })
                            ] }),
                            new Paragraph({ children: [
                                new TextRun({ text: "Tab", bold: true, color: C.warningYellow, font: "Consolas", size: 14 }),
                                new TextRun({ text: " - Autocomplete commands", size: 14, color: C.white })
                            ] }),
                            new Paragraph({ children: [
                                new TextRun({ text: "Up/Down", bold: true, color: C.warningYellow, font: "Consolas", size: 14 }),
                                new TextRun({ text: " - Navigate history", size: 14, color: C.white })
                            ] }),
                        ] }),
                    new TableCell({ borders: thickB(C.deepPurple), shading: { fill: "100A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🎯 TOOL APPROVAL", bold: true, size: 20, color: C.deepPurple })] }),
                            new Paragraph({ children: [
                                new TextRun({ text: "y", bold: true, color: C.codeGreen, font: "Consolas", size: 14 }),
                                new TextRun({ text: " - Yes, approve this tool use", size: 14, color: C.white })
                            ] }),
                            new Paragraph({ children: [
                                new TextRun({ text: "n", bold: true, color: C.errorRed, font: "Consolas", size: 14 }),
                                new TextRun({ text: " - No, reject this tool use", size: 14, color: C.white })
                            ] }),
                            new Paragraph({ children: [
                                new TextRun({ text: "a", bold: true, color: C.claudeOrange, font: "Consolas", size: 14 }),
                                new TextRun({ text: " - Always allow this tool", size: 14, color: C.white })
                            ] }),
                            new Paragraph({ children: [
                                new TextRun({ text: "e", bold: true, color: C.linkBlue, font: "Consolas", size: 14 }),
                                new TextRun({ text: " - Edit tool input before running", size: 14, color: C.white })
                            ] }),
                            new Paragraph({ children: [
                                new TextRun({ text: "?", bold: true, color: C.warningYellow, font: "Consolas", size: 14 }),
                                new TextRun({ text: " - Show more details about tool", size: 14, color: C.white })
                            ] }),
                        ] }),
                ]})]
            }),

            // Developer image
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: developer, transformation: { width: 500, height: 200 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 },
                                children: [new TextRun({ text: "Empowering developers with AI-assisted coding workflows", size: 16, italics: true, color: C.warmCream })] }),
                        ] })
                ]})]
            }),

            // Custom skills/commands
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.claudeOrange), shading: { fill: "1A1005", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "📜 CUSTOM SKILLS (User-Defined Commands)", bold: true, size: 20, color: C.claudeOrange })] }),
                            new Paragraph({ spacing: { before: 50 },
                                children: [new TextRun({ text: "Create custom skills in ", size: 14, color: C.white }),
                                           new TextRun({ text: "~/.claude/commands/", size: 14, color: C.codeGreen, font: "Consolas" }),
                                           new TextRun({ text: " or ", size: 14, color: C.white }),
                                           new TextRun({ text: ".claude/commands/", size: 14, color: C.codeGreen, font: "Consolas" })] }),
                            new Paragraph({ children: [
                                new TextRun({ text: "/commit", bold: true, color: C.teal, font: "Consolas" }),
                                new TextRun({ text: " - Generate git commit with conventional format  |  ", size: 14, color: C.white }),
                                new TextRun({ text: "/review-pr", bold: true, color: C.teal, font: "Consolas" }),
                                new TextRun({ text: " - Review pull request code", size: 14, color: C.white })
                            ] }),
                            new Paragraph({ children: [
                                new TextRun({ text: "/test", bold: true, color: C.teal, font: "Consolas" }),
                                new TextRun({ text: " - Run project tests  |  ", size: 14, color: C.white }),
                                new TextRun({ text: "/build", bold: true, color: C.teal, font: "Consolas" }),
                                new TextRun({ text: " - Build the project  |  ", size: 14, color: C.white }),
                                new TextRun({ text: "/deploy", bold: true, color: C.teal, font: "Consolas" }),
                                new TextRun({ text: " - Deploy to production", size: 14, color: C.white })
                            ] }),
                        ] })
                ]})]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 3: MCP SERVERS & TOOLS
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.linkBlue), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 50 },
                            children: [
                                new TextRun({ text: "🔧 ", size: 28 }),
                                new TextRun({ text: "MCP SERVERS & TOOL ECOSYSTEM", size: 28, bold: true, color: C.linkBlue }),
                                new TextRun({ text: " 🔧", size: 28 })
                            ] })]
                    })
                ]})]
            }),

            // MCP explanation
            new Table({
                columnWidths: [5100, 5100],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: "0A0A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🌐 WHAT IS MCP?", bold: true, size: 20, color: C.linkBlue })] }),
                            new Paragraph({ children: [new TextRun({ text: "Model Context Protocol (MCP) is an open standard that allows AI assistants to connect to external tools, data sources, and services.", size: 14, color: C.white })] }),
                            new Paragraph({ spacing: { before: 50 }, numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Extend Claude's capabilities", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Access databases, APIs, services", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Custom integrations for your workflow", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Secure, local execution", size: 14, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "0D1117", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "📋 CONFIGURE MCP", bold: true, size: 20, color: C.codeGreen })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR }, spacing: { before: 50 },
                                children: [new TextRun({ text: "// ~/.claude/settings.json", size: 12, color: C.terminalGreen, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "{", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "  \"mcpServers\": {", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "    \"my-server\": {", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "      \"command\": \"node\",", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "      \"args\": [\"server.js\"]", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "    }", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "  }", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "}", size: 12, color: C.white, font: "Consolas" })] }),
                        ] }),
                ]})]
            }),

            // Popular MCP servers grid
            new Table({
                columnWidths: [3400, 3400, 3400],
                rows: [
                    new TableRow({ children: [
                        new TableCell({ borders: thickB(C.codeGreen), shading: { fill: "0A150A", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ children: [new TextRun({ text: "🗄️ DATABASE", bold: true, size: 18, color: C.codeGreen })] }),
                                new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "PostgreSQL MCP", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "SQLite MCP", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "MongoDB MCP", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Redis MCP", size: 14, color: C.white })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.claudeOrange), shading: { fill: "150A05", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ children: [new TextRun({ text: "🌐 WEB & API", bold: true, size: 18, color: C.claudeOrange })] }),
                                new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Puppeteer (Browser)", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Fetch MCP", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "GitHub MCP", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Slack MCP", size: 14, color: C.white })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.deepPurple), shading: { fill: "100A15", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ children: [new TextRun({ text: "📂 FILES & MEMORY", bold: true, size: 18, color: C.deepPurple })] }),
                                new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Filesystem MCP", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Memory MCP", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Search MCP (Grep)", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Google Drive MCP", size: 14, color: C.white })] }),
                            ] }),
                    ]}),
                ]
            }),

            // Built-in tools table
            new Table({
                columnWidths: [2200, 3500, 4500],
                rows: [
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "TOOL", bold: true, color: C.claudeOrange, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "PURPOSE", bold: true, color: C.claudeOrange, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "USAGE", bold: true, color: C.claudeOrange, size: 16 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Read", bold: true, color: C.codeGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Read file contents", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Reads any file, supports images/PDFs", size: 14 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Write", bold: true, color: C.codeGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Create new files", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Creates files with specified content", size: 14 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Edit", bold: true, color: C.codeGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Modify existing files", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Precise string replacement in files", size: 14 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Bash", bold: true, color: C.codeGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Run shell commands", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Execute any bash command with timeout", size: 14 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Glob", bold: true, color: C.codeGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Find files by pattern", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Pattern matching: **/*.ts, src/**", size: 14 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Grep", bold: true, color: C.codeGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Search file contents", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Regex search across codebase", size: 14 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Task", bold: true, color: C.codeGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Launch subagents", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Spawn specialized agents for tasks", size: 14 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "WebFetch", bold: true, color: C.codeGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Fetch web content", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Retrieve and analyze web pages", size: 14 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "TodoWrite", bold: true, color: C.codeGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Task management", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Track multi-step task progress", size: 14 })] })] }),
                    ]}),
                ]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 4: HOOKS & AUTOMATION
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.warningYellow), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 50 },
                            children: [
                                new TextRun({ text: "⚙️ ", size: 28 }),
                                new TextRun({ text: "HOOKS, AUTOMATION & WORKFLOWS", size: 28, bold: true, color: C.warningYellow }),
                                new TextRun({ text: " ⚙️", size: 28 })
                            ] })]
                    })
                ]})]
            }),

            // Hooks explanation
            new Table({
                columnWidths: [5100, 5100],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.warningYellow), shading: { fill: "151005", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🪝 WHAT ARE HOOKS?", bold: true, size: 20, color: C.warningYellow })] }),
                            new Paragraph({ children: [new TextRun({ text: "Hooks are shell commands that execute at specific points in Claude Code's lifecycle.", size: 14, color: C.white })] }),
                            new Paragraph({ spacing: { before: 50 }, numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "PreToolUse - Before a tool runs", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "PostToolUse - After a tool completes", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Notification - On important events", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Stop - When session ends", size: 14, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.codeGreen), shading: { fill: "0D1117", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "📋 HOOK CONFIGURATION", bold: true, size: 20, color: C.codeGreen })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR }, spacing: { before: 50 },
                                children: [new TextRun({ text: "// settings.json hooks section", size: 12, color: C.terminalGreen, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "\"hooks\": {", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "  \"PreToolUse\": [{", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "    \"matcher\": \"Bash\",", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "    \"hooks\": [\"./validate.sh\"]", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "  }]", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "}", size: 12, color: C.white, font: "Consolas" })] }),
                        ] }),
                ]})]
            }),

            // Use cases grid
            new Table({
                columnWidths: [3400, 3400, 3400],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: "0A150A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "✅ VALIDATION HOOKS", bold: true, size: 16, color: C.codeGreen })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Lint code before write", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Type check on edit", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Security scan bash", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Validate git commits", size: 13, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "150A05", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🔔 NOTIFICATION HOOKS", bold: true, size: 16, color: C.claudeOrange })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Slack on completion", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Email on error", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Desktop notifications", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Log to file", size: 13, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "100A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🔄 AUTOMATION HOOKS", bold: true, size: 16, color: C.deepPurple })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Auto-format on save", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Run tests after edit", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Sync to cloud", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Update docs", size: 13, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // CLAUDE.md section
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.claudeOrange), shading: { fill: "1A1005", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "📝 CLAUDE.md - PROJECT CONFIGURATION", bold: true, size: 22, color: C.claudeOrange })] }),
                            new Paragraph({ spacing: { before: 50 },
                                children: [new TextRun({ text: "Create a CLAUDE.md file in your project root to give Claude context about your codebase:", size: 14, color: C.white })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR }, spacing: { before: 50 },
                                children: [new TextRun({ text: "# My Project\n## Architecture\n- Frontend: React + TypeScript\n- Backend: Node.js + Express\n## Important Files\n- src/main.ts - Entry point\n- src/api/ - API routes\n## Commands\n- npm run dev - Start dev server\n- npm test - Run tests", size: 12, color: C.terminalGreen, font: "Consolas" })] }),
                        ] })
                ]})]
            }),

            // Workflow image
            new Table({
                columnWidths: [5100, 5100],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: codeScreen, transformation: { width: 280, height: 160 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 },
                                children: [new TextRun({ text: "Code-first development workflow", size: 14, italics: true, color: C.warmCream })] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "0A0A10", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "💡 BEST PRACTICES", bold: true, size: 20, color: C.teal })] }),
                            new Paragraph({ numbering: { reference: "step-list", level: 0 }, children: [new TextRun({ text: "Start with /init for new projects", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "step-list", level: 0 }, children: [new TextRun({ text: "Keep CLAUDE.md updated", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "step-list", level: 0 }, children: [new TextRun({ text: "Use /compact for long sessions", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "step-list", level: 0 }, children: [new TextRun({ text: "Review tool outputs carefully", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "step-list", level: 0 }, children: [new TextRun({ text: "Set up hooks for your workflow", size: 14, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 5: ADVANCED FEATURES & TIPS
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.deepPurple), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 50 },
                            children: [
                                new TextRun({ text: "🚀 ", size: 28 }),
                                new TextRun({ text: "ADVANCED FEATURES & PRO TIPS", size: 28, bold: true, color: C.deepPurple }),
                                new TextRun({ text: " 🚀", size: 28 })
                            ] })]
                    })
                ]})]
            }),

            // Advanced features grid
            new Table({
                columnWidths: [5100, 5100],
                rows: [
                    new TableRow({ children: [
                        new TableCell({ borders: thickB(C.teal), shading: { fill: "0A1510", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ children: [new TextRun({ text: "🤖 AGENTIC MODE", bold: true, size: 20, color: C.teal })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Claude works autonomously on complex tasks", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Spawns subagents for parallel work", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Plans multi-step implementations", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Uses TodoWrite to track progress", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Handles errors and retries", size: 14, color: C.white })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.claudeOrange), shading: { fill: "150A05", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ children: [new TextRun({ text: "📊 CONTEXT MANAGEMENT", bold: true, size: 20, color: C.claudeOrange })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "200K+ token context window", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Automatic summarization when needed", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "/compact preserves key info", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Session continuity with --continue", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "/cost shows token usage", size: 14, color: C.white })] }),
                            ] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: thickB(C.linkBlue), shading: { fill: "0A0A15", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ children: [new TextRun({ text: "🔐 SECURITY & PERMISSIONS", bold: true, size: 20, color: C.linkBlue })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Sandboxed by default", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Per-tool approval system", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Allowlist/blocklist patterns", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Never stores API keys", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Local execution only", size: 14, color: C.white })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.codeGreen), shading: { fill: "0A150A", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ children: [new TextRun({ text: "🎯 MODEL SELECTION", bold: true, size: 20, color: C.codeGreen })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Claude Opus 4 - Most capable", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Claude Sonnet 4 - Balanced", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Claude Haiku - Fast & cheap", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "/model opus to switch", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Subagents can use different models", size: 14, color: C.white })] }),
                            ] }),
                    ]}),
                ]
            }),

            // Pro tips
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.warningYellow), shading: { fill: "151005", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "⭐ PRO TIPS FROM POWER USERS", bold: true, size: 22, color: C.warningYellow })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [
                                new TextRun({ text: "Be specific: ", bold: true, color: C.claudeOrange, size: 14 }),
                                new TextRun({ text: "\"Fix the auth bug in login.ts line 42\" > \"fix the bug\"", size: 14, color: C.white })
                            ] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [
                                new TextRun({ text: "Give context: ", bold: true, color: C.claudeOrange, size: 14 }),
                                new TextRun({ text: "Share error messages, logs, and expected behavior", size: 14, color: C.white })
                            ] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [
                                new TextRun({ text: "Use CLAUDE.md: ", bold: true, color: C.claudeOrange, size: 14 }),
                                new TextRun({ text: "Document your project architecture for better suggestions", size: 14, color: C.white })
                            ] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [
                                new TextRun({ text: "Trust but verify: ", bold: true, color: C.claudeOrange, size: 14 }),
                                new TextRun({ text: "Review diffs before accepting, especially for sensitive code", size: 14, color: C.white })
                            ] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [
                                new TextRun({ text: "Iterate: ", bold: true, color: C.claudeOrange, size: 14 }),
                                new TextRun({ text: "Start simple, refine with follow-up prompts", size: 14, color: C.white })
                            ] }),
                        ] })
                ]})]
            }),

            // Final stats
            new Table({
                columnWidths: [2550, 2550, 2550, 2550],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.claudeOrange), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "200K+", size: 36, bold: true, color: C.claudeOrange })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Token Context", size: 14, color: C.warmCream })] }),
                        ] }),
                    new TableCell({ borders: glowB(C.teal), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "50+", size: 36, bold: true, color: C.teal })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Built-in Tools", size: 14, color: C.warmCream })] }),
                        ] }),
                    new TableCell({ borders: glowB(C.codeGreen), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "∞", size: 36, bold: true, color: C.codeGreen })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MCP Extensions", size: 14, color: C.warmCream })] }),
                        ] }),
                    new TableCell({ borders: glowB(C.deepPurple), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "24/7", size: 36, bold: true, color: C.deepPurple })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AI Assistance", size: 14, color: C.warmCream })] }),
                        ] }),
                ]})]
            }),

            // Final footer
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.claudeOrange), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new TextRun({ text: "「 CODE SMARTER, NOT HARDER 」", size: 24, bold: true, color: C.claudeOrange })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 },
                                children: [
                                    new TextRun({ text: "◈◈◈ ", color: C.teal }),
                                    new TextRun({ text: "CLAUDE CODE MASTERY GUIDE © 2026 ANTHROPIC", size: 14, color: C.warmCream }),
                                    new TextRun({ text: " ◈◈◈", color: C.teal }),
                                ] }),
                        ] })
                ]})]
            }),
        ]
    }]
});

Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync('Claude_Code_Mastery_ULTRA_EXTREME.docx', buffer);
    console.log('✅ Claude Code Mastery ULTRA EXTREME document created!');
}).catch(err => console.error('Error:', err));
