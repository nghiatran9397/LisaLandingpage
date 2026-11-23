const fs = require('fs');
const path = require('path');

const dirs = [
  'C:/Users/Admin/.gemini/antigravity/brain/afc18559-39c3-400c-86be-dddd0fb0bd50/browser_sandbox/screenshots',
  'C:/Users/Admin/.gemini/antigravity/brain/9f5cd6bd-a226-47ec-93a5-cf876e4e626d/browser_evidence/afc18559-39c3-400c-86be-dddd0fb0bd50'
];

dirs.forEach(d => {
  if (fs.existsSync(d)) {
    console.log(`Directory exists: ${d}`);
    const files = fs.readdirSync(d);
    console.log(`Found ${files.length} files:`);
    files.forEach(f => console.log('  ' + f));
  } else {
    console.log(`Directory does NOT exist: ${d}`);
  }
});
