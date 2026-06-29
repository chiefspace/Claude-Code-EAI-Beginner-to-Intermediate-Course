const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, LevelFormat,
        BorderStyle, WidthType, ShadingType, PageNumber,
        PageBreak } = require('docx');
const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════════════════
// NANO BANANA PRO - 10X EXTREME WORD DOCUMENT
// Google DeepMind's Revolutionary AI Image Generation Model
// ═══════════════════════════════════════════════════════════════════════════════

// Google/Nano Banana Color Palette
const C = {
    googleBlue: "4285F4",
    googleRed: "EA4335",
    googleYellow: "FBBC04",
    googleGreen: "34A853",
    bananaYellow: "FFE135",
    deepMindBlue: "0066CC",
    geminiPurple: "8E24AA",
    darkBg: "0F0F0F",
    lightBg: "FAFAFA",
    accentPink: "E91E63",
    accentTeal: "00BCD4",
    accentOrange: "FF9800",
    white: "FFFFFF",
    gray: "9E9E9E",
};

const border = (color = "E0E0E0", size = 1) => ({ style: BorderStyle.SINGLE, size, color });
const cellB = { top: border(), bottom: border(), left: border(), right: border() };
const thickB = (c) => ({ top: border(c, 3), bottom: border(c, 3), left: border(c, 3), right: border(c, 3) });
const glowB = (c) => ({ top: border(c, 4), bottom: border(c, 4), left: border(c, 4), right: border(c, 4) });

// Load images
const aiGeneratedArt = fs.readFileSync('./images/ai-generated-art.jpg');
const digitalArt = fs.readFileSync('./images/digital-art.jpg');
const aiNetwork = fs.readFileSync('./images/ai-network.jpg');
const aiFuturistic = fs.readFileSync('./images/ai-futuristic.jpg');

const doc = new Document({
    styles: {
        default: { document: { run: { font: "Google Sans", size: 20 } } },
        paragraphStyles: [
            { id: "BananaTitle", name: "Banana Title", basedOn: "Normal",
              run: { size: 72, bold: true, color: C.bananaYellow, font: "Arial Black" },
              paragraph: { spacing: { before: 0, after: 0 }, alignment: AlignmentType.CENTER } },
            { id: "GoogleHeader", name: "Google Header", basedOn: "Normal",
              run: { size: 32, bold: true, color: C.googleBlue, font: "Arial" },
              paragraph: { spacing: { before: 200, after: 100 } } },
        ]
    },
    numbering: {
        config: [
            { reference: "google-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "●", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 400, hanging: 200 } } } }] },
            { reference: "feature-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "◆", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 400, hanging: 200 } } } }] },
            { reference: "step-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 400, hanging: 200 } }, run: { bold: true, color: C.googleBlue } } }] },
            { reference: "check-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "✓", alignment: AlignmentType.LEFT,
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
                        new TextRun({ text: "🍌 ", size: 16 }),
                        new TextRun({ text: "NANO BANANA PRO", bold: true, size: 16, color: C.bananaYellow }),
                        new TextRun({ text: " | ", color: C.gray, size: 16 }),
                        new TextRun({ text: "GOOGLE DEEPMIND", size: 16, color: C.googleBlue }),
                        new TextRun({ text: " | ", color: C.gray, size: 16 }),
                        new TextRun({ text: "GEMINI 3 PRO IMAGE", size: 16, color: C.geminiPurple }),
                        new TextRun({ text: " 🍌", size: 16 }),
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
                        new TextRun({ text: "[ Page ", size: 14, color: C.white }),
                        new TextRun({ children: [PageNumber.CURRENT], size: 14, bold: true, color: C.bananaYellow }),
                        new TextRun({ text: " / ", size: 14, color: C.white }),
                        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 14, bold: true, color: C.googleGreen }),
                        new TextRun({ text: " ]  ◆  ai.google.dev", size: 14, color: C.white }),
                    ]
                })]
            })
        },
        children: [
            // ═══════════════════════════════════════════════════════════════════
            // PAGE 1: TITLE + OVERVIEW
            // ═══════════════════════════════════════════════════════════════════

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.bananaYellow), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER,
                            children: [new TextRun({ text: "🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌", size: 14 })] })]
                    })
                ]})]
            }),

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.bananaYellow), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 },
                                children: [new TextRun({ text: "NANO BANANA PRO", size: 80, bold: true, color: C.bananaYellow, font: "Impact" })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER,
                                children: [new TextRun({ text: "GEMINI 3 PRO IMAGE", size: 40, bold: true, color: C.geminiPurple, font: "Arial" })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
                                children: [
                                    new TextRun({ text: "━━━ ", color: C.googleBlue }),
                                    new TextRun({ text: "GOOGLE DEEPMIND'S REVOLUTIONARY AI IMAGE MODEL", size: 20, color: C.white }),
                                    new TextRun({ text: " ━━━", color: C.googleRed })
                                ] })
                        ]
                    })
                ]})]
            }),

            // Google colors stats bar
            new Table({
                columnWidths: [2550, 2550, 2550, 2550],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: C.googleBlue, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🖼️", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4K OUTPUT", bold: true, size: 20, color: C.white })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4096x4096 max", size: 12, color: C.white })] })
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: C.googleRed, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "📝", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TEXT RENDER", bold: true, size: 20, color: C.white })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Multi-language", size: 12, color: C.white })] })
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: C.googleYellow, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🎨", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "14 IMAGES", bold: true, size: 20, color: C.darkBg })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Multi-blend input", size: 12, color: C.darkBg })] })
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: C.googleGreen, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "👥", size: 28 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5 PEOPLE", bold: true, size: 20, color: C.white })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Subject consistency", size: 12, color: C.white })] })
                        ] }),
                ]})]
            }),

            // Two column: Image + Description
            new Table({
                columnWidths: [5100, 5100],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.geminiPurple), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: aiGeneratedArt, transformation: { width: 280, height: 180 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 },
                                children: [new TextRun({ text: "AI-Generated Photorealistic Art", size: 14, italics: true, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.bananaYellow), shading: { fill: "1A1A1A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🍌 WHAT IS NANO BANANA PRO?", bold: true, size: 22, color: C.bananaYellow })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Google DeepMind's latest image generation AI", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Part of Gemini 3 multimodal family", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Creates photorealistic images from text", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Advanced text rendering in images", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Multi-image blending capabilities", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Released November 2025", size: 14, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // Origin story
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: "1A150A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🍌 THE BANANA ORIGIN STORY", bold: true, size: 20, color: C.bananaYellow })] }),
                            new Paragraph({ spacing: { before: 50 },
                                children: [new TextRun({ text: "\"Nano Banana\" was the codename used during secret public testing on LMArena. The quirky name stuck after the model became a viral sensation, particularly for its photorealistic \"3D figurine\" images that flooded social media in late 2025.", size: 14, color: C.white })] }),
                        ] })
                ]})]
            }),

            // Key features grid
            new Table({
                columnWidths: [3400, 3400, 3400],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.googleBlue), shading: { fill: "0A0A1A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "📝 TEXT RENDERING", bold: true, size: 18, color: C.googleBlue })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Multiple fonts & styles", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "100+ languages", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Perfect kerning", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Integrated in scenes", size: 14, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.googleRed), shading: { fill: "1A0A0A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🎭 SUBJECT CONTROL", bold: true, size: 18, color: C.googleRed })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Up to 5 people tracked", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Consistent across edits", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Change hairstyles", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "Swap backgrounds", size: 14, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.googleGreen), shading: { fill: "0A1A0A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🔮 RESOLUTION", bold: true, size: 18, color: C.googleGreen })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "4K (4096x4096)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "2K standard output", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "1024x1024 free tier", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "check-list", level: 0 }, children: [new TextRun({ text: "4x vs predecessor", size: 14, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 2: CAPABILITIES DEEP DIVE
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.geminiPurple), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 50 },
                            children: [
                                new TextRun({ text: "🎨 ", size: 28 }),
                                new TextRun({ text: "CAPABILITIES DEEP DIVE", size: 28, bold: true, color: C.geminiPurple }),
                                new TextRun({ text: " 🎨", size: 28 })
                            ] })]
                    })
                ]})]
            }),

            // Comparison table
            new Table({
                columnWidths: [2500, 2000, 2000, 2000, 1700],
                rows: [
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ children: [new TextRun({ text: "FEATURE", bold: true, color: C.bananaYellow, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NANO BANANA", bold: true, color: C.googleYellow, size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "DALL-E 3", bold: true, color: C.accentTeal, size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MIDJOURNEY 6", bold: true, color: C.accentPink, size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "FLUX 1.1", bold: true, color: C.accentOrange, size: 14 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Max Resolution", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "1A2A0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4K (4096px)", bold: true, color: C.googleGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1024px" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1792px" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2048px" })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Text Rendering", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "1A2A0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "EXCELLENT", bold: true, color: C.googleGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Good" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Poor" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Very Good" })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Multi-Image Input", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "1A2A0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "14 images", bold: true, color: C.googleGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1 image" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4 images" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1 image" })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Person Consistency", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "1A2A0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5 people", bold: true, color: C.googleGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Limited" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2 people" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1 person" })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Speed (avg)", size: 14 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "8-12 sec" })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "0A2A1A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5-8 sec", bold: true, color: C.accentTeal })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "30-60 sec" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3-5 sec" })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Free Tier", size: 14 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "1A2A0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3 free/day", bold: true, color: C.googleGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "None" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "None" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Limited" })] })] }),
                    ]}),
                ]
            }),

            // Use cases
            new Table({
                columnWidths: [5100, 5100],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.googleBlue), shading: { fill: "0A0A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: digitalArt, transformation: { width: 280, height: 160 } })] }),
                            new Paragraph({ children: [new TextRun({ text: "🎯 POPULAR USE CASES", bold: true, size: 18, color: C.googleBlue })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Product photography & mockups", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "3D figurine generation (viral!)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Marketing & advertising assets", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Book covers & posters", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Social media content", size: 14, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.googleRed), shading: { fill: "150A0A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🚫 LIMITATIONS", bold: true, size: 18, color: C.googleRed })] }),
                            new Paragraph({ numbering: { reference: "google-list", level: 0 }, children: [new TextRun({ text: "No explicit content generation", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "google-list", level: 0 }, children: [new TextRun({ text: "Celebrity likeness restrictions", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "google-list", level: 0 }, children: [new TextRun({ text: "Violence/gore blocked", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "google-list", level: 0 }, children: [new TextRun({ text: "Political content filtered", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "google-list", level: 0 }, children: [new TextRun({ text: "4K requires paid tier", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "google-list", level: 0 }, children: [new TextRun({ text: "Region restrictions (US/UK/etc)", size: 14, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // Viral trends
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.accentPink), shading: { fill: "1A0A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🔥 VIRAL NANO BANANA TRENDS (2025)", bold: true, size: 20, color: C.accentPink })] }),
                            new Paragraph({ spacing: { before: 50 },
                                children: [
                                    new TextRun({ text: "1. 3D Figurine Boxes ", bold: true, color: C.googleYellow }),
                                    new TextRun({ text: "- Turn yourself into a collectible toy in packaging  |  ", size: 14, color: C.white }),
                                    new TextRun({ text: "2. Album Cover Generator ", bold: true, color: C.googleYellow }),
                                    new TextRun({ text: "- Perfect typography for music art", size: 14, color: C.white }),
                                ] }),
                            new Paragraph({
                                children: [
                                    new TextRun({ text: "3. Product Mockups ", bold: true, color: C.googleYellow }),
                                    new TextRun({ text: "- Photorealistic product shots without studio  |  ", size: 14, color: C.white }),
                                    new TextRun({ text: "4. Movie Poster Style ", bold: true, color: C.googleYellow }),
                                    new TextRun({ text: "- Create cinematic posters", size: 14, color: C.white }),
                                ] }),
                        ] })
                ]})]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 3: HOW TO USE + PRICING
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.googleGreen), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 50 },
                            children: [
                                new TextRun({ text: "🚀 ", size: 28 }),
                                new TextRun({ text: "HOW TO USE NANO BANANA PRO", size: 28, bold: true, color: C.googleGreen }),
                                new TextRun({ text: " 🚀", size: 28 })
                            ] })]
                    })
                ]})]
            }),

            // Access methods
            new Table({
                columnWidths: [3400, 3400, 3400],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.googleBlue), shading: { fill: "0A0A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🌐 GEMINI APP", bold: true, size: 18, color: C.googleBlue })] }),
                            new Paragraph({ children: [new TextRun({ text: "gemini.google.com", size: 14, color: C.accentTeal })] }),
                            new Paragraph({ numbering: { reference: "step-list", level: 0 }, children: [new TextRun({ text: "Open Gemini app", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "step-list", level: 0 }, children: [new TextRun({ text: "Type image prompt", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "step-list", level: 0 }, children: [new TextRun({ text: "Click generate", size: 13, color: C.white })] }),
                            new Paragraph({ children: [new TextRun({ text: "3 free images/day", size: 12, color: C.googleYellow, bold: true })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.googleRed), shading: { fill: "150A0A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "💻 AI STUDIO", bold: true, size: 18, color: C.googleRed })] }),
                            new Paragraph({ children: [new TextRun({ text: "aistudio.google.com", size: 14, color: C.accentTeal })] }),
                            new Paragraph({ numbering: { reference: "step-list", level: 0 }, children: [new TextRun({ text: "Create API key", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "step-list", level: 0 }, children: [new TextRun({ text: "Select model", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "step-list", level: 0 }, children: [new TextRun({ text: "Use playground", size: 13, color: C.white })] }),
                            new Paragraph({ children: [new TextRun({ text: "Pay-per-generation", size: 12, color: C.googleYellow, bold: true })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.googleGreen), shading: { fill: "0A150A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🔧 API ACCESS", bold: true, size: 18, color: C.googleGreen })] }),
                            new Paragraph({ children: [new TextRun({ text: "ai.google.dev/api", size: 14, color: C.accentTeal })] }),
                            new Paragraph({ numbering: { reference: "step-list", level: 0 }, children: [new TextRun({ text: "Get API key", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "step-list", level: 0 }, children: [new TextRun({ text: "Install SDK", size: 13, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "step-list", level: 0 }, children: [new TextRun({ text: "Make API calls", size: 13, color: C.white })] }),
                            new Paragraph({ children: [new TextRun({ text: "~$0.15 per 4K image", size: 12, color: C.googleYellow, bold: true })] }),
                        ] }),
                ]})]
            }),

            // Pricing table
            new Table({
                columnWidths: [2550, 2550, 2550, 2550],
                rows: [
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TIER", bold: true, color: C.bananaYellow, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PRICE", bold: true, color: C.bananaYellow, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "RESOLUTION", bold: true, color: C.bananaYellow, size: 16 })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "FEATURES", bold: true, color: C.bananaYellow, size: 16 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "0A1A0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🆓 FREE", bold: true, color: C.googleGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$0" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1024x1024" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "3 images/day, watermark", size: 14 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "0A0A1A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "⭐ GEMINI ADV", bold: true, color: C.googleBlue })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$19.99/mo" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2K (2048px)" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Unlimited, no watermark", size: 14 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1A1A0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "👑 API PRO", bold: true, color: C.googleYellow })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Pay-per-use" })] })] }),
                        new TableCell({ borders: cellB, shading: { fill: "1A2A0A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4K (4096px)", bold: true, color: C.googleGreen })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "Full features, batch API", size: 14 })] })] }),
                    ]}),
                    new TableRow({ children: [
                        new TableCell({ borders: cellB, shading: { fill: "1A0A1A", type: ShadingType.CLEAR },
                            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🏢 ENTERPRISE", bold: true, color: C.geminiPurple })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Custom" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4K+" })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ children: [new TextRun({ text: "SLA, priority, custom training", size: 14 })] })] }),
                    ]}),
                ]
            }),

            // Prompt examples
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.bananaYellow), shading: { fill: "1A1505", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "✨ EXAMPLE PROMPTS THAT WORK GREAT", bold: true, size: 20, color: C.bananaYellow })] }),
                            new Paragraph({ spacing: { before: 50 },
                                children: [
                                    new TextRun({ text: "\"A 3D action figure of a software developer in a clear plastic box, professional packaging\"", italics: true, size: 14, color: C.white }),
                                ] }),
                            new Paragraph({
                                children: [
                                    new TextRun({ text: "\"Product photography of a coffee mug with 'Best Developer' text, on marble surface, studio lighting\"", italics: true, size: 14, color: C.white }),
                                ] }),
                            new Paragraph({
                                children: [
                                    new TextRun({ text: "\"Movie poster style, 'The Code Master' title text at top, cinematic, dramatic lighting, 4K\"", italics: true, size: 14, color: C.white }),
                                ] }),
                        ] })
                ]})]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 4: TECHNICAL DETAILS
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.deepMindBlue), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 50 },
                            children: [
                                new TextRun({ text: "🔬 ", size: 28 }),
                                new TextRun({ text: "TECHNICAL ARCHITECTURE", size: 28, bold: true, color: C.deepMindBlue }),
                                new TextRun({ text: " 🔬", size: 28 })
                            ] })]
                    })
                ]})]
            }),

            // Technical specs
            new Table({
                columnWidths: [5100, 5100],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.geminiPurple), shading: { fill: "100A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🧠 MODEL ARCHITECTURE", bold: true, size: 18, color: C.geminiPurple })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Built on Gemini 3 foundation", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Diffusion transformer backbone", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Multimodal understanding", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Text encoder integration", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Image encoder for inputs", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Trained on filtered dataset", size: 14, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.accentTeal), shading: { fill: "0A1515", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "⚙️ INFERENCE DETAILS", bold: true, size: 18, color: C.accentTeal })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "TPU v5 inference cluster", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "8-12 seconds avg (2K)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "15-20 seconds for 4K", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Classifier-free guidance", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Safety filtering layer", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "feature-list", level: 0 }, children: [new TextRun({ text: "Automatic watermarking", size: 14, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // Image
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: aiNetwork, transformation: { width: 550, height: 200 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 },
                                children: [new TextRun({ text: "Distributed inference across Google's TPU infrastructure", size: 14, italics: true, color: C.white })] }),
                        ] })
                ]})]
            }),

            // API example
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.googleGreen), shading: { fill: "0D1117", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "📋 API CODE EXAMPLE (Python)", bold: true, size: 18, color: C.googleGreen })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR }, spacing: { before: 50 },
                                children: [new TextRun({ text: "import google.generativeai as genai", size: 12, color: C.accentTeal, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "", size: 12, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "genai.configure(api_key='YOUR_KEY')", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "model = genai.ImageGenerationModel('nano-banana-pro')", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "", size: 12, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "response = model.generate_images(", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "    prompt='A futuristic cityscape at sunset, 4K quality',", size: 12, color: C.bananaYellow, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "    number_of_images=4,", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: "    aspect_ratio='16:9'", size: 12, color: C.white, font: "Consolas" })] }),
                            new Paragraph({ shading: { fill: "161B22", type: ShadingType.CLEAR },
                                children: [new TextRun({ text: ")", size: 12, color: C.white, font: "Consolas" })] }),
                        ] })
                ]})]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 5: FUTURE & CONCLUSION
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.bananaYellow), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50, after: 50 },
                            children: [
                                new TextRun({ text: "🔮 ", size: 28 }),
                                new TextRun({ text: "THE FUTURE OF AI IMAGE GENERATION", size: 28, bold: true, color: C.bananaYellow }),
                                new TextRun({ text: " 🔮", size: 28 })
                            ] })]
                    })
                ]})]
            }),

            // Roadmap
            new Table({
                columnWidths: [2550, 2550, 2550, 2550],
                rows: [
                    new TableRow({ children: [
                        new TableCell({ borders: thickB(C.googleBlue), shading: { fill: "0A0A15", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Q1 2026", bold: true, size: 20, color: C.googleBlue })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Video Generation", size: 14, color: C.white })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Short clips from text", size: 12, color: C.gray })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.googleRed), shading: { fill: "150A0A", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Q2 2026", bold: true, size: 20, color: C.googleRed })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3D Generation", size: 14, color: C.white })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3D models from text", size: 12, color: C.gray })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.googleYellow), shading: { fill: "15150A", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Q3 2026", bold: true, size: 20, color: C.googleYellow })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Real-time Edit", size: 14, color: C.darkBg })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Live image editing", size: 12, color: C.darkBg })] }),
                            ] }),
                        new TableCell({ borders: thickB(C.googleGreen), shading: { fill: "0A150A", type: ShadingType.CLEAR },
                            children: [
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2027+", bold: true, size: 20, color: C.googleGreen })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "8K Resolution", size: 14, color: C.white })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Cinema quality", size: 12, color: C.gray })] }),
                            ] }),
                    ]}),
                ]
            }),

            // Key takeaways
            new Table({
                columnWidths: [5100, 5100],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: thickB(C.googleGreen), shading: { fill: "0A150A", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "✅ WHY NANO BANANA PRO?", bold: true, size: 18, color: C.googleGreen })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Best text rendering in the industry", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "4K resolution output capability", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Multi-image fusion (14 inputs!)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Subject consistency (5 people)", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Free tier for testing", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Integrated with Google ecosystem", size: 14, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: thickB(C.geminiPurple), shading: { fill: "100A15", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "🎯 BEST USE CASES", bold: true, size: 18, color: C.geminiPurple })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Product mockups & photography", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Marketing materials with text", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Social media content creation", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Book covers & posters", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Consistent character art", size: 14, color: C.white })] }),
                            new Paragraph({ numbering: { reference: "star-list", level: 0 }, children: [new TextRun({ text: "Viral 3D figurine images", size: 14, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // Final image
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new ImageRun({ type: "jpg", data: aiFuturistic, transformation: { width: 500, height: 200 } })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 },
                                children: [new TextRun({ text: "The future of creative AI is here", size: 16, italics: true, color: C.white })] }),
                        ] })
                ]})]
            }),

            // Final stats
            new Table({
                columnWidths: [2550, 2550, 2550, 2550],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.googleBlue), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1B+", size: 36, bold: true, color: C.googleBlue })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Images Generated", size: 12, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: glowB(C.googleRed), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "100M+", size: 36, bold: true, color: C.googleRed })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Active Users", size: 12, color: C.white })] }),
                        ] }),
                    new TableCell({ borders: glowB(C.googleYellow), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "195", size: 36, bold: true, color: C.googleYellow })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Countries Available", size: 12, color: C.darkBg })] }),
                        ] }),
                    new TableCell({ borders: glowB(C.googleGreen), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "#1", size: 36, bold: true, color: C.googleGreen })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Text Rendering", size: 12, color: C.white })] }),
                        ] }),
                ]})]
            }),

            // Final footer
            new Table({
                columnWidths: [10200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: glowB(C.bananaYellow), shading: { fill: C.darkBg, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 50 },
                                children: [new TextRun({ text: "「 IMAGINE ANYTHING. CREATE EVERYTHING. 」", size: 24, bold: true, color: C.bananaYellow })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 },
                                children: [
                                    new TextRun({ text: "🍌🍌🍌 ", size: 14 }),
                                    new TextRun({ text: "NANO BANANA PRO © 2026 GOOGLE DEEPMIND", size: 14, color: C.white }),
                                    new TextRun({ text: " 🍌🍌🍌", size: 14 }),
                                ] }),
                        ] })
                ]})]
            }),
        ]
    }]
});

Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync('Nano_Banana_Pro_ULTRA_EXTREME.docx', buffer);
    console.log('✅ Nano Banana Pro ULTRA EXTREME document created!');
}).catch(err => console.error('Error:', err));
