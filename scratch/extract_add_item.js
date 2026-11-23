const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const regex = /addItemToList\s*\(\s*['"]([^'"]+)['"]\s*,\s*(\d+)\s*,\s*['"]([^'"]+)['"]/g;
let match;
const items = [];
const seen = new Set();
while ((match = regex.exec(content)) !== null) {
  const key = `${match[1]} - ${match[3]}`;
  if (!seen.has(key)) {
    seen.add(key);
    items.push({ name: match[1], priceVal: match[2], priceStr: match[3] });
  }
}
console.log('Total unique hamper/items from addItemToList:', items.length);
items.forEach(it => console.log(`- ${it.name} | ${it.priceStr}`));
