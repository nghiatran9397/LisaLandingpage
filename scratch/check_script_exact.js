const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const sIdx = content.indexOf('var g = function (i)');
console.log('script start idx:', sIdx);
if (sIdx !== -1) {
  console.log(content.substring(sIdx - 40, sIdx + 60));
}

const fEndIdx = content.indexOf('<!-- Nút ghim nổi: Danh sách quan tâm');
console.log('script end idx:', fEndIdx);
if (fEndIdx !== -1) {
  console.log(content.substring(fEndIdx - 60, fEndIdx + 60));
}
