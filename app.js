// Kiểm tra nếu trình duyệt hỗ trợ Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(async (registration) => {
        console.log("Service Worker đã đăng ký!", registration);

        // Yêu cầu quyền thông báo
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            console.error("Người dùng từ chối thông báo!");
            return;
        }

        // Đăng ký Web Push
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: "BPydDRrkhL-22RYWmQnrlMpbvEUVN5Dxg_M1fFZfN_5u2N_fxlfp9ewJA9aNWUeEG_yYebBBjcmJ2DEXhKR8Qe4" // Thay bằng Public VAPID Key
        });

        console.log("Subscription:", JSON.stringify(subscription)); // Copy giá trị này để gửi push từ server
    });
} else {
    console.error("Trình duyệt không hỗ trợ Service Worker!");
}
