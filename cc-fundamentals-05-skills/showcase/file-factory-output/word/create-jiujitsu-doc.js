const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, LevelFormat,
        BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber,
        PageBreak } = require('docx');
const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════════════════
// JIU-JITSU MASTERY GUIDE - EXTREME WORD DOCUMENT SHOWCASE
// ═══════════════════════════════════════════════════════════════════════════════

// Color Palette - Traditional Martial Arts Theme
const COLORS = {
    black: "000000",        // Black Belt
    brown: "8B4513",        // Brown Belt
    purple: "6B3FA0",       // Purple Belt
    blue: "1E3A8A",         // Blue Belt
    white: "F5F5F5",        // White Belt
    gold: "DAA520",         // Gold accents
    red: "B91C1C",          // Red accent / Coral Belt
    cream: "FFFEF0",        // Background
    darkBlue: "0F172A",     // Dark navy
};

// Border helpers
const createBorder = (color = "CCCCCC", size = 1) => ({
    style: BorderStyle.SINGLE, size, color
});

const cellBorders = {
    top: createBorder(), bottom: createBorder(),
    left: createBorder(), right: createBorder()
};

const thickBorders = {
    top: createBorder(COLORS.black, 3),
    bottom: createBorder(COLORS.black, 3),
    left: createBorder(COLORS.black, 3),
    right: createBorder(COLORS.black, 3)
};

// Load images
const jiujitsuImg = fs.readFileSync('./images/jiujitsu.jpg');
const martialArtsImg = fs.readFileSync('./images/martial-arts.jpg');

// ═══════════════════════════════════════════════════════════════════════════════
// DOCUMENT CREATION
// ═══════════════════════════════════════════════════════════════════════════════

const doc = new Document({
    styles: {
        default: {
            document: {
                run: { font: "Georgia", size: 22 }
            }
        },
        paragraphStyles: [
            // Japanese-inspired Title
            { id: "MartialTitle", name: "Martial Title", basedOn: "Normal",
              run: { size: 64, bold: true, color: COLORS.darkBlue, font: "Times New Roman" },
              paragraph: { spacing: { before: 0, after: 100 }, alignment: AlignmentType.CENTER }
            },
            // Section Header
            { id: "DojoHeader", name: "Dojo Header", basedOn: "Normal",
              run: { size: 32, bold: true, color: COLORS.blue, font: "Arial Black" },
              paragraph: { spacing: { before: 400, after: 200 } }
            },
            // Technique Name
            { id: "TechniqueName", name: "Technique Name", basedOn: "Normal",
              run: { size: 28, bold: true, color: COLORS.purple, font: "Arial" },
              paragraph: { spacing: { before: 200, after: 100 } }
            },
            // Japanese Term
            { id: "Japanese", name: "Japanese", basedOn: "Normal",
              run: { size: 24, italics: true, color: COLORS.red, font: "Times New Roman" },
              paragraph: { spacing: { before: 100, after: 100 }, alignment: AlignmentType.CENTER }
            },
            // Quote/Philosophy
            { id: "Philosophy", name: "Philosophy", basedOn: "Normal",
              run: { size: 26, italics: true, color: COLORS.darkBlue, font: "Georgia" },
              paragraph: { spacing: { before: 300, after: 300 }, alignment: AlignmentType.CENTER,
                          indent: { left: 720, right: 720 } }
            },
            // Warning Box
            { id: "Warning", name: "Warning", basedOn: "Normal",
              run: { size: 22, bold: true, color: COLORS.red, font: "Arial" },
              paragraph: { spacing: { before: 100, after: 100 } }
            },
        ]
    },
    numbering: {
        config: [
            { reference: "technique-steps",
              levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } },
                        run: { bold: true, color: COLORS.blue } } }]
            },
            { reference: "belt-requirements",
              levels: [{ level: 0, format: LevelFormat.BULLET, text: "◆", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
            },
            { reference: "training-list",
              levels: [{ level: 0, format: LevelFormat.BULLET, text: "▸", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
            },
            { reference: "checklist",
              levels: [{ level: 0, format: LevelFormat.BULLET, text: "☐", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
            },
            { reference: "mental-list",
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
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({ text: "柔術", size: 20, color: COLORS.red, font: "Arial Unicode MS" }),
                        new TextRun({ text: "  JIU-JITSU MASTERY GUIDE  ", bold: true, size: 18, color: COLORS.darkBlue }),
                        new TextRun({ text: "柔術", size: 20, color: COLORS.red, font: "Arial Unicode MS" }),
                    ]
                })]
            })
        },
        footers: {
            default: new Footer({
                children: [new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({ text: "◆ ", color: COLORS.gold }),
                        new TextRun({ text: "Page ", size: 18 }),
                        new TextRun({ children: [PageNumber.CURRENT], size: 18, bold: true }),
                        new TextRun({ text: " of ", size: 18 }),
                        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, bold: true }),
                        new TextRun({ text: " ◆", color: COLORS.gold }),
                    ]
                })]
            })
        },
        children: [
            // ═══════════════════════════════════════════════════════════════════
            // PAGE 1: TITLE PAGE - TRADITIONAL MARTIAL ARTS STYLE
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ spacing: { before: 400 }, children: [] }),

            // Decorative top border
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "════════════════════════════════════════════", color: COLORS.gold, size: 24 })]
            }),

            // Japanese calligraphy style
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 200 },
                children: [new TextRun({ text: "柔 術", size: 96, color: COLORS.red, font: "Times New Roman" })]
            }),

            // Main Title
            new Paragraph({
                style: "MartialTitle",
                children: [new TextRun({ text: "JIU-JITSU" })]
            }),
            new Paragraph({
                style: "MartialTitle",
                spacing: { before: 0, after: 0 },
                children: [new TextRun({ text: "MASTERY GUIDE", color: COLORS.blue })]
            }),

            // Subtitle
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 200, after: 200 },
                children: [new TextRun({ text: "The Gentle Art of Human Chess", italics: true, size: 28, color: COLORS.purple, font: "Georgia" })]
            }),

            // Decorative line
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "════════════════════════════════════════════", color: COLORS.gold, size: 24 })]
            }),

            // Hero Image
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 300 },
                children: [new ImageRun({
                    type: "jpg",
                    data: jiujitsuImg,
                    transformation: { width: 450, height: 300 }
                })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
                children: [new TextRun({ text: "\"A black belt is a white belt who never gave up.\"", italics: true, size: 20, color: "666666" })]
            }),

            // Belt level indicators as colored boxes
            new Paragraph({
                spacing: { before: 200, after: 100 },
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "BELT PROGRESSION SYSTEM", bold: true, size: 24, color: COLORS.darkBlue })]
            }),

            new Table({
                columnWidths: [1872, 1872, 1872, 1872, 1872],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ borders: thickBorders, shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100, after: 100 },
                                        children: [new TextRun({ text: "WHITE", bold: true, size: 18, color: COLORS.black })] })
                                ] }),
                            new TableCell({ borders: thickBorders, shading: { fill: "3B82F6", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100, after: 100 },
                                        children: [new TextRun({ text: "BLUE", bold: true, size: 18, color: "FFFFFF" })] })
                                ] }),
                            new TableCell({ borders: thickBorders, shading: { fill: "7C3AED", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100, after: 100 },
                                        children: [new TextRun({ text: "PURPLE", bold: true, size: 18, color: "FFFFFF" })] })
                                ] }),
                            new TableCell({ borders: thickBorders, shading: { fill: "92400E", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100, after: 100 },
                                        children: [new TextRun({ text: "BROWN", bold: true, size: 18, color: "FFFFFF" })] })
                                ] }),
                            new TableCell({ borders: thickBorders, shading: { fill: "000000", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100, after: 100 },
                                        children: [new TextRun({ text: "BLACK", bold: true, size: 18, color: "FFFFFF" })] })
                                ] }),
                        ]
                    })
                ]
            }),

            // Edition info
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 400 },
                children: [
                    new TextRun({ text: "PRACTITIONER'S EDITION  •  ", size: 18, color: COLORS.blue }),
                    new TextRun({ text: "2026", bold: true, size: 18, color: COLORS.gold }),
                ]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 2: FUNDAMENTAL TECHNIQUES
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Paragraph({
                style: "DojoHeader",
                children: [
                    new TextRun({ text: "🥋 ", size: 32 }),
                    new TextRun({ text: "FUNDAMENTAL TECHNIQUES" })
                ]
            }),

            new Paragraph({
                spacing: { before: 0, after: 300 },
                children: [new TextRun({ text: "Master these core movements before advancing to complex sequences", italics: true, color: "666666", size: 22 })]
            }),

            // Technique 1: Guard Pass
            new Paragraph({
                style: "TechniqueName",
                children: [new TextRun({ text: "1. CLOSED GUARD PASS" })]
            }),
            new Paragraph({
                style: "Japanese",
                children: [new TextRun({ text: "Kurozudo Gādo Pasu (クローズドガードパス)" })]
            }),

            new Paragraph({ numbering: { reference: "technique-steps", level: 0 },
                children: [new TextRun({ text: "Establish posture - sit up tall with hands on opponent's hips", size: 22 })] }),
            new Paragraph({ numbering: { reference: "technique-steps", level: 0 },
                children: [new TextRun({ text: "Break the guard - stand up in base or use the knee-in-middle technique", size: 22 })] }),
            new Paragraph({ numbering: { reference: "technique-steps", level: 0 },
                children: [new TextRun({ text: "Control the hips - pin one leg down while stepping over", size: 22 })] }),
            new Paragraph({ numbering: { reference: "technique-steps", level: 0 },
                children: [new TextRun({ text: "Consolidate position - settle into side control with underhook", size: 22 })] }),

            // Warning box
            new Table({
                columnWidths: [9360],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                borders: { top: createBorder(COLORS.red, 3), bottom: createBorder(COLORS.red, 3),
                                          left: createBorder(COLORS.red, 3), right: createBorder(COLORS.red, 3) },
                                shading: { fill: "FEF2F2", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ spacing: { before: 100, after: 100 },
                                        children: [
                                            new TextRun({ text: "⚠ COMMON MISTAKE: ", bold: true, color: COLORS.red }),
                                            new TextRun({ text: "Never lean forward with your weight - you'll get swept!", color: COLORS.black })
                                        ] })
                                ]
                            })
                        ]
                    })
                ]
            }),

            // Technique 2: Triangle Choke
            new Paragraph({
                style: "TechniqueName",
                spacing: { before: 400 },
                children: [new TextRun({ text: "2. TRIANGLE CHOKE" })]
            }),
            new Paragraph({
                style: "Japanese",
                children: [new TextRun({ text: "Sankaku Jime (三角絞め)" })]
            }),

            new Paragraph({ numbering: { reference: "technique-steps", level: 0 },
                children: [new TextRun({ text: "Control one arm in, one arm out - isolate the target arm", size: 22 })] }),
            new Paragraph({ numbering: { reference: "technique-steps", level: 0 },
                children: [new TextRun({ text: "Throw leg over shoulder and lock figure-four with legs", size: 22 })] }),
            new Paragraph({ numbering: { reference: "technique-steps", level: 0 },
                children: [new TextRun({ text: "Pull head down while squeezing knees together", size: 22 })] }),
            new Paragraph({ numbering: { reference: "technique-steps", level: 0 },
                children: [new TextRun({ text: "Cut the angle - 90 degrees to their body for maximum pressure", size: 22 })] }),

            // Position Map Table
            new Paragraph({
                spacing: { before: 400, after: 200 },
                children: [new TextRun({ text: "POSITION HIERARCHY", bold: true, size: 26, color: COLORS.darkBlue })]
            }),

            new Table({
                columnWidths: [3120, 2000, 2000, 2240],
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.darkBlue, type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "POSITION", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.darkBlue, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "POINTS", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.darkBlue, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CONTROL", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.darkBlue, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "DANGER", bold: true, color: "FFFFFF" })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "🏆 Mount (Top)", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4 pts", bold: true, color: COLORS.gold })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "★★★★★", color: COLORS.gold })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF2F2", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MAXIMUM", bold: true, color: COLORS.red })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "🔙 Back Control", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4 pts", bold: true, color: COLORS.gold })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "★★★★★", color: COLORS.gold })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF2F2", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MAXIMUM", bold: true, color: COLORS.red })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "📐 Side Control", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3 pts" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "★★★★☆", color: COLORS.purple })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HIGH", color: COLORS.red })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "🦵 Knee on Belly" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2 pts" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "★★★☆☆", color: COLORS.blue })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MODERATE", color: COLORS.gold })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "🛡️ Guard (Bottom)" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "0 pts" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "★★☆☆☆", color: COLORS.blue })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "ECFDF5", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NEUTRAL", color: "059669" })] })] }),
                        ]
                    }),
                ]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 3: TRAINING SCHEDULE & CONDITIONING
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Paragraph({
                style: "DojoHeader",
                children: [
                    new TextRun({ text: "🏋️ ", size: 32 }),
                    new TextRun({ text: "TRAINING SCHEDULE", color: COLORS.purple })
                ]
            }),

            new Paragraph({
                spacing: { before: 0, after: 300 },
                children: [new TextRun({ text: "Structured weekly training for optimal skill development", italics: true, color: "666666", size: 22 })]
            }),

            // Weekly Schedule
            new Table({
                columnWidths: [1500, 2000, 2000, 2000, 1860],
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.black, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "DAY", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.blue, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MORNING", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.purple, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AFTERNOON", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.brown, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "EVENING", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.gold, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "FOCUS", bold: true, color: COLORS.black })] })] }),
                        ]
                    }),
                    // Monday
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F3F4F6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "MON", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "EFF6FF", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "🏃 Cardio + Stretch", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "🥋 Technique Class", size: 18, bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FDF4FF", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "🤼 Open Mat", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Guard", color: COLORS.blue, bold: true })] })] }),
                        ]
                    }),
                    // Tuesday
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F3F4F6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "TUE", bold: true })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "💪 Strength Training", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "📚 Video Study", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "🥋 No-Gi Class", size: 18, bold: true })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Takedowns", color: COLORS.red, bold: true })] })] }),
                        ]
                    }),
                    // Wednesday
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F3F4F6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "WED", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "ECFDF5", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "🧘 Yoga/Mobility", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "🥋 Drilling Session", size: 18, bold: true })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "🤼 Sparring", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Passing", color: COLORS.purple, bold: true })] })] }),
                        ]
                    }),
                    // Thursday
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F3F4F6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "THU", bold: true })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "🏃 HIIT Training", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "🥋 Competition Class", size: 18, bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FDF4FF", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "🤼 Hard Sparring", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Subs", color: COLORS.gold, bold: true })] })] }),
                        ]
                    }),
                    // Friday
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F3F4F6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "FRI", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "ECFDF5", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "🧘 Active Recovery", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "🥋 Flow Rolling", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "📚 Game Planning", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Review", color: COLORS.brown, bold: true })] })] }),
                        ]
                    }),
                    // Saturday
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "SAT", bold: true, color: COLORS.gold })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "🥋 OPEN MAT", size: 18, bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "🤼 Tournament Prep", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "—", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "LIVE", color: COLORS.red, bold: true })] })] }),
                        ]
                    }),
                    // Sunday
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F3F4F6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "SUN", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "REST", italics: true, color: "059669" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "& RECOVER", italics: true, color: "059669" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "📚 Study Film", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Mental", color: COLORS.purple, bold: true })] })] }),
                        ]
                    }),
                ]
            }),

            // Training Tips
            new Paragraph({
                spacing: { before: 400, after: 200 },
                children: [new TextRun({ text: "TRAINING PRINCIPLES", bold: true, size: 26, color: COLORS.darkBlue })]
            }),

            new Table({
                columnWidths: [4680, 4680],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "EFF6FF", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "🎯 TECHNICAL FOCUS", bold: true, color: COLORS.blue, size: 22 })] }),
                                    new Paragraph({ numbering: { reference: "training-list", level: 0 }, children: [new TextRun({ text: "Drill before you spar", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "training-list", level: 0 }, children: [new TextRun({ text: "Master basics first", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "training-list", level: 0 }, children: [new TextRun({ text: "Quality > Quantity", size: 18 })] }),
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FDF4FF", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "💪 PHYSICAL PREP", bold: true, color: COLORS.purple, size: 22 })] }),
                                    new Paragraph({ numbering: { reference: "training-list", level: 0 }, children: [new TextRun({ text: "Grip strength essential", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "training-list", level: 0 }, children: [new TextRun({ text: "Hip mobility daily", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "training-list", level: 0 }, children: [new TextRun({ text: "Core over everything", size: 18 })] }),
                                ] }),
                        ]
                    })
                ]
            }),

            // Philosophy Quote
            new Paragraph({
                style: "Philosophy",
                spacing: { before: 400 },
                children: [new TextRun({ text: "\"The ground is my ocean. I am the shark. Most people don't even know how to swim.\"" })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "— Jean Jacques Machado", italics: true, color: COLORS.purple, size: 20 })]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 4: BELT RANKING SYSTEM
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Paragraph({
                style: "DojoHeader",
                children: [
                    new TextRun({ text: "🎖️ ", size: 32 }),
                    new TextRun({ text: "BELT RANKING SYSTEM", color: COLORS.gold })
                ]
            }),

            new Paragraph({
                spacing: { before: 0, after: 300 },
                children: [new TextRun({ text: "Progression requirements and expected proficiency at each level", italics: true, color: "666666", size: 22 })]
            }),

            // Belt Requirements Table
            new Table({
                columnWidths: [1800, 2000, 2800, 2760],
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.darkBlue, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BELT", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.darkBlue, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MIN TIME", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.darkBlue, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "KEY SKILLS", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.darkBlue, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MINDSET", bold: true, color: "FFFFFF" })] })] }),
                        ]
                    }),
                    // White Belt
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
                                    new TextRun({ text: "⬜ WHITE", bold: true, size: 20 })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "0-2 years" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Survival, basic escapes, simple sweeps", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F8F8F8", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "\"Just survive\"", italics: true, size: 18 })] })] }),
                        ]
                    }),
                    // Blue Belt
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "3B82F6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
                                    new TextRun({ text: "🔵 BLUE", bold: true, color: "FFFFFF", size: 20 })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2-3 years" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Chain attacks, guard retention, passing", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "EFF6FF", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "\"Develop a game\"", italics: true, size: 18, color: COLORS.blue })] })] }),
                        ]
                    }),
                    // Purple Belt
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "7C3AED", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
                                    new TextRun({ text: "🟣 PURPLE", bold: true, color: "FFFFFF", size: 20 })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1.5-2 years" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Refine systems, troubleshoot problems", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FAF5FF", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "\"Master your game\"", italics: true, size: 18, color: COLORS.purple })] })] }),
                        ]
                    }),
                    // Brown Belt
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "92400E", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
                                    new TextRun({ text: "🟤 BROWN", bold: true, color: "FFFFFF", size: 20 })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1-2 years" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Polish everything, teach others", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FDF4E7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "\"Perfect the details\"", italics: true, size: 18, color: COLORS.brown })] })] }),
                        ]
                    }),
                    // Black Belt
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "000000", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
                                    new TextRun({ text: "⬛ BLACK", bold: true, color: "FFFFFF", size: 20 })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "10+ years total", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Complete mastery, innovation, legacy", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "1F2937", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "\"The journey begins\"", italics: true, size: 18, color: COLORS.gold })] })] }),
                        ]
                    }),
                ]
            }),

            // Martial Arts Image
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 300 },
                children: [new ImageRun({
                    type: "jpg",
                    data: martialArtsImg,
                    transformation: { width: 450, height: 280 }
                })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "Training partners pushing each other to excellence", italics: true, size: 18, color: "666666" })]
            }),

            // Stripe Requirements
            new Paragraph({
                spacing: { before: 300, after: 200 },
                children: [new TextRun({ text: "STRIPE REQUIREMENTS (per belt)", bold: true, size: 24, color: COLORS.darkBlue })]
            }),

            new Paragraph({ numbering: { reference: "belt-requirements", level: 0 },
                children: [new TextRun({ text: "Consistent training attendance (minimum 3x/week)", size: 20 })] }),
            new Paragraph({ numbering: { reference: "belt-requirements", level: 0 },
                children: [new TextRun({ text: "Demonstrated improvement in sparring", size: 20 })] }),
            new Paragraph({ numbering: { reference: "belt-requirements", level: 0 },
                children: [new TextRun({ text: "Technical proficiency in core curriculum", size: 20 })] }),
            new Paragraph({ numbering: { reference: "belt-requirements", level: 0 },
                children: [new TextRun({ text: "Positive attitude and good training partner", size: 20 })] }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 5: COMPETITION PREPARATION
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Paragraph({
                style: "DojoHeader",
                children: [
                    new TextRun({ text: "🏆 ", size: 32 }),
                    new TextRun({ text: "COMPETITION PREPARATION", color: COLORS.red })
                ]
            }),

            new Paragraph({
                spacing: { before: 0, after: 300 },
                children: [new TextRun({ text: "Complete guide to tournament readiness and peak performance", italics: true, color: "666666", size: 22 })]
            }),

            // Weight Classes Table
            new Paragraph({
                spacing: { before: 100, after: 100 },
                children: [new TextRun({ text: "IBJJF WEIGHT CLASSES (Adult Male Gi)", bold: true, size: 24, color: COLORS.darkBlue })]
            }),

            new Table({
                columnWidths: [2340, 2340, 2340, 2340],
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.red, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "DIVISION", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.red, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "WEIGHT (kg)", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.red, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "WEIGHT (lbs)", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.red, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GI WEIGHT", bold: true, color: "FFFFFF" })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Rooster", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "57.5 kg" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "126.8 lbs" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F3F4F6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "+0.5 kg", size: 18 })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Light Feather", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "64 kg" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "141.1 lbs" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F3F4F6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "+0.5 kg", size: 18 })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Feather", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70 kg" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "154.3 lbs" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F3F4F6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "+0.5 kg", size: 18 })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "⭐ Medium Heavy", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "88.3 kg", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "194.7 lbs", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "+0.5 kg", size: 18 })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Ultra Heavy", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "100.5+ kg" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "221.6+ lbs" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F3F4F6", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "No limit", size: 18 })] })] }),
                        ]
                    }),
                ]
            }),

            // Pre-Competition Checklist
            new Paragraph({
                spacing: { before: 400, after: 200 },
                children: [new TextRun({ text: "PRE-COMPETITION CHECKLIST", bold: true, size: 24, color: COLORS.darkBlue })]
            }),

            new Table({
                columnWidths: [4680, 4680],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF2F2", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "📦 GEAR BAG", bold: true, color: COLORS.red, size: 22 })] }),
                                    new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: "Competition Gi (IBJJF legal)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: "Backup Gi", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: "Rashguard (approved color)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: "Tape, nail clippers", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: "Water & snacks", size: 18 })] }),
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "EFF6FF", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "📋 DOCUMENTS", bold: true, color: COLORS.blue, size: 22 })] }),
                                    new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: "IBJJF ID card", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: "Registration confirmation", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: "Academy letter (if required)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: "Photo ID", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: "Medical clearance", size: 18 })] }),
                                ] }),
                        ]
                    })
                ]
            }),

            // Mental Preparation
            new Paragraph({
                spacing: { before: 400, after: 200 },
                children: [new TextRun({ text: "MENTAL PREPARATION PROTOCOL", bold: true, size: 24, color: COLORS.purple })]
            }),

            new Paragraph({ numbering: { reference: "mental-list", level: 0 },
                children: [
                    new TextRun({ text: "Visualization: ", bold: true, size: 20 }),
                    new TextRun({ text: "See yourself executing your game plan successfully", size: 20 })
                ] }),
            new Paragraph({ numbering: { reference: "mental-list", level: 0 },
                children: [
                    new TextRun({ text: "Breathing: ", bold: true, size: 20 }),
                    new TextRun({ text: "4-7-8 technique to calm pre-match nerves", size: 20 })
                ] }),
            new Paragraph({ numbering: { reference: "mental-list", level: 0 },
                children: [
                    new TextRun({ text: "Warm-up: ", bold: true, size: 20 }),
                    new TextRun({ text: "20 minutes before match, start movement drills", size: 20 })
                ] }),
            new Paragraph({ numbering: { reference: "mental-list", level: 0 },
                children: [
                    new TextRun({ text: "Focus: ", bold: true, size: 20 }),
                    new TextRun({ text: "One match at a time, one technique at a time", size: 20 })
                ] }),
            new Paragraph({ numbering: { reference: "mental-list", level: 0 },
                children: [
                    new TextRun({ text: "Recovery: ", bold: true, size: 20 }),
                    new TextRun({ text: "Win or lose, review and rest - no ego", size: 20 })
                ] }),

            // Final Quote
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 300 },
                children: [new TextRun({ text: "═══════════════════════════════════════", color: COLORS.gold, size: 24 })]
            }),
            new Paragraph({
                style: "Philosophy",
                spacing: { before: 100, after: 100 },
                children: [new TextRun({ text: "\"A belt only covers two inches of your body. You have to cover the rest.\"" })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "— Royce Gracie", italics: true, color: COLORS.red, size: 20 })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 100 },
                children: [new TextRun({ text: "═══════════════════════════════════════", color: COLORS.gold, size: 24 })]
            }),

            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "Jiu-Jitsu Mastery Guide © 2026  •  OSS!", italics: true, size: 18, color: "999999" })]
            }),
        ]
    }]
});

// Save document
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync('JiuJitsu_Mastery_Guide_EXTREME.docx', buffer);
    console.log('✅ Jiu-Jitsu Mastery Guide document created successfully!');
}).catch(err => {
    console.error('Error creating document:', err);
});
