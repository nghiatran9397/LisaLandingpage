const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Match product cards in the catalog
// Usually <div class="card" or similar with <h3> and price
const regex = /<h3>([^<]+)<\/h3>[\s\S]*?(?:class="price"[^>]*>|<strong>)([^<]+đ)/g;
let match;
const products = [];
while ((match = regex.exec(content)) !== null) {
  products.push({ name: match[1].trim(), price: match[2].trim() });
}
console.log('Found product cards:', products.length);
products.forEach(p => console.log(`${p.name} - ${p.price}`));
