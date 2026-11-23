const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/Admin/.gemini/antigravity/brain/afc18559-39c3-400c-86be-dddd0fb0bd50/browser_sandbox/screenshots';
const targetDir = 'C:/Users/Admin/.gemini/antigravity/brain/9f5cd6bd-a226-47ec-93a5-cf876e4e626d';

const filesToCopy = [
  { src: 'step_188_shot_1_desktop_step1.png', dst: 'contact_stepper_step1.png' },
  { src: 'step_192_shot_1_desktop_step2_selected.png', dst: 'contact_stepper_step2.png' },
  { src: 'step_194_shot_2_desktop_step3_filled.png', dst: 'contact_stepper_step3.png' },
  { src: 'step_196_shot_1_desktop_step4_summary.png', dst: 'contact_stepper_step4.png' },
  { src: 'step_196_shot_2_desktop_step5_success.png', dst: 'contact_stepper_success.png' },
  { src: 'step_202_shot_3_mobile_step2_selected_true.png', dst: 'contact_stepper_mobile_step2.png' },
  { src: 'step_206_shot_1_mobile_check_390.png', dst: 'contact_stepper_mobile_success.png' }
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
