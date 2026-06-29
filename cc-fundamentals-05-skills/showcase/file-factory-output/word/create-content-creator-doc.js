const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, PageOrientation, LevelFormat,
        HeadingLevel, BorderStyle, WidthType, TabStopType,
        TabStopPosition, UnderlineType, ShadingType, VerticalAlign, PageNumber,
        PageBreak, TableLayoutType } = require('docx');
const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT CREATOR COMMAND CENTER - EXTREME WORD DOCUMENT SHOWCASE
// ═══════════════════════════════════════════════════════════════════════════════

// Color Palette - Vibrant Creator Theme
const COLORS = {
    primary: "FF0000",      // YouTube Red
    secondary: "00A8FF",    // Electric Blue
    accent: "9B59B6",       // Royal Purple
    gold: "FFD700",         // Gold
    dark: "1A1A2E",         // Dark Navy
    light: "F8F9FA",        // Off White
    success: "00D26A",      // Neon Green
    warning: "FF6B35",      // Coral Orange
};

// Border helper
const createBorder = (color = "CCCCCC", size = 1) => ({
    style: BorderStyle.SINGLE, size, color
});

const cellBorders = {
    top: createBorder(), bottom: createBorder(),
    left: createBorder(), right: createBorder()
};

const accentBorders = {
    top: createBorder(COLORS.primary, 2),
    bottom: createBorder(COLORS.primary, 2),
    left: createBorder(COLORS.primary, 2),
    right: createBorder(COLORS.primary, 2)
};

// Load images
const contentCreatorImg = fs.readFileSync('./images/content-creator.jpg');
const studioImg = fs.readFileSync('./images/studio.jpg');

// ═══════════════════════════════════════════════════════════════════════════════
// DOCUMENT CREATION
// ═══════════════════════════════════════════════════════════════════════════════

const doc = new Document({
    styles: {
        default: {
            document: {
                run: { font: "Arial", size: 22 }
            }
        },
        paragraphStyles: [
            // Epic Title Style
            { id: "EpicTitle", name: "Epic Title", basedOn: "Normal",
              run: { size: 72, bold: true, color: COLORS.primary, font: "Impact" },
              paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER }
            },
            // Subtitle Style
            { id: "Subtitle", name: "Subtitle", basedOn: "Normal",
              run: { size: 32, italics: true, color: COLORS.dark, font: "Georgia" },
              paragraph: { spacing: { before: 100, after: 400 }, alignment: AlignmentType.CENTER }
            },
            // Section Header
            { id: "SectionHeader", name: "Section Header", basedOn: "Normal",
              run: { size: 36, bold: true, color: COLORS.secondary, font: "Arial Black" },
              paragraph: { spacing: { before: 400, after: 200 }, alignment: AlignmentType.LEFT }
            },
            // Callout Box
            { id: "Callout", name: "Callout", basedOn: "Normal",
              run: { size: 24, bold: true, color: COLORS.accent, font: "Verdana" },
              paragraph: { spacing: { before: 200, after: 200 }, alignment: AlignmentType.CENTER }
            },
            // Code Style
            { id: "CodeBlock", name: "Code Block", basedOn: "Normal",
              run: { size: 20, font: "Courier New", color: COLORS.success },
              paragraph: { spacing: { before: 100, after: 100 } }
            },
            // Quote Style
            { id: "QuoteStyle", name: "Quote Style", basedOn: "Normal",
              run: { size: 28, italics: true, color: COLORS.dark, font: "Times New Roman" },
              paragraph: { spacing: { before: 300, after: 300 }, alignment: AlignmentType.CENTER,
                          indent: { left: 720, right: 720 } }
            },
            // Stats Number
            { id: "StatsNumber", name: "Stats Number", basedOn: "Normal",
              run: { size: 56, bold: true, color: COLORS.primary, font: "Impact" },
              paragraph: { spacing: { before: 0, after: 0 }, alignment: AlignmentType.CENTER }
            },
            // Caption Style
            { id: "Caption", name: "Caption", basedOn: "Normal",
              run: { size: 18, italics: true, color: "666666", font: "Georgia" },
              paragraph: { spacing: { before: 100, after: 200 }, alignment: AlignmentType.CENTER }
            },
        ]
    },
    numbering: {
        config: [
            { reference: "content-bullets",
              levels: [{ level: 0, format: LevelFormat.BULLET, text: "►", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
            },
            { reference: "star-bullets",
              levels: [{ level: 0, format: LevelFormat.BULLET, text: "★", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
            },
            { reference: "check-bullets",
              levels: [{ level: 0, format: LevelFormat.BULLET, text: "✓", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
            },
            { reference: "numbered-steps",
              levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } },
                        run: { bold: true, color: COLORS.primary } } }]
            },
            { reference: "platform-list",
              levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1)", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
            },
        ]
    },
    sections: [{
        properties: {
            page: {
                margin: { top: 720, right: 720, bottom: 720, left: 720 },
            }
        },
        headers: {
            default: new Header({
                children: [new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                        new TextRun({ text: "CONTENT CREATOR COMMAND CENTER", bold: true, size: 18, color: COLORS.primary }),
                        new TextRun({ text: "  |  ", color: "CCCCCC" }),
                        new TextRun({ text: "2026 EDITION", italics: true, size: 18, color: COLORS.secondary }),
                    ]
                })]
            })
        },
        footers: {
            default: new Footer({
                children: [new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({ text: "★ ", color: COLORS.gold }),
                        new TextRun({ text: "Page ", size: 18 }),
                        new TextRun({ children: [PageNumber.CURRENT], size: 18, bold: true }),
                        new TextRun({ text: " of ", size: 18 }),
                        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, bold: true }),
                        new TextRun({ text: " ★", color: COLORS.gold }),
                    ]
                })]
            })
        },
        children: [
            // ═══════════════════════════════════════════════════════════════════
            // PAGE 1: EPIC TITLE PAGE
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ spacing: { before: 600 }, children: [] }),

            // Decorative line
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "═══════════════════════════════════════", color: COLORS.primary, size: 28 })]
            }),

            // Main Title
            new Paragraph({
                style: "EpicTitle",
                children: [new TextRun({ text: "CONTENT CREATOR", color: COLORS.primary })]
            }),
            new Paragraph({
                style: "EpicTitle",
                spacing: { before: 0 },
                children: [new TextRun({ text: "COMMAND CENTER", color: COLORS.secondary })]
            }),

            // Decorative line
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "═══════════════════════════════════════", color: COLORS.primary, size: 28 })]
            }),

            // Subtitle
            new Paragraph({
                style: "Subtitle",
                children: [new TextRun({ text: "The Ultimate Guide to Building Your Digital Empire" })]
            }),

            // Hero Image
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 400 },
                children: [new ImageRun({
                    type: "jpg",
                    data: contentCreatorImg,
                    transformation: { width: 400, height: 250 }
                })]
            }),
            new Paragraph({
                style: "Caption",
                children: [new TextRun({ text: "Your journey to content creation mastery starts here" })]
            }),

            // Feature boxes as table
            new Paragraph({ spacing: { before: 400 }, children: [] }),
            new Table({
                columnWidths: [3120, 3120, 3120],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                borders: accentBorders,
                                shading: { fill: "FFF5F5", type: ShadingType.CLEAR },
                                width: { size: 3120, type: WidthType.DXA },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 },
                                        children: [new TextRun({ text: "▶", size: 48, color: COLORS.primary })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER,
                                        children: [new TextRun({ text: "VIDEO", bold: true, size: 24, color: COLORS.dark })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
                                        children: [new TextRun({ text: "Production", size: 20, color: "666666" })] })
                                ]
                            }),
                            new TableCell({
                                borders: accentBorders,
                                shading: { fill: "F0F8FF", type: ShadingType.CLEAR },
                                width: { size: 3120, type: WidthType.DXA },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 },
                                        children: [new TextRun({ text: "📊", size: 48 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER,
                                        children: [new TextRun({ text: "ANALYTICS", bold: true, size: 24, color: COLORS.dark })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
                                        children: [new TextRun({ text: "Mastery", size: 20, color: "666666" })] })
                                ]
                            }),
                            new TableCell({
                                borders: accentBorders,
                                shading: { fill: "F5F0FF", type: ShadingType.CLEAR },
                                width: { size: 3120, type: WidthType.DXA },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 },
                                        children: [new TextRun({ text: "💰", size: 48 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER,
                                        children: [new TextRun({ text: "MONETIZE", bold: true, size: 24, color: COLORS.dark })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
                                        children: [new TextRun({ text: "Everything", size: 20, color: "666666" })] })
                                ]
                            }),
                        ]
                    })
                ]
            }),

            // Version info
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 600 },
                children: [
                    new TextRun({ text: "VERSION 3.0  •  ", size: 20, color: COLORS.accent }),
                    new TextRun({ text: "JANUARY 2026  •  ", size: 20, color: COLORS.accent }),
                    new TextRun({ text: "PROFESSIONAL EDITION", size: 20, bold: true, color: COLORS.gold }),
                ]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 2: CHANNEL ANALYTICS DASHBOARD
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Paragraph({
                style: "SectionHeader",
                children: [
                    new TextRun({ text: "📈 ", size: 36 }),
                    new TextRun({ text: "CHANNEL ANALYTICS DASHBOARD", font: "Arial Black" })
                ]
            }),

            // Subtitle for this section
            new Paragraph({
                spacing: { before: 0, after: 300 },
                children: [new TextRun({ text: "Real-time performance metrics for your content empire", italics: true, color: "666666", size: 24 })]
            }),

            // Stats Grid - 4 boxes
            new Table({
                columnWidths: [2340, 2340, 2340, 2340],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                borders: cellBorders,
                                shading: { fill: COLORS.primary, type: ShadingType.CLEAR },
                                width: { size: 2340, type: WidthType.DXA },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 },
                                        children: [new TextRun({ text: "2.4M", size: 48, bold: true, color: "FFFFFF" })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
                                        children: [new TextRun({ text: "SUBSCRIBERS", size: 18, color: "FFFFFF" })] })
                                ]
                            }),
                            new TableCell({
                                borders: cellBorders,
                                shading: { fill: COLORS.secondary, type: ShadingType.CLEAR },
                                width: { size: 2340, type: WidthType.DXA },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 },
                                        children: [new TextRun({ text: "847K", size: 48, bold: true, color: "FFFFFF" })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
                                        children: [new TextRun({ text: "AVG VIEWS", size: 18, color: "FFFFFF" })] })
                                ]
                            }),
                            new TableCell({
                                borders: cellBorders,
                                shading: { fill: COLORS.accent, type: ShadingType.CLEAR },
                                width: { size: 2340, type: WidthType.DXA },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 },
                                        children: [new TextRun({ text: "18.2%", size: 48, bold: true, color: "FFFFFF" })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
                                        children: [new TextRun({ text: "ENGAGEMENT", size: 18, color: "FFFFFF" })] })
                                ]
                            }),
                            new TableCell({
                                borders: cellBorders,
                                shading: { fill: COLORS.success, type: ShadingType.CLEAR },
                                width: { size: 2340, type: WidthType.DXA },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 },
                                        children: [new TextRun({ text: "$47K", size: 48, bold: true, color: "FFFFFF" })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
                                        children: [new TextRun({ text: "MONTHLY REV", size: 18, color: "FFFFFF" })] })
                                ]
                            }),
                        ]
                    })
                ]
            }),

            // Monthly Performance Table
            new Paragraph({
                spacing: { before: 400, after: 200 },
                children: [new TextRun({ text: "MONTHLY PERFORMANCE BREAKDOWN", bold: true, size: 28, color: COLORS.dark })]
            }),

            new Table({
                columnWidths: [1800, 1500, 1500, 1500, 1500, 1560],
                rows: [
                    // Header row
                    new TableRow({
                        tableHeader: true,
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.dark, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER,
                                    children: [new TextRun({ text: "PLATFORM", bold: true, color: "FFFFFF", size: 20 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.dark, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER,
                                    children: [new TextRun({ text: "VIEWS", bold: true, color: "FFFFFF", size: 20 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.dark, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER,
                                    children: [new TextRun({ text: "LIKES", bold: true, color: "FFFFFF", size: 20 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.dark, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER,
                                    children: [new TextRun({ text: "COMMENTS", bold: true, color: "FFFFFF", size: 20 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.dark, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER,
                                    children: [new TextRun({ text: "SHARES", bold: true, color: "FFFFFF", size: 20 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.dark, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER,
                                    children: [new TextRun({ text: "REVENUE", bold: true, color: "FFFFFF", size: 20 })] })] }),
                        ]
                    }),
                    // YouTube
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FFEEEE", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "▶ YouTube", bold: true, color: COLORS.primary })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "1,247,832" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "89,234" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "12,456" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "34,567" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "E8F5E9", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$28,450", bold: true, color: COLORS.success })] })] }),
                        ]
                    }),
                    // TikTok
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F0F0F0", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "♪ TikTok", bold: true, color: "000000" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "3,892,156" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "456,789" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "67,890" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "123,456" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "E8F5E9", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$12,890", bold: true, color: COLORS.success })] })] }),
                        ]
                    }),
                    // Instagram
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF0F5", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "📷 Instagram", bold: true, color: "E1306C" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "567,234" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "78,901" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "5,678" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "12,345" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "E8F5E9", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$5,890", bold: true, color: COLORS.success })] })] }),
                        ]
                    }),
                ]
            }),

            // Key Insights Section
            new Paragraph({
                spacing: { before: 400, after: 200 },
                children: [new TextRun({ text: "★ KEY INSIGHTS THIS MONTH", bold: true, size: 28, color: COLORS.gold })]
            }),

            new Paragraph({ numbering: { reference: "star-bullets", level: 0 },
                children: [new TextRun({ text: "TikTok short-form content outperforming long-form by ", size: 22 }),
                          new TextRun({ text: "312%", bold: true, color: COLORS.primary, size: 22 })] }),
            new Paragraph({ numbering: { reference: "star-bullets", level: 0 },
                children: [new TextRun({ text: "Best posting time identified: ", size: 22 }),
                          new TextRun({ text: "Tuesday 7PM EST", bold: true, color: COLORS.secondary, size: 22 })] }),
            new Paragraph({ numbering: { reference: "star-bullets", level: 0 },
                children: [new TextRun({ text: "Sponsored content CTR up ", size: 22 }),
                          new TextRun({ text: "47%", bold: true, color: COLORS.success, size: 22 }),
                          new TextRun({ text: " from last quarter", size: 22 })] }),
            new Paragraph({ numbering: { reference: "star-bullets", level: 0 },
                children: [new TextRun({ text: "Audience retention improved with new intro format: ", size: 22 }),
                          new TextRun({ text: "78% watch past 30 seconds", bold: true, color: COLORS.accent, size: 22 })] }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 3: CONTENT CALENDAR & PLANNING
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Paragraph({
                style: "SectionHeader",
                children: [
                    new TextRun({ text: "📅 ", size: 36 }),
                    new TextRun({ text: "CONTENT CALENDAR", font: "Arial Black", color: COLORS.accent })
                ]
            }),

            new Paragraph({
                spacing: { before: 0, after: 300 },
                children: [new TextRun({ text: "Strategic content planning for maximum impact", italics: true, color: "666666", size: 24 })]
            }),

            // Weekly Schedule Table
            new Table({
                columnWidths: [1400, 1600, 1600, 1600, 1600, 1560],
                rows: [
                    // Header
                    new TableRow({
                        tableHeader: true,
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.accent, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER,
                                    children: [new TextRun({ text: "TIME", bold: true, color: "FFFFFF", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.primary, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER,
                                    children: [new TextRun({ text: "MONDAY", bold: true, color: "FFFFFF", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.secondary, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER,
                                    children: [new TextRun({ text: "WEDNESDAY", bold: true, color: "FFFFFF", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.success, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER,
                                    children: [new TextRun({ text: "FRIDAY", bold: true, color: "FFFFFF", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.warning, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER,
                                    children: [new TextRun({ text: "SATURDAY", bold: true, color: "FFFFFF", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.dark, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER,
                                    children: [new TextRun({ text: "SUNDAY", bold: true, color: "FFFFFF", size: 18 })] })] }),
                        ]
                    }),
                    // Morning
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF9E6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "9 AM", bold: true, size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFEEEE", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "📹 Film Main", bold: true, size: 16, color: COLORS.primary })] }),
                                    new Paragraph({ children: [new TextRun({ text: "YouTube Video", size: 14, italics: true })] })
                                ] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "✏️ Script Writing", size: 16 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "E8F5E9", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "🎙️ Podcast", bold: true, size: 16, color: COLORS.success })] }),
                                    new Paragraph({ children: [new TextRun({ text: "Record Episode", size: 14, italics: true })] })
                                ] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "📸 Photo Shoot", size: 16 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "REST", italics: true, color: "999999" })] })] }),
                        ]
                    }),
                    // Afternoon
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF9E6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "2 PM", bold: true, size: 18 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "🎬 Edit Video", size: 16 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "E3F2FD", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "📱 TikTok", bold: true, size: 16, color: COLORS.secondary })] }),
                                    new Paragraph({ children: [new TextRun({ text: "Batch Create 5x", size: 14, italics: true })] })
                                ] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "📧 Emails & DMs", size: 16 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF3E0", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "🎮 LIVE", bold: true, size: 16, color: COLORS.warning })] }),
                                    new Paragraph({ children: [new TextRun({ text: "Streaming", size: 14, italics: true })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "REST", italics: true, color: "999999" })] })] }),
                        ]
                    }),
                    // Evening
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF9E6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "7 PM", bold: true, size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFEEEE", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "🚀 PUBLISH", bold: true, size: 16, color: COLORS.primary })] }),
                                    new Paragraph({ children: [new TextRun({ text: "YouTube Upload", size: 14, italics: true })] })
                                ] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "💬 Community", size: 16 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "📊 Analytics", size: 16 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "🎥 Behind Scenes", size: 16 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "EDE7F6", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "📝 PLAN", bold: true, size: 16, color: COLORS.accent })] }),
                                    new Paragraph({ children: [new TextRun({ text: "Next Week", size: 14, italics: true })] })
                                ] }),
                        ]
                    }),
                ]
            }),

            // Content Types Legend
            new Paragraph({
                spacing: { before: 400, after: 200 },
                children: [new TextRun({ text: "CONTENT TYPES & PRIORITIES", bold: true, size: 24, color: COLORS.dark })]
            }),

            new Table({
                columnWidths: [3120, 3120, 3120],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FFEEEE", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "🔴 HIGH PRIORITY", bold: true, color: COLORS.primary })] }),
                                    new Paragraph({ numbering: { reference: "check-bullets", level: 0 }, children: [new TextRun({ text: "Main YouTube videos", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "check-bullets", level: 0 }, children: [new TextRun({ text: "Sponsored content", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "check-bullets", level: 0 }, children: [new TextRun({ text: "Launch announcements", size: 18 })] }),
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF9E6", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "🟡 MEDIUM PRIORITY", bold: true, color: COLORS.gold })] }),
                                    new Paragraph({ numbering: { reference: "check-bullets", level: 0 }, children: [new TextRun({ text: "Shorts & Reels", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "check-bullets", level: 0 }, children: [new TextRun({ text: "Community posts", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "check-bullets", level: 0 }, children: [new TextRun({ text: "Story updates", size: 18 })] }),
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "E8F5E9", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "🟢 EVERGREEN", bold: true, color: COLORS.success })] }),
                                    new Paragraph({ numbering: { reference: "check-bullets", level: 0 }, children: [new TextRun({ text: "Tutorials", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "check-bullets", level: 0 }, children: [new TextRun({ text: "How-to guides", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "check-bullets", level: 0 }, children: [new TextRun({ text: "Resource lists", size: 18 })] }),
                                ] }),
                        ]
                    })
                ]
            }),

            // Quote
            new Paragraph({
                style: "QuoteStyle",
                spacing: { before: 400 },
                children: [new TextRun({ text: "\"Consistency beats perfection. Show up every day, even when you don't feel like it.\"", font: "Georgia" })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "— Every Successful Creator Ever", italics: true, color: COLORS.accent, size: 20 })]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 4: BRAND GUIDELINES
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Paragraph({
                style: "SectionHeader",
                children: [
                    new TextRun({ text: "🎨 ", size: 36 }),
                    new TextRun({ text: "BRAND GUIDELINES", font: "Arial Black", color: COLORS.warning })
                ]
            }),

            new Paragraph({
                spacing: { before: 0, after: 300 },
                children: [new TextRun({ text: "Your visual identity across all platforms", italics: true, color: "666666", size: 24 })]
            }),

            // Color Palette
            new Paragraph({
                spacing: { before: 200, after: 100 },
                children: [new TextRun({ text: "COLOR PALETTE", bold: true, size: 28, color: COLORS.dark })]
            }),

            new Table({
                columnWidths: [1872, 1872, 1872, 1872, 1872],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.primary, type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 300, after: 100 },
                                        children: [new TextRun({ text: "PRIMARY", bold: true, color: "FFFFFF", size: 18 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
                                        children: [new TextRun({ text: "#FF0000", color: "FFFFFF", size: 16, font: "Courier New" })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.secondary, type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 300, after: 100 },
                                        children: [new TextRun({ text: "SECONDARY", bold: true, color: "FFFFFF", size: 18 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
                                        children: [new TextRun({ text: "#00A8FF", color: "FFFFFF", size: 16, font: "Courier New" })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.accent, type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 300, after: 100 },
                                        children: [new TextRun({ text: "ACCENT", bold: true, color: "FFFFFF", size: 18 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
                                        children: [new TextRun({ text: "#9B59B6", color: "FFFFFF", size: 16, font: "Courier New" })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.gold, type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 300, after: 100 },
                                        children: [new TextRun({ text: "GOLD", bold: true, color: COLORS.dark, size: 18 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
                                        children: [new TextRun({ text: "#FFD700", color: COLORS.dark, size: 16, font: "Courier New" })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.dark, type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 300, after: 100 },
                                        children: [new TextRun({ text: "DARK", bold: true, color: "FFFFFF", size: 18 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
                                        children: [new TextRun({ text: "#1A1A2E", color: "FFFFFF", size: 16, font: "Courier New" })] })
                                ] }),
                        ]
                    })
                ]
            }),

            // Typography Showcase
            new Paragraph({
                spacing: { before: 400, after: 100 },
                children: [new TextRun({ text: "TYPOGRAPHY SYSTEM", bold: true, size: 28, color: COLORS.dark })]
            }),

            new Table({
                columnWidths: [2400, 3600, 3360],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F8F9FA", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "STYLE", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F8F9FA", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "FONT DETAILS", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F8F9FA", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "EXAMPLE", bold: true })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Display Title" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "Impact, 36pt, Bold" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "MAKE IT BIG", font: "Impact", size: 36, bold: true, color: COLORS.primary })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Section Header" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "Arial Black, 18pt" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "Section Heading", font: "Arial Black", size: 28, color: COLORS.secondary })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Body Text" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "Arial, 11pt, Regular" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "This is the standard body text style for all content.", font: "Arial", size: 22 })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Quote / Emphasis" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "Georgia, 14pt, Italic" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "\"Inspire with every word\"", font: "Georgia", size: 28, italics: true, color: COLORS.accent })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Code / Technical" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "Courier New, 10pt" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "const brand = 'awesome';", font: "Courier New", size: 20, color: COLORS.success })] })] }),
                        ]
                    }),
                ]
            }),

            // Studio Image
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 400 },
                children: [new ImageRun({
                    type: "jpg",
                    data: studioImg,
                    transformation: { width: 500, height: 280 }
                })]
            }),
            new Paragraph({
                style: "Caption",
                children: [new TextRun({ text: "Professional studio setup following brand guidelines" })]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 5: MONETIZATION & PARTNERSHIPS
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Paragraph({
                style: "SectionHeader",
                children: [
                    new TextRun({ text: "💰 ", size: 36 }),
                    new TextRun({ text: "MONETIZATION EMPIRE", font: "Arial Black", color: COLORS.gold })
                ]
            }),

            new Paragraph({
                spacing: { before: 0, after: 300 },
                children: [new TextRun({ text: "Multiple revenue streams for sustainable creator income", italics: true, color: "666666", size: 24 })]
            }),

            // Revenue Breakdown
            new Paragraph({
                spacing: { before: 200, after: 100 },
                children: [new TextRun({ text: "MONTHLY REVENUE BREAKDOWN", bold: true, size: 24, color: COLORS.dark })]
            }),

            new Table({
                columnWidths: [3500, 2000, 2000, 1860],
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.gold, type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "REVENUE SOURCE", bold: true, color: COLORS.dark })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.gold, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "MONTHLY", bold: true, color: COLORS.dark })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.gold, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "ANNUAL", bold: true, color: COLORS.dark })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.gold, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "% SHARE", bold: true, color: COLORS.dark })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "▶ ", color: COLORS.primary }),
                                new TextRun({ text: "YouTube AdSense", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$28,450" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$341,400" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFEEEE", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "45%", bold: true, color: COLORS.primary })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "🤝 ", }),
                                new TextRun({ text: "Brand Sponsorships", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$18,500" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$222,000" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "E3F2FD", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "29%", bold: true, color: COLORS.secondary })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "📦 ", }),
                                new TextRun({ text: "Merchandise & Products", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$8,200" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$98,400" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "EDE7F6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "13%", bold: true, color: COLORS.accent })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "🎓 ", }),
                                new TextRun({ text: "Online Courses & Coaching", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$5,800" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$69,600" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "E8F5E9", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "9%", bold: true, color: COLORS.success })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [
                                new TextRun({ text: "🔗 ", }),
                                new TextRun({ text: "Affiliate Marketing", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$2,500" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$30,000" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF3E0", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4%", bold: true, color: COLORS.warning })] })] }),
                        ]
                    }),
                    // Total row
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.dark, type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "TOTAL REVENUE", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.dark, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$63,450", bold: true, color: COLORS.gold })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.dark, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$761,400", bold: true, color: COLORS.gold })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.dark, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "100%", bold: true, color: "FFFFFF" })] })] }),
                        ]
                    }),
                ]
            }),

            // Partnership Checklist
            new Paragraph({
                spacing: { before: 400, after: 200 },
                children: [new TextRun({ text: "BRAND PARTNERSHIP CHECKLIST", bold: true, size: 24, color: COLORS.dark })]
            }),

            new Paragraph({ numbering: { reference: "numbered-steps", level: 0 },
                children: [new TextRun({ text: "Verify brand aligns with your audience values and demographics", size: 22 })] }),
            new Paragraph({ numbering: { reference: "numbered-steps", level: 0 },
                children: [new TextRun({ text: "Request detailed campaign brief with deliverables and timeline", size: 22 })] }),
            new Paragraph({ numbering: { reference: "numbered-steps", level: 0 },
                children: [new TextRun({ text: "Negotiate usage rights, exclusivity, and compensation terms", size: 22 })] }),
            new Paragraph({ numbering: { reference: "numbered-steps", level: 0 },
                children: [new TextRun({ text: "Get everything in writing - never work on verbal agreements", size: 22 })] }),
            new Paragraph({ numbering: { reference: "numbered-steps", level: 0 },
                children: [new TextRun({ text: "Include FTC disclosure requirements in all sponsored content", size: 22 })] }),
            new Paragraph({ numbering: { reference: "numbered-steps", level: 0 },
                children: [new TextRun({ text: "Track performance metrics and share results with partners", size: 22 })] }),

            // Final decorative element
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 400 },
                children: [new TextRun({ text: "═══════════════════════════════════════", color: COLORS.gold, size: 28 })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({ text: "★ ", color: COLORS.gold, size: 24 }),
                    new TextRun({ text: "BUILD YOUR EMPIRE", bold: true, size: 28, color: COLORS.primary }),
                    new TextRun({ text: " ★", color: COLORS.gold, size: 24 }),
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "Content Creator Command Center © 2026", italics: true, size: 18, color: "999999" })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
                children: [new TextRun({ text: "═══════════════════════════════════════", color: COLORS.gold, size: 28 })]
            }),
        ]
    }]
});

// Save document
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync('Content_Creator_Command_Center_EXTREME.docx', buffer);
    console.log('✅ Content Creator Command Center document created successfully!');
}).catch(err => {
    console.error('Error creating document:', err);
});
