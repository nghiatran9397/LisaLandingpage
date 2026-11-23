const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

console.log('Line 6865-6875:');
for (let i = 6865; i < 6875; i++) console.log((i+1) + ': ' + lines[i]);

console.log('Line 7085-7105:');
for (let i = 7085; i < 7105; i++) console.log((i+1) + ': ' + lines[i]);
