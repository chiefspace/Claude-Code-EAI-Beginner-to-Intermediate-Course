const pptxgen = require('C:/Users/Tony/.claude/skills/file-factory/pptx/node_modules/pptxgenjs');
const html2pptx = require('C:/Users/Tony/.claude/skills/file-factory/pptx/scripts/html2pptx.js');
const path = require('path');

async function buildPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.title = 'Career Clarity Framework';
    pptx.author = 'Career Clarity System';
    pptx.subject = 'A Systematic Approach to Finding Your Path';

    const slideDir = 'C:/Users/Tony/.claude/skills/file-factory/pptx/workspace/career_framework';

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

    for (let i = 0; i < slides.length; i++) {
        const slidePath = path.join(slideDir, slides[i]);
        console.log(`Processing slide ${i + 1}/${slides.length}: ${slides[i]}`);
        await html2pptx(slidePath, pptx);
    }

    const outputPath = 'D:/Projects/Project-Management/docs/Career_Clarity_Framework.pptx';
    await pptx.writeFile({ fileName: outputPath });
    console.log(`Presentation saved to: ${outputPath}`);
}

buildPresentation().catch(err => {
    console.error('Error building presentation:', err);
    process.exit(1);
});
