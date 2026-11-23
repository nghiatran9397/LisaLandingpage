const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const lines = content.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('logo.webp') || l.includes('logo.png')) {
    console.log((idx+1) + ': ' + l.trim());
  }
});
