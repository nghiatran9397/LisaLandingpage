const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

console.log('lienhe in CSS:');
const lines = content.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('#lienhe') || l.includes('scroll-margin')) {
    console.log((idx+1) + ': ' + l.trim());
  }
});
