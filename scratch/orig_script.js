<script>
        (function () {
            var g = function (i) { var el = document.getElementById(i); return el ? el.value.trim() : ""; };
            var m = document.getElementById("fmsg");
            var bMail = document.getElementById("fs");
            var bWa = document.getElementById("fs_wa");

            var radios = document.querySelectorAll('input[name="order_type"]');
            var blockStandard = document.getElementById("block_standard");
            var blockCustomSet = document.getElementById("block_custom_set");
            var blockBudget = document.getElementById("block_budget");

            var selectCustomHamper = document.getElementById("fh_custom");
            var subProductsList = document.getElementById("sub_products_list");

            // Chuyển đổi giữa 3 mục: chỉ được chọn 1 trong 3
            radios.forEach(function (r) {
                r.addEventListener("change", function () {
                    document.querySelectorAll('.order-type-btn').forEach(function(b) { b.classList.remove('active'); });
                    var parentBtn = r.closest('.order-type-btn');
                    if (parentBtn) parentBtn.classList.add('active');
                    var val = this.value;
                    blockStandard.style.display = (val === "standard") ? "block" : "none";
                    blockCustomSet.style.display = (val === "custom_set") ? "block" : "none";
                    blockBudget.style.display = (val === "budget") ? "block" : "none";
                });
            });

            // Khi chọn 1 set trong mục "Thiết kế theo yêu cầu" -> mở danh sách sản phẩm lẻ
            if (selectCustomHamper) {
                selectCustomHamper.addEventListener("change", function () {
                    if (this.value) {
                        subProductsList.style.display = "block";
                    } else {
                        subProductsList.style.display = "none";
                    }
                });
            }

            function validate() {
                var ph = g("fp");
                if (ph.replace(/\D/g, "").length < 9) {
                    m.style.color = "var(--red)";
                    m.textContent = "Vui lòng nhập số điện thoại hợp lệ để Lisa Food tiện liên hệ.";
                    return false;
                }
                var activeType = document.querySelector('input[name="order_type"]:checked').value;
                if (activeType === "standard" && !g("fh")) {
                    m.style.color = "var(--red)";
                    m.textContent = "Vui lòng chọn một mẫu hamper quan tâm trong danh sách.";
                    return false;
                }
                if (activeType === "custom_set" && !g("fh_custom")) {
                    m.style.color = "var(--red)";
                    m.textContent = "Vui lòng chọn mẫu set quà bạn muốn thiết kế.";
                    return false;
                }
                if (activeType === "budget" && !g("f_budget")) {
                    m.style.color = "var(--red)";
                    m.textContent = "Vui lòng nhập mức ngân sách bạn mong muốn.";
                    return false;
                }
                return true;
            }

            function getSelectedProducts() {
                var checked = document.querySelectorAll('input[name="custom_prod"]:checked');
                var items = [];
                checked.forEach(function (c) { items.push(c.value); });
                return items.length > 0 ? items.join(", ") : "Chưa chọn (tư vấn theo mẫu)";
            }

            function buildFormDetails() {
                var activeType = document.querySelector('input[name="order_type"]:checked').value;
                var hType = "";
                var hDetail = "";

                if (activeType === "standard") {
                    hType = "Mẫu hamper có sẵn (kèm giá)";
                    hDetail = g("fh");
                } else if (activeType === "custom_set") {
                    hType = "Thiết kế mẫu hamper theo yêu cầu";
                    hDetail = "Set mẫu: " + g("fh_custom") + "\n• Sản phẩm lẻ phối thêm: " + getSelectedProducts();
                } else if (activeType === "budget") {
                    hType = "Ngân sách theo yêu cầu";
                    hDetail = "Mức ngân sách yêu cầu: " + g("f_budget");
                }

                return {
                    type: hType,
                    detail: hDetail,
                    text: "[YÊU CẦU BÁO GIÁ HAMPER TẾT 2027]\n" +
                        "• Họ tên: " + (g("fn") || "(Chưa điền)") + "\n" +
                        "• Số điện thoại: " + g("fp") + "\n" +
                        "• Công ty: " + (g("fc") || "(Cá nhân)") + "\n" +
                        "• Số lượng: " + (g("fq") || "1") + " set\n" +
                        "• Hình thức: " + hType + "\n" +
                        "• Chi tiết chọn: " + hDetail + "\n" +
                        "• Ghi chú thêm: " + (g("fm") || "(Không có)")
                };
            }

            if (bMail) {
                bMail.addEventListener("click", function () {
                    if (!validate()) return;
                    m.style.color = "var(--gold)";
                    m.textContent = "Đang gửi yêu cầu đến sale@lisafood.vn...";
                    bMail.disabled = true;

                    var info = buildFormDetails();

                    fetch("https://formsubmit.co/ajax/sale@lisafood.vn", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Accept": "application/json" },
                        body: JSON.stringify({
                            _subject: "[Lisa Food Hamper] Yêu cầu báo giá từ " + (g("fn") || g("fp")),
                            "Họ và tên": g("fn"),
                            "Số điện thoại": g("fp"),
                            "Công ty": g("fc"),
                            "Số lượng": g("fq"),
                            "Hình thức lựa chọn": info.type,
                            "Chi tiết yêu cầu": info.detail,
                            "Ghi chú": g("fm")
                        })
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (data) {
                            m.style.color = "#2e7d32";
                            m.textContent = "✓ Gửi yêu cầu thành công! Bộ phận kinh doanh Lisa Food sẽ liên hệ lại sớm nhất.";
                            bMail.disabled = false;
                        })
                        .catch(function (err) {
                            var a = document.createElement("a");
                            a.href = "mailto:sale@lisafood.vn?subject=" + encodeURIComponent("Yêu cầu báo giá hamper Tết 2027") + "&body=" + encodeURIComponent(info.text);
                            document.body.appendChild(a); a.click(); a.remove();
                            m.style.color = "#2e7d32";
                            m.textContent = "Đã mở ứng dụng Email để hoàn tất gửi đến sale@lisafood.vn.";
                            bMail.disabled = false;
                        });
                });
            }

            if (bWa) {
                bWa.addEventListener("click", function () {
                    if (!validate()) return;
                    var info = buildFormDetails();
                    var waUrl = "https://api.whatsapp.com/send?phone=84907560668&text=" + encodeURIComponent(info.text);
                    m.style.color = "#25D366";
                    m.textContent = "Đang mở WhatsApp với nội dung soạn sẵn...";
                    window.open(waUrl, "_blank");
                });
            }
        })();
    </script>

    