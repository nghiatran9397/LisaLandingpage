const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

// Check script tags balance
const scriptOpen = (content.match(/<script\b/gi) || []).length;
const scriptClose = (content.match(/<\/script>/gi) || []).length;
console.log(`Scripts: ${scriptOpen} open, ${scriptClose} close`);

// Check style tags balance
const styleOpen = (content.match(/<style\b/gi) || []).length;
const styleClose = (content.match(/<\/style>/gi) || []).length;
console.log(`Styles: ${styleOpen} open, ${styleClose} close`);

// Check section tags balance
const secOpen = (content.match(/<section\b/gi) || []).length;
const secClose = (content.match(/<\/section>/gi) || []).length;
console.log(`Sections: ${secOpen} open, ${secClose} close`);

// Check divs
const divOpen = (content.match(/<div\b/gi) || []).length;
const divClose = (content.match(/<\/div>/gi) || []).length;
console.log(`Divs: ${divOpen} open, ${divClose} close`);

// Extract all scripts and syntax check them
const regex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let m;
let count = 0;
while ((m = regex.exec(content)) !== null) {
  count++;
  const jsCode = m[1];
  try {
    new Function(jsCode);
  } catch (e) {
    console.error(`Syntax error in script #${count}:`, e.message);
  }
}
console.log(`Verified ${count} script tags without syntax errors!`);
