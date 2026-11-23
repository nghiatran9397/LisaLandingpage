const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('Sắc Xuân 01') || line.includes('allProducts =') || line.includes('productsData') || line.includes('hamperList')) {
    console.log((idx + 1) + ': ' + line.trim().slice(0, 100));
  }
});
