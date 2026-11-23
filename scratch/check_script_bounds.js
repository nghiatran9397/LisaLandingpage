const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

console.log('Line 7146-7155:');
for (let i = 7146; i < 7155; i++) console.log((i+1) + ': ' + lines[i]);

console.log('Line 7295-7305:');
for (let i = 7295; i < 7305; i++) console.log((i+1) + ': ' + lines[i]);
