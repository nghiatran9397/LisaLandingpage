const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

for (let i = 4394; i < 4445; i++) {
  console.log((i+1) + ': ' + lines[i]);
}
