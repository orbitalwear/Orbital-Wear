class ProductList extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const style = document.createElement("style");
        style.textContent = `
            .product-list {
                display: grid;
                grid-template-columns: repeat(4, 1fr); /* Tối đa 4 sản phẩm trên một hàng */
                gap: 20px;
                padding: 20px;
                max-width: 1200px; /* Giới hạn chiều rộng tối đa */
                margin: 0 auto; /* Căn giữa danh sách sản phẩm */
            }
            .product {
                border: 1px solid #ddd;
                padding: 15px;
                text-align: center;
                border-radius: 16px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s ease;
            }
            .product img {
                width: 100%;
                height: auto;
                object-fit: cover; /* Cắt ảnh để vừa khung mà không bị méo */
                max-height: 200px; /* Giới hạn chiều cao tối đa của ảnh */
                border-radius: 8px;
            }
            .product h3 {
                font-size: 18px;
                margin: 10px 0;
            }
            .product p {
                font-size: 16px;
                color: #555;
                margin-bottom: 10px;
            }
            .product button {
                padding: 10px 15px;
                background-color: #007aff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
            }
            .product button:hover {
                background-color: #005bb5;
            }
            .product:hover {
                transform: translateY(-5px);
            }

            /* Responsive styles */
            @media (max-width: 1024px) {
                .product-list {
                    grid-template-columns: repeat(3, 1fr); /* 3 sản phẩm trên một hàng */
                }
            }
            @media (max-width: 768px) {
                .product-list {
                    grid-template-columns: repeat(2, 1fr); /* 2 sản phẩm trên một hàng */
                }
                .product h3 {
                    font-size: 16px; /* Giảm kích thước font */
                }
                .product p {
                    font-size: 14px; /* Giảm kích thước font */
                }
            }
            @media (max-width: 480px) {
                .product-list {
                    grid-template-columns: 1fr; /* 1 sản phẩm trên một hàng */
                }
                .product {
                    padding: 10px; /* Giảm padding */
                }
                .product h3 {
                    font-size: 14px; /* Giảm kích thước font */
                }
                .product p {
                    font-size: 12px; /* Giảm kích thước font */
                }
                .product button {
                    font-size: 12px; /* Giảm kích thước font */
                    padding: 8px 10px; /* Giảm padding của nút */
                }
            }
        `;

        const container = document.createElement("div");
        container.classList.add("product-list");
        shadow.appendChild(style);
        shadow.appendChild(container);

        fetch("assets/products.csv")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(csvText => {
                console.log("CSV Content:", csvText); // Kiểm tra nội dung file CSV trong console
                const data = Papa.parse(csvText, { header: true }).data; // Đọc dữ liệu từ CSV
                console.log("Parsed Data:", data); // Kiểm tra dữ liệu đã parse
                const products = data.map(row => ({
                    name: row["Name"], // Cột "Name" trong CSV
                    price: row["Price"], // Cột "Price" trong CSV
                    img: row["Image"] // Cột "Image" trong CSV
                }));

                console.log("Products:", products); // Kiểm tra danh sách sản phẩm
                displayProducts(products); // Hiển thị sản phẩm
            })
            .catch(error => console.error("Error fetching CSV:", error));
    }
}
customElements.define("product-list", ProductList);

function displayProducts(products) {
    const container = document.querySelector("product-list").shadowRoot.querySelector(".product-list");
    container.innerHTML = ""; // Xóa nội dung cũ

    products.forEach(p => {
        const product = document.createElement("div");
        product.classList.add("product");
        product.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price}</p>
            <button class="add-to-cart">Thêm vào giỏ</button>
        `;
        container.appendChild(product);

        const button = product.querySelector(".add-to-cart");
        button.addEventListener("click", () => {
            addToCart({ name: p.name, price: p.price, img: p.img });
        });
    });
}
