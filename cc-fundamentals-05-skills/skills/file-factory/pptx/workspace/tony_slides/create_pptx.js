const pptxgen = require('C:/Users/Tony/AppData/Roaming/npm/node_modules/pptxgenjs');
const html2pptx = require('C:/Users/Tony/.claude/skills/file-factory/pptx/scripts/html2pptx');
const path = require('path');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Tony';
    pptx.title = "Tony's 2026 Career Clarity Plan";
    pptx.subject = 'BJJ Intelligence First - A Strategic Path Forward';

    const slidesDir = __dirname;
    const slides = [
        'slide01_title.html',
        'slide02_situation.html',
        'slide03_opportunities.html',
        'slide04_5whys.html',
        'slide05_values.html',
        'slide06_tension.html',
        'slide07_matrix.html',
        'slide08_verdict.html',
        'slide09_not_jasen.html',
        'slide10_phase1.html',
        'slide11_phase2.html',
        'slide12_phase3.html',
        'slide13_metrics.html',
        'slide14_decision_points.html',
        'slide15_next_steps.html'
    ];

    console.log('Creating presentation with 15 slides...');

    for (let i = 0; i < slides.length; i++) {
        const slidePath = path.join(slidesDir, slides[i]);
        console.log(`Processing slide ${i + 1}: ${slides[i]}`);
        await html2pptx(slidePath, pptx);
    }

    const outputPath = 'D:\\Projects\\Project-Management\\docs\\Tony_Career_Path_2026.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`Presentation saved to: ${outputPath}`);
}

createPresentation().catch(err => {
    console.error('Error creating presentation:', err);
    process.exit(1);
});
