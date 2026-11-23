const fs = require('fs');

// Check what logo files exist in images/
const files = fs.readdirSync('images');
const logos = files.filter(f => f.includes('logo'));
console.log('Logos in images/:', logos);
