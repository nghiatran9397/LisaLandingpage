const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all elements with class hc
console.log('--- HC Cards in index.html ---');
const hcRegex = /<article class="hc"[\s\S]*?<\/article>/g;
let match;
let count = 0;
while ((match = hcRegex.exec(html)) !== null && count < 3) {
  console.log(`\n[HC Card ${count + 1}]:\n`, match[0].substring(0, 300));
  count++;
}

// Find all story-card in index.html
console.log('\n--- Story Cards in index.html ---');
const scRegex = /<div class="story-card"[\s\S]*?<\/div>\s*<\/div>/g;
count = 0;
while ((match = scRegex.exec(html)) !== null && count < 2) {
  console.log(`\n[Story Card ${count + 1}]:\n`, match[0].substring(0, 300));
  count++;
}

// Check san-pham/index.html
if (fs.existsSync('san-pham/index.html')) {
  const spHtml = fs.readFileSync('san-pham/index.html', 'utf8');
  console.log('\n--- PC Cards in san-pham/index.html ---');
  const pcRegex = /<div class="pc"[\s\S]*?<\/div>/g;
  count = 0;
  while ((match = pcRegex.exec(spHtml)) !== null && count < 2) {
    console.log(`\n[PC Card ${count + 1}]:\n`, match[0].substring(0, 300));
    count++;
  }
}
