const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
let start = -1;
let end = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('var productDetailsByImage =')) start = i;
  if (start !== -1 && i > start && lines[i].trim() === '};') {
    end = i;
    break;
  }
}
console.log(`Start: ${start + 1}, End: ${end + 1}`);
if (start !== -1 && end !== -1) {
  const slice = lines.slice(start, end + 1).join('\n');
  try {
    const dict = eval('(' + slice.replace('var productDetailsByImage =', '').replace(/;\s*$/, '') + ')');
    const items = [];
    for (let key in dict) {
      items.push({ img: key, title: dict[key].title, price: dict[key].price });
    }
    console.log('Total items:', items.length);
    items.forEach(it => console.log(`${it.title} | ${it.price}`));
  } catch (e) {
    console.log('Error:', e.message);
  }
}
