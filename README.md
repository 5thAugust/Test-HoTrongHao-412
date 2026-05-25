# Video Feed – Test HoTrongHao 412

Ứng dụng xem video dạng cuộn dọc (Vertical Scroll Feed) xây dựng bằng **Next.js 16 App Router** và **TypeScript**.

## Tính năng

- Giao diện cuộn dọc full-screen với CSS Scroll Snap
- Khung tỷ lệ 9:16 căn giữa trên PC, full-screen trên mobile
- Click video để Play/Pause
- Auto-play/Pause khi cuộn (Intersection Observer API)
- Cuộn vòng lặp vô hạn (infinite loop)
- Nút Like với hiệu ứng đổi màu đỏ + tăng/giảm count
- Điều chỉnh âm lượng bằng thanh kéo ngang
- Thanh điều hướng: sidebar trái trên desktop, bottom nav trên mobile

## Logic Play/Pause khi cuộn trang

### 1. CSS Scroll Snap — đảm bảo scroll dừng đúng vị trí

```css
.scroll-container {
  scroll-snap-type: y mandatory; /* bắt buộc snap theo trục dọc */
}
.video-snap-item {
  scroll-snap-align: start;
  scroll-snap-stop: always; /* không cho phép bỏ qua video khi scroll nhanh */
}
```

Mỗi lần cuộn luôn dừng chính xác tại đầu một video, không dừng giữa chừng.

### 2. Intersection Observer — tự động Play/Pause theo viewport

Mỗi video tự theo dõi xem mình có đang hiển thị trên màn hình không. Khi cuộn tới, video tự phát; khi cuộn qua, video tự dừng.

```typescript
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      el.play();  // đang hiện trên màn hình → phát
    } else {
      el.pause(); // bị cuộn khỏi màn hình → dừng
    }
  },
  { threshold: 0.6 } // chỉ tính là "đang hiện" khi ≥ 60% video lọt vào màn hình
);
```

### 3. Infinite Loop — cuộn vòng lặp không giới hạn

Để tạo hiệu ứng cuộn vô hạn, danh sách video được mở rộng theo cấu trúc:

```
[clone-last, video1, video2, video3, clone-first]
```

- Khởi động tại `video1` (index 1).
- Khi scroll đến `clone-first` (cuối) → tức thì teleport sang `video1` (thật).
- Khi scroll đến `clone-last` (đầu) → tức thì teleport sang `video3` (thật).

Teleport được thực hiện bằng cách tạm tắt `scroll-snap-type` để đổi `scrollTop` không có animation, sau đó bật lại:

```typescript
el.style.scrollSnapType = "none";
el.scrollTop = targetIndex * el.clientHeight;
requestAnimationFrame(() => {
  el.style.scrollSnapType = ""; // khôi phục từ CSS class
});
```

Người dùng không nhận ra sự nhảy vị trí vì diễn ra trong một frame duy nhất.

## Cài đặt & chạy

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

## Deploy

Dự án được deploy trên Vercel: `https://test-ho-trong-hao-412.vercel.app/`
