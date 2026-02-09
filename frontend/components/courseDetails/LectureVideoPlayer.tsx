"use client";
import ReactPlayer from "react-player";
import { Loader2, Maximize, Volume2, PlayCircle } from "lucide-react";

interface LectureVideoPlayerProps {
  url: string;
  thumbnail?: string;
  onProgress?: (state: { played: number; playedSeconds: number }) => void;
  onEnded?: () => void;
}

export const LectureVideoPlayer = ({ url, thumbnail, onProgress, onEnded }: LectureVideoPlayerProps) => {
  return (
    <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl group">
      {/* Glow Effect behind the player */}
      <div className="absolute inset-0 bg-blue-600/5 blur-[100px] pointer-events-none" />

      <ReactPlayer
        src={url}
        width="100%"
        height="100%"
        controls={true}
        light={thumbnail}
        playIcon={
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/50 hover:scale-110 transition-transform">
            <PlayCircle className="w-10 h-10 text-white fill-current" />
          </div>
        }
        onEnded={onEnded}
      />
      <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold text-blue-400 border border-white/10 uppercase tracking-widest">
          HD Preview
        </span>
      </div>
    </div>
  );
};