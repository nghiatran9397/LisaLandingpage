const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/Admin/.gemini/antigravity/brain/afc18559-39c3-400c-86be-dddd0fb0bd50/browser_sandbox/screenshots';
const targetDir = 'C:/Users/Admin/.gemini/antigravity/brain/9f5cd6bd-a226-47ec-93a5-cf876e4e626d';

const files = [
  'step_251_shot_1_lisafoodglobal_contact_desktop.png',
  'step_255_shot_1_lisafoodglobal_contact_mobile_top.png',
  'step_255_shot_2_lisafoodglobal_contact_mobile_bottom.png'
];

files.forEach(f => {
  const s = path.join(srcDir, f);
  const d = path.join(targetDir, f);
  if (fs.existsSync(s)) {
    fs.copyFileSync(s, d);
    console.log(`Copied ${f}`);
  }
});
