"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { VideoItem } from "@/data/mockData";
import VolumeControl from "./VolumeControl";

interface VideoCardProps {
  video: VideoItem;
  isMuted: boolean;
  volume: number;
  onToggleMute: () => void;
  onVolumeChange: (v: number) => void;
}

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

export default function VideoCard({ video, isMuted, volume, onToggleMute, onVolumeChange }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [iconType, setIconType] = useState<"play" | "pause">("play");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likesCount);
  const [likeAnimating, setLikeAnimating] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = isMuted;
    el.volume = volume;
  }, [isMuted, volume]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              el.muted = true;
              el.play().then(() => setIsPlaying(true)).catch(() => {});
            });
        } else {
          el.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => { setIsPlaying(true); setIconType("play"); }).catch(() => {});
    } else {
      el.pause();
      setIsPlaying(false);
      setIconType("pause");
    }
    setShowIcon(true);
    setTimeout(() => setShowIcon(false), 700);
  }, []);

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    setLikeCount((c) => (next ? c + 1 : c - 1));
    setLikeAnimating(true);
    setTimeout(() => setLikeAnimating(false), 400);
  };

  return (
    <div className="video-snap-item relative flex items-center justify-center w-full h-dvh bg-black">
      <div
        className="relative w-full h-full md:w-auto md:h-full overflow-hidden"
        style={{ aspectRatio: "9/16", maxHeight: "100dvh" }}
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-full object-cover"
          loop
          playsInline
          preload="metadata"
          onClick={togglePlay}
          style={{ cursor: "pointer" }}
        />

        <VolumeControl
          isMuted={isMuted}
          volume={volume}
          onToggleMute={onToggleMute}
          onVolumeChange={onVolumeChange}
        />

        {showIcon && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="play-icon-fade bg-black/50 rounded-full p-5">
              {iconType === "play" ? <PlayIcon /> : <PauseIcon />}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-12 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ backgroundColor: video.avatarColor }}
            >
              {video.authorName[1].toUpperCase()}
            </div>
            <span className="font-semibold text-white text-sm">{video.authorName}</span>
          </div>
          <p className="text-white text-sm leading-snug line-clamp-3">{video.description}</p>
        </div>

        <div className="absolute right-2 bottom-16 flex flex-col items-center gap-5">
          <ActionButton onClick={handleLike} label={formatCount(likeCount)} animating={likeAnimating}>
            <HeartIcon filled={liked} />
          </ActionButton>
          <ActionButton label={formatCount(video.commentsCount)}>
            <CommentIcon />
          </ActionButton>
          <ActionButton label={formatCount(video.sharesCount)}>
            <ShareIcon />
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  children, label, onClick, animating,
}: {
  children: React.ReactNode; label: string; onClick?: () => void; animating?: boolean;
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 text-white focus:outline-none">
      <div className={`w-11 h-11 flex items-center justify-center ${animating ? "like-animate" : ""}`}>
        {children}
      </div>
      <span className="text-xs font-medium drop-shadow">{label}</span>
    </button>
  );
}


function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 drop-shadow" fill={filled ? "#FF2D55" : "white"}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 drop-shadow" fill="white">
      <path d="M21 6.5A2.5 2.5 0 0 0 18.5 4h-13A2.5 2.5 0 0 0 3 6.5v8A2.5 2.5 0 0 0 5.5 17H7v3l3.33-3H18.5A2.5 2.5 0 0 0 21 14.5v-8z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 drop-shadow" fill="white">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.99 2.99 0 0 0 18 8a3 3 0 1 0-3-3c0 .24.04.47.09.7L8.04 9.81A3 3 0 0 0 6 9a3 3 0 0 0 0 6c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10" fill="white">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10" fill="white">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}
