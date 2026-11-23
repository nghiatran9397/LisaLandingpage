const { execSync } = require('child_process');
const fs = require('fs');

const prevContent = execSync('git show 4999e34:index.html', { maxBuffer: 20 * 1024 * 1024 }).toString('utf8');
const sIdx = prevContent.indexOf('id="baogia"');
console.log('baogia in prev:', sIdx);
const sStart = prevContent.lastIndexOf('<section', sIdx);
const lIdx = prevContent.indexOf('id="lienhe"');
const lStart = prevContent.lastIndexOf('<section', lIdx);

console.log('--- BAOGIA SECTION IN PREV ---');
console.log(prevContent.substring(sStart, lStart));

// Also let's find the script in prev
const sScript = prevContent.indexOf('var g = function (i)');
const scriptStart = prevContent.lastIndexOf('<script>', sScript);
const marker = '<!-- Nút ghim nổi: Danh sách quan tâm';
const scriptEnd = prevContent.indexOf(marker);
console.log('--- SCRIPT IN PREV ---');
console.log(prevContent.substring(scriptStart, scriptEnd));
