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
    authorName: "@AdventureTime",
    description: "Cuộc phiêu lưu không có điểm kết thúc 🔥🚀 Mỗi ngày là một hành trình mới! #adventure #epic #journey",
    likesCount: 1,
    commentsCount: 0,
    sharesCount: 0,
    avatarColor: "#FF6B6B",
  },
  {
    id: "2",
    videoUrl: "/videos/video2.mp4",
    authorName: "@ExploreWorld",
    description: "Khám phá thế giới rộng lớn ngoài kia 🌍✈️ Mỗi chuyến đi là một câu chuyện mới! #travel #explore #world",
    likesCount: 1,
    commentsCount: 0,
    sharesCount: 0,
    avatarColor: "#4ECDC4",
  },
  {
    id: "3",
    videoUrl: "/videos/video3.mp4",
    authorName: "@FunVibes",
    description: "Niềm vui không cần lý do 😄🎉 Hãy cười nhiều hơn mỗi ngày! #fun #happy #vibes",
    likesCount: 0,
    commentsCount: 0,
    sharesCount: 0,
    avatarColor: "#A855F7",
  },
  
];
