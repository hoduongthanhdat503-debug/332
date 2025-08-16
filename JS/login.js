document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    // Đặt mật khẩu chính xác tại đây
    const correctPassword = "123"; 

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn form gửi đi
        
        if (passwordInput.value === correctPassword) {
            // Mật khẩu đúng, lưu trạng thái đăng nhập và chuyển hướng
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'index.html'; // Chuyển đến trang chính
        } else {
            // Mật khẩu sai, hiển thị thông báo lỗi
            errorMessage.style.display = 'block';
            passwordInput.value = ''; // Xóa mật khẩu đã nhập
        }
    });
});