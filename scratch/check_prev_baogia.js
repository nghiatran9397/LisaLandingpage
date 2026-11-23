const fs = require('fs');
const prev = fs.readFileSync('scratch/index_prev.html', 'utf8');

const sIdx = prev.indexOf('id="baogia"');
console.log('baogia in prev:', sIdx);
const sStart = prev.lastIndexOf('<section', sIdx);
const lIdx = prev.indexOf('id="lienhe"');
const lStart = prev.lastIndexOf('<section', lIdx);

console.log(prev.substring(sStart, lStart));
