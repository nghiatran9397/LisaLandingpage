const fs = require('fs');

function inspectFile(file) {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  console.log('=== FILE:', file, '===');
  const hcMatches = content.match(/class=["'][^"']*\bhc\b[^"']*["']/g) || [];
  const pcMatches = content.match(/class=["'][^"']*\bpc\b[^"']*["']/g) || [];
  const storyMatches = content.match(/class=["'][^"']*\bstory-card\b[^"']*["']/g) || [];
  console.log('hc count:', hcMatches.length);
  console.log('pc count:', pcMatches.length);
  console.log('story-card count:', storyMatches.length);
}

inspectFile('index.html');
inspectFile('san-pham/index.html');
