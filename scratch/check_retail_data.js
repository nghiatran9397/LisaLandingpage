const fs = require('fs');
const content = fs.readFileSync('c:/Users/Admin/Downloads/LisaFoodLandingPage-main/LisaFoodLandingPage-main/src/data/giftBoxes.js', 'utf8');

const retailIdx = content.indexOf('retailProducts');
if (retailIdx !== -1) {
  console.log(content.substring(retailIdx, retailIdx + 4000));
} else {
  console.log('retailProducts not found in giftBoxes.js');
}
