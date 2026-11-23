const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const bIdx = content.indexOf('id="baogia"');
console.log('baogia index:', bIdx);
const lIdx = content.indexOf('id="lienhe"');
console.log('lienhe index:', lIdx);

const lines = content.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('id="baogia"') || l.includes('id="lienhe"') || l.includes('contact-lisa-container')) {
    console.log((idx+1) + ': ' + l.trim().slice(0, 80));
  }
});
