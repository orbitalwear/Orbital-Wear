class ShopHeader extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const style = document.createElement("style");
        style.textContent = `
            nav {
                background: #222;
                color: white;
                display: flex;
                justify-content: space-between;
                padding: 15px 30px;
            }
            .menu a {
                color: white;
                text-decoration: none;
                margin: 0 15px;
            }
        `;

        const nav = document.createElement("nav");
        nav.innerHTML = `
            <div class="logo">Shop</div>
            <div class="menu">
                <a href="index.html">Trang chủ</a>
                <a href="#">Sản phẩm</a>
                <a href="#">Liên hệ</a>
            </div>
        `;

        shadow.appendChild(style);
        shadow.appendChild(nav);
    }
}
customElements.define("shop-header", ShopHeader);
