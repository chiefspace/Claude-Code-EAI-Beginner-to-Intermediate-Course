const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, LevelFormat,
        BorderStyle, WidthType, ShadingType, PageNumber,
        PageBreak } = require('docx');
const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════════════════
// CULINARY ARTS & HEALTHY LIVING - EXTREME WORD DOCUMENT SHOWCASE
// ═══════════════════════════════════════════════════════════════════════════════

// Color Palette - Warm, Organic Food Theme
const COLORS = {
    tomato: "E74C3C",       // Tomato Red
    orange: "E67E22",       // Carrot Orange
    lemon: "F1C40F",        // Lemon Yellow
    basil: "27AE60",        // Fresh Basil Green
    eggplant: "8E44AD",     // Eggplant Purple
    chocolate: "5D4037",    // Chocolate Brown
    cream: "FFFEF0",        // Cream Background
    sage: "9CAF88",         // Sage Green
    olive: "808000",        // Olive
    warmGray: "4A4A4A",     // Warm Gray
};

// Border helpers
const createBorder = (color = "E8E8E8", size = 1) => ({
    style: BorderStyle.SINGLE, size, color
});

const cellBorders = {
    top: createBorder(), bottom: createBorder(),
    left: createBorder(), right: createBorder()
};

const decorativeBorders = {
    top: createBorder(COLORS.basil, 2),
    bottom: createBorder(COLORS.basil, 2),
    left: createBorder(COLORS.basil, 2),
    right: createBorder(COLORS.basil, 2)
};

// Load images
const cookingImg = fs.readFileSync('./images/cooking.jpg');
const healthyFoodImg = fs.readFileSync('./images/healthy-food.jpg');

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
            // Elegant Recipe Title
            { id: "RecipeTitle", name: "Recipe Title", basedOn: "Normal",
              run: { size: 60, bold: true, color: COLORS.chocolate, font: "Playfair Display" },
              paragraph: { spacing: { before: 0, after: 100 }, alignment: AlignmentType.CENTER }
            },
            // Section Header
            { id: "ChefHeader", name: "Chef Header", basedOn: "Normal",
              run: { size: 32, bold: true, color: COLORS.basil, font: "Arial" },
              paragraph: { spacing: { before: 400, after: 200 } }
            },
            // Ingredient Style
            { id: "Ingredient", name: "Ingredient", basedOn: "Normal",
              run: { size: 22, color: COLORS.warmGray, font: "Georgia" },
              paragraph: { spacing: { before: 50, after: 50 } }
            },
            // Chef Tip
            { id: "ChefTip", name: "Chef Tip", basedOn: "Normal",
              run: { size: 22, italics: true, color: COLORS.orange, font: "Georgia" },
              paragraph: { spacing: { before: 200, after: 200 }, indent: { left: 360, right: 360 } }
            },
            // Nutrition Label
            { id: "NutritionLabel", name: "Nutrition Label", basedOn: "Normal",
              run: { size: 18, font: "Arial", color: COLORS.warmGray },
              paragraph: { spacing: { before: 50, after: 50 } }
            },
        ]
    },
    numbering: {
        config: [
            { reference: "recipe-steps",
              levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } },
                        run: { bold: true, color: COLORS.tomato } } }]
            },
            { reference: "ingredient-list",
              levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
            },
            { reference: "health-tips",
              levels: [{ level: 0, format: LevelFormat.BULLET, text: "✓", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
            },
            { reference: "shopping-list",
              levels: [{ level: 0, format: LevelFormat.BULLET, text: "□", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
            },
            { reference: "meal-plan-list",
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
                        new TextRun({ text: "🍳 ", size: 20 }),
                        new TextRun({ text: "CULINARY ARTS & HEALTHY LIVING", bold: true, size: 18, color: COLORS.basil }),
                        new TextRun({ text: " 🥗", size: 20 }),
                    ]
                })]
            })
        },
        footers: {
            default: new Footer({
                children: [new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({ text: "❦ ", color: COLORS.sage }),
                        new TextRun({ text: "Page ", size: 18 }),
                        new TextRun({ children: [PageNumber.CURRENT], size: 18, bold: true }),
                        new TextRun({ text: " of ", size: 18 }),
                        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, bold: true }),
                        new TextRun({ text: " ❦", color: COLORS.sage }),
                    ]
                })]
            })
        },
        children: [
            // ═══════════════════════════════════════════════════════════════════
            // PAGE 1: ELEGANT COVER PAGE
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ spacing: { before: 300 }, children: [] }),

            // Decorative flourish
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧", color: COLORS.sage, size: 28 })]
            }),

            // Main Title
            new Paragraph({
                style: "RecipeTitle",
                spacing: { before: 200 },
                children: [new TextRun({ text: "CULINARY ARTS", font: "Times New Roman" })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "&", size: 48, italics: true, color: COLORS.sage, font: "Georgia" })]
            }),
            new Paragraph({
                style: "RecipeTitle",
                spacing: { before: 0, after: 200 },
                children: [new TextRun({ text: "HEALTHY LIVING", color: COLORS.basil, font: "Times New Roman" })]
            }),

            // Decorative flourish
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧", color: COLORS.sage, size: 28 })]
            }),

            // Subtitle
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 200, after: 300 },
                children: [new TextRun({ text: "A Complete Guide to Nourishing Body & Soul", italics: true, size: 26, color: COLORS.chocolate, font: "Georgia" })]
            }),

            // Hero Image
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 200 },
                children: [new ImageRun({
                    type: "jpg",
                    data: cookingImg,
                    transformation: { width: 450, height: 300 }
                })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
                children: [new TextRun({ text: "\"Let food be thy medicine and medicine be thy food.\" — Hippocrates", italics: true, size: 18, color: "888888" })]
            }),

            // Quick Stats Boxes
            new Paragraph({
                spacing: { before: 100, after: 100 },
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "WHAT'S INSIDE", bold: true, size: 24, color: COLORS.chocolate })]
            }),

            new Table({
                columnWidths: [2340, 2340, 2340, 2340],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ borders: decorativeBorders, shading: { fill: "FFF5F5", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 },
                                        children: [new TextRun({ text: "🍽️", size: 40 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER,
                                        children: [new TextRun({ text: "25+", bold: true, size: 32, color: COLORS.tomato })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
                                        children: [new TextRun({ text: "Recipes", size: 18 })] })
                                ] }),
                            new TableCell({ borders: decorativeBorders, shading: { fill: "FFF8E7", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 },
                                        children: [new TextRun({ text: "📅", size: 40 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER,
                                        children: [new TextRun({ text: "4-Week", bold: true, size: 32, color: COLORS.orange })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
                                        children: [new TextRun({ text: "Meal Plan", size: 18 })] })
                                ] }),
                            new TableCell({ borders: decorativeBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 },
                                        children: [new TextRun({ text: "💪", size: 40 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER,
                                        children: [new TextRun({ text: "100%", bold: true, size: 32, color: COLORS.basil })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
                                        children: [new TextRun({ text: "Whole Foods", size: 18 })] })
                                ] }),
                            new TableCell({ borders: decorativeBorders, shading: { fill: "FAF5FF", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 },
                                        children: [new TextRun({ text: "⏱️", size: 40 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER,
                                        children: [new TextRun({ text: "30 min", bold: true, size: 32, color: COLORS.eggplant })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
                                        children: [new TextRun({ text: "Average Cook", size: 18 })] })
                                ] }),
                        ]
                    })
                ]
            }),

            // Edition
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 300 },
                children: [
                    new TextRun({ text: "SPRING/SUMMER EDITION  •  ", size: 18, color: COLORS.basil }),
                    new TextRun({ text: "2026", bold: true, size: 18, color: COLORS.orange }),
                ]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 2: SIGNATURE RECIPE - Mediterranean Bowl
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Paragraph({
                style: "ChefHeader",
                children: [
                    new TextRun({ text: "🥙 ", size: 32 }),
                    new TextRun({ text: "SIGNATURE RECIPE" })
                ]
            }),

            // Recipe Title
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 100, after: 100 },
                children: [new TextRun({ text: "Mediterranean Power Bowl", bold: true, size: 40, color: COLORS.chocolate, font: "Georgia" })]
            }),

            // Recipe Meta Info
            new Table({
                columnWidths: [2340, 2340, 2340, 2340],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF8E7", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "⏱️ PREP", bold: true, size: 18, color: COLORS.orange })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "15 mins", size: 20 })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF5F5", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🔥 COOK", bold: true, size: 18, color: COLORS.tomato })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "20 mins", size: 20 })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "👥 SERVES", bold: true, size: 18, color: COLORS.basil })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4 people", size: 20 })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FAF5FF", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "📊 LEVEL", bold: true, size: 18, color: COLORS.eggplant })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Easy", size: 20 })] })
                                ] }),
                        ]
                    })
                ]
            }),

            // Two column layout for ingredients and instructions
            new Table({
                columnWidths: [4000, 5360],
                rows: [
                    new TableRow({
                        children: [
                            // Ingredients Column
                            new TableCell({ borders: cellBorders, shading: { fill: "FFFEF8", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "INGREDIENTS", bold: true, size: 24, color: COLORS.basil })] }),
                                    new Paragraph({ children: [new TextRun({ text: "Base:", bold: true, color: COLORS.chocolate, size: 20 })] }),
                                    new Paragraph({ numbering: { reference: "ingredient-list", level: 0 }, children: [new TextRun({ text: "2 cups quinoa, cooked", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "ingredient-list", level: 0 }, children: [new TextRun({ text: "1 can chickpeas, drained", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "ingredient-list", level: 0 }, children: [new TextRun({ text: "2 cups mixed greens", size: 18 })] }),
                                    new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Toppings:", bold: true, color: COLORS.chocolate, size: 20 })] }),
                                    new Paragraph({ numbering: { reference: "ingredient-list", level: 0 }, children: [new TextRun({ text: "1 cucumber, diced", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "ingredient-list", level: 0 }, children: [new TextRun({ text: "1 cup cherry tomatoes", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "ingredient-list", level: 0 }, children: [new TextRun({ text: "½ red onion, sliced", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "ingredient-list", level: 0 }, children: [new TextRun({ text: "½ cup feta cheese", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "ingredient-list", level: 0 }, children: [new TextRun({ text: "¼ cup kalamata olives", size: 18 })] }),
                                    new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: "Dressing:", bold: true, color: COLORS.chocolate, size: 20 })] }),
                                    new Paragraph({ numbering: { reference: "ingredient-list", level: 0 }, children: [new TextRun({ text: "3 tbsp olive oil", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "ingredient-list", level: 0 }, children: [new TextRun({ text: "2 tbsp lemon juice", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "ingredient-list", level: 0 }, children: [new TextRun({ text: "1 clove garlic, minced", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "ingredient-list", level: 0 }, spacing: { after: 200 }, children: [new TextRun({ text: "Fresh herbs to taste", size: 18 })] }),
                                ] }),
                            // Instructions Column
                            new TableCell({ borders: cellBorders,
                                children: [
                                    new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "INSTRUCTIONS", bold: true, size: 24, color: COLORS.tomato })] }),
                                    new Paragraph({ numbering: { reference: "recipe-steps", level: 0 }, spacing: { before: 100 },
                                        children: [new TextRun({ text: "Cook quinoa according to package directions. Fluff with fork and let cool slightly.", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "recipe-steps", level: 0 },
                                        children: [new TextRun({ text: "Roast chickpeas at 400°F for 20 minutes until crispy. Season with cumin and paprika.", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "recipe-steps", level: 0 },
                                        children: [new TextRun({ text: "Whisk together olive oil, lemon juice, minced garlic, salt, and oregano for dressing.", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "recipe-steps", level: 0 },
                                        children: [new TextRun({ text: "Divide greens among 4 bowls. Top with quinoa as the base layer.", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "recipe-steps", level: 0 },
                                        children: [new TextRun({ text: "Arrange cucumber, tomatoes, onion, feta, and olives in sections on top.", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "recipe-steps", level: 0 },
                                        children: [new TextRun({ text: "Add crispy chickpeas and drizzle generously with lemon dressing.", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "recipe-steps", level: 0 }, spacing: { after: 100 },
                                        children: [new TextRun({ text: "Garnish with fresh herbs and serve immediately.", size: 18 })] }),
                                    // Chef Tip Box
                                    new Paragraph({ spacing: { before: 200, after: 200 },
                                        shading: { fill: "FFF8E7", type: ShadingType.CLEAR },
                                        children: [
                                            new TextRun({ text: "👨‍🍳 CHEF'S TIP: ", bold: true, color: COLORS.orange }),
                                            new TextRun({ text: "Make extra dressing - it keeps for a week and works on any salad!", italics: true })
                                        ] }),
                                ] }),
                        ]
                    })
                ]
            }),

            // Nutrition Facts
            new Paragraph({
                spacing: { before: 300, after: 100 },
                children: [new TextRun({ text: "NUTRITION FACTS (per serving)", bold: true, size: 22, color: COLORS.warmGray })]
            }),

            new Table({
                columnWidths: [1872, 1872, 1872, 1872, 1872],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F8F8F8", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CALORIES", size: 16, color: "888888" })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "485", bold: true, size: 28, color: COLORS.tomato })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F8F8F8", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PROTEIN", size: 16, color: "888888" })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "18g", bold: true, size: 28, color: COLORS.basil })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F8F8F8", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CARBS", size: 16, color: "888888" })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "52g", bold: true, size: 28, color: COLORS.orange })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F8F8F8", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "FAT", size: 16, color: "888888" })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "22g", bold: true, size: 28, color: COLORS.eggplant })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F8F8F8", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "FIBER", size: 16, color: "888888" })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "9g", bold: true, size: 28, color: COLORS.chocolate })] })
                                ] }),
                        ]
                    })
                ]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 3: WEEKLY MEAL PREP PLANNER
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Paragraph({
                style: "ChefHeader",
                children: [
                    new TextRun({ text: "📅 ", size: 32 }),
                    new TextRun({ text: "WEEKLY MEAL PREP PLANNER", color: COLORS.orange })
                ]
            }),

            new Paragraph({
                spacing: { before: 0, after: 300 },
                children: [new TextRun({ text: "A balanced week of delicious, nutritious meals", italics: true, color: "666666", size: 22 })]
            }),

            // Weekly Schedule
            new Table({
                columnWidths: [1400, 2200, 2200, 2200, 1360],
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.basil, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "DAY", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.lemon, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🌅 BREAKFAST", bold: true, color: COLORS.chocolate })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.orange, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "☀️ LUNCH", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.eggplant, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🌙 DINNER", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.tomato, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CALS", bold: true, color: "FFFFFF" })] })] }),
                        ]
                    }),
                    // Monday
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "MON", bold: true, color: COLORS.basil })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "Greek Yogurt Parfait + Berries", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFFEF8", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "Mediterranean Bowl", size: 18, bold: true })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "Grilled Salmon + Veggies", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F8F8F8", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1,650", bold: true })] })] }),
                        ]
                    }),
                    // Tuesday
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "TUE", bold: true, color: COLORS.basil })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "Avocado Toast + Eggs", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "Quinoa Salad + Chicken", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFFEF8", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "Veggie Stir-Fry + Tofu", size: 18, bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F8F8F8", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1,580", bold: true })] })] }),
                        ]
                    }),
                    // Wednesday
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "WED", bold: true, color: COLORS.basil })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFFEF8", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "Smoothie Bowl", size: 18, bold: true })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "Turkey Wrap + Hummus", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "Baked Cod + Sweet Potato", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F8F8F8", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1,520", bold: true })] })] }),
                        ]
                    }),
                    // Thursday
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "THU", bold: true, color: COLORS.basil })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "Overnight Oats + Nuts", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFFEF8", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "Buddha Bowl", size: 18, bold: true })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "Chicken Breast + Quinoa", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F8F8F8", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1,690", bold: true })] })] }),
                        ]
                    }),
                    // Friday
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "FRI", bold: true, color: COLORS.basil })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "Veggie Omelette + Toast", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders,
                                children: [new Paragraph({ children: [new TextRun({ text: "Lentil Soup + Salad", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFFEF8", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "Grilled Shrimp Tacos", size: 18, bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F8F8F8", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1,610", bold: true })] })] }),
                        ]
                    }),
                    // Weekend
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "SAT", bold: true, color: COLORS.orange })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "Pancakes + Fresh Fruit", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "Poke Bowl", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "Date Night: Pasta!", size: 18, italics: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1,850", bold: true })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "SUN", bold: true, color: COLORS.orange })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "Brunch: Eggs Benedict", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "Light: Soup + Bread", size: 18 })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "Meal Prep Sunday!", size: 18, bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1,720", bold: true })] })] }),
                        ]
                    }),
                ]
            }),

            // Shopping List Section
            new Paragraph({
                spacing: { before: 400, after: 200 },
                children: [new TextRun({ text: "WEEKLY SHOPPING LIST", bold: true, size: 26, color: COLORS.chocolate })]
            }),

            new Table({
                columnWidths: [3120, 3120, 3120],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "🥬 PRODUCE", bold: true, color: COLORS.basil })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Mixed greens (2 bags)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Tomatoes (1 lb)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Cucumbers (3)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Avocados (4)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Berries (2 pints)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Lemons (6)", size: 18 })] }),
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF5F5", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "🥩 PROTEINS", bold: true, color: COLORS.tomato })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Salmon fillets (4)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Chicken breast (2 lbs)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Eggs (18)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Greek yogurt (32 oz)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Feta cheese (8 oz)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Tofu (1 block)", size: 18 })] }),
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF8E7", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "🌾 PANTRY", bold: true, color: COLORS.orange })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Quinoa (2 lbs)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Olive oil", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Chickpeas (2 cans)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Lentils (1 bag)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Oats (1 container)", size: 18 })] }),
                                    new Paragraph({ numbering: { reference: "shopping-list", level: 0 }, children: [new TextRun({ text: "Mixed nuts (1 bag)", size: 18 })] }),
                                ] }),
                        ]
                    })
                ]
            }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 4: HEALTH METRICS DASHBOARD
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Paragraph({
                style: "ChefHeader",
                children: [
                    new TextRun({ text: "💪 ", size: 32 }),
                    new TextRun({ text: "HEALTH METRICS DASHBOARD", color: COLORS.eggplant })
                ]
            }),

            new Paragraph({
                spacing: { before: 0, after: 300 },
                children: [new TextRun({ text: "Track your wellness journey with these key indicators", italics: true, color: "666666", size: 22 })]
            }),

            // Healthy Food Image
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 100 },
                children: [new ImageRun({
                    type: "jpg",
                    data: healthyFoodImg,
                    transformation: { width: 500, height: 280 }
                })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
                children: [new TextRun({ text: "Fresh, colorful ingredients are the foundation of good health", italics: true, size: 18, color: "888888" })]
            }),

            // Daily Nutrient Targets
            new Paragraph({
                spacing: { before: 200, after: 100 },
                children: [new TextRun({ text: "DAILY NUTRIENT TARGETS", bold: true, size: 24, color: COLORS.chocolate })]
            }),

            new Table({
                columnWidths: [2340, 2000, 2000, 1500, 1520],
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.chocolate, type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "NUTRIENT", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.chocolate, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TARGET", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.chocolate, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "YOUR INTAKE", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.chocolate, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "%", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.chocolate, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "STATUS", bold: true, color: "FFFFFF" })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Calories", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2,000" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1,850", color: COLORS.basil })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "93%", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "✓ Good", color: COLORS.basil, bold: true })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Protein", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "50g" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "65g", color: COLORS.basil })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "130%", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "★ Great", color: COLORS.basil, bold: true })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Fiber", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "25g" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "18g", color: COLORS.orange })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "72%", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "↑ More", color: COLORS.orange, bold: true })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Water", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "8 glasses" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "6 glasses", color: COLORS.orange })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "75%", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF3C7", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "↑ More", color: COLORS.orange, bold: true })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Vegetables", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5 servings" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "7 servings", color: COLORS.basil })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "140%", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "★ Great", color: COLORS.basil, bold: true })] })] }),
                        ]
                    }),
                ]
            }),

            // Health Tips
            new Paragraph({
                spacing: { before: 400, after: 200 },
                children: [new TextRun({ text: "WELLNESS WISDOM", bold: true, size: 24, color: COLORS.basil })]
            }),

            new Paragraph({ numbering: { reference: "health-tips", level: 0 },
                children: [new TextRun({ text: "Eat the rainbow - include fruits and vegetables of every color daily", size: 20 })] }),
            new Paragraph({ numbering: { reference: "health-tips", level: 0 },
                children: [new TextRun({ text: "Stay hydrated - drink water before every meal", size: 20 })] }),
            new Paragraph({ numbering: { reference: "health-tips", level: 0 },
                children: [new TextRun({ text: "Practice mindful eating - chew slowly and enjoy every bite", size: 20 })] }),
            new Paragraph({ numbering: { reference: "health-tips", level: 0 },
                children: [new TextRun({ text: "Prep on Sundays - success is in the planning", size: 20 })] }),
            new Paragraph({ numbering: { reference: "health-tips", level: 0 },
                children: [new TextRun({ text: "Balance, not perfection - one indulgent meal won't undo progress", size: 20 })] }),

            // ═══════════════════════════════════════════════════════════════════
            // PAGE 5: KITCHEN REFERENCE GUIDE
            // ═══════════════════════════════════════════════════════════════════
            new Paragraph({ children: [new PageBreak()] }),

            new Paragraph({
                style: "ChefHeader",
                children: [
                    new TextRun({ text: "📖 ", size: 32 }),
                    new TextRun({ text: "KITCHEN REFERENCE GUIDE", color: COLORS.tomato })
                ]
            }),

            new Paragraph({
                spacing: { before: 0, after: 300 },
                children: [new TextRun({ text: "Essential measurements, temperatures, and conversions", italics: true, color: "666666", size: 22 })]
            }),

            // Measurement Conversions
            new Paragraph({
                spacing: { before: 100, after: 100 },
                children: [new TextRun({ text: "MEASUREMENT CONVERSIONS", bold: true, size: 22, color: COLORS.chocolate })]
            }),

            new Table({
                columnWidths: [3120, 3120, 3120],
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.tomato, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "VOLUME", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.orange, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "WEIGHT", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.basil, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TEMPERATURE", bold: true, color: "FFFFFF" })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF5F5", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "1 cup = 16 tbsp", size: 18 })] }),
                                    new Paragraph({ children: [new TextRun({ text: "1 cup = 8 fl oz", size: 18 })] }),
                                    new Paragraph({ children: [new TextRun({ text: "1 tbsp = 3 tsp", size: 18 })] }),
                                    new Paragraph({ children: [new TextRun({ text: "1 quart = 4 cups", size: 18 })] }),
                                    new Paragraph({ children: [new TextRun({ text: "1 gallon = 4 quarts", size: 18 })] }),
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF8E7", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "1 oz = 28g", size: 18 })] }),
                                    new Paragraph({ children: [new TextRun({ text: "1 lb = 454g", size: 18 })] }),
                                    new Paragraph({ children: [new TextRun({ text: "1 kg = 2.2 lbs", size: 18 })] }),
                                    new Paragraph({ children: [new TextRun({ text: "1 stick butter = 113g", size: 18 })] }),
                                    new Paragraph({ children: [new TextRun({ text: "1 cup flour = 125g", size: 18 })] }),
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ children: [new TextRun({ text: "°F to °C: (F-32) × 5/9", size: 18 })] }),
                                    new Paragraph({ children: [new TextRun({ text: "325°F = 165°C", size: 18 })] }),
                                    new Paragraph({ children: [new TextRun({ text: "350°F = 175°C", size: 18 })] }),
                                    new Paragraph({ children: [new TextRun({ text: "375°F = 190°C", size: 18 })] }),
                                    new Paragraph({ children: [new TextRun({ text: "400°F = 200°C", size: 18 })] }),
                                ] }),
                        ]
                    })
                ]
            }),

            // Internal Cooking Temperatures
            new Paragraph({
                spacing: { before: 300, after: 100 },
                children: [new TextRun({ text: "🌡️ INTERNAL COOKING TEMPERATURES", bold: true, size: 22, color: COLORS.tomato })]
            }),

            new Table({
                columnWidths: [3500, 2000, 2000, 1860],
                rows: [
                    new TableRow({
                        tableHeader: true,
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.eggplant, type: ShadingType.CLEAR },
                                children: [new Paragraph({ children: [new TextRun({ text: "FOOD", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.eggplant, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TEMP (°F)", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.eggplant, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TEMP (°C)", bold: true, color: "FFFFFF" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: COLORS.eggplant, type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NOTES", bold: true, color: "FFFFFF" })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "🐔 Chicken/Poultry" })] })] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FEF2F2", type: ShadingType.CLEAR },
                                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "165°F", bold: true, color: COLORS.tomato })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "74°C" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Critical!", size: 18, color: COLORS.tomato })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "🥩 Beef (Medium-Rare)" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "135°F", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "57°C" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Rest 3 min", size: 18 })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "🥩 Beef (Medium)" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "145°F", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "63°C" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Rest 3 min", size: 18 })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "🐷 Pork" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "145°F", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "63°C" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Rest 3 min", size: 18 })] })] }),
                        ]
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "🐟 Fish/Seafood" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "145°F", bold: true })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "63°C" })] })] }),
                            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Opaque center", size: 18 })] })] }),
                        ]
                    }),
                ]
            }),

            // Cooking Symbols Legend
            new Paragraph({
                spacing: { before: 300, after: 100 },
                children: [new TextRun({ text: "QUICK COOKING SYMBOLS", bold: true, size: 22, color: COLORS.chocolate })]
            }),

            new Table({
                columnWidths: [1872, 1872, 1872, 1872, 1872],
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF8E7", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🔥", size: 32 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "High Heat", size: 16, bold: true })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF8E7", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🌡️", size: 32 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Simmer", size: 16, bold: true })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF8E7", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "❄️", size: 32 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Refrigerate", size: 16, bold: true })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF8E7", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "⏰", size: 32 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Rest Time", size: 16, bold: true })] })
                                ] }),
                            new TableCell({ borders: cellBorders, shading: { fill: "FFF8E7", type: ShadingType.CLEAR },
                                children: [
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "⚠️", size: 32 })] }),
                                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Caution", size: 16, bold: true })] })
                                ] }),
                        ]
                    })
                ]
            }),

            // Final flourish
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 400 },
                children: [new TextRun({ text: "❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧", color: COLORS.sage, size: 24 })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 100 },
                children: [new TextRun({ text: "\"Good food is the foundation of genuine happiness.\"", italics: true, size: 24, color: COLORS.chocolate, font: "Georgia" })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "— Auguste Escoffier", italics: true, size: 18, color: COLORS.basil })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 100 },
                children: [new TextRun({ text: "❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧ ❧", color: COLORS.sage, size: 24 })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 200 },
                children: [new TextRun({ text: "Culinary Arts & Healthy Living © 2026  •  Bon Appétit!", italics: true, size: 18, color: "999999" })]
            }),
        ]
    }]
});

// Save document
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync('Culinary_Arts_Health_EXTREME.docx', buffer);
    console.log('✅ Culinary Arts & Health document created successfully!');
}).catch(err => {
    console.error('Error creating document:', err);
});
