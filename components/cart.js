class Cart {
    constructor() {
        this.items = []; // Danh sách sản phẩm trong giỏ
    }

    // Thêm sản phẩm vào giỏ
    addItem(product) {
        const existingItem = this.items.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1; // Tăng số lượng nếu sản phẩm đã tồn tại
        } else {
            this.items.push({ ...product, quantity: 1 }); // Thêm sản phẩm mới
        }
        this.updateCartUI();
        this.updateCartBadge();
    }

    // Xóa tất cả sản phẩm trong giỏ
    clearCart() {
        this.items = [];
        this.updateCartUI();
        this.updateCartBadge();
    }

    // Hiển thị danh sách sản phẩm trong giỏ
    updateCartUI() {
        const cartList = document.getElementById("orderList");
        cartList.innerHTML = ""; // Xóa nội dung cũ

        if (this.items.length === 0) {
            cartList.innerHTML = "<p>Giỏ hàng trống</p>";
            return;
        }

        this.items.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <p>${item.name}</p>
                    <p>${item.price}</p>
                    <p>Số lượng: ${item.quantity}</p>
                </div>
            `;
            cartList.appendChild(cartItem);
        });
    }

    // Cập nhật badge hiển thị số lượng sản phẩm
    updateCartBadge() {
        const cartBadge = document.getElementById("cartBadge");
        const totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalQuantity;

        // Ẩn badge nếu không có sản phẩm
        if (totalQuantity === 0) {
            cartBadge.style.display = "none";
        } else {
            cartBadge.style.display = "flex";
        }
    }

    // Xử lý thanh toán
    checkout() {
        if (this.items.length === 0) {
            alert("Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
            return;
        }

        // Lưu thông tin giỏ hàng vào localStorage để sử dụng trên trang checkout
        localStorage.setItem("cartItems", JSON.stringify(this.items));

        // Chuyển hướng đến trang checkout
        window.location.href = "checkout.html";
    }
}

// Khởi tạo giỏ hàng
const cart = new Cart();

// Hàm thêm sản phẩm vào giỏ
function addToCart(product) {
    cart.addItem(product);
}

// Xóa tất cả sản phẩm trong giỏ
function clearCart() {
    cart.clearCart();
}

// Mở và đóng popup giỏ hàng
document.addEventListener("DOMContentLoaded", () => {
    const openCartButton = document.getElementById("openCart");
    const closeCartButton = document.getElementById("closeCart");
    const cartPopup = document.getElementById("cartPopup");

    // Sự kiện mở popup giỏ hàng
    openCartButton.addEventListener("click", () => {
        cartPopup.classList.remove("hidden");
    });

    // Sự kiện đóng popup giỏ hàng
    closeCartButton.addEventListener("click", () => {
        cartPopup.classList.add("hidden");
    });

    const checkoutButton = document.getElementById("checkout");

    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            if (cart.items.length === 0) {
                alert("Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
                return;
            }

            // Lưu thông tin giỏ hàng vào localStorage
            localStorage.setItem("cartItems", JSON.stringify(cart.items));

            // Chuyển hướng đến trang checkout
            window.location.href = "checkout.html";
        });
    } else {
        console.error("Không tìm thấy nút 'Thanh toán' (#checkout).");
    }
});