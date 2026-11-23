const fs = require('fs');

const origBaogiaSection = fs.readFileSync('scratch/orig_baogia.html', 'utf8');
const origFormScript = fs.readFileSync('scratch/orig_script.js', 'utf8');
const origOrderTypeCss = fs.readFileSync('scratch/orig_css.css', 'utf8');
const newContactCss = fs.readFileSync('scratch/new_contact_css.css', 'utf8');
const newLienheSection = fs.readFileSync('scratch/new_lienhe_section.html', 'utf8');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Replace the Stepper CSS with Original Order Type CSS + New Contact CSS
const stepperCssMarker = '/* ==========================================================================\n           BỘ FORM LIÊN HỆ & BÁO GIÁ ĐA BƯỚC';
const cssEndMarker = '</style>';

const cStart = content.indexOf('/* ==========================================================================');
const cEnd = content.indexOf(cssEndMarker, cStart);

if (cStart !== -1 && cEnd !== -1) {
    const combinedCss = origOrderTypeCss + '\n' + newContactCss + '\n    ';
    content = content.substring(0, cStart) + combinedCss + content.substring(cEnd);
    console.log('CSS combined and replaced successfully.');
} else {
    console.log('CSS marker not found!');
}

// 2. Replace section #baogia AND section #lienhe
const secBaogiaIdx = content.indexOf('id="baogia"');
const secBaogiaStart = content.lastIndexOf('<section', secBaogiaIdx);

const secLienheIdx = content.indexOf('id="lienhe"');
const secLienheEnd = content.indexOf('</section>', secLienheIdx) + '</section>'.length;

if (secBaogiaStart !== -1 && secLienheEnd !== -1) {
    // Both sections together
    const replacementSections = origBaogiaSection + '\n' + newLienheSection;
    content = content.substring(0, secBaogiaStart) + replacementSections + content.substring(secLienheEnd);
    console.log('Sections #baogia (restored) and #lienhe (new Contact) replaced successfully.');
} else {
    console.log('Sections markers not found!');
}

// 3. Replace script with Original script
const scriptStartMarker = '<script>\n        // ==========================================================================\n        // KHỞI TẠO VÀ XỬ LÝ STEPPER BÁO GIÁ';
const sStart = content.indexOf('<script>\n        // ==========================================================================');
const sEndMarker = '<!-- Nút ghim nổi: Danh sách quan tâm';
const sEnd = content.indexOf(sEndMarker, sStart);

if (sStart !== -1 && sEnd !== -1) {
    content = content.substring(0, sStart) + origFormScript + '\n    ' + content.substring(sEnd);
    console.log('Script restored successfully.');
} else {
    console.log('Script marker not found!');
}

fs.writeFileSync('index.html', content, 'utf8');
console.log('index.html successfully updated!');
