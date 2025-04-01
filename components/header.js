class ShopHeader extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const style = document.createElement("style");
        style.textContent = `
            nav {
                background: #000; /* Màu nền đen giống Apple */
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
                position: sticky;
                top: 0;
                z-index: 1000;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: white;
                text-decoration: none;
            }
            .menu {
                display: flex;
                gap: 20px;
                transition: max-height 0.3s ease, opacity 0.3s ease;
            }
            .menu a {
                color: white;
                text-decoration: none;
                font-size: 16px;
                font-weight: 500;
                padding: 5px 10px;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }
            .menu a:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }

            /* Hamburger menu button */
            .hamburger {
                display: none;
                flex-direction: column;
                gap: 5px;
                cursor: pointer;
            }
            .hamburger div {
                width: 25px;
                height: 3px;
                background: white;
                transition: all 0.3s ease;
            }
            .hamburger.open div:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            .hamburger.open div:nth-child(2) {
                opacity: 0;
            }
            .hamburger.open div:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }

            /* Responsive styles */
            @media (max-width: 768px) {
                .hamburger {
                    display: flex;
                }
                .menu {
                    flex-direction: column;
                    gap: 10px;
                    position: absolute;
                    top: 60px;
                    right: 20px;
                    background: #111; /* Màu nền menu khi mở */
                    padding: 15px;
                    border-radius: 8px;
                    max-height: 0; /* Đặt chiều cao ban đầu là 0 */
                    opacity: 0; /* Ẩn menu khi đóng */
                    overflow: hidden; /* Ẩn nội dung khi menu đóng */
                    transition: max-height 0.3s ease, opacity 0.3s ease; /* Hiệu ứng mượt mà */
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                }
                .menu.active {
                    max-height: 300px; /* Chiều cao tối đa khi menu mở */
                    opacity: 1; /* Hiển thị menu khi mở */
                }
                .menu a {
                    font-size: 14px;
                }
            }

            @media (max-width: 480px) {
                nav {
                    padding: 10px 15px;
                }
                .logo {
                    font-size: 20px;
                }
                .menu a {
                    font-size: 12px;
                }
            }
        `;

        const nav = document.createElement("nav");
        nav.innerHTML = `
            <a href="index.html" class="logo">Apple</a>
            <div class="hamburger">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="menu">
                <a href="index.html">Trang chủ</a>
                <a href="#">Sản phẩm</a>
                <a href="#">Dịch vụ</a>
                <a href="#">Liên hệ</a>
            </div>
        `;

        shadow.appendChild(style);
        shadow.appendChild(nav);

        const hamburger = nav.querySelector(".hamburger");
        const menu = nav.querySelector(".menu");

        hamburger.addEventListener("click", () => {
            menu.classList.toggle("active");

            // Thay đổi biểu tượng hamburger khi menu mở/đóng
            hamburger.classList.toggle("open");
        });
    }
}
customElements.define("shop-header", ShopHeader);
