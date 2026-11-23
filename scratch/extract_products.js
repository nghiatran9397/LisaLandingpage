const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Let's find products defined in window.PRODUCTS or anywhere in JS / HTML
const productsMatch = content.match(/const PRODUCTS = (\[[\s\S]*?\]);/);
if (productsMatch) {
  try {
    const prods = eval(productsMatch[1]);
    console.log('Found PRODUCTS in JS:', prods.length);
    prods.forEach(p => console.log(`- ${p.name} | ${p.price}`));
  } catch (e) {
    console.log('Error evaluating PRODUCTS:', e.message);
  }
} else {
  console.log('PRODUCTS constant not found directly');
}

// Check for all product cards in HTML
const regex = /data-prod="([^"]+)"[\s\S]*?data-price="([^"]+)"/g;
let match;
const found = new Set();
while ((match = regex.exec(content)) !== null) {
  found.add(`${match[1]} (${match[2]})`);
}
console.log('Found in HTML data-prod:', found.size);
found.forEach(item => console.log('HTML item:', item));
