# Video Feed – Test HoTrongHao 412

Ứng dụng xem video dạng cuộn dọc (Vertical Scroll Feed) xây dựng bằng **Next.js 15 App Router** và **TypeScript**.

## Tính năng

- Giao diện cuộn dọc full-screen với CSS Scroll Snap
- Khung 9:16 căn giữa trên PC, full-screen trên mobile
- Click video để Play/Pause
- **Auto-play/Pause** khi scroll (Intersection Observer API)
- Nút Like với hiệu ứng đổi màu đỏ + tăng/giảm count
- Thanh điều hướng: sidebar trái trên desktop, bottom nav trên mobile

## Logic Play/Pause khi cuộn trang

Mỗi `VideoCard` đăng ký một `IntersectionObserver` trên thẻ `<video>` ngay sau khi component mount:

```typescript
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      el.play();   // video hiện trong viewport → tự phát
    } else {
      el.pause();  // video ra ngoài viewport → tự dừng
    }
  },
  { threshold: 0.6 } // kích hoạt khi ≥ 60% video nằm trong viewport
);
observer.observe(videoRef.current);
```

**Ngưỡng 0.6** đảm bảo video chỉ phát khi nó thực sự chiếm phần lớn màn hình, tránh trường hợp hai video cùng phát khi đang ở ranh giới giữa hai item.

CSS Scroll Snap (`scroll-snap-type: y mandatory` + `scroll-snap-stop: always`) giữ cho mỗi lần scroll dừng chính xác tại một video, phối hợp cùng Intersection Observer tạo trải nghiệm giống TikTok/Reels.

## Cài đặt & chạy

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

## Deploy

Dự án được deploy trên Vercel tại: `test-hotronghao-412.vercel.app`
