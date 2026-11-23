const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, idx) => {
  if (l.includes('luxury-footer') || l.includes('footer-main-grid') || l.includes('f-col') || l.includes('flogo')) {
    console.log((idx+1) + ': ' + l.trim().slice(0, 100));
  }
});
