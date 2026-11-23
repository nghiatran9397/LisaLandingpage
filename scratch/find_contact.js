const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('id="baogia"') || line.includes('id="lienhe"') || line.includes('class="contact') || line.includes('class="baogia')) {
    console.log((idx + 1) + ': ' + line.trim().slice(0, 100));
  }
});
