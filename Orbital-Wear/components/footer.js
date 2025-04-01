class ShopFooter extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const style = document.createElement("style");
        style.textContent = `
        /* Footer chung */
        .footer {
            background: #222;
            color: white;
            padding: 40px 10%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        /* Cột */
        .footer-column {
            flex: 1;
            min-width: 200px;
            margin-bottom: 20px;
        }

        .footer h3 {
            font-size: 18px;
            margin-bottom: 10px;
        }

        .footer ul {
            list-style: none;
            padding: 0;
        }

        .footer ul li {
            margin: 8px 0;
        }

        .footer ul li a {
            color: #ccc;
            text-decoration: none;
            transition: color 0.3s;
        }

        .footer ul li a:hover {
            color: white;
        }

        /* Social Icons */
        .social-icons {
            display: flex;
            gap: 10px;
        }

        .social-icons a {
            color: white;
            font-size: 20px;
            transition: opacity 0.3s;
        }

        .social-icons a:hover {
            opacity: 0.7;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .footer {
                flex-direction: column;
                text-align: center;
            }
            .social-icons {
                justify-content: center;
            }
        }
        `;

        const footer = document.createElement("footer");
        footer.classList.add("footer");
        footer.innerHTML = `
            <div class="footer-column">
                <h3>Orbital Wear</h3>
                <p>Giải pháp bán hàng đơn giản, nhanh chóng và hiệu quả.</p>
            </div>
            <div class="footer-column">
                <h3>Liên kết hữu ích</h3>
                <ul>
                    <li><a href="#">Về chúng tôi</a></li>
                    <li><a href="#">Chính sách bảo mật</a></li>
                    <li><a href="#">Điều khoản sử dụng</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Hỗ trợ khách hàng</h3>
                <ul>
                    <li><a href="#">Trung tâm hỗ trợ</a></li>
                    <li><a href="#">Chính sách đổi trả</a></li>
                    <li><a href="#">Liên hệ</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Theo dõi chúng tôi</h3>
                <div class="social-icons">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
        `;

        shadow.appendChild(style);
        shadow.appendChild(footer);
    }
}

customElements.define("shop-footer", ShopFooter);
