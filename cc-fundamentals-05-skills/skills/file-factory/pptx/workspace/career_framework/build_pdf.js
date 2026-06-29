const { chromium } = require('C:/Users/Tony/.claude/skills/file-factory/pptx/node_modules/playwright');
const { PDFDocument } = require('C:/Users/Tony/.claude/skills/file-factory/pptx/scripts/node_modules/pdf-lib');
const fs = require('fs');
const path = require('path');

async function buildPDF() {
    const slideDir = 'C:/Users/Tony/.claude/skills/file-factory/pptx/workspace/career_framework';
    const outputPath = 'D:/Projects/Project-Management/docs/Career_Clarity_Framework.pdf';

    const slides = [
        'slide01_title.html',
        'slide02_overview.html',
        'slide03_5whys_intro.html',
        'slide04_5questions.html',
        'slide05_data_sources.html',
        'slide06_tools.html',
        'slide07_doc_gen.html',
        'slide08_process_flow.html',
        'slide09_outputs.html',
        'slide10_replicate.html',
        'slide11_section2_title.html',
        'slide12_architecture.html',
        'slide13_directory.html',
        'slide14_ticktick.html',
        'slide15_commands.html',
        'slide16_daily_workflow.html',
        'slide17_supabase.html',
        'slide18_self_improving.html',
        'slide19_conclusion.html'
    ];

    console.log('Launching browser...');
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Set viewport to match slide dimensions (720pt x 405pt = 960px x 540px at 96dpi)
    await page.setViewportSize({ width: 960, height: 540 });

    const pdfBuffers = [];

    for (let i = 0; i < slides.length; i++) {
        const slidePath = path.join(slideDir, slides[i]);
        console.log(`Processing slide ${i + 1}/${slides.length}: ${slides[i]}`);

        // Navigate to the HTML file
        await page.goto(`file:///${slidePath.replace(/\\/g, '/')}`);
        await page.waitForLoadState('networkidle');

        // Generate PDF for this slide (16:9 aspect ratio, similar to PowerPoint)
        // 720pt x 405pt = 10in x 5.625in at 72dpi
        const pdfBuffer = await page.pdf({
            width: '10in',
            height: '5.625in',
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
        });

        pdfBuffers.push(pdfBuffer);
    }

    await browser.close();

    console.log('Merging PDFs...');
    const mergedPdf = await PDFDocument.create();

    for (const pdfBuffer of pdfBuffers) {
        const pdf = await PDFDocument.load(pdfBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    fs.writeFileSync(outputPath, mergedPdfBytes);

    console.log(`PDF saved to: ${outputPath}`);
}

buildPDF().catch(err => {
    console.error('Error building PDF:', err);
    process.exit(1);
});
