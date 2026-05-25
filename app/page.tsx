import VideoFeed from "@/components/VideoFeed";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="flex h-dvh bg-black overflow-hidden">
      <Navigation />

      <main className="flex-1 main-content">
        <VideoFeed />
      </main>
    </div>
  );
}
