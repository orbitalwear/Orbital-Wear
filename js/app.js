let deferredPrompt; // Lưu trữ sự kiện prompt

window.addEventListener('beforeinstallprompt', (event) => {
    // Chặn sự kiện mặc định
    event.preventDefault();
    // Lưu sự kiện để sử dụng sau
    deferredPrompt = event;

    // Hiển thị popup
    const popup = document.createElement('div');
    popup.className = 'install-popup';
    popup.innerHTML = `
        <p>Add Elegant Shop to your Home Screen for quick access!</p>
        <button id="install-btn">Add to Home Screen</button>
        <button id="close-btn">Close</button>
    `;
    document.body.appendChild(popup);

    // Xử lý sự kiện nút "Add to Home Screen"
    document.getElementById('install-btn').addEventListener('click', () => {
        popup.remove(); // Ẩn popup
        deferredPrompt.prompt(); // Hiển thị prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            console.log(choiceResult.outcome);
            deferredPrompt = null; // Xóa sự kiện
        });
    });

    // Xử lý sự kiện nút "Close"
    document.getElementById('close-btn').addEventListener('click', () => {
        popup.remove(); // Đóng popup
    });
});
