// Kiểm tra trạng thái đăng nhập
document.addEventListener('DOMContentLoaded', () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
        window.location.href = 'login.html';
        return; // Dừng việc thực thi các script khác
    }

    // Nếu đã đăng nhập, thực hiện các script còn lại của trang
    // --- Hiệu ứng Fade-in khi cuộn trang ---
    const mediaItems = document.querySelectorAll('.media-item');
    // ... (các đoạn code JavaScript hiện có của bạn) ...
});
document.addEventListener('DOMContentLoaded', () => {
    // --- Khởi tạo hiệu ứng Fade-in ---
    const mediaItems = document.querySelectorAll('.media-item');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    mediaItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(item);
    });

    // --- Bộ lọc tìm kiếm ---
    const keywordFilter = document.getElementById('keyword-filter');
    const dateFilter = document.getElementById('date-filter');
    const videoOnlyFilter = document.getElementById('video-only-filter');

    // Lắng nghe sự kiện thay đổi của các bộ lọc
    keywordFilter.addEventListener('input', filterMedia);
    dateFilter.addEventListener('change', filterMedia);
    videoOnlyFilter.addEventListener('change', filterMedia);

    function filterMedia() {
        const keyword = keywordFilter.value.toLowerCase();
        const date = dateFilter.value;
        const showVideosOnly = videoOnlyFilter.checked;

        // Lấy tất cả các album và items
        const albums = document.querySelectorAll('.album');
        
        albums.forEach(album => {
            const albumTitle = album.querySelector('.album-title').textContent;
            let albumHasVisibleItems = false;
            
            album.querySelectorAll('.media-item').forEach(item => {
                const title = item.querySelector('.caption-title').textContent.toLowerCase();
                const description = item.querySelector('.caption-text').textContent.toLowerCase();
                const isVideo = item.querySelector('video') !== null;
                
                // Kiểm tra điều kiện lọc
                const matchesKeyword = (title.includes(keyword) || description.includes(keyword));
                const matchesDate = (date === '' || albumTitle === date);
                const matchesVideo = (!showVideosOnly || isVideo);
                
                if (matchesKeyword && matchesDate && matchesVideo) {
                    item.style.display = 'block';
                    albumHasVisibleItems = true;
                } else {
                    item.style.display = 'none';
                }
            });

            // Nếu không có mục nào trong album hiển thị, ẩn cả album
            if (albumHasVisibleItems) {
                album.style.display = 'block';
            } else {
                album.style.display = 'none';
            }
        });
    }

    // --- Nút cuộn về đầu trang (Back to Top) ---
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Đồng hồ hiển thị ngày giờ thực tế ---
    function updateDateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const datetimeString = now.toLocaleDateString('vi-VN', options);
        document.getElementById('datetime').textContent = datetimeString;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
});
document.addEventListener('DOMContentLoaded', () => {
    // ... (các đoạn code JavaScript hiện có của bạn) ...

    // --- Chế độ Sáng/Tối ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Kiểm tra và áp dụng chế độ đã lưu
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeToggleBtn.textContent = '🌙';
    }

    // Xử lý sự kiện click vào nút
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Thay đổi icon dựa trên chế độ
        if (body.classList.contains('light-mode')) {
            themeToggleBtn.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggleBtn.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });

});
document.getElementById('myButton').addEventListener('click', function() {
  var element = document.getElementById('myElement');
  if (element.style.display === 'none') {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
});
document.addEventListener('DOMContentLoaded', () => {
    // ... (các đoạn code JavaScript hiện có) ...

    // --- Chức năng Lightbox ---
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    // Lắng nghe sự kiện click trên tất cả các hình ảnh trong gallery
    const galleryImages = document.querySelectorAll('.media-item img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxOverlay.style.display = 'flex'; // Hiển thị lightbox
            lightboxImage.src = img.src; // Lấy nguồn ảnh
            const altText = img.alt || 'Ảnh kỷ niệm';
            lightboxCaption.textContent = altText;
        });
    });

    // Đóng lightbox khi click vào nút X
    closeBtn.addEventListener('click', () => {
        lightboxOverlay.style.display = 'none';
    });

    // Đóng lightbox khi click ra ngoài hoặc nhấn phím ESC
    lightboxOverlay.addEventListener('click', (event) => {
        if (event.target === lightboxOverlay) {
            lightboxOverlay.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            lightboxOverlay.style.display = 'none';
        }
    });
});