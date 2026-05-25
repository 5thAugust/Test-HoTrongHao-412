"use client";

import { useState } from "react";

interface VolumeControlProps {
  isMuted: boolean;
  volume: number;
  onToggleMute: () => void;
  onVolumeChange: (v: number) => void;
}

export default function VolumeControl({ isMuted, volume, onToggleMute, onVolumeChange }: VolumeControlProps) {
  const [hovered, setHovered] = useState(false);
  const displayVolume = isMuted ? 0 : volume;

  return (
    <div
      className="absolute top-4 left-4 z-10 flex flex-row items-center gap-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onToggleMute}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors shrink-0"
      >
        <VolumeIcon isMuted={isMuted} volume={volume} />
      </button>

      {hovered && (
        <div className="flex flex-row items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={displayVolume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-24 accent-white cursor-pointer"
            style={{ height: "4px" }}
          />
          <span className="text-white text-xs font-medium w-8 text-right">
            {Math.round(displayVolume * 100)}%
          </span>
        </div>
      )}
    </div>
  );
}

function VolumeIcon({ isMuted, volume }: { isMuted: boolean; volume: number }) {
  if (isMuted || volume === 0) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
        <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-3-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l2 2L21 18.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
      </svg>
    );
  }
  if (volume < 0.5) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
        <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}
