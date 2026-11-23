const { execSync } = require('child_process');
const fs = require('fs');

// 1. Get 4999e34 original content
const prevContent = execSync('git show 4999e34:index.html', { maxBuffer: 20 * 1024 * 1024 }).toString('utf8');

// Extract original baogia section
const sIdx = prevContent.indexOf('id="baogia"');
const sStart = prevContent.lastIndexOf('<section', sIdx);
const lIdx = prevContent.indexOf('id="lienhe"');
const lStart = prevContent.lastIndexOf('<section', lIdx);
const origBaogiaSection = prevContent.substring(sStart, lStart);

// Extract original script
const sScript = prevContent.indexOf('var g = function (i)');
const scriptStart = prevContent.lastIndexOf('<script>', sScript);
const marker = '<!-- Nút ghim nổi: Danh sách quan tâm';
const scriptEnd = prevContent.indexOf(marker);
const origFormScript = prevContent.substring(scriptStart, scriptEnd);

// Extract original CSS (around order-type-tabs)
const cssStartMarker = '/* --- BỘ CHỌN HÌNH THỨC ĐẶT QUÀ';
const cssEndMarker = '</style>';
const origCssStart = prevContent.indexOf(cssStartMarker);
const origCssEnd = prevContent.indexOf(cssEndMarker, origCssStart);
const origOrderTypeCss = prevContent.substring(origCssStart, origCssEnd);

console.log('Original Baogia section length:', origBaogiaSection.length);
console.log('Original Script length:', origFormScript.length);
console.log('Original CSS length:', origOrderTypeCss.length);

// 2. Design the new Contact Section for #lienhe
const newContactCss = `
        /* --- MỤC LIÊN HỆ (CONTACT SECTION) THEO STYLE LISA FOOD GLOBAL --- */
        #lienhe {
            padding: 80px 0 76px !important;
            background: linear-gradient(180deg, #fdfbf7 0%, #faf7f2 100%) !important;
            border-top: 1px solid rgba(217, 119, 6, 0.2) !important;
        }

        .contact-lisa-container {
            display: grid;
            grid-template-columns: 5fr 7fr;
            gap: 48px;
            align-items: flex-start;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 16px;
        }

        /* Cột trái: Tiêu đề & Lời nhắn */
        .contact-lisa-left {
            position: sticky;
            top: 100px;
        }

        .contact-lisa-title {
            font-family: var(--font-serif, 'Playfair Display', serif);
            font-size: clamp(32px, 4.5vw, 46px);
            font-weight: 800;
            color: #1f2937;
            line-height: 1.15;
            margin-bottom: 14px;
            letter-spacing: -0.5px;
        }

        .contact-gold-line {
            width: 48px;
            height: 3px;
            background: #d4a017;
            border-radius: 99px;
            margin-bottom: 22px;
        }

        .contact-lisa-desc {
            font-size: 15.5px;
            color: #4b5563;
            line-height: 1.7;
            margin-bottom: 32px;
        }

        .contact-lisa-btns {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
        }

        .contact-pill-btn-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 13px 26px;
            border-radius: 99px;
            background: linear-gradient(135deg, #d4a017 0%, #b45309 100%);
            color: #ffffff;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            box-shadow: 0 6px 18px rgba(180, 83, 9, 0.25);
            transition: all 0.25s ease;
        }

        .contact-pill-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 24px rgba(180, 83, 9, 0.35);
            background: linear-gradient(135deg, #b45309 0%, #92400e 100%);
            color: #ffffff;
        }

        .contact-pill-btn-secondary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 13px 24px;
            border-radius: 99px;
            background: #ffffff;
            border: 1.5px solid #d1d5db;
            color: #374151;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.25s ease;
        }

        .contact-pill-btn-secondary:hover {
            border-color: #d97706;
            color: #7d1611;
            background: #fffdfa;
            transform: translateY(-2px);
        }

        /* Cột phải: Thẻ danh thiếp liên hệ */
        .contact-cards-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

        .contact-card-box {
            background: #ffffff;
            border-radius: 20px;
            border: 1px solid rgba(229, 231, 235, 0.9);
            padding: 24px 22px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
            transition: all 0.25s ease;
        }

        .contact-card-box:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(180, 83, 9, 0.08);
            border-color: rgba(217, 119, 6, 0.35);
        }

        .contact-card-box.full-width {
            grid-column: 1 / -1;
        }

        .contact-card-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 14px;
        }

        .contact-icon-bubble {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #fffbeb;
            border: 1px solid #fed7aa;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #b45309;
            flex-shrink: 0;
        }

        .contact-card-tag {
            font-size: 11.5px;
            font-weight: 800;
            color: #6b7280;
            letter-spacing: 0.8px;
            text-transform: uppercase;
        }

        /* Hotline Sub-Cards */
        .hotline-sub-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        .hotline-sub-card {
            background: #f9fafb;
            border: 1px solid #f3f4f6;
            border-radius: 14px;
            padding: 14px 16px;
            transition: all 0.2s ease;
        }

        .hotline-sub-card:hover {
            background: #fffbeb;
            border-color: #fed7aa;
        }

        .hotline-sub-tag {
            font-size: 10.5px;
            font-weight: 700;
            color: #9ca3af;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            display: block;
            margin-bottom: 4px;
        }

        .hotline-sub-val {
            font-size: 15.5px;
            font-weight: 800;
            color: #1f2937;
            text-decoration: none;
            letter-spacing: 0.3px;
            display: block;
            transition: color 0.2s ease;
        }

        .hotline-sub-val:hover {
            color: #b45309;
        }

        .contact-card-val {
            font-size: 15px;
            font-weight: 700;
            color: #1f2937;
            text-decoration: none;
            word-break: break-word;
            display: block;
            transition: color 0.2s ease;
        }

        .contact-card-val:hover {
            color: #b45309;
        }

        .contact-card-note {
            font-size: 12px;
            color: #6b7280;
            margin-top: 6px;
            line-height: 1.5;
        }

        @media (max-width: 900px) {
            .contact-lisa-container {
                grid-template-columns: 1fr;
                gap: 36px;
            }

            .contact-lisa-left {
                position: static;
                text-align: center;
            }

            .contact-gold-line {
                margin: 0 auto 20px;
            }

            .contact-lisa-btns {
                justify-content: center;
            }
        }

        @media (max-width: 600px) {
            #lienhe {
                padding: 56px 0 50px !important;
            }

            .contact-cards-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }

            .hotline-sub-grid {
                grid-template-columns: 1fr;
                gap: 8px;
            }

            .contact-card-box {
                padding: 18px 16px;
                border-radius: 16px;
            }

            .contact-pill-btn-primary,
            .contact-pill-btn-secondary {
                width: 100%;
            }
        }
`;

const newLienheSection = `        <section id="lienhe">
            <div class="wrap">
                <div class="contact-lisa-container">
                    <!-- Cột trái: Tiêu đề & Thông điệp cam kết -->
                    <div class="contact-lisa-left">
                        <h2 class="contact-lisa-title">Contact</h2>
                        <div class="contact-gold-line"></div>
                        <p class="contact-lisa-desc">
                            Gọi hoặc gửi email cho chúng tôi — Lisa Food phản hồi trong vòng <strong>2 giờ làm việc</strong> với đề xuất mẫu quà, bảng giá chiết khấu và quy cách đóng gói tối ưu nhất cho quý doanh nghiệp.
                        </p>
                        <div class="contact-lisa-btns">
                            <a href="#baogia" class="contact-pill-btn-primary">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                                <span>Nhận Báo Giá Hamper</span>
                            </a>
                            <a href="https://zalo.me/0393955516" target="_blank" rel="noopener" class="contact-pill-btn-secondary">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                <span>Nhắn Zalo Ngay</span>
                            </a>
                        </div>
                    </div>

                    <!-- Cột phải: Hệ thống thẻ danh thiếp liên hệ chuẩn LisaFood Global -->
                    <div class="contact-cards-grid">
                        <!-- Thẻ 1: HOTLINE (Toàn chiều rộng) -->
                        <div class="contact-card-box full-width">
                            <div class="contact-card-header">
                                <div class="contact-icon-bubble">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                </div>
                                <span class="contact-card-tag">HOTLINE</span>
                            </div>
                            <div class="hotline-sub-grid">
                                <div class="hotline-sub-card">
                                    <span class="hotline-sub-tag">MAIN (TƯ VẤN 24/7)</span>
                                    <a href="tel:0393955516" class="hotline-sub-val">+84 393 955 516</a>
                                </div>
                                <div class="hotline-sub-card">
                                    <span class="hotline-sub-tag">EXPORT / B2B (MS. HOA)</span>
                                    <a href="tel:0907560668" class="hotline-sub-val">+84 907 560 668</a>
                                </div>
                            </div>
                        </div>

                        <!-- Thẻ 2: EMAIL -->
                        <div class="contact-card-box">
                            <div class="contact-card-header">
                                <div class="contact-icon-bubble">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                </div>
                                <span class="contact-card-tag">EMAIL</span>
                            </div>
                            <a href="mailto:sale@lisafood.vn" class="contact-card-val">sale@lisafood.vn</a>
                            <p class="contact-card-note">Phản hồi báo giá trong 2 giờ</p>
                        </div>

                        <!-- Thẻ 3: VIETNAM DOMESTIC / WEBSITE -->
                        <div class="contact-card-box">
                            <div class="contact-card-header">
                                <div class="contact-icon-bubble">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                                </div>
                                <span class="contact-card-tag">VIETNAM DOMESTIC</span>
                            </div>
                            <a href="https://lisafood.vn" target="_blank" rel="noopener" class="contact-card-val">lisafood.vn ↗</a>
                            <p class="contact-card-note">Cổng thông tin & sản phẩm chính thức</p>
                        </div>

                        <!-- Thẻ 4: ADDRESS (Toàn chiều rộng) -->
                        <div class="contact-card-box full-width">
                            <div class="contact-card-header">
                                <div class="contact-icon-bubble">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                                </div>
                                <span class="contact-card-tag">ADDRESS & SHOWROOM</span>
                            </div>
                            <div class="contact-card-val">93/29/17 Đường Cầu Ba Phụ, Phường Thới An, TP. Hồ Chí Minh</div>
                            <p class="contact-card-note">Giờ làm việc: Thứ 2 – Thứ 7 (08:00 – 18:00) • Hotline & Zalo hỗ trợ 24/7</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>`;

fs.writeFileSync('scratch/orig_baogia.html', origBaogiaSection, 'utf8');
fs.writeFileSync('scratch/orig_script.js', origFormScript, 'utf8');
fs.writeFileSync('scratch/orig_css.css', origOrderTypeCss, 'utf8');
fs.writeFileSync('scratch/new_contact_css.css', newContactCss, 'utf8');
fs.writeFileSync('scratch/new_lienhe_section.html', newLienheSection, 'utf8');

console.log('Saved draft files for review.');
