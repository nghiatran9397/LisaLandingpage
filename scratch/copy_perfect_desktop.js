const fs = require('fs');
const path = require('path');

const src = 'C:/Users/Admin/.gemini/antigravity/brain/afc18559-39c3-400c-86be-dddd0fb0bd50/browser_sandbox/screenshots/step_280_shot_1_step_275_lienhe_complete_desktop.png';
const dst = 'C:/Users/Admin/.gemini/antigravity/brain/9f5cd6bd-a226-47ec-93a5-cf876e4e626d/contact_perfect_desktop.png';

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dst);
  console.log('Copied contact_perfect_desktop.png');
} else {
  console.log('Source does not exist: ' + src);
}
