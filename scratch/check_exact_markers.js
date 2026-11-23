const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const secIdx = content.indexOf('id="baogia"');
console.log('baogia index:', secIdx);
if (secIdx !== -1) {
  console.log(content.substring(secIdx - 30, secIdx + 120));
}

const lienheIdx = content.indexOf('id="lienhe"');
console.log('lienhe index:', lienheIdx);
if (lienheIdx !== -1) {
  console.log(content.substring(lienheIdx - 60, lienheIdx + 60));
}
