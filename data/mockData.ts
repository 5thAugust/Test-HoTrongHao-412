export interface VideoItem {
  id: string;
  videoUrl: string;
  authorName: string;
  description: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  avatarColor: string;
}

export const mockVideos: VideoItem[] = [
  {
    id: "1",
    videoUrl: "/videos/video1.mp4",
    authorName: "@BigBuckBunny",
    description: "Chú thỏ Big Buck Bunny đáng yêu dạo chơi giữa khu rừng xanh mát 🐰🌿 Bộ phim hoạt hình mã nguồn mở của Blender Foundation. #animation #cute #nature",
    likesCount: 1,
    commentsCount: 1,
    sharesCount: 1,
    avatarColor: "#FF6B6B",
  },
  {
    id: "2",
    videoUrl: "/videos/video2.mp4",
    authorName: "@FridayFilms",
    description: "Khoảnh khắc thư giãn cuối tuần — đơn giản mà bình yên 🌅✨ Đôi khi chỉ cần dừng lại và tận hưởng! #chill #relax #friday",
    likesCount: 0,
    commentsCount: 0,
    sharesCount: 0,
    avatarColor: "#4ECDC4",
  },
  {
    id: "3",
    videoUrl: "/videos/video3.mp4",
    authorName: "@BlenderFoundation",
    description: "Sintel — nàng chiến binh trẻ lên đường tìm lại người bạn rồng bị bắt cóc 🐉⚔️ Kiệt tác hoạt hình 3D mã nguồn mở. #sintel #blender #animation #fantasy",
    likesCount: 0,
    commentsCount: 0,
    sharesCount: 0,
    avatarColor: "#A855F7",
  },
  
];
