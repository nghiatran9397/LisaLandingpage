const fs = require('fs');
const content = fs.readFileSync('c:/Users/Admin/Downloads/LisaFoodLandingPage-main/LisaFoodLandingPage-main/src/context/SiteDataContext.jsx', 'utf8');

// find retailProducts array
const start = content.indexOf('retailProducts');
if (start !== -1) {
  console.log(content.substring(start, start + 3000));
} else {
  console.log('retailProducts not found');
}
