const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Let's find what variable holds this dictionary
const lines = content.split('\n');
for (let i = 7700; i < 7775; i++) {
  console.log((i+1) + ': ' + lines[i]);
}
