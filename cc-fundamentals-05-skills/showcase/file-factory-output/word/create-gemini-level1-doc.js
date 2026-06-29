const { Document, Packer, Paragraph, TextRun, Footer, PageNumber, AlignmentType } = require('docx');
const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════════════════
// GOOGLE GEMINI - LEVEL 1 (ULTRA-MINIMALISTIC) WORD DOCUMENT
// Maximum whitespace, single font, no colors, no images, no tables
// ═══════════════════════════════════════════════════════════════════════════════

const doc = new Document({
    styles: {
        default: { document: { run: { font: "Times New Roman", size: 24 } } }, // 12pt
    },
    sections: [{
        properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } }, // 1" margins
        footers: {
            default: new Footer({
                children: [new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ children: [PageNumber.CURRENT], size: 20 })]
                })]
            })
        },
        children: [
            // Title
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [
                new TextRun({ text: "Google Gemini", size: 48, bold: true })
            ] }),

            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [
                new TextRun({ text: "An Overview", size: 28 })
            ] }),

            // Introduction
            new Paragraph({ spacing: { after: 300 }, children: [
                new TextRun("Google Gemini is a family of multimodal artificial intelligence models developed by Google DeepMind. It represents Google's most capable and general AI model, designed to understand and generate text, code, images, audio, and video.")
            ] }),

            new Paragraph({ spacing: { after: 300 }, children: [
                new TextRun("Released in December 2023, Gemini was built from the ground up to be multimodal, meaning it can seamlessly understand and operate across different types of information including text, images, audio, video, and code.")
            ] }),

            // Section: Model Variants
            new Paragraph({ spacing: { before: 400, after: 200 }, children: [
                new TextRun({ text: "Model Variants", size: 28, bold: true })
            ] }),

            new Paragraph({ spacing: { after: 300 }, children: [
                new TextRun("Gemini is available in several variants optimized for different use cases:")
            ] }),

            new Paragraph({ spacing: { after: 200 }, children: [
                new TextRun({ text: "Gemini Ultra", bold: true }),
                new TextRun(" is the largest and most capable model, designed for highly complex tasks. It features a 2 million token context window and achieves state-of-the-art performance on academic benchmarks.")
            ] }),

            new Paragraph({ spacing: { after: 200 }, children: [
                new TextRun({ text: "Gemini Pro", bold: true }),
                new TextRun(" offers the best balance of capability and efficiency for a wide range of tasks. It is suitable for most general-purpose applications and scales well across different workloads.")
            ] }),

            new Paragraph({ spacing: { after: 200 }, children: [
                new TextRun({ text: "Gemini Flash", bold: true }),
                new TextRun(" is optimized for speed and efficiency. It processes requests faster than other variants while maintaining good quality, making it ideal for high-volume applications.")
            ] }),

            new Paragraph({ spacing: { after: 300 }, children: [
                new TextRun({ text: "Gemini Nano", bold: true }),
                new TextRun(" is the most efficient model, designed to run directly on mobile devices. It enables on-device AI capabilities without requiring cloud connectivity.")
            ] }),

            // Section: Capabilities
            new Paragraph({ spacing: { before: 400, after: 200 }, children: [
                new TextRun({ text: "Key Capabilities", size: 28, bold: true })
            ] }),

            new Paragraph({ spacing: { after: 300 }, children: [
                new TextRun("Gemini's multimodal nature allows it to process and generate content across multiple formats. It can analyze images, understand spoken language, generate code in over twenty programming languages, and create written content in more than one hundred languages.")
            ] }),

            new Paragraph({ spacing: { after: 300 }, children: [
                new TextRun("The model demonstrates strong reasoning capabilities, performing well on mathematical problems, scientific questions, and complex logical tasks. Its extended context window allows it to process and reason over long documents, entire codebases, or lengthy conversations.")
            ] }),

            // Page break for page 2
            new Paragraph({ pageBreakBefore: true, spacing: { after: 200 }, children: [
                new TextRun({ text: "Applications", size: 28, bold: true })
            ] }),

            new Paragraph({ spacing: { after: 300 }, children: [
                new TextRun("Gemini can be applied across numerous domains. In research, it assists with literature review, data analysis, and hypothesis generation. In software development, it helps with code generation, debugging, and documentation. For creative work, it supports content creation, ideation, and design tasks.")
            ] }),

            new Paragraph({ spacing: { after: 300 }, children: [
                new TextRun("The model integrates with Google's product ecosystem, powering features in Google Search, Google Workspace, and Android devices. Developers can access Gemini through the Google AI Studio or the Vertex AI platform.")
            ] }),

            // Section: Getting Started
            new Paragraph({ spacing: { before: 400, after: 200 }, children: [
                new TextRun({ text: "Getting Started", size: 28, bold: true })
            ] }),

            new Paragraph({ spacing: { after: 300 }, children: [
                new TextRun("To use Gemini, create a Google Cloud account and enable the Gemini API. Generate an API key through the Google Cloud Console. Install the Python SDK using pip, then configure your application with your API key. The official documentation at ai.google.dev provides comprehensive guides and code examples.")
            ] }),

            // Conclusion
            new Paragraph({ spacing: { before: 400, after: 200 }, children: [
                new TextRun({ text: "Conclusion", size: 28, bold: true })
            ] }),

            new Paragraph({ spacing: { after: 300 }, children: [
                new TextRun("Google Gemini represents a significant advancement in multimodal AI. Its ability to understand and generate across different types of content, combined with its range of model sizes, makes it a versatile tool for various applications. As the technology continues to evolve, Gemini is positioned to play an important role in the future of artificial intelligence.")
            ] }),
        ]
    }]
});

// Generate document
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("Google_Gemini_Level1_Minimal.docx", buffer);
    console.log("✅ Google Gemini Level 1 (Ultra-Minimalistic) document created!");
});
