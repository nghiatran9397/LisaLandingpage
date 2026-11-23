const fs = require('fs');

const indexPath = 'index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Prepare Stepper CSS
const stepperCss = `
        /* ==========================================================================
           BỘ FORM LIÊN HỆ & BÁO GIÁ ĐA BƯỚC (STEPPER FORM - THEO PHONG CÁCH LISA FOOD)
           Màu sắc Tết Hoàng Gia: Đỏ đô #7d1611, Vàng kim #d97706 / #fed7aa, Kem ngà #fffdfa
           ========================================================================== */
        #baogia {
            padding: 72px 0 68px !important;
            background: linear-gradient(180deg, #fdfbf7 0%, #fffdfa 50%, #ffffff 100%) !important;
        }

        .stepper-header {
            text-align: center;
            margin-bottom: 32px;
        }

        .stepper-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 16px;
            border-radius: 99px;
            background: #fffbeb;
            border: 1.5px solid #fde68a;
            color: #b45309;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .stepper-badge-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #d97706;
            display: inline-block;
            box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.2);
        }

        .stepper-box {
            max-width: 780px;
            margin: 0 auto;
            background: #ffffff;
            border: 1.5px solid rgba(217, 119, 6, 0.32);
            border-radius: 24px;
            padding: 36px 32px 30px;
            box-shadow: 0 20px 50px -15px rgba(125, 22, 17, 0.08), 0 4px 20px rgba(0, 0, 0, 0.03);
            position: relative;
            transition: all 0.3s ease;
        }

        .stepper-box:hover {
            box-shadow: 0 24px 60px -15px rgba(125, 22, 17, 0.12), 0 6px 24px rgba(217, 119, 6, 0.08);
            border-color: rgba(217, 119, 6, 0.48);
        }

        /* Stepper Progress Bar Header */
        .stepper-nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 32px;
            position: relative;
        }

        .step-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            position: relative;
            z-index: 2;
            cursor: pointer;
            user-select: none;
        }

        .step-nav-circle {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 800;
            background: #f3f4f6;
            color: #9ca3af;
            border: 2px solid #e5e7eb;
            transition: all 0.25s ease;
        }

        .step-nav-check {
            display: none;
        }

        .step-nav-title {
            font-size: 12px;
            font-weight: 700;
            color: #9ca3af;
            transition: color 0.25s ease;
            white-space: nowrap;
        }

        .step-nav-item.active .step-nav-circle {
            background: linear-gradient(135deg, #7d1611 0%, #a3221b 100%);
            color: #ffffff;
            border-color: #d97706;
            box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.2);
            transform: scale(1.06);
        }

        .step-nav-item.active .step-nav-title {
            color: #7d1611;
            font-weight: 800;
        }

        .step-nav-item.completed .step-nav-circle {
            background: #059669;
            color: #ffffff;
            border-color: #059669;
        }

        .step-nav-item.completed .step-nav-num {
            display: none;
        }

        .step-nav-item.completed .step-nav-check {
            display: block;
        }

        .step-nav-item.completed .step-nav-title {
            color: #059669;
        }

        .step-nav-line {
            flex: 1;
            height: 2px;
            background: #e5e7eb;
            margin: -24px 8px 0;
            transition: background 0.3s ease;
            position: relative;
            z-index: 1;
        }

        .step-nav-line.completed {
            background: #059669;
        }

        /* Step Panes */
        .step-pane {
            display: none;
            animation: fadeInStep 0.35s ease forwards;
        }

        .step-pane.active {
            display: block;
        }

        @keyframes fadeInStep {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Step Title Strip */
        .step-header-strip {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 22px;
            padding-bottom: 14px;
            border-bottom: 1px solid #f3f4f6;
        }

        .step-header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .step-icon-badge {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: #fffbeb;
            border: 1px solid #fed7aa;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #d97706;
            flex-shrink: 0;
        }

        .step-title-text {
            font-size: 16px;
            font-weight: 800;
            color: #1f2937;
        }

        .step-sub-text {
            font-size: 12.5px;
            color: #6b7280;
            margin-top: 2px;
        }

        .selected-badge-pill {
            background: #fffbeb;
            border: 1px solid #fed7aa;
            color: #b45309;
            font-size: 12px;
            font-weight: 800;
            padding: 5px 12px;
            border-radius: 99px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        /* Form Inputs */
        .step-form-grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 16px;
        }

        .step-form-group {
            margin-bottom: 16px;
        }

        .step-form-label {
            display: block;
            font-size: 13px;
            font-weight: 700;
            color: #374151;
            margin-bottom: 6px;
        }

        .step-form-label .req {
            color: #dc2626;
            margin-left: 2px;
        }

        .step-form-label .opt {
            font-size: 11.5px;
            font-weight: 400;
            color: #9ca3af;
            margin-left: 4px;
        }

        .step-form-input, .step-form-textarea {
            width: 100%;
            padding: 12px 16px;
            border-radius: 12px;
            border: 1.5px solid #fed7aa;
            background: #fffdfa;
            color: #1f2937;
            font-family: inherit;
            font-size: 14px;
            transition: all 0.25s ease;
        }

        .step-form-input:focus, .step-form-textarea:focus {
            outline: none;
            border-color: #d97706;
            background: #ffffff;
            box-shadow: 0 0 0 3.5px rgba(217, 119, 6, 0.16);
        }

        .step-form-input.has-error {
            border-color: #ef4444;
            background: #fef2f2;
        }

        .step-error-msg {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 11.5px;
            color: #dc2626;
            font-weight: 600;
            margin-top: 5px;
        }

        /* STEP 2: Products Multi-Select */
        .product-section-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 13.5px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 10px;
        }

        .clear-all-link {
            font-size: 11.5px;
            color: #9ca3af;
            text-decoration: underline;
            cursor: pointer;
            border: none;
            background: none;
        }

        .clear-all-link:hover {
            color: #dc2626;
        }

        .hamper-select-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            max-height: 250px;
            overflow-y: auto;
            padding-right: 6px;
            margin-bottom: 18px;
        }

        .hamper-select-grid::-webkit-scrollbar,
        .retail-select-grid::-webkit-scrollbar {
            width: 5px;
        }

        .hamper-select-grid::-webkit-scrollbar-thumb,
        .retail-select-grid::-webkit-scrollbar-thumb {
            background: #fde68a;
            border-radius: 99px;
        }

        .hamper-card-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 14px;
            border-radius: 14px;
            border: 1.5px solid #ecdac3;
            background: #ffffff;
            cursor: pointer;
            transition: all 0.2s ease;
            user-select: none;
        }

        .hamper-card-item:hover {
            border-color: #d97706;
            background: #fffdfa;
        }

        .hamper-card-item.selected {
            border-color: #d97706;
            background: #fffbeb;
            box-shadow: 0 4px 12px rgba(217, 119, 6, 0.12);
        }

        .custom-check-box {
            width: 18px;
            height: 18px;
            border-radius: 6px;
            border: 1.5px solid #d1d5db;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: all 0.2s ease;
        }

        .hamper-card-item.selected .custom-check-box,
        .retail-card-item.selected .custom-check-box {
            background: #d97706;
            border-color: #d97706;
            color: #ffffff;
        }

        .custom-check-box svg {
            display: none;
        }

        .hamper-card-item.selected .custom-check-box svg,
        .retail-card-item.selected .custom-check-box svg {
            display: block;
        }

        .hamper-card-info {
            flex: 1;
            min-width: 0;
        }

        .hamper-card-name {
            font-size: 13px;
            font-weight: 700;
            color: #1f2937;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
        }

        .hamper-card-price {
            font-size: 12px;
            font-weight: 800;
            color: #b45309;
            margin-top: 1px;
            display: block;
        }

        /* Retail Accordion */
        .retail-accordion-btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
            border-radius: 14px;
            background: #fffbeb;
            border: 1.5px solid #fed7aa;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: left;
        }

        .retail-accordion-btn:hover {
            background: #fef3c7;
            border-color: #f59e0b;
        }

        .retail-btn-title {
            font-size: 13px;
            font-weight: 700;
            color: #92400e;
            display: block;
        }

        .retail-btn-desc {
            font-size: 11px;
            color: #b45309;
            margin-top: 1px;
            display: block;
        }

        .retail-accordion-panel {
            display: none;
            background: #faf7f2;
            border: 1.5px solid #fed7aa;
            border-top: none;
            border-radius: 0 0 14px 14px;
            padding: 14px;
            margin-top: -6px;
            margin-bottom: 16px;
        }

        .retail-accordion-panel.open {
            display: block;
        }

        .retail-search-box {
            position: relative;
            margin-bottom: 12px;
        }

        .retail-search-input {
            width: 100%;
            padding: 9px 12px 9px 34px;
            border-radius: 10px;
            border: 1px solid #fed7aa;
            background: #ffffff;
            font-size: 12.5px;
            color: #1f2937;
            outline: none;
        }

        .retail-search-input:focus {
            border-color: #d97706;
            box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.12);
        }

        .retail-search-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
        }

        .retail-select-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            max-height: 200px;
            overflow-y: auto;
            padding-right: 4px;
        }

        .retail-card-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 10px;
            border-radius: 10px;
            border: 1px solid #ecdac3;
            background: #ffffff;
            cursor: pointer;
            transition: all 0.2s ease;
            user-select: none;
        }

        .retail-card-item:hover {
            border-color: #d97706;
        }

        .retail-card-item.selected {
            background: #fef3c7;
            border-color: #d97706;
        }

        .retail-card-name {
            font-size: 11.5px;
            font-weight: 600;
            color: #374151;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
        }

        .retail-card-price {
            font-size: 10.5px;
            font-weight: 700;
            color: #b45309;
            display: block;
        }

        /* Live Total Summary Tag */
        .live-summary-alert {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            border-radius: 12px;
            background: #fffbeb;
            border: 1px solid #fde68a;
            color: #92400e;
            font-size: 12.5px;
            font-weight: 600;
            margin-top: 14px;
        }

        /* STEP 3: Order Type Pills */
        .order-option-pills {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 16px;
        }

        .order-pill-btn {
            padding: 10px 12px;
            border-radius: 12px;
            border: 1.5px solid #ecdac3;
            background: #ffffff;
            color: #4b5563;
            font-size: 12.5px;
            font-weight: 700;
            cursor: pointer;
            text-align: center;
            transition: all 0.2s ease;
        }

        .order-pill-btn:hover {
            border-color: #b45309;
            color: #b45309;
        }

        .order-pill-btn.active {
            background: linear-gradient(135deg, #7d1611 0%, #a3221b 100%);
            color: #ffffff;
            border-color: #d97706;
            box-shadow: 0 4px 12px rgba(125, 22, 17, 0.25);
        }

        /* STEP 4: Confirmation Breakdown */
        .confirm-table {
            background: #fffdfa;
            border: 1.5px solid #fed7aa;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 18px;
        }

        .confirm-row {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 12px 16px;
            border-bottom: 1px solid #fef3c7;
        }

        .confirm-row:last-child {
            border-bottom: none;
        }

        .confirm-icon {
            color: #d97706;
            margin-top: 2px;
            flex-shrink: 0;
        }

        .confirm-content {
            flex: 1;
            min-width: 0;
        }

        .confirm-label {
            font-size: 11px;
            font-weight: 700;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: block;
        }

        .confirm-val {
            font-size: 13.5px;
            font-weight: 700;
            color: #1f2937;
            margin-top: 1px;
            word-break: break-word;
        }

        .confirm-products-list {
            margin-top: 4px;
            font-size: 12px;
            color: #4b5563;
            line-height: 1.6;
        }

        .confirm-notice-text {
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            line-height: 1.5;
        }

        /* COMPLETED VIEW */
        .completed-view {
            text-align: center;
            padding: 16px 8px;
        }

        .completed-icon-circle {
            width: 68px;
            height: 68px;
            border-radius: 50%;
            background: #ecfdf5;
            border: 2px solid #a7f3d0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #059669;
            margin-bottom: 16px;
            box-shadow: 0 10px 25px rgba(5, 150, 105, 0.15);
        }

        .completed-badge {
            display: inline-block;
            padding: 4px 14px;
            border-radius: 99px;
            background: #fffbeb;
            color: #b45309;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
        }

        .completed-title {
            font-size: 24px;
            font-weight: 800;
            color: #1f2937;
            margin-bottom: 8px;
        }

        .completed-desc {
            font-size: 13.5px;
            color: #6b7280;
            max-width: 460px;
            margin: 0 auto 20px;
            line-height: 1.6;
        }

        .order-code-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 380px;
            margin: 0 auto 20px;
            padding: 12px 18px;
            background: #fffbeb;
            border: 1.5px solid #fed7aa;
            border-radius: 14px;
            text-align: left;
        }

        .order-code-title {
            font-size: 11px;
            font-weight: 700;
            color: #92400e;
            text-transform: uppercase;
            display: block;
        }

        .order-code-val {
            font-size: 17px;
            font-weight: 800;
            color: #b45309;
            letter-spacing: 1px;
            font-family: monospace;
            display: block;
        }

        .copy-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 7px 12px;
            border-radius: 8px;
            border: 1px solid #fed7aa;
            background: #ffffff;
            color: #374151;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .copy-btn:hover {
            background: #fef3c7;
            border-color: #d97706;
        }

        .completed-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            max-width: 420px;
            margin: 0 auto 16px;
        }

        .btn-zalo-act {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 13px 18px;
            border-radius: 12px;
            background: #0284c7;
            color: #ffffff;
            font-size: 13.5px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
        }

        .btn-zalo-act:hover {
            background: #0369a1;
            transform: translateY(-1px);
        }

        .btn-email-act {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 13px 18px;
            border-radius: 12px;
            background: linear-gradient(135deg, #7d1611 0%, #a3221b 100%);
            color: #ffffff;
            font-size: 13.5px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(125, 22, 17, 0.25);
        }

        .btn-email-act:hover {
            background: linear-gradient(135deg, #63100c 0%, #8b1812 100%);
            transform: translateY(-1px);
        }

        .completed-hotline {
            font-size: 12.5px;
            color: #6b7280;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .completed-hotline a {
            color: #7d1611;
            font-weight: 800;
            text-decoration: none;
        }

        /* Stepper Footer Buttons */
        .stepper-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 28px;
            padding-top: 20px;
            border-top: 1px solid #f3f4f6;
        }

        .stepper-btn-back {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 11px 22px;
            border-radius: 12px;
            border: 1.5px solid #ecdac3;
            background: #ffffff;
            color: #4b5563;
            font-size: 13.5px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .stepper-btn-back:hover {
            background: #f9fafb;
            border-color: #d1d5db;
        }

        .stepper-btn-next {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 28px;
            border-radius: 12px;
            border: 1.5px solid #d97706;
            background: linear-gradient(135deg, #7d1611 0%, #a3221b 100%);
            color: #ffffff;
            font-size: 14px;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 6px 18px rgba(125, 22, 17, 0.28);
        }

        .stepper-btn-next:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 24px rgba(125, 22, 17, 0.36);
            background: linear-gradient(135deg, #63100c 0%, #8b1812 100%);
        }

        /* Contact Info Strip Below Stepper */
        .contact-info-strip {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            margin-top: 28px;
            font-size: 13.5px;
            color: #6b7280;
            flex-wrap: wrap;
        }

        .contact-strip-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #4b5563;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.2s ease;
        }

        .contact-strip-link:hover {
            color: #7d1611;
        }

        .contact-strip-link strong {
            color: #7d1611;
        }

        .contact-strip-sep {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #d1d5db;
        }

        @media (max-width: 640px) {
            .stepper-box {
                padding: 24px 16px 20px;
                border-radius: 20px;
            }

            .step-form-grid-2 {
                grid-template-columns: 1fr;
                gap: 12px;
            }

            .hamper-select-grid {
                grid-template-columns: 1fr;
            }

            .retail-select-grid {
                grid-template-columns: 1fr;
            }

            .order-option-pills {
                grid-template-columns: 1fr;
            }

            .step-nav-circle {
                width: 32px;
                height: 32px;
                font-size: 12.5px;
            }

            .step-nav-title {
                font-size: 11px;
            }

            .completed-actions {
                grid-template-columns: 1fr;
            }
        }
`;

// Replace CSS in <style>
// We replace the old .order-type- styles (around line 4740-4835)
const oldOrderTypeCssStart = '/* --- BỘ CHỌN HÌNH THỨC ĐẶT QUÀ';
const oldOrderTypeCssEnd = '</style>';

const cssStartIdx = content.indexOf(oldOrderTypeCssStart);
const cssEndIdx = content.indexOf(oldOrderTypeCssEnd, cssStartIdx);

if (cssStartIdx !== -1 && cssEndIdx !== -1) {
    content = content.substring(0, cssStartIdx) + stepperCss + '\n    ' + content.substring(cssEndIdx);
    console.log('CSS replaced successfully.');
} else {
    console.log('CSS marker not found!');
}

// 2. Prepare Stepper HTML Markup
const stepperHtml = `        <section class="alt" id="baogia">
            <div class="wrap">
                <!-- Section Header -->
                <div class="stepper-header">
                    <span class="stepper-badge">
                        <span class="stepper-badge-dot"></span>
                        Liên Hệ Báo Giá
                    </span>
                    <h2 class="stepper-title" style="margin-top:10px;">Nhận Báo Giá Hamper Tết</h2>
                    <p class="stepper-desc">Chọn một hoặc nhiều sản phẩm cần báo giá — đội ngũ LisaFood sẽ gửi bảng chiết khấu chi tiết trong vòng 2 giờ.</p>
                    <div class="bar" style="margin:16px auto 0;"></div>
                </div>

                <!-- Luxury Stepper Box Container -->
                <div class="stepper-box" id="stepperContainer">
                    <!-- Stepper Progress Header -->
                    <div class="stepper-nav" id="stepperNav">
                        <div class="step-nav-item active" data-step="1">
                            <div class="step-nav-circle">
                                <span class="step-nav-num">1</span>
                                <svg class="step-nav-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                            </div>
                            <span class="step-nav-title">Liên hệ</span>
                        </div>
                        <div class="step-nav-line" id="navLine1"></div>

                        <div class="step-nav-item" data-step="2">
                            <div class="step-nav-circle">
                                <span class="step-nav-num">2</span>
                                <svg class="step-nav-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                            </div>
                            <span class="step-nav-title">Sản phẩm</span>
                        </div>
                        <div class="step-nav-line" id="navLine2"></div>

                        <div class="step-nav-item" data-step="3">
                            <div class="step-nav-circle">
                                <span class="step-nav-num">3</span>
                                <svg class="step-nav-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                            </div>
                            <span class="step-nav-title">Số lượng</span>
                        </div>
                        <div class="step-nav-line" id="navLine3"></div>

                        <div class="step-nav-item" data-step="4">
                            <div class="step-nav-circle">
                                <span class="step-nav-num">4</span>
                                <svg class="step-nav-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                            </div>
                            <span class="step-nav-title">Xác nhận</span>
                        </div>
                    </div>

                    <!-- Stepper Panes -->
                    <div class="stepper-panes">
                        <!-- STEP 1: Thông tin liên hệ -->
                        <div class="step-pane active" id="step1">
                            <div class="step-header-strip">
                                <div class="step-header-left">
                                    <div class="step-icon-badge">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    </div>
                                    <div>
                                        <div class="step-title-text">Thông tin liên hệ</div>
                                        <div class="step-sub-text">Bước 1/4: Để chúng tôi gửi báo giá & chiết khấu chi tiết</div>
                                    </div>
                                </div>
                            </div>

                            <div class="step-form-grid-2">
                                <div class="step-form-group">
                                    <label class="step-form-label" for="inpName">Họ và tên <span class="req">*</span></label>
                                    <input type="text" id="inpName" class="step-form-input" placeholder="Ví dụ: Nguyễn Văn A" autocomplete="name">
                                    <div class="step-error-msg" id="errName" style="display:none;">Vui lòng nhập họ và tên của bạn</div>
                                </div>
                                <div class="step-form-group">
                                    <label class="step-form-label" for="inpPhone">Số điện thoại <span class="req">*</span></label>
                                    <input type="tel" id="inpPhone" class="step-form-input" placeholder="Ví dụ: 0912 345 678" autocomplete="tel">
                                    <div class="step-error-msg" id="errPhone" style="display:none;">Số điện thoại hợp lệ từ 9-11 chữ số</div>
                                </div>
                            </div>

                            <div class="step-form-group">
                                <label class="step-form-label" for="inpCompany">Tên doanh nghiệp / Đơn vị <span class="opt">(tùy chọn)</span></label>
                                <input type="text" id="inpCompany" class="step-form-input" placeholder="Ví dụ: Công ty Cổ phần ABC" autocomplete="organization">
                            </div>
                        </div>

                        <!-- STEP 2: Chọn sản phẩm -->
                        <div class="step-pane" id="step2">
                            <div class="step-header-strip">
                                <div class="step-header-left">
                                    <div class="step-icon-badge">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                                    </div>
                                    <div>
                                        <div class="step-title-text">Chọn sản phẩm cần báo giá</div>
                                        <div class="step-sub-text">Bước 2/4: Quý khách có thể chọn một hoặc nhiều set Hamper và sản phẩm lẻ</div>
                                    </div>
                                </div>
                                <span class="selected-badge-pill" id="badgeSelectedCount">Đã chọn: 0</span>
                            </div>

                            <div class="step-error-msg" id="errProducts" style="display:none;margin-bottom:12px;padding:8px 12px;background:#fef2f2;border-radius:8px;">Vui lòng chọn ít nhất 1 set Hamper hoặc 1 sản phẩm lẻ bạn quan tâm</div>

                            <!-- Section A: Hamper Quà Tết -->
                            <div class="product-section-label">
                                <span>✨ Bộ Sưu Tập Hamper Tết (<span id="hamperCount">0</span> đã chọn)</span>
                                <button type="button" class="clear-all-link" id="clearHampersBtn" style="display:none;" onclick="clearAllHampers()">Bỏ chọn tất cả</button>
                            </div>
                            <div class="hamper-select-grid" id="hamperGrid">
                                <!-- Javascript populates 14 hampers -->
                            </div>

                            <!-- Section B: Retail Products Accordion -->
                            <div class="retail-accordion-wrap">
                                <div class="retail-accordion-btn" id="retailAccordionBtn" onclick="toggleRetailAccordion()">
                                    <div style="display:flex;align-items:center;gap:10px;">
                                        <div class="custom-check-box" id="retailMainCheck">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                                        </div>
                                        <div>
                                            <span class="retail-btn-title">Chọn thêm Sản Phẩm Lẻ / Hạt Dinh Dưỡng</span>
                                            <span class="retail-btn-desc">28 dòng đặc sản hạt điều, macca, nho khô, khô gà... (<span id="retailSelectedCount">0</span> món đã chọn)</span>
                                        </div>
                                    </div>
                                    <svg id="retailChevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
                                </div>

                                <div class="retail-accordion-panel" id="retailPanel">
                                    <div class="retail-search-box">
                                        <svg class="retail-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                                        <input type="text" id="retailSearchInput" class="retail-search-input" placeholder="Tìm kiếm hạt điều, macca, nho khô, khô gà..." oninput="filterRetailProducts(this.value)">
                                    </div>

                                    <div class="retail-select-grid" id="retailGrid">
                                        <!-- Javascript populates 28 retail products -->
                                    </div>
                                </div>
                            </div>

                            <div class="live-summary-alert" id="liveSummaryAlert" style="display:none;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                <span id="liveSummaryText">Tổng cộng đã chọn: 0 sản phẩm</span>
                            </div>
                        </div>

                        <!-- STEP 3: Số lượng & Yêu cầu -->
                        <div class="step-pane" id="step3">
                            <div class="step-header-strip">
                                <div class="step-header-left">
                                    <div class="step-icon-badge">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
                                    </div>
                                    <div>
                                        <div class="step-title-text">Số lượng & Yêu cầu</div>
                                        <div class="step-sub-text">Bước 3/4: Số lượng dự kiến và yêu cầu riêng của quý khách</div>
                                    </div>
                                </div>
                            </div>

                            <div class="step-form-group">
                                <label class="step-form-label" for="inpQty">Số lượng hộp dự kiến <span class="req">*</span></label>
                                <input type="number" id="inpQty" class="step-form-input" min="1" placeholder="Ví dụ: 50" inputmode="numeric">
                                <div class="step-error-msg" id="errQty" style="display:none;">Vui lòng nhập số lượng hộp muốn đặt (tối thiểu 1 hộp)</div>
                            </div>

                            <div class="step-form-group">
                                <label class="step-form-label">Hình thức đặt quà bạn quan tâm:</label>
                                <div class="order-option-pills">
                                    <div class="order-pill-btn active" data-type="standard" onclick="selectOrderType('standard', this)">
                                        Mẫu hamper có sẵn
                                    </div>
                                    <div class="order-pill-btn" data-type="custom" onclick="selectOrderType('custom', this)">
                                        Thiết kế theo yêu cầu
                                    </div>
                                    <div class="order-pill-btn" data-type="budget" onclick="selectOrderType('budget', this)">
                                        Theo mức ngân sách
                                    </div>
                                </div>
                            </div>

                            <div class="step-form-group">
                                <label class="step-form-label" for="inpNote">Yêu cầu thêm <span class="opt">(không bắt buộc)</span></label>
                                <textarea id="inpNote" class="step-form-textarea" rows="3" placeholder="In logo công ty ép kim, xuất hóa đơn VAT, ngày giao hàng dự kiến, địa chỉ nhận hàng..."></textarea>
                            </div>
                        </div>

                        <!-- STEP 4: Xác nhận thông tin -->
                        <div class="step-pane" id="step4">
                            <div class="step-header-strip">
                                <div class="step-header-left">
                                    <div class="step-icon-badge">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                    </div>
                                    <div>
                                        <div class="step-title-text">Kiểm tra thông tin</div>
                                        <div class="step-sub-text">Bước 4/4: Xác nhận trước khi gửi yêu cầu báo giá</div>
                                    </div>
                                </div>
                            </div>

                            <div class="confirm-table">
                                <div class="confirm-row">
                                    <svg class="confirm-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    <div class="confirm-content">
                                        <span class="confirm-label">Họ và tên</span>
                                        <span class="confirm-val" id="cfmName">—</span>
                                    </div>
                                </div>

                                <div class="confirm-row">
                                    <svg class="confirm-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                    <div class="confirm-content">
                                        <span class="confirm-label">Số điện thoại</span>
                                        <span class="confirm-val" id="cfmPhone">—</span>
                                    </div>
                                </div>

                                <div class="confirm-row">
                                    <svg class="confirm-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                    <div class="confirm-content">
                                        <span class="confirm-label">Tên doanh nghiệp</span>
                                        <span class="confirm-val" id="cfmCompany">Cá nhân</span>
                                    </div>
                                </div>

                                <div class="confirm-row">
                                    <svg class="confirm-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                                    <div class="confirm-content">
                                        <span class="confirm-label">Sản phẩm đã chọn (<span id="cfmProdCount">0</span>)</span>
                                        <div class="confirm-products-list" id="cfmProdList">Chưa chọn</div>
                                    </div>
                                </div>

                                <div class="confirm-row">
                                    <svg class="confirm-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
                                    <div class="confirm-content">
                                        <span class="confirm-label">Số lượng & Hình thức</span>
                                        <span class="confirm-val" id="cfmQty">—</span>
                                    </div>
                                </div>

                                <div class="confirm-row">
                                    <svg class="confirm-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                                    <div class="confirm-content">
                                        <span class="confirm-label">Ghi chú</span>
                                        <span class="confirm-val" id="cfmNote">Không có ghi chú</span>
                                    </div>
                                </div>
                            </div>

                            <p class="confirm-notice-text">
                                Nhấn <strong style="color:#7d1611;">"Gửi yêu cầu báo giá"</strong> để hoàn tất. Ban quản trị LisaFood sẽ liên hệ lại trong vòng 2 giờ.
                            </p>
                        </div>

                        <!-- COMPLETED STATE -->
                        <div class="step-pane" id="stepCompleted">
                            <div class="completed-view">
                                <div class="completed-icon-circle">
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                                </div>
                                <br>
                                <span class="completed-badge">Yêu Cầu Đã Gửi Thành Công</span>
                                <h3 class="completed-title">Cảm ơn <span id="compName">Quý khách</span>!</h3>
                                <p class="completed-desc">
                                    Danh sách <strong id="compCount">0 sản phẩm</strong> yêu cầu báo giá của bạn đã được chuyển tới bộ phận kinh doanh LisaFood. Chúng tôi sẽ liên hệ trong vòng <strong>2 giờ làm việc</strong>.
                                </p>

                                <div class="order-code-box">
                                    <div>
                                        <span class="order-code-title">Mã yêu cầu của bạn</span>
                                        <span class="order-code-val" id="compOrderCode">LSF-TET-839201</span>
                                    </div>
                                    <button type="button" class="copy-btn" id="compCopyBtn" onclick="copyOrderCode()">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                        <span id="copyBtnText">Sao chép</span>
                                    </button>
                                </div>

                                <div class="completed-actions">
                                    <a href="#" id="compZaloBtn" target="_blank" rel="noopener" class="btn-zalo-act">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                        <span>Nhắn Zalo Ngay</span>
                                    </a>
                                    <a href="#" id="compEmailBtn" class="btn-email-act">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                        <span>Gửi Email Báo Giá</span>
                                    </a>
                                </div>

                                <div class="completed-hotline">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    <span>Hotline hỗ trợ 24/7: <a href="tel:0393955516">0393.955.516</a></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Stepper Navigation Footer -->
                    <div class="stepper-footer" id="stepperFooter">
                        <button type="button" class="stepper-btn-back" id="btnPrev" onclick="navigateStep(-1)" style="visibility:hidden;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
                            <span>Quay lại</span>
                        </button>
                        <button type="button" class="stepper-btn-next" id="btnNext" onclick="navigateStep(1)">
                            <span id="btnNextText">Tiếp theo</span>
                            <svg id="btnNextIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                    </div>
                </div>

                <!-- Contact Info Strip Below Stepper -->
                <div class="contact-info-strip">
                    <a href="tel:0393955516" class="contact-strip-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <span>Hotline: <strong>0393.955.516</strong></span>
                    </a>
                    <span class="contact-strip-sep"></span>
                    <a href="https://zalo.me/0393955516" target="_blank" rel="noopener" class="contact-strip-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        <span>Zalo hỗ trợ 24/7</span>
                    </a>
                    <span class="contact-strip-sep"></span>
                    <a href="mailto:sale@lisafood.vn" class="contact-strip-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        <span>Email: <strong>sale@lisafood.vn</strong></span>
                    </a>
                </div>
            </div>
        </section>`;

const oldSectionStart = '<section class="alt" id="baogia">';
const oldSectionEnd = '</section>\n        <section id="lienhe">';

const secStartIdx = content.indexOf(oldSectionStart);
const secEndIdx = content.indexOf(oldSectionEnd);

if (secStartIdx !== -1 && secEndIdx !== -1) {
    content = content.substring(0, secStartIdx) + stepperHtml + '\n' + content.substring(secEndIdx + '</section>\n'.length);
    console.log('Section #baogia HTML replaced successfully.');
} else {
    console.log('Section marker not found!');
}

// 3. Prepare Stepper JavaScript Logic
const stepperJs = `    <script>
        // ==========================================================================
        // KHỞI TẠO VÀ XỬ LÝ STEPPER BÁO GIÁ LIÊN HỆ LISA FOOD TẾT 2027
        // ==========================================================================
        (function () {
            var hampersList = [
                { name: "Happy New Year", price: "590.000đ" },
                { name: "Sắc Xuân 01 (A)", price: "1.022.000đ" },
                { name: "Sắc Xuân 01 (B)", price: "1.154.000đ" },
                { name: "Sắc Xuân 02 (A)", price: "1.043.000đ" },
                { name: "Sắc Xuân 02 (B)", price: "999.000đ" },
                { name: "Ngọc Vũ Khai Lộc (A)", price: "955.000đ" },
                { name: "Ngọc Vũ Khai Lộc (B)", price: "899.000đ" },
                { name: "Xuân Hoan Ca", price: "1.380.000đ" },
                { name: "Hương Xuân", price: "1.314.000đ" },
                { name: "Xuân Đong Đầy", price: "1.055.000đ" },
                { name: "Xuân Như Ý", price: "1.655.000đ" },
                { name: "Tết Lạc Hồng", price: "1.682.000đ" },
                { name: "Tết Việt", price: "1.435.000đ" },
                { name: "Phượng Vũ Nghinh Xuân", price: "1.010.000đ" }
            ];

            var retailProductsList = [
                { name: "Hạt điều rang muối 250g", price: "177.000đ" },
                { name: "Hạt macca sấy 250g", price: "172.000đ" },
                { name: "Hạnh nhân rang bơ 250g", price: "160.000đ" },
                { name: "Hạt điều rang mộc bóc vỏ 250g", price: "196.000đ" },
                { name: "Hạt điều rang mộc vỏ lụa 250g", price: "186.000đ" },
                { name: "Hạt điều rang muối hộp gỗ 500g", price: "428.000đ" },
                { name: "Hạt điều rang muối vỏ lụa 210g", price: "144.000đ" },
                { name: "Hạt điều rang muối bóc vỏ 210g", price: "155.000đ" },
                { name: "Hạt tổng hợp 210g", price: "137.000đ" },
                { name: "Hạt điều capuchino 210g", price: "162.000đ" },
                { name: "Hạt điều tỏi ớt 210g", price: "157.000đ" },
                { name: "Hạt điều cacao 210g", price: "160.000đ" },
                { name: "Nhân macca wasabi", price: "224.000đ" },
                { name: "Hạt điều tỏi ớt 200g (hũ)", price: "160.000đ" },
                { name: "Hạt điều capuchino 200g (hũ)", price: "163.000đ" },
                { name: "Hạt điều cacao 200g (hũ)", price: "163.000đ" },
                { name: "Hạt sachi rang mộc 250g (hũ)", price: "145.000đ" },
                { name: "Nho khô 250g", price: "110.000đ" },
                { name: "Hạt sachi rang mộc 100g", price: "68.000đ" },
                { name: "Hạt điều rang muối vỏ lụa 100g", price: "68.000đ" },
                { name: "Hạt điều rang muối bóc vỏ 205g", price: "170.000đ" },
                { name: "Hạt điều rang muối vỏ lụa 205g", price: "145.000đ" },
                { name: "Hạt điều rang muối vỏ lụa 400g", price: "297.000đ" },
                { name: "Hạt điều rang muối bóc vỏ 400g", price: "342.000đ" },
                { name: "Khô gà lá chanh 200g", price: "151.000đ" },
                { name: "Khô gà bơ tỏi 200g", price: "160.000đ" },
                { name: "Khô gà bơ tỏi 100g", price: "56.000đ" },
                { name: "Khô gà lá chanh 100g", price: "52.000đ" }
            ];

            var currentStep = 1;
            var selectedHampers = [];
            var selectedRetail = [];
            var selectedOrderType = 'standard';
            var generatedOrderCode = '';

            // Render Hampers
            var hamperGrid = document.getElementById("hamperGrid");
            if (hamperGrid) {
                hampersList.forEach(function(box) {
                    var label = box.name + " (" + box.price + ")";
                    var div = document.createElement("div");
                    div.className = "hamper-card-item";
                    div.setAttribute("data-label", label);
                    div.onclick = function() { toggleHamperItem(label, div); };
                    div.innerHTML = 
                        '<div class="custom-check-box">' +
                            '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' +
                        '</div>' +
                        '<div class="hamper-card-info">' +
                            '<span class="hamper-card-name">' + box.name + '</span>' +
                            '<span class="hamper-card-price">' + box.price + '</span>' +
                        '</div>';
                    hamperGrid.appendChild(div);
                });
            }

            // Render Retail Products
            var retailGrid = document.getElementById("retailGrid");
            function renderRetailList(items) {
                if (!retailGrid) return;
                retailGrid.innerHTML = "";
                items.forEach(function(prod) {
                    var label = prod.name + " (" + prod.price + ")";
                    var isSelected = selectedRetail.indexOf(label) !== -1;
                    var div = document.createElement("div");
                    div.className = "retail-card-item" + (isSelected ? " selected" : "");
                    div.setAttribute("data-label", label);
                    div.onclick = function() { toggleRetailItem(label, div); };
                    div.innerHTML = 
                        '<div class="custom-check-box">' +
                            '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>' +
                        '</div>' +
                        '<div style="min-width:0;flex:1;">' +
                            '<span class="retail-card-name">' + prod.name + '</span>' +
                            '<span class="retail-card-price">' + prod.price + '</span>' +
                        '</div>';
                    retailGrid.appendChild(div);
                });
            }
            renderRetailList(retailProductsList);

            window.toggleHamperItem = function(label, el) {
                var idx = selectedHampers.indexOf(label);
                if (idx !== -1) {
                    selectedHampers.splice(idx, 1);
                    el.classList.remove("selected");
                } else {
                    selectedHampers.push(label);
                    el.classList.add("selected");
                }
                updateSelectedSummary();
            };

            window.toggleRetailItem = function(label, el) {
                var idx = selectedRetail.indexOf(label);
                if (idx !== -1) {
                    selectedRetail.splice(idx, 1);
                    el.classList.remove("selected");
                } else {
                    selectedRetail.push(label);
                    el.classList.add("selected");
                }
                updateSelectedSummary();
            };

            window.clearAllHampers = function() {
                selectedHampers = [];
                document.querySelectorAll("#hamperGrid .hamper-card-item").forEach(function(el) {
                    el.classList.remove("selected");
                });
                updateSelectedSummary();
            };

            window.toggleRetailAccordion = function() {
                var panel = document.getElementById("retailPanel");
                var chevron = document.getElementById("retailChevron");
                if (!panel) return;
                panel.classList.toggle("open");
                if (chevron) {
                    chevron.style.transform = panel.classList.contains("open") ? "rotate(180deg)" : "rotate(0deg)";
                }
            };

            window.filterRetailProducts = function(query) {
                var q = (query || "").toLowerCase().trim();
                var filtered = retailProductsList.filter(function(p) {
                    return p.name.toLowerCase().indexOf(q) !== -1;
                });
                renderRetailList(filtered);
            };

            function updateSelectedSummary() {
                var hCount = selectedHampers.length;
                var rCount = selectedRetail.length;
                var total = hCount + rCount;

                var hEl = document.getElementById("hamperCount");
                if (hEl) hEl.textContent = hCount;

                var clearBtn = document.getElementById("clearHampersBtn");
                if (clearBtn) clearBtn.style.display = hCount > 0 ? "inline" : "none";

                var rEl = document.getElementById("retailSelectedCount");
                if (rEl) rEl.textContent = rCount;

                var bEl = document.getElementById("badgeSelectedCount");
                if (bEl) bEl.textContent = "Đã chọn: " + total;

                var retailMainCheck = document.getElementById("retailMainCheck");
                if (retailMainCheck) {
                    if (rCount > 0) {
                        retailMainCheck.parentElement.parentElement.classList.add("selected");
                        retailMainCheck.style.background = "#d97706";
                        retailMainCheck.style.borderColor = "#d97706";
                        var svg = retailMainCheck.querySelector("svg");
                        if (svg) svg.style.display = "block";
                    } else {
                        retailMainCheck.parentElement.parentElement.classList.remove("selected");
                        retailMainCheck.style.background = "#ffffff";
                        retailMainCheck.style.borderColor = "#d1d5db";
                        var svg = retailMainCheck.querySelector("svg");
                        if (svg) svg.style.display = "none";
                    }
                }

                var alertBox = document.getElementById("liveSummaryAlert");
                var alertText = document.getElementById("liveSummaryText");
                var errProducts = document.getElementById("errProducts");
                if (total > 0) {
                    if (alertBox) alertBox.style.display = "flex";
                    if (alertText) alertText.innerHTML = "Tổng cộng đã chọn: <strong>" + total + " sản phẩm</strong> (" + hCount + " Hamper + " + rCount + " món lẻ)";
                    if (errProducts) errProducts.style.display = "none";
                } else {
                    if (alertBox) alertBox.style.display = "none";
                }
            }

            window.selectOrderType = function(type, el) {
                selectedOrderType = type;
                document.querySelectorAll(".order-pill-btn").forEach(function(b) {
                    b.classList.remove("active");
                });
                el.classList.add("active");
            };

            function validateStep(step) {
                if (step === 1) {
                    var name = (document.getElementById("inpName")?.value || "").trim();
                    var phone = (document.getElementById("inpPhone")?.value || "").trim();
                    var valid = true;

                    if (!name) {
                        document.getElementById("inpName")?.classList.add("has-error");
                        var errName = document.getElementById("errName");
                        if (errName) errName.style.display = "flex";
                        valid = false;
                    } else {
                        document.getElementById("inpName")?.classList.remove("has-error");
                        var errName = document.getElementById("errName");
                        if (errName) errName.style.display = "none";
                    }

                    var cleanPhone = phone.replace(/[\\s.-]/g, '');
                    if (!cleanPhone || !/^\\d+$/.test(cleanPhone) || cleanPhone.length < 9 || cleanPhone.length > 11) {
                        document.getElementById("inpPhone")?.classList.add("has-error");
                        var errPhone = document.getElementById("errPhone");
                        if (errPhone) errPhone.style.display = "flex";
                        valid = false;
                    } else {
                        document.getElementById("inpPhone")?.classList.remove("has-error");
                        var errPhone = document.getElementById("errPhone");
                        if (errPhone) errPhone.style.display = "none";
                    }
                    return valid;
                }

                if (step === 2) {
                    if (selectedHampers.length === 0 && selectedRetail.length === 0) {
                        var errProds = document.getElementById("errProducts");
                        if (errProds) errProds.style.display = "block";
                        return false;
                    }
                    var errProds = document.getElementById("errProducts");
                    if (errProds) errProds.style.display = "none";
                    return true;
                }

                if (step === 3) {
                    var qty = parseInt(document.getElementById("inpQty")?.value || "", 10);
                    if (isNaN(qty) || qty <= 0) {
                        document.getElementById("inpQty")?.classList.add("has-error");
                        var errQty = document.getElementById("errQty");
                        if (errQty) errQty.style.display = "flex";
                        return false;
                    }
                    document.getElementById("inpQty")?.classList.remove("has-error");
                    var errQty = document.getElementById("errQty");
                    if (errQty) errQty.style.display = "none";
                    return true;
                }

                return true;
            }

            function populateConfirmation() {
                var name = (document.getElementById("inpName")?.value || "").trim();
                var phone = (document.getElementById("inpPhone")?.value || "").trim();
                var company = (document.getElementById("inpCompany")?.value || "").trim();

                var cfmName = document.getElementById("cfmName");
                if (cfmName) cfmName.textContent = name || "—";

                var cfmPhone = document.getElementById("cfmPhone");
                if (cfmPhone) cfmPhone.textContent = phone || "—";

                var cfmComp = document.getElementById("cfmCompany");
                if (cfmComp) cfmComp.textContent = company || "Cá nhân";

                var total = selectedHampers.length + selectedRetail.length;
                var cfmCount = document.getElementById("cfmProdCount");
                if (cfmCount) cfmCount.textContent = total;

                var prodHtml = "";
                if (selectedHampers.length > 0) {
                    prodHtml += "<div style='font-weight:700;color:#7d1611;margin-bottom:2px;'>Set Hamper Tết (" + selectedHampers.length + "):</div><ul style='margin-left:18px;margin-bottom:6px;'>";
                    selectedHampers.forEach(function(h) { prodHtml += "<li>" + h + "</li>"; });
                    prodHtml += "</ul>";
                }
                if (selectedRetail.length > 0) {
                    prodHtml += "<div style='font-weight:700;color:#0284c7;margin-bottom:2px;'>Sản phẩm lẻ (" + selectedRetail.length + "):</div><ul style='margin-left:18px;'>";
                    selectedRetail.forEach(function(r) { prodHtml += "<li>" + r + "</li>"; });
                    prodHtml += "</ul>";
                }
                var cfmList = document.getElementById("cfmProdList");
                if (cfmList) cfmList.innerHTML = prodHtml || "Chưa chọn";

                var typeStr = "Mẫu hamper có sẵn";
                if (selectedOrderType === "custom") typeStr = "Thiết kế theo yêu cầu";
                if (selectedOrderType === "budget") typeStr = "Theo mức ngân sách";

                var qtyVal = (document.getElementById("inpQty")?.value || "").trim() || "1";
                var cfmQty = document.getElementById("cfmQty");
                if (cfmQty) cfmQty.textContent = qtyVal + " hộp (" + typeStr + ")";

                var note = (document.getElementById("inpNote")?.value || "").trim();
                var cfmNote = document.getElementById("cfmNote");
                if (cfmNote) cfmNote.textContent = note || "Không có ghi chú";
            }

            window.navigateStep = function(direction) {
                if (direction === 1) {
                    if (!validateStep(currentStep)) return;
                    if (currentStep === 3) {
                        populateConfirmation();
                    }
                    if (currentStep === 4) {
                        completeOrder();
                        return;
                    }
                    currentStep++;
                } else {
                    currentStep--;
                }
                renderCurrentStep();
            };

            function renderCurrentStep() {
                for (var i = 1; i <= 4; i++) {
                    var pane = document.getElementById("step" + i);
                    var navItem = document.querySelector('.step-nav-item[data-step="' + i + '"]');
                    var navLine = document.getElementById("navLine" + (i - 1));

                    if (pane) {
                        if (i === currentStep) pane.classList.add("active");
                        else pane.classList.remove("active");
                    }

                    if (navItem) {
                        if (i === currentStep) {
                            navItem.classList.add("active");
                            navItem.classList.remove("completed");
                        } else if (i < currentStep) {
                            navItem.classList.remove("active");
                            navItem.classList.add("completed");
                        } else {
                            navItem.classList.remove("active");
                            navItem.classList.remove("completed");
                        }
                    }

                    if (navLine) {
                        if (i <= currentStep) navLine.classList.add("completed");
                        else navLine.classList.remove("completed");
                    }
                }

                var btnPrev = document.getElementById("btnPrev");
                if (btnPrev) btnPrev.style.visibility = (currentStep === 1) ? "hidden" : "visible";

                var nextBtnText = document.getElementById("btnNextText");
                var nextBtnIcon = document.getElementById("btnNextIcon");
                if (currentStep === 4) {
                    if (nextBtnText) nextBtnText.textContent = "Gửi yêu cầu báo giá";
                    if (nextBtnIcon) nextBtnIcon.innerHTML = '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>';
                } else {
                    if (nextBtnText) nextBtnText.textContent = "Tiếp theo";
                    if (nextBtnIcon) nextBtnIcon.innerHTML = '<path d="m9 18 6-6-6-6"/>';
                }
            }

            function completeOrder() {
                var name = (document.getElementById("inpName")?.value || "").trim();
                var phone = (document.getElementById("inpPhone")?.value || "").trim();
                var company = (document.getElementById("inpCompany")?.value || "").trim();
                var qty = (document.getElementById("inpQty")?.value || "").trim() || "1";
                var note = (document.getElementById("inpNote")?.value || "").trim();
                var total = selectedHampers.length + selectedRetail.length;

                generatedOrderCode = "LSF-TET-" + Math.floor(100000 + Math.random() * 900000);

                var stepperNav = document.getElementById("stepperNav");
                if (stepperNav) stepperNav.style.display = "none";

                var stepperFooter = document.getElementById("stepperFooter");
                if (stepperFooter) stepperFooter.style.display = "none";

                var step4 = document.getElementById("step4");
                if (step4) step4.classList.remove("active");

                var comp = document.getElementById("stepCompleted");
                if (comp) comp.classList.add("active");

                var compName = document.getElementById("compName");
                if (compName) compName.textContent = name || "Quý khách";

                var compCount = document.getElementById("compCount");
                if (compCount) compCount.textContent = total + " sản phẩm";

                var compCode = document.getElementById("compOrderCode");
                if (compCode) compCode.textContent = generatedOrderCode;

                var summaryText = "[MÃ YÊU CẦU: " + generatedOrderCode + "]\\n" +
                    "• Họ tên: " + name + "\\n" +
                    "• SĐT: " + phone + "\\n" +
                    "• Công ty: " + (company || "Cá nhân") + "\\n" +
                    "• Số lượng: " + qty + " hộp (" + selectedOrderType + ")\\n" +
                    "• Sản phẩm chọn (" + total + " món):\\n" +
                    (selectedHampers.length > 0 ? "  + Hamper: " + selectedHampers.join(", ") + "\\n" : "") +
                    (selectedRetail.length > 0 ? "  + Hạt & món lẻ: " + selectedRetail.join(", ") + "\\n" : "") +
                    "• Ghi chú: " + (note || "Không có");

                var zaloUrl = "https://zalo.me/0393955516";
                var compZalo = document.getElementById("compZaloBtn");
                if (compZalo) compZalo.href = zaloUrl;

                var mailSubject = encodeURIComponent("[" + generatedOrderCode + "] Yêu cầu báo giá Hamper Tết 2027 - " + name);
                var mailBody = encodeURIComponent(summaryText);
                var compEmail = document.getElementById("compEmailBtn");
                if (compEmail) compEmail.href = "mailto:sale@lisafood.vn?subject=" + mailSubject + "&body=" + mailBody;

                // Lưu trữ vào LocalStorage
                try {
                    var existingOrders = JSON.parse(localStorage.getItem('lisafood_orders_leads_v1') || '[]');
                    existingOrders.unshift({
                        id: generatedOrderCode,
                        createdAt: new Date().toISOString(),
                        name: name,
                        phone: phone,
                        company: company,
                        quantity: parseInt(qty, 10),
                        orderType: selectedOrderType,
                        selectedHampers: selectedHampers,
                        selectedRetail: selectedRetail,
                        note: note
                    });
                    localStorage.setItem('lisafood_orders_leads_v1', JSON.stringify(existingOrders));
                } catch(e) {}

                // Gửi AJAX background về formsubmit
                try {
                    fetch("https://formsubmit.co/ajax/sale@lisafood.vn", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Accept": "application/json" },
                        body: JSON.stringify({
                            _subject: "[" + generatedOrderCode + "] Yêu cầu báo giá từ " + (name || phone),
                            "Mã yêu cầu": generatedOrderCode,
                            "Họ và tên": name,
                            "Số điện thoại": phone,
                            "Công ty": company,
                            "Số lượng": qty,
                            "Hình thức": selectedOrderType,
                            "Hamper đã chọn": selectedHampers.join(", "),
                            "Sản phẩm lẻ": selectedRetail.join(", "),
                            "Ghi chú": note
                        })
                    }).catch(function() {});
                } catch(e) {}

                var container = document.getElementById("stepperContainer");
                if (container) container.scrollIntoView({ behavior: "smooth" });
            }

            window.copyOrderCode = function() {
                if (!generatedOrderCode) return;
                navigator.clipboard.writeText(generatedOrderCode).then(function() {
                    var btnText = document.getElementById("copyBtnText");
                    if (btnText) {
                        btnText.textContent = "✓ Đã chép";
                        setTimeout(function() {
                            btnText.textContent = "Sao chép";
                        }, 2000);
                    }
                });
            };

            // Cho phép nhấp trực tiếp vào các nấc Stepper
            document.querySelectorAll(".step-nav-item").forEach(function(item) {
                item.addEventListener("click", function() {
                    var targetStep = parseInt(this.getAttribute("data-step"), 10);
                    if (targetStep < currentStep) {
                        currentStep = targetStep;
                        renderCurrentStep();
                    } else if (targetStep > currentStep) {
                        if (validateStep(currentStep)) {
                            if (targetStep === 4) populateConfirmation();
                            currentStep = targetStep;
                            renderCurrentStep();
                        }
                    }
                });
            });
        })();
    </script>`;

const oldScriptStart = '<script>\n        (function () {\n            var g = function (i) { var el = document.getElementById(i); return el ? el.value.trim() : ""; };';
const oldScriptEnd = '})();\n    </script>\n\n    <!-- Nút ghim nổi: Danh sách quan tâm / Dự toán -->';

const scriptStartIdx = content.indexOf(oldScriptStart);
const scriptEndIdx = content.indexOf(oldScriptEnd);

if (scriptStartIdx !== -1 && scriptEndIdx !== -1) {
    content = content.substring(0, scriptStartIdx) + stepperJs + '\n\n    <!-- Nút ghim nổi: Danh sách quan tâm / Dự toán -->' + content.substring(scriptEndIdx + oldScriptEnd.length);
    console.log('Script replaced successfully.');
} else {
    console.log('Script marker not found!');
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Updated index.html successfully!');
