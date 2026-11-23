const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('#baogia') || line.includes('.fm ') || line.includes('.order-type-')) {
    console.log((idx + 1) + ': ' + line.trim().slice(0, 100));
  }
});
