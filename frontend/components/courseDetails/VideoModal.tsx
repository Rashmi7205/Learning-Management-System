"use client";

import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { LectureVideoPlayer } from "./LectureVideoPlayer";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Dark Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 p-4 outline-none animate-in zoom-in-95 duration-300">
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-widest">
                Close
              </span>
              <X className="w-6 h-6" />
            </button>

            {/* The Player */}
            <div className="overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-[#020617]">
              <LectureVideoPlayer url={videoUrl} />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
