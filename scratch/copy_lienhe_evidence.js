const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/Admin/.gemini/antigravity/brain/afc18559-39c3-400c-86be-dddd0fb0bd50/browser_sandbox/screenshots';
const targetDir = 'C:/Users/Admin/.gemini/antigravity/brain/9f5cd6bd-a226-47ec-93a5-cf876e4e626d';

const filesToCopy = [
  { src: 'step_272_shot_3_step_271_shot_3_baogia_desktop.png', dst: 'baogia_restored_desktop.png' },
  { src: 'step_272_shot_4_step_271_shot_4_lienhe_desktop.png', dst: 'contact_lisa_style_desktop.png' },
  { src: 'step_272_shot_1_step_271_shot_1_lienhe_mobile_top.png', dst: 'contact_lisa_style_mobile_top.png' },
  { src: 'step_272_shot_2_step_271_shot_2_lienhe_mobile_bottom.png', dst: 'contact_lisa_style_mobile_bottom.png' }
];

filesToCopy.forEach(item => {
  const s = path.join(srcDir, item.src);
  const d = path.join(targetDir, item.dst);
  if (fs.existsSync(s)) {
    fs.copyFileSync(s, d);
    console.log(`Copied ${item.src} -> ${item.dst}`);
  } else {
    console.log(`Source does not exist: ${s}`);
  }
});
