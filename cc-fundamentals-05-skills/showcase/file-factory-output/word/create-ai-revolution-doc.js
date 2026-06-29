const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, LevelFormat,
        BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber,
        PageBreak, UnderlineType } = require('docx');
const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════════════════
// AI REVOLUTION - 10X EXTREME WORD DOCUMENT
// Pushing Word to its ABSOLUTE LIMITS - No empty space, maximum density
// ═══════════════════════════════════════════════════════════════════════════════

// Futuristic AI Color Palette
const C = {
    neonBlue: "00D4FF",
    electricPurple: "8B5CF6",
    cyberPink: "EC4899",
    matrixGreen: "10B981",
    deepBlack: "0A0A0F",
    cosmicBlue: "1E3A8A",
    orangeGlow: "F97316",
    gold: "FBBF24",
    silver: "94A3B8",
    white: "FFFFFF",
    darkPurple: "4C1D95",
    teal: "14B8A6",
    crimson: "DC2626",
};

// Border helpers
const border = (color = "333333", size = 1) => ({ style: BorderStyle.SINGLE, size, color });
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const cellB = { top: border(), bottom: border(), left: border(), right: border() };
const thickB = (c) => ({ top: border(c, 3), bottom: border(c, 3), left: border(c, 3), right: border(c, 3) });
const glowB = (c) => ({ top: border(c, 4), bottom: border(c, 4), left: border(c, 4), right: border(c, 4) });

// Load ALL images
const aiBrain = fs.readFileSync('./images/ai-brain.jpg');
const aiRobot = fs.readFileSync('./images/ai-robot.jpg');
const aiNetwork = fs.readFileSync('./images/ai-network.jpg');
const aiFuturistic = fs.readFileSync('./images/ai-futuristic.jpg');
const aiChip = fs.readFileSync('./images/ai-chip.jpg');
const chatbot = fs.readFileSync('./images/chatbot.jpg');
const automation = fs.readFileSync('./images/automation.jpg');
const neuralNetwork = fs.readFileSync('./images/neural-network.jpg');
const codeScreen = fs.readFileSync('./images/code-screen.jpg');

// ═══════════════════════════════════════════════════════════════════════════════
const doc = new Document({
    styles: {
        default: { document: { run: { font: "Segoe UI", size: 20 } } },
        paragraphStyles: [
            { id: "CyberTitle", name: "Cyber Title", basedOn: "Normal",
              run: { size: 80, bold: true, color: C.neonBlue, font: "Impact" },
              paragraph: { spacing: { before: 0, after: 0 }, alignment: AlignmentType.CENTER } },
            { id: "NeonHeader", name: "Neon Header", basedOn: "Normal",
              run: { size: 36, bold: true, color: C.electricPurple, font: "Arial Black" },
              paragraph: { spacing: { before: 200, after: 100 } } },
            { id: "GlowText", name: "Glow Text", basedOn: "Normal",
              run: { size: 24, bold: true, color: C.matrixGreen, font: "Consolas" },
              paragraph: { spacing: { before: 50, after: 50 } } },
            { id: "DataStream", name: "Data Stream", basedOn: "Normal",
              run: { size: 16, color: C.neonBlue, font: "Courier New" },
              paragraph: { spacing: { before: 20, after: 20 } } },
            { id: "CyberQuote", name: "Cyber Quote", basedOn: "Normal",
              run: { size: 22, italics: true, color: C.cyberPink, font: "Georgia" },
              paragraph: { spacing: { before: 100, after: 100 }, alignment: AlignmentType.CENTER } },
        ]
    },
    numbering: {
        config: [
            { reference: "cyber-bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "⚡", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 400, hanging: 200 } } } }] },
            { reference: "matrix-bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "◆", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 400, hanging: 200 } } } }] },
            { reference: "ai-steps", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 400, hanging: 200 } }, run: { bold: true, color: C.neonBlue } } }] },
            { reference: "neural-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "●", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 400, hanging: 200 } } } }] },
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
                    shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                    children: [
                        new TextRun({ text: "◈ ", color: C.neonBlue, size: 16 }),
                        new TextRun({ text: "ARTIFICIAL INTELLIGENCE REVOLUTION", bold: true, size: 16, color: C.neonBlue }),
                        new TextRun({ text: " ◈ ", color: C.cyberPink, size: 16 }),
                        new TextRun({ text: "2026 EDITION", size: 16, color: C.matrixGreen }),
                        new TextRun({ text: " ◈", color: C.neonBlue, size: 16 }),
                    ]
                })]
            })
        },
        footers: {
            default: new Footer({
                children: [new Paragraph({
                    alignment: AlignmentType.CENTER,
                    shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                    children: [
                        new TextRun({ text: "[ ", color: C.silver }),
                        new TextRun({ text: "PAGE ", size: 14, color: C.neonBlue }),
                        new TextRun({ children: [PageNumber.CURRENT], size: 14, bold: true, color: C.cyberPink }),
                        new TextRun({ text: " / ", size: 14, color: C.silver }),
                        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 14, bold: true, color: C.matrixGreen }),
                        new TextRun({ text: " ]", color: C.silver }),
                        new TextRun({ text: "  ◆  ", color: C.electricPurple }),
                        new TextRun({ text: "CLASSIFIED: LEVEL 5 ACCESS", size: 12, color: C.crimson, bold: true }),
                    ]
                })]
            })
        },
        children: [
            // ═══════════════════════════════════════════════════════════════════
            // PAGE 1: CYBERPUNK TITLE + DENSE INTRO - FILL EVERY INCH
            // ═══════════════════════════════════════════════════════════════════

            // Top decorative border
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.neonBlue), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER,
                            children: [new TextRun({ text: "◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈", size: 18, color: C.neonBlue })] })]
                    })
                ]})]
            }),

            // Main Title Block
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.electricPurple), shading: { fill: "0F0F1A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 },
                                children: [new TextRun({ text: "「 ARTIFICIAL INTELLIGENCE 」", size: 56, bold: true, color: C.neonBlue, font: "Impact" })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER,
                                children: [new TextRun({ text: "R E V O L U T I O N", size: 72, bold: true, color: C.cyberPink, font: "Impact" })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
                                children: [
                                    new TextRun({ text: "━━━━━━━━━━ ", color: C.matrixGreen }),
                                    new TextRun({ text: "THE FUTURE IS NOW", size: 24, bold: true, color: C.gold }),
                                    new TextRun({ text: " ━━━━━━━━━━", color: C.matrixGreen })
                                ] })
                        ]
                    })
                ]})]
            }),

            // Stats row - 6 columns
            new Table({
                columnWidths: [1700, 1700, 1700, 1700, 1700, 1700],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🧠", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$184B", bold: true, size: 24, color: C.neonBlue })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Market 2026", size: 14, color: C.silver })] })
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "⚡", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "37%", bold: true, size: 24, color: C.matrixGreen })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "YoY Growth", size: 14, color: C.silver })] })
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🤖", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "500M+", bold: true, size: 24, color: C.cyberPink })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Daily Users", size: 14, color: C.silver })] })
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "📊", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "10T+", bold: true, size: 24, color: C.electricPurple })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Parameters", size: 14, color: C.silver })] })
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🌍", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "195", bold: true, size: 24, color: C.teal })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Countries", size: 14, color: C.silver })] })
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🔬", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1M+", bold: true, size: 24, color: C.orangeGlow })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Research Papers", size: 14, color: C.silver })] })
                        ] }),
                ]})]
            }),

            // Two images side by side + content
            new Table({
                columnWidths: [3400, 3400, 3400],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.neonBlue), shading: { fill: "0A0A12", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: aiBrain, transformation: { width: 200, height: 130 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NEURAL ARCHITECTURE", bold: true, size: 16, color: C.neonBlue })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 }, children: [new TextRun({ text: "Deep Learning Systems", size: 14, color: C.silver })] })
                        ] }),
                    new TableCell({ borders: thickB(C.cyberPink), shading: { fill: "0A0A12", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: aiRobot, transformation: { width: 200, height: 130 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ROBOTICS & AUTOMATION", bold: true, size: 16, color: C.cyberPink })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 }, children: [new TextRun({ text: "Physical AI Integration", size: 14, color: C.silver })] })
                        ] }),
                    new TableCell({ borders: thickB(C.matrixGreen), shading: { fill: "0A0A12", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: aiNetwork, transformation: { width: 200, height: 130 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GLOBAL NETWORK", bold: true, size: 16, color: C.matrixGreen })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 }, children: [new TextRun({ text: "Connected Intelligence", size: 14, color: C.silver })] })
                        ] }),
                ]})]
            }),

            // Key technologies grid - 3 columns dense
            new Table({
                columnWidths: [3400, 3400, 3400],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: "1A1A2E", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "◆ MACHINE LEARNING", bold: true, size: 18, color: C.neonBlue })] }),
                            new Paragraph({ numbering: { reference: "neural-list", level: 0 }, children: [new TextRun({ text: "Supervised Learning", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "neural-list", level: 0 }, children: [new TextRun({ text: "Unsupervised Learning", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "neural-list", level: 0 }, children: [new TextRun({ text: "Reinforcement Learning", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "neural-list", level: 0 }, children: [new TextRun({ text: "Transfer Learning", size: 14, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "1A1A2E", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "◆ NEURAL NETWORKS", bold: true, size: 18, color: C.cyberPink })] }),
                            new Paragraph({ numbering: { reference: "neural-list", level: 0 }, children: [new TextRun({ text: "Transformers (GPT, BERT)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "neural-list", level: 0 }, children: [new TextRun({ text: "CNN (Computer Vision)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "neural-list", level: 0 }, children: [new TextRun({ text: "RNN/LSTM (Sequences)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "neural-list", level: 0 }, children: [new TextRun({ text: "GANs (Generation)", size: 14, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "1A1A2E", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "◆ APPLICATIONS", bold: true, size: 18, color: C.matrixGreen })] }),
                            new Paragraph({ numbering: { reference: "neural-list", level: 0 }, children: [new TextRun({ text: "Natural Language (NLP)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "neural-list", level: 0 }, children: [new TextRun({ text: "Computer Vision", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "neural-list", level: 0 }, children: [new TextRun({ text: "Speech Recognition", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "neural-list", level: 0 }, children: [new TextRun({ text: "Autonomous Systems", size: 14, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // Timeline bar
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.electricPurple), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 50 },
                            children: [
                                new TextRun({ text: "1956 ─────── ", color: C.silver, size: 14 }),
                                new TextRun({ text: "AI BORN", color: C.neonBlue, size: 14, bold: true }),
                                new TextRun({ text: " ─── 1997 ─── ", color: C.silver, size: 14 }),
                                new TextRun({ text: "DEEP BLUE", color: C.cyberPink, size: 14, bold: true }),
                                new TextRun({ text: " ─── 2012 ─── ", color: C.silver, size: 14 }),
                                new TextRun({ text: "DEEP LEARNING", color: C.matrixGreen, size: 14, bold: true }),
                                new TextRun({ text: " ─── 2022 ─── ", color: C.silver, size: 14 }),
                                new TextRun({ text: "ChatGPT", color: C.electricPurple, size: 14, bold: true }),
                                new TextRun({ text: " ─── 2026 ─── ", color: C.silver, size: 14 }),
                                new TextRun({ text: "AGI ERA", color: C.gold, size: 14, bold: true }),
                            ] })]
                    })
                ]})]
            }),

            // Quote + More content
            new Table({
                columnWidths: [5100, 5100],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: "0F0F1A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new TextRun({ text: "「 VISIONARY QUOTE 」", bold: true, size: 18, color: C.gold })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER,
                                children: [new TextRun({ text: "\"AI is the new electricity. Just as electricity transformed industries 100 years ago, AI will now transform every major industry.\"", italics: true, size: 16, color: C.cyberPink })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 },
                                children: [new TextRun({ text: "— Andrew Ng, AI Pioneer", size: 14, color: C.silver })] })
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "0F0F1A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ spacing: { before: 50 }, children: [new TextRun({ text: "⚡ KEY BREAKTHROUGHS 2025-2026:", bold: true, size: 16, color: C.orangeGlow })] }),
                            new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Multimodal AI (text + image + audio + video)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Real-time reasoning chains", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Agentic AI workflows", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, spacing: { after: 50 }, children: [new TextRun({ text: "10T+ parameter models", size: 14, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // Bottom cyber border
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.cyberPink), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER,
                            children: [new TextRun({ text: "◈◈◈ CONTINUE TO NEXT PAGE FOR DEEP DIVE ◈◈◈", size: 16, color: C.cyberPink, bold: true })] })]
                    })
                ]})]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 2: AI MODELS COMPARISON - ULTRA DENSE DATA
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            // Page header
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.electricPurple), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 50 },
                            children: [
                                new TextRun({ text: "◆◆◆ ", color: C.neonBlue }),
                                new TextRun({ text: "FOUNDATION MODELS COMPARISON", size: 32, bold: true, color: C.electricPurple }),
                                new TextRun({ text: " ◆◆◆", color: C.neonBlue })
                            ] })]
                    })
                ]})]
            }),

            // Main comparison table - 7 columns
            new Table({
                columnWidths: [1800, 1200, 1200, 1200, 1200, 1800, 1800],
                rows: [
                    // Header
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MODEL", bold: true, color: C.gold, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PARAMS", bold: true, color: C.gold, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CONTEXT", bold: true, color: C.gold, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "SPEED", bold: true, color: C.gold, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "COST", bold: true, color: C.gold, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BEST FOR", bold: true, color: C.gold, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "RATING", bold: true, color: C.gold, size: 16 })] })] }),
                    ]}),
                    // GPT-4o
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1E1E2E", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "🟢 GPT-4o", bold: true, color: C.matrixGreen, size: 16 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1.8T", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "128K", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "0F2F0F", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "FAST", bold: true, color: C.matrixGreen, size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$$$", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Multimodal, Code", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "2D1F0F", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "★★★★★", color: C.gold, size: 16 })] })] }),
                    ]}),
                    // Claude 3 Opus
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1E1E2E", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "🟣 Claude Opus", bold: true, color: C.electricPurple, size: 16 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2.0T+", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "200K", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MED", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$$$$", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Reasoning, Analysis", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "2D1F0F", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "★★★★★", color: C.gold, size: 16 })] })] }),
                    ]}),
                    // Gemini Ultra
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1E1E2E", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "🔵 Gemini Ultra", bold: true, color: C.neonBlue, size: 16 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1.5T", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1M", size: 14, bold: true, color: C.neonBlue })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MED", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$$$", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Long Context, Search", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "2D1F0F", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "★★★★☆", color: C.gold, size: 16 })] })] }),
                    ]}),
                    // Llama 3
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1E1E2E", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "🦙 Llama 3 405B", bold: true, color: C.orangeGlow, size: 16 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "405B", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "128K", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MED", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "0F2F0F", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "FREE", bold: true, color: C.matrixGreen, size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Open Source, Custom", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "2D1F0F", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "★★★★☆", color: C.gold, size: 16 })] })] }),
                    ]}),
                    // Mistral
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1E1E2E", type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "🌬️ Mistral Large", bold: true, color: C.teal, size: 16 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "123B", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "32K", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "0F2F0F", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "FAST", bold: true, color: C.matrixGreen, size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$$", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Europe, Efficiency", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "2D1F0F", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "★★★★☆", color: C.gold, size: 16 })] })] }),
                    ]}),
                ]
            }),

            // Two images + capabilities
            new Table({
                columnWidths: [5100, 5100],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.neonBlue), shading: { fill: "0A0A12", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: aiFuturistic, transformation: { width: 280, height: 160 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NEXT-GEN AI INTERFACES", bold: true, size: 18, color: C.neonBlue })] }),
                            new Paragraph({ numbering: { reference: "cyber-bullets", level: 0 }, children: [new TextRun({ text: "Voice + Vision + Touch Integration", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "cyber-bullets", level: 0 }, children: [new TextRun({ text: "Holographic Displays", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "cyber-bullets", level: 0 }, spacing: { after: 50 }, children: [new TextRun({ text: "Neural Link Prototypes", size: 14, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.cyberPink), shading: { fill: "0A0A12", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: aiChip, transformation: { width: 280, height: 160 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AI HARDWARE EVOLUTION", bold: true, size: 18, color: C.cyberPink })] }),
                            new Paragraph({ numbering: { reference: "cyber-bullets", level: 0 }, children: [new TextRun({ text: "NVIDIA H200 (4x faster than H100)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "cyber-bullets", level: 0 }, children: [new TextRun({ text: "AMD MI350X Competitor", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "cyber-bullets", level: 0 }, spacing: { after: 50 }, children: [new TextRun({ text: "Custom TPU v6 by Google", size: 14, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // Benchmark scores table
            new Table({
                columnWidths: [2040, 2040, 2040, 2040, 2040],
                rows: [
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BENCHMARK", bold: true, color: C.gold, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GPT-4o", bold: true, color: C.matrixGreen, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Claude", bold: true, color: C.electricPurple, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Gemini", bold: true, color: C.neonBlue, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Llama3", bold: true, color: C.orangeGlow, size: 16 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "MMLU (Knowledge)", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "0F2F0F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "92.3%", bold: true, color: C.matrixGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "91.8%" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "90.4%" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "88.6%" })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "HumanEval (Code)", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "91.0%" })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "1F0F2F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "92.1%", bold: true, color: C.electricPurple })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "85.3%" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "84.1%" })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "GSM8K (Math)", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "95.4%" })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "1F0F2F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "96.2%", bold: true, color: C.electricPurple })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "94.8%" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "93.2%" })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "GPQA (Science)", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "53.6%" })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "1F0F2F", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "59.4%", bold: true, color: C.electricPurple })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "52.1%" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "48.3%" })] })] }),
                    ]}),
                ]
            }),

            // Company logos/info
            new Table({
                columnWidths: [2550, 2550, 2550, 2550],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.matrixGreen), shading: { fill: "0A150A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "OPENAI", bold: true, size: 20, color: C.matrixGreen })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "San Francisco, CA", size: 12, color: C.silver })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$157B Valuation", size: 14, color: C.gold })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GPT Series • DALL-E • Sora", size: 12, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.electricPurple), shading: { fill: "0F0A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ANTHROPIC", bold: true, size: 20, color: C.electricPurple })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "San Francisco, CA", size: 12, color: C.silver })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$61B Valuation", size: 14, color: C.gold })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Claude Series • Constitutional AI", size: 12, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.neonBlue), shading: { fill: "0A0A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GOOGLE", bold: true, size: 20, color: C.neonBlue })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Mountain View, CA", size: 12, color: C.silver })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$2.2T Market Cap", size: 14, color: C.gold })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Gemini • TPU • DeepMind", size: 12, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.orangeGlow), shading: { fill: "150A0A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "META", bold: true, size: 20, color: C.orangeGlow })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Menlo Park, CA", size: 12, color: C.silver })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$1.5T Market Cap", size: 14, color: C.gold })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Llama (Open) • FAIR Research", size: 12, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 3: AI APPLICATIONS MATRIX - ULTRA PACKED
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.matrixGreen), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 50 },
                            children: [
                                new TextRun({ text: "⚡⚡⚡ ", color: C.matrixGreen }),
                                new TextRun({ text: "AI APPLICATIONS ACROSS INDUSTRIES", size: 32, bold: true, color: C.matrixGreen }),
                                new TextRun({ text: " ⚡⚡⚡", color: C.matrixGreen })
                            ] })]
                    })
                ]})]
            }),

            // Industry grid - 3x2
            new Table({
                columnWidths: [3400, 3400, 3400],
                rows: [
                    new TableRow({ children: [
                        new TableCell({ borders: thickB(C.neonBlue), shading: { fill: "0A0A15", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ children: [new TextRun({ text: "🏥 HEALTHCARE", bold: true, size: 20, color: C.neonBlue })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Medical Imaging Analysis", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Drug Discovery (50x faster)", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Personalized Treatment Plans", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Surgical Robotics", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Mental Health Chatbots", size: 14, color: C.white })] }),
                                new Paragraph({ children: [new TextRun({ text: "Market: $188B by 2030", size: 12, bold: true, color: C.gold })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.cyberPink), shading: { fill: "150A10", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ children: [new TextRun({ text: "💰 FINANCE", bold: true, size: 20, color: C.cyberPink })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Algorithmic Trading", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Fraud Detection (99.9%)", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Risk Assessment Models", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Credit Scoring AI", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Robo-Advisors", size: 14, color: C.white })] }),
                                new Paragraph({ children: [new TextRun({ text: "Market: $130B by 2030", size: 12, bold: true, color: C.gold })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.matrixGreen), shading: { fill: "0A150A", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ children: [new TextRun({ text: "🚗 AUTOMOTIVE", bold: true, size: 20, color: C.matrixGreen })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Autonomous Driving L4+", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Predictive Maintenance", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Smart Traffic Systems", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "In-Car AI Assistants", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Manufacturing Robots", size: 14, color: C.white })] }),
                                new Paragraph({ children: [new TextRun({ text: "Market: $75B by 2030", size: 12, bold: true, color: C.gold })] }),
                            ] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: thickB(C.orangeGlow), shading: { fill: "150A05", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ children: [new TextRun({ text: "🎓 EDUCATION", bold: true, size: 20, color: C.orangeGlow })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Personalized Learning Paths", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "AI Tutors (24/7)", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Automated Grading", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Language Learning", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Content Generation", size: 14, color: C.white })] }),
                                new Paragraph({ children: [new TextRun({ text: "Market: $32B by 2030", size: 12, bold: true, color: C.gold })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.electricPurple), shading: { fill: "100A15", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ children: [new TextRun({ text: "🛒 E-COMMERCE", bold: true, size: 20, color: C.electricPurple })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Recommendation Engines", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Dynamic Pricing", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Visual Search", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Inventory Optimization", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Customer Service Bots", size: 14, color: C.white })] }),
                                new Paragraph({ children: [new TextRun({ text: "Market: $45B by 2030", size: 12, bold: true, color: C.gold })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.teal), shading: { fill: "0A1510", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ children: [new TextRun({ text: "🎨 CREATIVE", bold: true, size: 20, color: C.teal })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Image Generation (DALL-E)", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Video Synthesis (Sora)", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Music Composition", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "3D Model Generation", size: 14, color: C.white })] }),
                                new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Game Asset Creation", size: 14, color: C.white })] }),
                                new Paragraph({ children: [new TextRun({ text: "Market: $110B by 2030", size: 12, bold: true, color: C.gold })] }),
                            ] }),
                    ]}),
                ]
            }),

            // Two images
            new Table({
                columnWidths: [5100, 5100],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: "0F0F15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: chatbot, transformation: { width: 280, height: 160 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CONVERSATIONAL AI", bold: true, size: 18, color: C.cyberPink })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Natural language interfaces transforming human-computer interaction", size: 14, color: C.silver })] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "0F0F15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: automation, transformation: { width: 280, height: 160 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AUTOMATION SYSTEMS", bold: true, size: 18, color: C.matrixGreen })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Physical robots and software automation working together", size: 14, color: C.silver })] }),
                        ] }),
                ]})]
            }),

            // Stats grid
            new Table({
                columnWidths: [2550, 2550, 2550, 2550],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.crimson), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "85%", size: 36, bold: true, color: C.crimson })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "of enterprises will use AI by 2027", size: 12, color: C.silver })] }),
                        ] }),
                    new TableCell({ borders: glowB(C.gold), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$15.7T", size: 36, bold: true, color: C.gold })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AI contribution to global economy by 2030", size: 12, color: C.silver })] }),
                        ] }),
                    new TableCell({ borders: glowB(C.neonBlue), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "97M", size: 36, bold: true, color: C.neonBlue })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "new jobs created by AI by 2030", size: 12, color: C.silver })] }),
                        ] }),
                    new TableCell({ borders: glowB(C.matrixGreen), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "40%", size: 36, bold: true, color: C.matrixGreen })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "productivity boost from AI tools", size: 12, color: C.silver })] }),
                        ] }),
                ]})]
            }),

            // Adoption timeline
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: "0A0A10", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AI ADOPTION TIMELINE BY SECTOR", bold: true, size: 18, color: C.gold })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [
                                    new TextRun({ text: "TECH ", color: C.matrixGreen, size: 14 }),
                                    new TextRun({ text: "██████████", color: C.matrixGreen, size: 14 }),
                                    new TextRun({ text: " 95% │ ", color: C.silver, size: 14 }),
                                    new TextRun({ text: "FINANCE ", color: C.cyberPink, size: 14 }),
                                    new TextRun({ text: "████████░░", color: C.cyberPink, size: 14 }),
                                    new TextRun({ text: " 78% │ ", color: C.silver, size: 14 }),
                                    new TextRun({ text: "HEALTH ", color: C.neonBlue, size: 14 }),
                                    new TextRun({ text: "███████░░░", color: C.neonBlue, size: 14 }),
                                    new TextRun({ text: " 67%", color: C.silver, size: 14 }),
                                ] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 },
                                children: [
                                    new TextRun({ text: "RETAIL ", color: C.orangeGlow, size: 14 }),
                                    new TextRun({ text: "██████░░░░", color: C.orangeGlow, size: 14 }),
                                    new TextRun({ text: " 62% │ ", color: C.silver, size: 14 }),
                                    new TextRun({ text: "MANUFAC ", color: C.teal, size: 14 }),
                                    new TextRun({ text: "█████░░░░░", color: C.teal, size: 14 }),
                                    new TextRun({ text: " 54% │ ", color: C.silver, size: 14 }),
                                    new TextRun({ text: "EDU ", color: C.electricPurple, size: 14 }),
                                    new TextRun({ text: "████░░░░░░", color: C.electricPurple, size: 14 }),
                                    new TextRun({ text: " 41%", color: C.silver, size: 14 }),
                                ] }),
                        ] })
                ]})]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 4: AI ETHICS & SAFETY - DENSE INFORMATION
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.crimson), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 50 },
                            children: [
                                new TextRun({ text: "⚠️ ", size: 28 }),
                                new TextRun({ text: "AI ETHICS, SAFETY & GOVERNANCE", size: 32, bold: true, color: C.crimson }),
                                new TextRun({ text: " ⚠️", size: 28 })
                            ] })]
                    })
                ]})]
            }),

            // Risk assessment matrix
            new Table({
                columnWidths: [2550, 2550, 2550, 2550],
                rows: [
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "RISK CATEGORY", bold: true, color: C.gold, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "SEVERITY", bold: true, color: C.gold, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MITIGATION", bold: true, color: C.gold, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "STATUS", bold: true, color: C.gold, size: 16 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "🔴 Misinformation", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "2F0A0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CRITICAL", bold: true, color: C.crimson })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Watermarking, Detection", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "2F2F0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "IN PROGRESS", color: C.gold })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "🟠 Job Displacement", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "2F1F0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HIGH", bold: true, color: C.orangeGlow })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Reskilling Programs", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "2F2F0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "IN PROGRESS", color: C.gold })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "🟡 Bias & Fairness", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "2F2F0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MEDIUM", bold: true, color: C.gold })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Diverse Training Data", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "0A2F0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "IMPROVING", color: C.matrixGreen })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "🟢 Privacy Concerns", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "2F2F0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MEDIUM", bold: true, color: C.gold })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Federated Learning", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "0A2F0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "DEPLOYED", color: C.matrixGreen })] })] }),
                    ]}),
                ]
            }),

            // Two column: Regulations + Safety research
            new Table({
                columnWidths: [5100, 5100],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.neonBlue), shading: { fill: "0A0A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🌍 GLOBAL AI REGULATIONS", bold: true, size: 20, color: C.neonBlue })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "EU AI Act (2024) - Risk-based framework", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "US Executive Order 14110 (2023)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "China AI Governance (2023)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "UK AI Safety Summit Framework", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "G7 Hiroshima AI Process", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "UN AI Advisory Body Recommendations", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "ISO/IEC 42001 AI Management System", size: 14, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.electricPurple), shading: { fill: "100A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🔬 AI SAFETY RESEARCH", bold: true, size: 20, color: C.electricPurple })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Alignment Research - MIRI, Redwood", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Constitutional AI (Anthropic)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "RLHF Improvements (OpenAI)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Interpretability Research (DeepMind)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Red Teaming & Adversarial Testing", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "AI Control Problem Research", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Value Learning & Preference Models", size: 14, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // Image + Responsible AI principles
            new Table({
                columnWidths: [4000, 6200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: "0F0F15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: neuralNetwork, transformation: { width: 220, height: 180 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 },
                                children: [new TextRun({ text: "Neural Network Visualization", size: 14, italics: true, color: C.silver })] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "0A0A10", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "✨ RESPONSIBLE AI PRINCIPLES", bold: true, size: 20, color: C.gold })] }),
                            new Paragraph({ numbering: { reference: "ai-steps", level: 0 }, children: [new TextRun({ text: "Transparency - Explainable decisions", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "ai-steps", level: 0 }, children: [new TextRun({ text: "Fairness - Equal treatment across groups", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "ai-steps", level: 0 }, children: [new TextRun({ text: "Privacy - Data protection by design", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "ai-steps", level: 0 }, children: [new TextRun({ text: "Safety - Robust error handling", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "ai-steps", level: 0 }, children: [new TextRun({ text: "Accountability - Clear ownership", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "ai-steps", level: 0 }, children: [new TextRun({ text: "Human Oversight - Human in the loop", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "ai-steps", level: 0 }, children: [new TextRun({ text: "Beneficence - Net positive impact", size: 14, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // Key organizations grid
            new Table({
                columnWidths: [2040, 2040, 2040, 2040, 2040],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: "0A0A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🏛️", size: 24 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NIST", bold: true, size: 16, color: C.neonBlue })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AI Risk Framework", size: 12, color: C.silver })] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "0A0A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🔬", size: 24 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AISI", bold: true, size: 16, color: C.cyberPink })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "UK AI Safety", size: 12, color: C.silver })] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "0A0A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🌐", size: 24 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "OECD", bold: true, size: 16, color: C.matrixGreen })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AI Principles", size: 12, color: C.silver })] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "0A0A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🤝", size: 24 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PAI", bold: true, size: 16, color: C.orangeGlow })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Partnership on AI", size: 12, color: C.silver })] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "0A0A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🎓", size: 24 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CAIS", bold: true, size: 16, color: C.electricPurple })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Center for AI Safety", size: 12, color: C.silver })] }),
                        ] }),
                ]})]
            }),

            // Warning quote
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.crimson), shading: { fill: "1A0A0A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new TextRun({ text: "\"The development of full artificial intelligence could spell the end of the human race... or it could be the best thing that ever happened to us. We just don't know.\"", italics: true, size: 18, color: C.cyberPink })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 },
                                children: [new TextRun({ text: "— Stephen Hawking, Theoretical Physicist", size: 14, color: C.silver })] }),
                        ] })
                ]})]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 5: FUTURE OF AI - MAXIMUM DENSITY
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.gold), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 50 },
                            children: [
                                new TextRun({ text: "🚀 ", size: 28 }),
                                new TextRun({ text: "THE FUTURE: 2027-2035 AND BEYOND", size: 32, bold: true, color: C.gold }),
                                new TextRun({ text: " 🚀", size: 28 })
                            ] })]
                    })
                ]})]
            }),

            // Future timeline
            new Table({
                columnWidths: [2040, 2040, 2040, 2040, 2040],
                rows: [
                    new TableRow({ children: [
                        new TableCell({ borders: thickB(C.neonBlue), shading: { fill: "0A0A15", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2027", bold: true, size: 24, color: C.neonBlue })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AGI Prototypes", size: 14, color: C.white })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "100T params", size: 12, color: C.silver })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.cyberPink), shading: { fill: "150A10", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2028", bold: true, size: 24, color: C.cyberPink })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AI Scientists", size: 14, color: C.white })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Self-improving", size: 12, color: C.silver })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.matrixGreen), shading: { fill: "0A150A", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2030", bold: true, size: 24, color: C.matrixGreen })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Human-Level AI", size: 14, color: C.white })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Most tasks", size: 12, color: C.silver })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.electricPurple), shading: { fill: "100A15", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2032", bold: true, size: 24, color: C.electricPurple })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Quantum AI", size: 14, color: C.white })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Hybrid systems", size: 12, color: C.silver })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.gold), shading: { fill: "151005", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2035+", bold: true, size: 24, color: C.gold })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Superintelligence?", size: 14, color: C.white })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Unknown territory", size: 12, color: C.silver })] }),
                            ] }),
                    ]}),
                ]
            }),

            // Two column future predictions
            new Table({
                columnWidths: [5100, 5100],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: "0A150A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🌟 OPTIMISTIC SCENARIOS", bold: true, size: 20, color: C.matrixGreen })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Cure for all diseases through AI drug discovery", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Clean energy breakthroughs via AI materials science", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Universal basic income funded by AI productivity", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Personalized education for all 8 billion humans", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Space exploration and colonization accelerated", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Scientific discoveries at 1000x current rate", size: 14, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: "1A0A0A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "⚠️ CHALLENGES TO ADDRESS", bold: true, size: 20, color: C.crimson })] }),
                            new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Power concentration in few AI labs", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Autonomous weapons development", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Mass surveillance capabilities", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Economic disruption during transition", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "AI alignment with human values", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "arrow-list", level: 0 }, children: [new TextRun({ text: "Digital divide between nations", size: 14, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // Final image + conclusion
            new Table({
                columnWidths: [6000, 4200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.electricPurple), shading: { fill: "0A0A12", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: codeScreen, transformation: { width: 340, height: 180 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "THE CODE THAT SHAPES TOMORROW", bold: true, size: 18, color: C.electricPurple })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 },
                                children: [new TextRun({ text: "Every line of AI code written today influences the trajectory of human civilization", size: 14, italics: true, color: C.silver })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.gold), shading: { fill: "0F0F05", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "💡 KEY TAKEAWAYS", bold: true, size: 20, color: C.gold })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "AI is advancing exponentially", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Safety must match capabilities", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Governance is playing catch-up", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Everyone must participate", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "The future is being written NOW", size: 14, color: C.gold, bold: true })] }),
                        ] }),
                ]})]
            }),

            // Final stats
            new Table({
                columnWidths: [3400, 3400, 3400],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.neonBlue), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "COMPUTE GROWTH", bold: true, size: 16, color: C.neonBlue })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "10x", size: 48, bold: true, color: C.neonBlue })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "every 18 months", size: 14, color: C.silver })] }),
                        ] }),
                    new TableCell({ borders: glowB(C.cyberPink), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "INVESTMENT", bold: true, size: 16, color: C.cyberPink })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$200B+", size: 48, bold: true, color: C.cyberPink })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "annually by 2027", size: 14, color: C.silver })] }),
                        ] }),
                    new TableCell({ borders: glowB(C.matrixGreen), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AI RESEARCHERS", bold: true, size: 16, color: C.matrixGreen })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "500K+", size: 48, bold: true, color: C.matrixGreen })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "worldwide", size: 14, color: C.silver })] }),
                        ] }),
                ]})]
            }),

            // Final cyber border
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.gold), shading: { fill: C.deepBlack, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new TextRun({ text: "「 THE AI REVOLUTION IS NOT COMING. IT IS HERE. 」", size: 24, bold: true, color: C.gold })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 },
                                children: [
                                    new TextRun({ text: "◈◈◈ ", color: C.neonBlue }),
                                    new TextRun({ text: "ARTIFICIAL INTELLIGENCE REVOLUTION © 2026", size: 14, color: C.silver }),
                                    new TextRun({ text: " ◈◈◈", color: C.cyberPink }),
                                ] }),
                        ] })
                ]})]
            }),
        ]
    }]
});

Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync('AI_Revolution_ULTRA_EXTREME.docx', buffer);
    console.log('✅ AI Revolution ULTRA EXTREME document created!');
}).catch(err => console.error('Error:', err));
