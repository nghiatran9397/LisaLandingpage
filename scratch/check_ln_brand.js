const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const regex = /\.ln-brand[^{]*\{[^}]*\}/g;
let m;
while ((m = regex.exec(content)) !== null) {
  console.log(m[0]);
}
