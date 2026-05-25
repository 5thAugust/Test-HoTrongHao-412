"use client";

import { useRef, useEffect, useState } from "react";
import { mockVideos } from "@/data/mockData";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const loopedVideos = [
    { ...mockVideos[mockVideos.length - 1], id: "clone-start" },
    ...mockVideos,
    { ...mockVideos[0], id: "clone-end" },
  ];
  const total = loopedVideos.length;

  const handleToggleMute = () => setIsMuted((prev) => !prev);

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    setIsMuted(v === 0);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTop = el.clientHeight;

    let timer: ReturnType<typeof setTimeout>;

    const teleport = (toIndex: number) => {
      el.style.scrollSnapType = "none";
      el.scrollTop = toIndex * el.clientHeight;
      requestAnimationFrame(() => { el.style.scrollSnapType = ""; });
    };

    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const index = Math.round(el.scrollTop / el.clientHeight);
        if (index === 0) teleport(total - 2);
        else if (index === total - 1) teleport(1);
      }, 150);
    };

    el.addEventListener("scroll", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, [total]);

  return (
    <div ref={containerRef} className="scroll-container">
      {loopedVideos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          isMuted={isMuted}
          volume={volume}
          onToggleMute={handleToggleMute}
          onVolumeChange={handleVolumeChange}
        />
      ))}
    </div>
  );
}
