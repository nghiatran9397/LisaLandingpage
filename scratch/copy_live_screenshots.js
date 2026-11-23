const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/Admin/.gemini/antigravity/brain/afc18559-39c3-400c-86be-dddd0fb0bd50/browser_sandbox/screenshots';
const targetDir = 'C:/Users/Admin/.gemini/antigravity/brain/9f5cd6bd-a226-47ec-93a5-cf876e4e626d';

const filesToCopy = [
  { src: 'step_214_shot_1_desktop_index_step1.png', dst: 'index_stepper_step1.png' },
  { src: 'step_218_shot_1_desktop_index_step2.png', dst: 'index_stepper_step2.png' },
  { src: 'step_220_shot_1_desktop_index_step4.png', dst: 'index_stepper_step4.png' },
  { src: 'step_227_shot_1_step_index_desktop_success.png', dst: 'index_stepper_success.png' },
  { src: 'step_229_shot_1_step_mobile_step1.png', dst: 'index_stepper_mobile_step1.png' },
  { src: 'step_237_shot_1_step_mobile_step2_completed.png', dst: 'index_stepper_mobile_step2.png' },
  { src: 'step_239_shot_1_step_mobile_step4_settled.png', dst: 'index_stepper_mobile_step4.png' },
  { src: 'step_243_shot_1_step_mobile_success_final_390x844.png', dst: 'index_stepper_mobile_success.png' }
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
