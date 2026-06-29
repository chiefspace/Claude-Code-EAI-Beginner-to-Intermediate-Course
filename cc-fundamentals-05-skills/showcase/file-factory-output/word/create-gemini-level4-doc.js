const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, LevelFormat,
        BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber } = require('docx');
const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════════════════
// GOOGLE GEMINI - LEVEL 4 (COMPLEX) WORD DOCUMENT
// Dense but organized, multi-column layouts, comparison tables, 2-4 images
// ═══════════════════════════════════════════════════════════════════════════════

// Google Gemini Color Palette
const C = {
    googleBlue: "4285F4",
    googleRed: "EA4335",
    googleYellow: "FBBC04",
    googleGreen: "34A853",
    geminiPurple: "8E24AA",
    deepBlue: "1A237E",
    skyBlue: "E3F2FD",
    mintGreen: "E8F5E9",
    lavender: "F3E5F5",
    lightGray: "F5F5F5",
    charcoal: "202124",
    white: "FFFFFF",
};

// Border helpers
const border = (color = "DADCE0", size = 1) => ({ style: BorderStyle.SINGLE, size, color });
const cellB = { top: border(), bottom: border(), left: border(), right: border() };
const colorB = (c) => ({ top: border(c, 2), bottom: border(c, 2), left: border(c, 2), right: border(c, 2) });

// Load images
const geminiAi = fs.readFileSync('./images/gemini-ai.jpg');
const robotHand = fs.readFileSync('./images/robot-hand.jpg');
const dataMatrix = fs.readFileSync('./images/data-matrix.jpg');

const doc = new Document({
    styles: {
        default: { document: { run: { font: "Arial", size: 22 } } },
        paragraphStyles: [
            { id: "Title", name: "Title", basedOn: "Normal",
              run: { size: 56, bold: true, color: C.deepBlue, font: "Arial" },
              paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
            { id: "Heading1", name: "Heading 1", basedOn: "Normal",
              run: { size: 32, bold: true, color: C.googleBlue, font: "Arial" },
              paragraph: { spacing: { before: 300, after: 150 } } },
            { id: "Heading2", name: "Heading 2", basedOn: "Normal",
              run: { size: 26, bold: true, color: C.geminiPurple, font: "Arial" },
              paragraph: { spacing: { before: 200, after: 100 } } },
            { id: "Subtitle", name: "Subtitle", basedOn: "Normal",
              run: { size: 24, color: C.charcoal, font: "Arial" },
              paragraph: { spacing: { after: 150 }, alignment: AlignmentType.CENTER } },
        ]
    },
    numbering: {
        config: [
            { reference: "google-bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "●", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
            { reference: "check-bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "✓", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
            { reference: "numbered-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
        ]
    },
    sections: [{
        properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } },
        headers: {
            default: new Header({
                children: [new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                        new TextRun({ text: "Google ", size: 18, color: C.charcoal }),
                        new TextRun({ text: "G", size: 18, bold: true, color: C.googleBlue }),
                        new TextRun({ text: "e", size: 18, bold: true, color: C.googleRed }),
                        new TextRun({ text: "m", size: 18, bold: true, color: C.googleYellow }),
                        new TextRun({ text: "i", size: 18, bold: true, color: C.googleBlue }),
                        new TextRun({ text: "n", size: 18, bold: true, color: C.googleGreen }),
                        new TextRun({ text: "i", size: 18, bold: true, color: C.googleRed }),
                        new TextRun({ text: " Guide", size: 18, color: C.charcoal }),
                    ]
                })]
            })
        },
        footers: {
            default: new Footer({
                children: [new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({ text: "Page ", size: 18, color: C.charcoal }),
                        new TextRun({ children: [PageNumber.CURRENT], size: 18, bold: true, color: C.googleBlue }),
                        new TextRun({ text: " of ", size: 18, color: C.charcoal }),
                        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, bold: true, color: C.googleBlue }),
                    ]
                })]
            })
        },
        children: [
            // ═══════════════════════════════════════════════════════════════════
            // PAGE 1: TITLE + OVERVIEW
            // ═══════════════════════════════════════════════════════════════════

            // Title with Google colors
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [
                new TextRun({ text: "G", size: 72, bold: true, color: C.googleBlue }),
                new TextRun({ text: "o", size: 72, bold: true, color: C.googleRed }),
                new TextRun({ text: "o", size: 72, bold: true, color: C.googleYellow }),
                new TextRun({ text: "g", size: 72, bold: true, color: C.googleBlue }),
                new TextRun({ text: "l", size: 72, bold: true, color: C.googleGreen }),
                new TextRun({ text: "e", size: 72, bold: true, color: C.googleRed }),
            ] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [
                new TextRun({ text: "GEMINI", size: 64, bold: true, color: C.geminiPurple }),
            ] }),
            new Paragraph({ style: "Subtitle", children: [
                new TextRun("The Most Capable AI Model from Google DeepMind")
            ] }),

            // Hero image
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 200 }, children: [
                new ImageRun({ type: "jpg", data: geminiAi, transformation: { width: 450, height: 250 },
                    altText: { title: "Gemini AI", description: "AI visualization", name: "gemini" } })
            ] }),

            // Stats bar - 4 columns
            new Table({
                columnWidths: [2400, 2400, 2400, 2400],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: colorB(C.googleBlue), shading: { fill: C.skyBlue, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2M", bold: true, size: 36, color: C.googleBlue })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Token Context", size: 18, color: C.charcoal })] })
                        ] }),
                    new TableCell({ borders: colorB(C.googleRed), shading: { fill: "FFEBEE", type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "#1", bold: true, size: 36, color: C.googleRed })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MMLU Benchmark", size: 18, color: C.charcoal })] })
                        ] }),
                    new TableCell({ borders: colorB(C.googleGreen), shading: { fill: C.mintGreen, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "100+", bold: true, size: 36, color: C.googleGreen })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Languages", size: 18, color: C.charcoal })] })
                        ] }),
                    new TableCell({ borders: colorB(C.geminiPurple), shading: { fill: C.lavender, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Native", bold: true, size: 36, color: C.geminiPurple })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Multimodal", size: 18, color: C.charcoal })] })
                        ] }),
                ]})]
            }),

            // Overview section
            new Paragraph({ style: "Heading1", children: [new TextRun("What is Google Gemini?")] }),
            new Paragraph({ spacing: { after: 150 }, children: [
                new TextRun("Google Gemini is a family of multimodal AI models developed by Google DeepMind. It represents Google's most capable and general AI model, designed to understand and generate text, code, images, audio, and video natively.")
            ] }),

            // Two-column layout
            new Table({
                columnWidths: [4800, 4800],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, shading: { fill: C.lightGray, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Key Capabilities", bold: true, size: 24, color: C.googleBlue })] }),
                            new Paragraph({ numbering: { reference: "google-bullets", level: 0 }, children: [new TextRun("Text generation and understanding")] }),
                            new Paragraph({ numbering: { reference: "google-bullets", level: 0 }, children: [new TextRun("Code generation in 20+ languages")] }),
                            new Paragraph({ numbering: { reference: "google-bullets", level: 0 }, children: [new TextRun("Image analysis and generation")] }),
                            new Paragraph({ numbering: { reference: "google-bullets", level: 0 }, children: [new TextRun("Audio and video processing")] }),
                            new Paragraph({ numbering: { reference: "google-bullets", level: 0 }, children: [new TextRun("Mathematical reasoning")] }),
                        ] }),
                    new TableCell({ borders: cellB, shading: { fill: C.white, type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Model Variants", bold: true, size: 24, color: C.geminiPurple })] }),
                            new Paragraph({ numbering: { reference: "google-bullets", level: 0 }, children: [new TextRun({ text: "Gemini Ultra", bold: true }), new TextRun(" - Most capable")] }),
                            new Paragraph({ numbering: { reference: "google-bullets", level: 0 }, children: [new TextRun({ text: "Gemini Pro", bold: true }), new TextRun(" - Best for scaling")] }),
                            new Paragraph({ numbering: { reference: "google-bullets", level: 0 }, children: [new TextRun({ text: "Gemini Flash", bold: true }), new TextRun(" - Fast & efficient")] }),
                            new Paragraph({ numbering: { reference: "google-bullets", level: 0 }, children: [new TextRun({ text: "Gemini Nano", bold: true }), new TextRun(" - On-device")] }),
                        ] }),
                ]})]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 2: MODEL COMPARISON
            // ═══════════════════════════════════════════════════════════════════

            new Paragraph({ pageBreakBefore: true, style: "Heading1", children: [new TextRun("Model Comparison")] }),
            new Paragraph({ spacing: { after: 200 }, children: [
                new TextRun("Compare Gemini models to choose the right one for your use case.")
            ] }),

            // Comparison table
            new Table({
                columnWidths: [2000, 2400, 2400, 2400],
                rows: [
                    // Header row
                    new TableRow({ children: [
                        new TableCell({ shading: { fill: C.charcoal, type: ShadingType.CLEAR }, borders: cellB, children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Feature", bold: true, color: C.white })] })
                        ] }),
                        new TableCell({ shading: { fill: C.googleBlue, type: ShadingType.CLEAR }, borders: cellB, children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Gemini Ultra", bold: true, color: C.white })] })
                        ] }),
                        new TableCell({ shading: { fill: C.geminiPurple, type: ShadingType.CLEAR }, borders: cellB, children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Gemini Pro", bold: true, color: C.white })] })
                        ] }),
                        new TableCell({ shading: { fill: C.googleGreen, type: ShadingType.CLEAR }, borders: cellB, children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Gemini Flash", bold: true, color: C.white })] })
                        ] }),
                    ] }),
                    // Data rows
                    new TableRow({ children: [
                        new TableCell({ shading: { fill: C.lightGray, type: ShadingType.CLEAR }, borders: cellB, children: [
                            new Paragraph({ children: [new TextRun({ text: "Context Window", bold: true })] })
                        ] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("2M tokens")] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("1M tokens")] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("1M tokens")] })] }),
                    ] }),
                    new TableRow({ children: [
                        new TableCell({ shading: { fill: C.lightGray, type: ShadingType.CLEAR }, borders: cellB, children: [
                            new Paragraph({ children: [new TextRun({ text: "Speed", bold: true })] })
                        ] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Standard")] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Fast")] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ultra Fast", bold: true, color: C.googleGreen })] })] }),
                    ] }),
                    new TableRow({ children: [
                        new TableCell({ shading: { fill: C.lightGray, type: ShadingType.CLEAR }, borders: cellB, children: [
                            new Paragraph({ children: [new TextRun({ text: "Reasoning", bold: true })] })
                        ] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Best", bold: true, color: C.googleBlue })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Excellent")] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Good")] })] }),
                    ] }),
                    new TableRow({ children: [
                        new TableCell({ shading: { fill: C.lightGray, type: ShadingType.CLEAR }, borders: cellB, children: [
                            new Paragraph({ children: [new TextRun({ text: "Multimodal", bold: true })] })
                        ] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "✓", color: C.googleGreen, size: 28 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "✓", color: C.googleGreen, size: 28 })] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "✓", color: C.googleGreen, size: 28 })] })] }),
                    ] }),
                    new TableRow({ children: [
                        new TableCell({ shading: { fill: C.lightGray, type: ShadingType.CLEAR }, borders: cellB, children: [
                            new Paragraph({ children: [new TextRun({ text: "Best For", bold: true })] })
                        ] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Complex tasks")] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("General use")] })] }),
                        new TableCell({ borders: cellB, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("High volume")] })] }),
                    ] }),
                ]
            }),

            // Image + text section
            new Paragraph({ style: "Heading2", children: [new TextRun("Multimodal Understanding")] }),
            new Table({
                columnWidths: [4800, 4800],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: cellB, children: [
                        new Paragraph({ alignment: AlignmentType.CENTER, children: [
                            new ImageRun({ type: "jpg", data: robotHand, transformation: { width: 280, height: 180 },
                                altText: { title: "AI", description: "Robot hand", name: "robot" } })
                        ] }),
                    ] }),
                    new TableCell({ borders: cellB, verticalAlign: VerticalAlign.CENTER, children: [
                        new Paragraph({ children: [new TextRun("Gemini can process and understand multiple types of input simultaneously:")] }),
                        new Paragraph({ numbering: { reference: "check-bullets", level: 0 }, children: [new TextRun("Images and photographs")] }),
                        new Paragraph({ numbering: { reference: "check-bullets", level: 0 }, children: [new TextRun("Videos and audio files")] }),
                        new Paragraph({ numbering: { reference: "check-bullets", level: 0 }, children: [new TextRun("Code and documents")] }),
                        new Paragraph({ numbering: { reference: "check-bullets", level: 0 }, children: [new TextRun("Charts and diagrams")] }),
                    ] }),
                ]})]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 3: USE CASES + GETTING STARTED
            // ═══════════════════════════════════════════════════════════════════

            new Paragraph({ pageBreakBefore: true, style: "Heading1", children: [new TextRun("Use Cases")] }),

            // Use cases in 3 columns
            new Table({
                columnWidths: [3200, 3200, 3200],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: colorB(C.googleBlue), shading: { fill: C.skyBlue, type: ShadingType.CLEAR },
                        verticalAlign: VerticalAlign.TOP, children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🔍", size: 36 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Research", bold: true, size: 24, color: C.googleBlue })] }),
                            new Paragraph({ children: [new TextRun("Analyze documents, summarize papers, and extract insights from large datasets.")] }),
                        ] }),
                    new TableCell({ borders: colorB(C.googleGreen), shading: { fill: C.mintGreen, type: ShadingType.CLEAR },
                        verticalAlign: VerticalAlign.TOP, children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "💻", size: 36 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Development", bold: true, size: 24, color: C.googleGreen })] }),
                            new Paragraph({ children: [new TextRun("Generate code, debug issues, and build applications faster with AI assistance.")] }),
                        ] }),
                    new TableCell({ borders: colorB(C.geminiPurple), shading: { fill: C.lavender, type: ShadingType.CLEAR },
                        verticalAlign: VerticalAlign.TOP, children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🎨", size: 36 })] }),
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Creative", bold: true, size: 24, color: C.geminiPurple })] }),
                            new Paragraph({ children: [new TextRun("Create content, generate images, and brainstorm ideas with multimodal AI.")] }),
                        ] }),
                ]})]
            }),

            new Paragraph({ style: "Heading1", children: [new TextRun("Getting Started")] }),
            new Paragraph({ spacing: { after: 150 }, children: [
                new TextRun("Follow these steps to start using Google Gemini in your projects:")
            ] }),

            // Steps
            new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [
                new TextRun({ text: "Create a Google Cloud account", bold: true }),
                new TextRun(" - Sign up at cloud.google.com")
            ] }),
            new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [
                new TextRun({ text: "Enable the Gemini API", bold: true }),
                new TextRun(" - Navigate to AI Platform and enable the API")
            ] }),
            new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [
                new TextRun({ text: "Get your API key", bold: true }),
                new TextRun(" - Generate credentials in the console")
            ] }),
            new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [
                new TextRun({ text: "Install the SDK", bold: true }),
                new TextRun(" - pip install google-generativeai")
            ] }),
            new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, children: [
                new TextRun({ text: "Start building", bold: true }),
                new TextRun(" - Use the code examples below")
            ] }),

            // Code example
            new Paragraph({ style: "Heading2", children: [new TextRun("Quick Start Code")] }),
            new Table({
                columnWidths: [9600],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: colorB(C.charcoal), shading: { fill: "1E1E1E", type: ShadingType.CLEAR }, children: [
                        new Paragraph({ children: [new TextRun({ text: "import google.generativeai as genai", color: C.googleGreen, font: "Consolas", size: 18 })] }),
                        new Paragraph({ children: [new TextRun({ text: "", font: "Consolas", size: 18 })] }),
                        new Paragraph({ children: [new TextRun({ text: "genai.configure(api_key='YOUR_API_KEY')", color: C.googleYellow, font: "Consolas", size: 18 })] }),
                        new Paragraph({ children: [new TextRun({ text: "model = genai.GenerativeModel('gemini-pro')", color: C.white, font: "Consolas", size: 18 })] }),
                        new Paragraph({ children: [new TextRun({ text: "", font: "Consolas", size: 18 })] }),
                        new Paragraph({ children: [new TextRun({ text: "response = model.generate_content('Hello, Gemini!')", color: C.skyBlue, font: "Consolas", size: 18 })] }),
                        new Paragraph({ children: [new TextRun({ text: "print(response.text)", color: C.lavender, font: "Consolas", size: 18 })] }),
                    ] })
                ]})]
            }),

            // Final callout
            new Paragraph({ spacing: { before: 300 } }),
            new Table({
                columnWidths: [9600],
                rows: [new TableRow({ children: [
                    new TableCell({ borders: colorB(C.geminiPurple), shading: { fill: C.lavender, type: ShadingType.CLEAR }, children: [
                        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100, after: 100 }, children: [
                            new TextRun({ text: "Ready to build with Gemini? ", size: 24, color: C.charcoal }),
                            new TextRun({ text: "Visit ai.google.dev", size: 24, bold: true, color: C.geminiPurple }),
                        ] })
                    ] })
                ]})]
            }),
        ]
    }]
});

// Generate document
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("Google_Gemini_Level4_Guide.docx", buffer);
    console.log("✅ Google Gemini Level 4 document created!");
});
