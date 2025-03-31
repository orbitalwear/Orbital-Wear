// Lắng nghe sự kiện push từ server
self.addEventListener("push", (event) => {
    const data = event.data.json(); // Nhận dữ liệu từ server

    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "icon.png",
    });
});
