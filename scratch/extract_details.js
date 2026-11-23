const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const match = content.match(/var productDetailsByImage = (\{[\s\S]*?\n\s*\};\n)/);
if (match) {
  try {
    const dict = eval('(' + match[1].replace(/;\s*$/, '') + ')');
    const items = [];
    for (let key in dict) {
      items.push({ img: key, title: dict[key].title, price: dict[key].price });
    }
    console.log('Items in productDetailsByImage:', items.length);
    items.forEach(it => console.log(`${it.title} - ${it.price} (${it.img})`));
  } catch (e) {
    console.log('Eval error:', e.message);
  }
} else {
  console.log('productDetailsByImage match failed');
}
