const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Thêm CSS cho Spotlight Card chính xác 100% từ mã nguồn gốc
const spotlightCss = `
/* --- HIỆU ỨNG SPOTLIGHT CARD ĐỔ QUẦNG SÁNG THEO CON TRỘT CHUỘT (CHÍNH XÁC TỪ SPOTLIGHTCARD.JSX) --- */
.hc {
    position: relative !important;
    background: #ffffff !important;
    border: 1px solid #ffedd5 !important; /* border-orange-100 */
    border-radius: 20px !important;
    overflow: hidden !important;
    box-shadow: 0 10px 25px -5px rgba(67, 20, 7, 0.04), 0 8px 10px -6px rgba(67, 20, 7, 0.04) !important;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease !important;
}

.hc:hover {
    border-color: #fdba74 !important; /* hover:border-orange-300 */
    box-shadow: 0 25px 45px -12px rgba(249, 115, 22, 0.16), 0 10px 20px -8px rgba(249, 115, 22, 0.1) !important; /* hover:shadow-orange-500/10 */
    transform: translateY(-4px) !important;
}

/* Lớp quầng sáng Spotlight di chuyển theo con trỏ chuột */
.spotlight-glow {
    pointer-events: none;
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease-out;
    background: radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(249, 115, 22, 0.14), transparent 70%);
}

.hc:hover .spotlight-glow {
    opacity: 1;
}

/* Nội dung thẻ nằm trên lớp Spotlight */
.hc .hb, .hc img, .hc .qty-box {
    position: relative;
    z-index: 2;
}

/* Nâng cấp hiệu ứng hover trên từng viên thuốc thành phần (.exact-item-pill) */
.exact-item-pill {
    transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
}
.exact-item-pill:hover {
    background: rgba(255, 237, 213, 0.75) !important;
    border-color: #fb923c !important;
    transform: translateX(4px) !important;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.1) !important;
}
`;

html = html.replace('</style>', spotlightCss + '\n</style>');

// 2. Chèn lớp <div class="spotlight-glow"> vào bên trong mỗi thẻ .hc
html = html.replace(/<article class="hc">/g, '<article class="hc"><div class="spotlight-glow"></div>');

// 3. Thêm JavaScript tính toán vị trí chuột theo thời gian thực (như useEffect / useRef trong React gốc)
const spotlightScript = `
<script>
// --- LOGIC TÍNH TOÁN VỊ TRÍ CHUỘT SPOTLIGHT (CHÍNH XÁC TỪ SPOTLIGHTCARD.JSX) ---
document.addEventListener("DOMContentLoaded", function() {
    var cards = document.querySelectorAll(".hc");
    cards.forEach(function(card) {
        card.addEventListener("mousemove", function(e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var glow = card.querySelector(".spotlight-glow");
            if (glow) {
                glow.style.setProperty("--mouse-x", x + "px");
                glow.style.setProperty("--mouse-y", y + "px");
            }
        });
    });
});
</script>
`;

html = html.replace('</body>', spotlightScript + '\n</body>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully integrated EXACT Spotlight Hover Effect from SpotlightCard.jsx!');
